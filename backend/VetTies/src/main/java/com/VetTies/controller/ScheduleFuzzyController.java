package com.VetTies.controller;

import com.VetTies.service.ScheduleFuzzyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleFuzzyController {

    private final ScheduleFuzzyService fuzzyService;

    public ScheduleFuzzyController(ScheduleFuzzyService fuzzyService) {
        this.fuzzyService = fuzzyService;
    }

    @GetMapping("/rating")
    public Map<String, Double> getSlotRating(
            @RequestParam double load,
            @RequestParam double time,
            @RequestParam double gap
    ) {
        double score = fuzzyService.calculateSlotScore(load, time, gap);
        return Map.of("rating", score);
    }
}
