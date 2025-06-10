package com.VetTies.controller;

import com.VetTies.DTOs.OptimizationResult;
import com.VetTies.DTOs.ScheduleOptimizationRequest;
import com.VetTies.DTOs.ScheduleStatistics;
import com.VetTies.model.ScheduleSlot;
import com.VetTies.service.ReportService;
import com.VetTies.service.ScheduleOptimizerService;
import com.VetTies.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
    @Autowired
    private ScheduleService scheduleService;
    @Autowired
    private ScheduleOptimizerService optimizerService;
    @Autowired
    private ReportService reportService;

    @PostMapping("/generate-optimize")
    public ResponseEntity<OptimizationResult> generateAndOptimize(
            @RequestParam LocalDate start,
            @RequestParam LocalDate end,
            @RequestParam(defaultValue = "45") int intervalMinutes
    ) {
        scheduleService.generateSchedule(start, end, Duration.ofMinutes(intervalMinutes));
        System.out.println("end generate");

        ScheduleOptimizationRequest request = new ScheduleOptimizationRequest();
        request.setStartDate(start);
        request.setEndDate(end);
        request.setPreventOverwork(true);

        OptimizationResult result = optimizerService.optimizeSchedule(request);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/slots/vet/{id}")
    public List<ScheduleSlot> getSlots(@PathVariable UUID id) {
        return scheduleService.getSlotsFiltered(id);
    }
    @GetMapping("/stats")
    public ScheduleStatistics getStats(@RequestParam LocalDate from, @RequestParam LocalDate to) {
        return scheduleService.calculateStatistics(from, to);
    }

    @PostMapping("/slot/move")
    public ResponseEntity<ScheduleSlot> moveSlot(
            @RequestParam UUID slotId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime newStartTime
    ) {
        return ResponseEntity.ok(scheduleService.moveSlot(slotId, newStartTime));
    }

    @PostMapping("/generate")
    public ResponseEntity<List<ScheduleSlot>> generateSchedule(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end,
            @RequestParam(defaultValue = "60") int durationMinutes) {
        return ResponseEntity.ok( scheduleService.generateSchedule(start, end, Duration.ofMinutes(durationMinutes)));
    }

    @PostMapping("/optimize")
    public ResponseEntity<OptimizationResult> optimizeSchedule(@RequestBody ScheduleOptimizationRequest request) {
        return ResponseEntity.ok(optimizerService.optimizeSchedule(request));
    }

    @GetMapping("/export/pdf")
    public ResponseEntity<byte[]> exportToPdf(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {

        byte[] pdf = reportService.generatePdfReport(start, end);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=schedule.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}