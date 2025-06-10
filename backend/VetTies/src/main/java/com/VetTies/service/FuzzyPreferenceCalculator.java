package com.VetTies.service;

import com.VetTies.model.Vet;
import com.VetTies.model.VetPreference;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

public class FuzzyPreferenceCalculator {

    public Map<UUID, Map<DayOfWeek, Double>> calculate(List<VetPreference> preferences) {
        // 1. Группируем предпочтения по vetId
        Map<UUID, List<VetPreference>> prefsByVet = preferences.stream()
            .collect(Collectors.groupingBy(VetPreference::getVetId));

        Map<UUID, Map<DayOfWeek, Double>> result = new HashMap<>();

        // 2. Для каждого врача рассчитываем fuzzy-оценки для дней недели
        prefsByVet.forEach((vetId, vetPreferences) -> {
            Map<DayOfWeek, Double> dayScores = new EnumMap<>(DayOfWeek.class);
            
            // Инициализируем все дни недели базовым значением
            Arrays.stream(DayOfWeek.values())
                .forEach(day -> dayScores.put(day, 0.3)); // Базовый уровень 0.3

            // Применяем предпочтения врача
            vetPreferences.forEach(pref -> {
                double score = calculatePreferenceScore(
                    pref.getPreferredStartTime(),
                    pref.getPreferenceWeight()
                );
                dayScores.put(pref.getPreferredDay(), score);
            });

            result.put(vetId, dayScores);
        });

        return result;
    }

    private double calculatePreferenceScore(LocalTime preferredTime, double weight) {
        // 1. Нормализуем вес предпочтения (0-1)
        double normalizedWeight = Math.min(1.0, Math.max(0.0, weight));
        
        // 2. Рассчитываем оценку времени (утро/день/вечер)
        double timeScore = calculateTimeScore(preferredTime);
        
        // 3. Комбинируем с весом предпочтения
        return normalizedWeight * timeScore;
    }

    private double calculateTimeScore(LocalTime time) {
        // Fuzzy-функции для разных периодов дня
        int hour = time.getHour();
        
        // Утренние предпочтения (8-11) - максимум 1.0
        if (hour >= 8 && hour <= 11) {
            return 1.0 - 0.1 * Math.abs(9.5 - hour); // Пик в 9:30
        }
        // Дневные предпочтения (12-15) - 0.7
        else if (hour >= 12 && hour <= 15) {
            return 0.7 - 0.05 * Math.abs(13.5 - hour);
        }
        // Вечерние предпочтения (16-19) - 0.5
        else if (hour >= 16 && hour <= 19) {
            return 0.5 - 0.03 * Math.abs(17.5 - hour);
        }
        // Другие времена - минимальный приоритет
        return 0.2;
    }

    // Дополнительный метод для расчета совместимости врача и типа приема
    public double calculateSpecializationMatch(Vet vet, String appointmentType) {
        Map<String, Double> specializationWeights = Map.of(
            "Хирургия", 0.9,
            "Терапия", 0.7,
            "Стоматология", 0.8,
            "Офтальмология", 0.6
        );
        
        double baseScore = specializationWeights.getOrDefault(
            vet.getSpecialization(), 0.5);
        
        // Учет опыта врача
//        double experienceModifier = calculateExperienceModifier(vet.getExperienceYears());
        double experienceModifier = calculateExperienceModifier(5);


        return baseScore * experienceModifier;
    }

    private double calculateExperienceModifier(int years) {
        // Нечеткая оценка опыта врача
        if (years < 1) return 0.6;
        if (years < 3) return 0.8;
        if (years < 5) return 0.9;
        if (years < 10) return 1.0;
        return 1.1; // Для ветеранов
    }
}