package com.dentist.dentist.core.repositories;

import com.dentist.dentist.core.models.HistoryRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRecordRepository extends JpaRepository<HistoryRecord, Long> {
    List<HistoryRecord> findByUserId(Long userId);
}
