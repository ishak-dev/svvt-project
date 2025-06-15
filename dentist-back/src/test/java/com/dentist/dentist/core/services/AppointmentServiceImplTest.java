package com.dentist.dentist.core.services;

import com.dentist.dentist.api.mailgun.MailgunService;
import com.dentist.dentist.core.models.Appointment;
import com.dentist.dentist.core.repositories.AppointmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AppointmentServiceImplTest {

    @Mock
    private AppointmentRepository appointmentRepository;

    @Mock
    private MailgunService mailgunService;

    @InjectMocks
    private AppointmentServiceImpl appointmentService;

    private Appointment testAppointment;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        testAppointment = new Appointment();
        testAppointment.setPatientName("John");
        testAppointment.setPatientSurname("Doe");
        testAppointment.setEmail("john@example.com");
        testAppointment.setAppointmentDate("2024-03-20");
        testAppointment.setTime("10:00");
        testAppointment.setNotes("Regular checkup");
    }

    @Test
    void createAppointment_Success() {
        when(appointmentRepository.save(any(Appointment.class))).thenReturn(testAppointment);
        doNothing().when(mailgunService).sendEmail(anyString(), anyString(), anyString());

        Appointment created = appointmentService.createAppointment(testAppointment);

        assertNotNull(created);
        assertEquals(testAppointment.getPatientName(), created.getPatientName());
        verify(mailgunService).sendEmail(anyString(), anyString(), anyString());
        verify(appointmentRepository).save(any(Appointment.class));
    }

    @Test
    void getAllAppointments_Success() {
        List<Appointment> appointments = Arrays.asList(testAppointment);
        when(appointmentRepository.findAll()).thenReturn(appointments);

        List<Appointment> result = appointmentService.getAllAppointments();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(appointmentRepository).findAll();
    }

    @Test
    void getAppointmentById_Success() {
        when(appointmentRepository.findById(1L)).thenReturn(Optional.of(testAppointment));

        Optional<Appointment> result = appointmentService.getAppointmentById(1L);

        assertTrue(result.isPresent());
        assertEquals(testAppointment.getEmail(), result.get().getEmail());
        verify(appointmentRepository).findById(1L);
    }

    @Test
    void getAppointmentById_NotFound() {
        when(appointmentRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Appointment> result = appointmentService.getAppointmentById(999L);

        assertFalse(result.isPresent());
        verify(appointmentRepository).findById(999L);
    }

    @Test
    void getAppointmentByEmail_Success() {
        when(appointmentRepository.findByEmail("john@example.com")).thenReturn(Optional.of(testAppointment));

        Optional<Appointment> result = appointmentService.getAppointmentByEmail("john@example.com");

        assertTrue(result.isPresent());
        assertEquals(testAppointment.getEmail(), result.get().getEmail());
        verify(appointmentRepository).findByEmail("john@example.com");
    }

    @Test
    void updateAppointment_Success() {
        Appointment updatedAppointment = new Appointment();
        updatedAppointment.setPatientName("Jane");
        updatedAppointment.setPatientSurname("Smith");
        updatedAppointment.setNotes("Updated notes");

        when(appointmentRepository.findById(1L)).thenReturn(Optional.of(testAppointment));
        when(appointmentRepository.save(any(Appointment.class))).thenReturn(testAppointment);

        Appointment result = appointmentService.updateAppointment(1L, updatedAppointment);

        assertNotNull(result);
        verify(appointmentRepository).findById(1L);
        verify(appointmentRepository).save(any(Appointment.class));
    }

    @Test
    void updateAppointment_NotFound() {
        when(appointmentRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> 
            appointmentService.updateAppointment(999L, testAppointment)
        );
        verify(appointmentRepository).findById(999L);
    }

    @Test
    void deleteAppointment_Success() {
        when(appointmentRepository.existsById(1L)).thenReturn(true);
        doNothing().when(appointmentRepository).deleteById(1L);

        appointmentService.deleteAppointment(1L);

        verify(appointmentRepository).existsById(1L);
        verify(appointmentRepository).deleteById(1L);
    }

    @Test
    void deleteAppointment_NotFound() {
        when(appointmentRepository.existsById(999L)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> 
            appointmentService.deleteAppointment(999L)
        );
        verify(appointmentRepository).existsById(999L);
        verify(appointmentRepository, never()).deleteById(anyLong());
    }
} 