package com.VetTies.service;

import com.VetTies.DTOs.MaintenanceLogDTO;
import com.VetTies.DTOs.MaintenanceScheduleDTO;
import com.VetTies.model.Equipment;
import com.VetTies.model.MaintenanceLog;
import com.VetTies.model.MaintenanceSchedule;
import com.VetTies.repository.EquipmentRepository;
import com.VetTies.repository.MaintenanceLogRepository;
import com.VetTies.repository.MaintenanceScheduleRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class MaintenanceService {
    private final MaintenanceScheduleRepository scheduleRepository;
    private final MaintenanceLogRepository logRepository;
    private final EquipmentRepository equipmentRepository;
//    private final NotificationService notificationService;
    
    public MaintenanceService(MaintenanceScheduleRepository scheduleRepository,
                            MaintenanceLogRepository logRepository,
                            EquipmentRepository equipmentRepository
                            ) {
        this.scheduleRepository = scheduleRepository;
        this.logRepository = logRepository;
        this.equipmentRepository = equipmentRepository;
    }
    
    public MaintenanceSchedule addSchedule(MaintenanceScheduleDTO scheduleDTO) {
        Equipment equipment = equipmentRepository.findById(scheduleDTO.getEquipmentId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipment not found"));
        
        MaintenanceSchedule schedule = new MaintenanceSchedule();
        // mapping from DTO to entity
        schedule.setEquipment(equipment);
        return scheduleRepository.save(schedule);
    }

    public List<MaintenanceSchedule> getAllSchedule(UUID equipmentId) {
        return scheduleRepository.findByEquipmentId(equipmentId);
    }
    
    public MaintenanceLog addMaintenanceLog(MaintenanceLogDTO logDTO) {
        Equipment equipment = equipmentRepository.findById(logDTO.getEquipmentId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Equipment not found"));
        
        MaintenanceLog log = new MaintenanceLog();
        log.setEquipment(equipment);
        updateMaintenanceSchedule(equipment, log);
        
        return logRepository.save(log);
    }
    
    private void updateMaintenanceSchedule(Equipment equipment, MaintenanceLog log) {
        scheduleRepository.findByEquipmentIdAndMaintenanceType(equipment.getId(), log.getMaintenanceType())
            .ifPresent(schedule -> {
                schedule.setLastMaintenanceDate(log.getMaintenanceDate());
                if (schedule.getIntervalDays() != null) {
                    schedule.setNextMaintenanceDate(log.getMaintenanceDate().plusDays(schedule.getIntervalDays()));
                }
                scheduleRepository.save(schedule);
            });
    }

    public List<MaintenanceSchedule> getUpcomingMaintenance(LocalDate endDate){
        return scheduleRepository.findByNextMaintenanceDateBetween(LocalDate.now(), endDate);
    }
    
    @Scheduled(cron = "0 0 9 * * MON") // Каждый понедельник в 9:00
    public void checkUpcomingMaintenance() {
        LocalDate warningDate = LocalDate.now().plusDays(7);
        List<MaintenanceSchedule> dueSoon = scheduleRepository
            .findByNextMaintenanceDateBetween(LocalDate.now(), warningDate);
        
//        dueSoon.forEach(schedule -> {
//            notificationService.sendMaintenanceReminder(
//                schedule.getEquipment(),
//                schedule.getNextMaintenanceDate()
//            );
//        });
    }
    
    public List<MaintenanceLog> getEquipmentMaintenanceHistory(UUID equipmentId) {
        return logRepository.findByEquipmentIdOrderByMaintenanceDateDesc(equipmentId);
    }
}