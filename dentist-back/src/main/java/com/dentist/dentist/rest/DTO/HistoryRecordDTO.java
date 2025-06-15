package com.dentist.dentist.rest.DTO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class HistoryRecordDTO {

    private Long id;
    private String title;
    private String date;
    private String description;

    public HistoryRecordDTO(Long id, String title, LocalDate date, String description) {
        this.id = id;
        this.title = title;
        this.date = date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        this.description = description;

    }

    public Long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
