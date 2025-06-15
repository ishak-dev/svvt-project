package com.dentist.dentist.rest.controllers;

import com.dentist.dentist.core.models.HistoryRecord;
import com.dentist.dentist.core.interfaces.HistoryRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/history-records")
public class HistoryRecordController {

    private final HistoryRecordService historyRecordService;

    @Autowired
    public HistoryRecordController(HistoryRecordService historyRecordService) {
        this.historyRecordService = historyRecordService;
    }
    @PostMapping("/{userId}/records")
    public ResponseEntity<HistoryRecord> addRecord(
            @PathVariable Long userId,
            @RequestBody HistoryRecord record) {
        HistoryRecord createdRecord = historyRecordService.addHistoryRecord(userId, record);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRecord);
    }


}

