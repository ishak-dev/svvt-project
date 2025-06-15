package com.dentist.dentist.core.interfaces;

import com.dentist.dentist.core.models.Appointment;

import java.util.List;
import java.util.Optional;

public interface AppointmentService {
    Appointment createAppointment(Appointment appointment);
    List<Appointment> getAllAppointments();
    Optional<Appointment> getAppointmentById(Long id);

    Optional<Appointment> getAppointmentByEmail(String Email);
    Appointment updateAppointment(Long id, Appointment updatedAppointment);
    void deleteAppointment(Long id);
}
