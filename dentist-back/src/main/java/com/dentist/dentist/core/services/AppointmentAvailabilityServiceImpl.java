package com.dentist.dentist.core.services;

import com.dentist.dentist.core.models.AppointmentAvailability;
import com.dentist.dentist.core.interfaces.AppointmentAvailabilityService;
import com.dentist.dentist.core.repositories.AppointmentAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentAvailabilityServiceImpl implements AppointmentAvailabilityService {

    private final AppointmentAvailabilityRepository availabilityRepository;

    @Autowired
    public AppointmentAvailabilityServiceImpl(AppointmentAvailabilityRepository availabilityRepository) {
        this.availabilityRepository = availabilityRepository;
    }

    @Override
    public List<AppointmentAvailability> getAllFreeSlots() {
        return availabilityRepository.findByIsAvailableTrue();
    }

    @Override
    public AppointmentAvailability addAvailability(AppointmentAvailability availability) {
        return availabilityRepository.save(availability);
    }

    @Override
    public List<AppointmentAvailability> getAvailabilitiesByDate(LocalDate date) {
        return availabilityRepository.findByDate(date);
    }

    @Override
    public List<AppointmentAvailability> getAvailableSlotsByDate(LocalDate date) {
        return availabilityRepository.findAvailableSlotsByDate(date);
    }

    @Override
    public AppointmentAvailability updateAvailability(Long id, boolean isAvailable) {
        System.out.println("THIS IS " + isAvailable);
        AppointmentAvailability availability = availabilityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Availability not found"));
        availability.setAvailable(isAvailable);
        return availabilityRepository.save(availability);
    }
}

