package com.dentist.dentist.core.services;

import com.dentist.dentist.core.models.HistoryRecord;
import com.dentist.dentist.core.interfaces.HistoryRecordService;
import com.dentist.dentist.core.repositories.HistoryRecordRepository;
import com.dentist.dentist.core.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistoryRecordServiceImpl implements HistoryRecordService {

    private final HistoryRecordRepository historyRecordRepository;
    private final UserRepository userRepository;

    @Autowired
    public HistoryRecordServiceImpl(HistoryRecordRepository historyRecordRepository, UserRepository userRepository) {
        this.historyRecordRepository = historyRecordRepository;
        this.userRepository = userRepository;
    }

    @Override
    public HistoryRecord addHistoryRecord(Long userId, HistoryRecord historyRecord) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        if (historyRecord == null) {
            throw new IllegalArgumentException("History record cannot be null");
        }

        // Fetch the user to ensure they exist
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // Associate the history record with the user
        historyRecord.setUser(user);

        // Save the history record
        return historyRecordRepository.save(historyRecord);
    }

}
