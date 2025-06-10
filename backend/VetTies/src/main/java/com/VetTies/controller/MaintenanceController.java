package com.VetTies.controller;

import com.VetTies.DTOs.MaintenanceLogDTO;
import com.VetTies.DTOs.MaintenanceScheduleDTO;
import com.VetTies.model.MaintenanceLog;
import com.VetTies.model.MaintenanceSchedule;
import com.VetTies.service.MaintenanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {
    private final MaintenanceService maintenanceService;

    public MaintenanceController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @GetMapping("/schedule/{equipmentId}")
    public ResponseEntity<List<MaintenanceScheduleDTO>> getAllSchedules(@PathVariable UUID equipmentId) {
       return ResponseEntity.ok(maintenanceService.getAllSchedule(equipmentId).stream().map(this::convertToDTO).toList());
    }
    
    @PostMapping("/schedule")
    public ResponseEntity<MaintenanceScheduleDTO> addSchedule(
            @RequestBody MaintenanceScheduleDTO scheduleDTO) {
        MaintenanceSchedule schedule = maintenanceService.addSchedule(scheduleDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(schedule));
    }
    
    @GetMapping("/log/equipment/{equipmentId}")
    public ResponseEntity<List<MaintenanceLogDTO>> getEquipmentLogs(
            @PathVariable UUID equipmentId) {
        List<MaintenanceLogDTO> logs = maintenanceService.getEquipmentMaintenanceHistory(equipmentId)
            .stream()
            .map(this::convertToDTO)
            .toList();
        return ResponseEntity.ok(logs);
    }
    
    @PostMapping("/log")
    public ResponseEntity<MaintenanceLogDTO> addMaintenanceLog(
            @RequestBody MaintenanceLogDTO logDTO) {
        MaintenanceLog log = maintenanceService.addMaintenanceLog(logDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(log));
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<List<MaintenanceScheduleDTO>> getUpcomingMaintenance(
            @RequestParam(required = false) Integer days) {
        LocalDate endDate = LocalDate.now().plusDays(days != null ? days : 7);
        List<MaintenanceSchedule> schedules = maintenanceService.getUpcomingMaintenance(endDate);
        return ResponseEntity.ok(schedules.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList()));
    }

    private MaintenanceLogDTO convertToDTO(MaintenanceLog maintenanceLog) {
        return new MaintenanceLogDTO()
                .setCost(maintenanceLog.getCost())
                .setDescription(maintenanceLog.getDescription())
                .setId(maintenanceLog.getId())
                .setMaintenanceDate(maintenanceLog.getMaintenanceDate())
                .setMaintenanceType(maintenanceLog.getMaintenanceType())
                .setNextMaintenanceDate(maintenanceLog.getNextMaintenanceDate())
                .setEquipmentId(maintenanceLog.getEquipment().getId())
                .setPartsReplaced(maintenanceLog.getPartsReplaced())
                .setPerformedBy(maintenanceLog.getPerformedBy());

    }

    private MaintenanceScheduleDTO convertToDTO(MaintenanceSchedule maintenanceSchedule) {
        return new MaintenanceScheduleDTO()
                .setNextMaintenanceDate(maintenanceSchedule.getNextMaintenanceDate())
                .setEquipmentId(maintenanceSchedule.getEquipment().getId())
                .setInstructions(maintenanceSchedule.getInstructions())
                .setLastMaintenanceDate(maintenanceSchedule.getLastMaintenanceDate())
                .setMaintenanceType(maintenanceSchedule.getMaintenanceType())
                .setIntervalDays(maintenanceSchedule.getIntervalDays())
                .setId(maintenanceSchedule.getId());

    }
}