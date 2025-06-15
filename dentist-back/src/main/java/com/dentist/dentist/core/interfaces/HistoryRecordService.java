package com.dentist.dentist.core.interfaces;

import com.dentist.dentist.core.models.HistoryRecord;

public interface HistoryRecordService {
    HistoryRecord addHistoryRecord(Long userId, HistoryRecord historyRecord);
}
