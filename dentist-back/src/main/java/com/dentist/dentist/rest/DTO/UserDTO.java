package com.dentist.dentist.rest.DTO;

import java.util.List;

public class UserDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private List<HistoryRecordDTO> historyRecords;

    public UserDTO(Long id, String fullName, String email, String phoneNumber, List<HistoryRecordDTO> historyRecords) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.historyRecords = historyRecords;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<HistoryRecordDTO> getHistoryRecords() {
        return historyRecords;
    }

    public void setHistoryRecords(List<HistoryRecordDTO> historyRecords) {
        this.historyRecords = historyRecords;
    }
}

