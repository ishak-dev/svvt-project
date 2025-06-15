package com.dentist.dentist.core.services;

import com.dentist.dentist.core.models.AppointmentAvailability;
import com.dentist.dentist.core.repositories.AppointmentAvailabilityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AppointmentAvailabilityServiceImplTest {

    @Mock
    private AppointmentAvailabilityRepository availabilityRepository;

    @InjectMocks
    private AppointmentAvailabilityServiceImpl availabilityService;

    private AppointmentAvailability testAvailability;
    private LocalDate testDate;
    private LocalTime testStartTime;
    private LocalTime testEndTime;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testDate = LocalDate.of(2024, 3, 20);
        testStartTime = LocalTime.of(9, 0);
        testEndTime = LocalTime.of(10, 0);
        
        testAvailability = new AppointmentAvailability();
        testAvailability.setId(1L);
        testAvailability.setDate(testDate);
        testAvailability.setStartTime(testStartTime);
        testAvailability.setEndTime(testEndTime);
        testAvailability.setAvailable(true);
    }

    @Test
    void getAllFreeSlots_Success() {
        List<AppointmentAvailability> availabilities = Arrays.asList(testAvailability);
        when(availabilityRepository.findByIsAvailableTrue()).thenReturn(availabilities);

        List<AppointmentAvailability> result = availabilityService.getAllFreeSlots();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.get(0).isAvailable());
        verify(availabilityRepository).findByIsAvailableTrue();
    }

    @Test
    void addAvailability_Success() {
        when(availabilityRepository.save(any(AppointmentAvailability.class))).thenReturn(testAvailability);

        AppointmentAvailability result = availabilityService.addAvailability(testAvailability);

        assertNotNull(result);
        assertEquals(testDate, result.getDate());
        assertEquals(testStartTime, result.getStartTime());
        assertEquals(testEndTime, result.getEndTime());
        verify(availabilityRepository).save(any(AppointmentAvailability.class));
    }

    @Test
    void getAvailabilitiesByDate_Success() {
        List<AppointmentAvailability> availabilities = Arrays.asList(testAvailability);
        when(availabilityRepository.findByDate(testDate)).thenReturn(availabilities);

        List<AppointmentAvailability> result = availabilityService.getAvailabilitiesByDate(testDate);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testDate, result.get(0).getDate());
        verify(availabilityRepository).findByDate(testDate);
    }

    @Test
    void getAvailableSlotsByDate_Success() {
        List<AppointmentAvailability> availabilities = Arrays.asList(testAvailability);
        when(availabilityRepository.findAvailableSlotsByDate(testDate)).thenReturn(availabilities);

        List<AppointmentAvailability> result = availabilityService.getAvailableSlotsByDate(testDate);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testDate, result.get(0).getDate());
        assertTrue(result.get(0).isAvailable());
        verify(availabilityRepository).findAvailableSlotsByDate(testDate);
    }

    @Test
    void updateAvailability_Success() {
        when(availabilityRepository.findById(1L)).thenReturn(java.util.Optional.of(testAvailability));
        when(availabilityRepository.save(any(AppointmentAvailability.class))).thenReturn(testAvailability);

        AppointmentAvailability result = availabilityService.updateAvailability(1L, false);

        assertNotNull(result);
        assertFalse(result.isAvailable());
        verify(availabilityRepository).findById(1L);
        verify(availabilityRepository).save(any(AppointmentAvailability.class));
    }

    @Test
    void updateAvailability_NotFound() {
        when(availabilityRepository.findById(999L)).thenReturn(java.util.Optional.empty());

        assertThrows(RuntimeException.class, () -> 
            availabilityService.updateAvailability(999L, false)
        );
        verify(availabilityRepository).findById(999L);
        verify(availabilityRepository, never()).save(any(AppointmentAvailability.class));
    }
} 