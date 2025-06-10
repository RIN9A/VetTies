package com.VetTies.service;

import com.VetTies.model.ScheduleSlot;
import com.VetTies.repository.ScheduleSlotRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;

import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    private ScheduleSlotRepository slotRepository;

    public byte[] generatePdfReport(LocalDate start, LocalDate end) {
        List<ScheduleSlot> slots = slotRepository.findAvailableSlotsBetween(
            start.atStartOfDay(),
            end.atTime(LocalTime.MAX)
        );

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             PDDocument document = new PDDocument()) {


            
            PDPage page = new PDPage();
            document.addPage(page);
            
            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                PDType0Font font = PDType0Font.load(document,
                        new File("src/main/resources/fonts/arialmt.ttf"));
                contentStream.setFont(font, 12);
                contentStream.beginText();
                contentStream.newLineAtOffset(100, 700);
                contentStream.showText("Расписание с " + start + " по " + end);
                contentStream.endText();
                
                // Добавление данных в таблицу
                drawScheduleTable(contentStream, slots, font, document);
            }
            
            document.save(baos);
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to generate PDF", e);
        }
    }

    private void drawScheduleTable(PDPageContentStream contentStream, List<ScheduleSlot> slots, PDType0Font font, PDDocument document) throws IOException {
        // Настройки таблицы
        float margin = 50;
        float yStart = 650;
        float rowHeight = 20;
        float tableWidth = 500;
        float colWidth = tableWidth / 4;

        // Заголовки столбцов
        String[] headers = {"Дата", "Время", "Врач", "Статус"};

        // Рисуем заголовки таблицы
        contentStream.setFont(font, 10);
        float nexty = yStart;

        // Заголовки столбцов
        contentStream.setNonStrokingColor(Color.LIGHT_GRAY);
        contentStream.addRect(margin, nexty - rowHeight, tableWidth, rowHeight);
        contentStream.fill();
        contentStream.setNonStrokingColor(Color.BLACK);

        float textx = margin;
        for (String header : headers) {
            contentStream.beginText();
            contentStream.newLineAtOffset(textx + 5, nexty - rowHeight + 5);
            contentStream.showText(header);
            contentStream.endText();
            textx += colWidth;
        }

        // Данные таблицы
        contentStream.setFont(font, 8);
        nexty -= rowHeight;

        for (ScheduleSlot slot : slots) {
            if (nexty < margin) {
                // Если не хватает места, создаем новую страницу
                contentStream.close();
                PDPage newPage = new PDPage();
                document.addPage(newPage);
                contentStream = new PDPageContentStream(document, newPage);
                contentStream.setFont(font, 8);
                nexty = yStart;
            }

            // Строка таблицы
            contentStream.addRect(margin, nexty - rowHeight, tableWidth, rowHeight);
            contentStream.stroke();

            // Ячейки
            float texty = nexty - rowHeight + 5;
            contentStream.beginText();
            contentStream.newLineAtOffset(margin + 5, texty);
            contentStream.showText(slot.getStartTime().toLocalDate().toString());
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(margin + colWidth + 5, texty);
            contentStream.showText(slot.getStartTime().toLocalTime() + " - " + slot.getEndTime().toLocalTime());
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(margin + 2 * colWidth + 5, texty);
            contentStream.showText(slot.getVet().getUser().getFullName());
            contentStream.endText();

            contentStream.beginText();
            contentStream.newLineAtOffset(margin + 3 * colWidth + 5, texty);
            contentStream.showText(slot.isBooked() ? "Занято" : "Свободно");
            contentStream.endText();

            nexty -= rowHeight;
        }
    }
}