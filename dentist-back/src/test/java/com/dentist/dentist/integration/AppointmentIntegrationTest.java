package com.dentist.dentist.integration;

import com.dentist.dentist.core.models.Appointment;
import com.dentist.dentist.core.models.AppointmentAvailability;
import com.dentist.dentist.core.repositories.AppointmentRepository;
import com.dentist.dentist.core.repositories.AppointmentAvailabilityRepository;
import com.dentist.dentist.core.interfaces.AppointmentService;
import com.dentist.dentist.core.interfaces.AppointmentAvailabilityService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class AppointmentIntegrationTest {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AppointmentAvailabilityService availabilityService;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentAvailabilityRepository availabilityRepository;

    private Appointment testAppointment;
    private AppointmentAvailability testAvailability;

    @BeforeEach
    void setUp() {
        // Clear existing data
        appointmentRepository.deleteAll();
        availabilityRepository.deleteAll();

        // Create test availability
        testAvailability = new AppointmentAvailability();
        testAvailability.setDate(LocalDate.now());
        testAvailability.setStartTime(LocalTime.of(9, 0));
        testAvailability.setEndTime(LocalTime.of(10, 0));
        testAvailability.setAvailable(true);
        testAvailability = availabilityRepository.save(testAvailability);

        // Create test appointment
        testAppointment = new Appointment();
        testAppointment.setPatientName("John");
        testAppointment.setPatientSurname("Doe");
        testAppointment.setEmail("john@example.com");
        testAppointment.setAppointmentDate(LocalDate.now().toString());
        testAppointment.setTime("09:30");
        testAppointment.setNotes("Regular checkup");
    }

    @Test
    void testCreateAndRetrieveAppointment() {
        // Create appointment
        Appointment created = appointmentService.createAppointment(testAppointment);
        assertNotNull(created);
        assertNotNull(created.getPatientName());
        assertEquals("John", created.getPatientName());

        // Retrieve appointment
        Optional<Appointment> retrieved = appointmentService.getAppointmentByEmail("john@example.com");
        assertTrue(retrieved.isPresent());
        assertEquals("john@example.com", retrieved.get().getEmail());
    }

    @Test
    void testAppointmentWithAvailability() {
        // Create appointment
        Appointment created = appointmentService.createAppointment(testAppointment);
        assertNotNull(created);

        // Update availability to mark it as booked
        AppointmentAvailability updatedAvailability = availabilityService.updateAvailability(
            testAvailability.getId(), false);
        assertFalse(updatedAvailability.isAvailable());

        // Verify the availability is no longer in free slots
        List<AppointmentAvailability> freeSlots = availabilityService.getAvailableSlotsByDate(LocalDate.now());
        assertTrue(freeSlots.stream().noneMatch(slot -> slot.getId().equals(testAvailability.getId())));
    }

    @Test
    void testUpdateAppointment() {
        // Create initial appointment
        Appointment created = appointmentService.createAppointment(testAppointment);
        assertNotNull(created);

        // Update appointment
        Appointment updatedAppointment = new Appointment();
        updatedAppointment.setPatientName("Jane");
        updatedAppointment.setPatientSurname("Smith");
        updatedAppointment.setNotes("Updated notes");

        Appointment updated = appointmentService.updateAppointment(created.getId(), updatedAppointment);
        assertNotNull(updated);
        assertEquals("Jane", updated.getPatientName());
        assertEquals("Smith", updated.getPatientSurname());
        assertEquals("Updated notes", updated.getNotes());
    }

    @Test
    void testDeleteAppointment() {
        // Create appointment
        Appointment created = appointmentService.createAppointment(testAppointment);
        assertNotNull(created);

        // Delete appointment
        appointmentService.deleteAppointment(created.getId());

        // Verify appointment is deleted
        Optional<Appointment> deleted = appointmentService.getAppointmentById(created.getId());
        assertFalse(deleted.isPresent());

        // Verify availability is freed up
        AppointmentAvailability availability = availabilityRepository.findById(testAvailability.getId()).orElse(null);
        assertNotNull(availability);
        assertTrue(availability.isAvailable());
    }

    @Test
    void testGetAllAppointments() {
        // Create multiple appointments
        Appointment appointment1 = appointmentService.createAppointment(testAppointment);
        
        Appointment appointment2 = new Appointment();
        appointment2.setPatientName("Jane");
        appointment2.setPatientSurname("Smith");
        appointment2.setEmail("jane@example.com");
        appointment2.setAppointmentDate(LocalDate.now().toString());
        appointment2.setTime("10:30");
        appointment2.setNotes("Follow-up");
        appointment2 = appointmentService.createAppointment(appointment2);

        // Get all appointments
        List<Appointment> allAppointments = appointmentService.getAllAppointments();
        assertNotNull(allAppointments);
        assertEquals(2, allAppointments.size());
        assertTrue(allAppointments.stream().anyMatch(a -> a.getEmail().equals("john@example.com")));
        assertTrue(allAppointments.stream().anyMatch(a -> a.getEmail().equals("jane@example.com")));
    }
} 