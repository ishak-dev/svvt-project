package com.dentist.dentist.core.repositories;

import com.dentist.dentist.core.models.AppointmentAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentAvailabilityRepository extends JpaRepository<AppointmentAvailability, Long> {
    List<AppointmentAvailability> findByDate(LocalDate date);

    @Query("SELECT a FROM AppointmentAvailability a WHERE a.date = :date AND a.isAvailable = true")
    List<AppointmentAvailability> findAvailableSlotsByDate(@Param("date") LocalDate date);

    List<AppointmentAvailability> findByIsAvailableTrue();
}

