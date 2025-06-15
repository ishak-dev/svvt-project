package com.dentist.dentist.rest.controllers;

import com.dentist.dentist.core.models.AppointmentAvailability;
import com.dentist.dentist.core.interfaces.AppointmentAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/availability")
public class AppointmentAvailabilityController {

    private final AppointmentAvailabilityService availabilityService;

    @Autowired
    public AppointmentAvailabilityController(AppointmentAvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    @PostMapping
    public ResponseEntity<AppointmentAvailability> addAvailability(@RequestBody AppointmentAvailability availability) {
        AppointmentAvailability createdAvailability = availabilityService.addAvailability(availability);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAvailability);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<AppointmentAvailability>> getAvailabilitiesByDate(@PathVariable LocalDate date) {
        return ResponseEntity.ok(availabilityService.getAvailabilitiesByDate(date));
    }

    @GetMapping("/available/{date}")
    public ResponseEntity<List<AppointmentAvailability>> getAvailableSlotsByDate(@PathVariable LocalDate date) {
        return ResponseEntity.ok(availabilityService.getAvailableSlotsByDate(date));
    }

    @GetMapping("/free-slots")
    public ResponseEntity<List<AppointmentAvailability>> getAllFreeSlots() {
        return ResponseEntity.ok(availabilityService.getAllFreeSlots());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AppointmentAvailability> updateAvailability(@PathVariable Long id, @RequestParam boolean isAvailable) {
        AppointmentAvailability updatedAvailability = availabilityService.updateAvailability(id, isAvailable);
        return ResponseEntity.ok(updatedAvailability);
    }
}

