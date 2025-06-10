package com.VetTies.controller;

import com.VetTies.DTOs.AppointmentDto;
import com.VetTies.DTOs.PetDto;
import com.VetTies.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequestMapping("/appointments")
@RestController
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    @GetMapping
    public ResponseEntity<List<AppointmentDto>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDto> getAppointById(@PathVariable UUID id) {
        return ResponseEntity.ok(appointmentService.getAppointmentById(id));
    }

    @GetMapping("/owner/{id}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByOwner(@PathVariable UUID id) {
        return ResponseEntity.ok(appointmentService.getAppointmentByUser(id));
    }
    @GetMapping("/vets/{vetId}/free-slots")
    public ResponseEntity<List<LocalDateTime>> getAvailableSlots(
            @PathVariable UUID vetId,
            @RequestParam(defaultValue = "7") int daysAhead,
            @RequestParam(defaultValue = "60") int slotMinutes
    ) {
        return ResponseEntity.ok(appointmentService.getAvailableSlots(vetId, daysAhead, slotMinutes));
    }


    @GetMapping("/employee/{id}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByVet(@PathVariable UUID id) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByVet(id));
    }

    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentDto appointmentDto) {
        System.out.println(appointmentDto);
        return ResponseEntity.ok(appointmentService.createAppointment(appointmentDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentDto> updateAppointment(@PathVariable UUID id, @RequestBody AppointmentDto appointmentDto) {
        return ResponseEntity.ok(appointmentService.updateAppointment(id, appointmentDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable UUID id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("Запись успешно удалена");
    }

}

