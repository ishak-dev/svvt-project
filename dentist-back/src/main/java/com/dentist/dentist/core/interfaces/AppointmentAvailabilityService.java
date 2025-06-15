package com.dentist.dentist.core.interfaces;

import com.dentist.dentist.core.models.AppointmentAvailability;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentAvailabilityService {
    AppointmentAvailability addAvailability(AppointmentAvailability availability);

    List<AppointmentAvailability> getAvailabilitiesByDate(LocalDate date);

    List<AppointmentAvailability> getAvailableSlotsByDate(LocalDate date);

    AppointmentAvailability updateAvailability(Long id, boolean isAvailable);

    List<AppointmentAvailability> getAllFreeSlots();
}

