package com.dentist.dentist.core.services;

import com.dentist.dentist.api.mailgun.MailgunService;
import com.dentist.dentist.core.models.Appointment;
import com.dentist.dentist.core.interfaces.AppointmentService;
import com.dentist.dentist.core.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final MailgunService mailgunService;

    @Autowired
    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, MailgunService mailgunService) {
        this.appointmentRepository = appointmentRepository;
        this.mailgunService = mailgunService;
    }

    @Override
    public Appointment createAppointment(Appointment appointment) {
        String dentistEmail = "ishak.kazic@gmail.com"; // Replace with the dentist's email
        String subject = "New Appointment Scheduled";
        String message = String.format(
                "Hello Dentist,\n\nA new appointment has been scheduled:\n\n" +
                        "Patient Name: %s\nDate: %s\nTime: %s\n\nThank you!",
                appointment.getPatientName(),
                appointment.getAppointmentDate(),
                appointment.getTime()
        );

        mailgunService.sendEmail(dentistEmail, subject, message);
        return appointmentRepository.save(appointment);

    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Override
    public Optional<Appointment> getAppointmentByEmail(String email){
        return appointmentRepository.findByEmail(email);
    }

    @Override
    public Appointment updateAppointment(Long id, Appointment updatedAppointment) {
        return appointmentRepository.findById(id)
                .map(appointment -> {
                    appointment.setPatientName(updatedAppointment.getPatientName());
                    appointment.setNotes(updatedAppointment.getNotes());
                    return appointmentRepository.save(appointment);
                })
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    @Override
    public void deleteAppointment(Long id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Appointment not found");
        }
    }
}

