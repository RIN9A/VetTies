package com.VetTies.service;

import net.sourceforge.jFuzzyLogic.FIS;
import org.springframework.stereotype.Service;

@Service
public class ScheduleFuzzyService {

    private final FIS fis;

    public ScheduleFuzzyService() {

        String filePath = "src/main/resources/templates/fuzzy.fcl";
        this.fis = FIS.load(filePath, true);
        if (fis == null) {
            throw new IllegalArgumentException("Ошибка загрузки FCL файла: " + filePath);
        }
    }

    public double calculateSlotScore(double load, double time, double gap) {
        fis.setVariable("load", load);
        fis.setVariable("time", time);
        fis.setVariable("gap", gap);
        fis.evaluate();
        return fis.getVariable("rating").getValue();
    }
}
