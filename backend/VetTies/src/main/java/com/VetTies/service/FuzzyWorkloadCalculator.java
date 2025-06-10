package com.VetTies.service;

import com.VetTies.model.Appointment;
import com.VetTies.model.Vet;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

public class FuzzyWorkloadCalculator {
    
    public Map<UUID, Double> calculate(List<Vet> vets, List<Appointment> appointments) {
        Map<UUID, Double> scores = new HashMap<>();
        
        // Группировка приемов по врачам
        Map<Vet, List<Appointment>> appointmentsByVet = appointments.stream()
            .collect(Collectors.groupingBy(Appointment::getVet));
        
        for (Vet vet : vets) {
            List<Appointment> vetAppointments = appointmentsByVet.getOrDefault(vet, Collections.emptyList());
            
            // 1. Рассчитываем количество приемов
            double appointmentCount = vetAppointments.size();
            double countMembership = fuzzyAppointmentCount(appointmentCount);
            
            // 2. Рассчитываем продолжительность работы
            double totalMinutes = vetAppointments.stream()
                .mapToLong(a -> Duration.between(a.getAppointmentTime(), a.getAppointmentTime().plusHours(1)).toMinutes())
                .sum();
            double durationMembership = fuzzyDuration(totalMinutes);
            
            // 3. Комбинированный fuzzy score
            double workloadScore = Math.min(countMembership, durationMembership);
            scores.put(vet.getId(), workloadScore);
        }
        
        return scores;
    }
    
    private double fuzzyAppointmentCount(double count) {
        if (count <= 5) return 0.2; // Низкая
        if (count <= 10) return 0.5; // Средняя
        return 0.8; // Высокая
    }
    
    private double fuzzyDuration(double minutes) {
        if (minutes <= 240) return 0.2; // Низкая
        if (minutes <= 360) return 0.5; // Средняя
        return 0.8; // Высокая
    }
}