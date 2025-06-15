import React, { useEffect, useState } from "react";
import AppointmentViewModel from "../Services/AppointmentApi";
import { Appointment } from "../models/AppointmentModel";

interface AppointmentProps {
  viewModel: AppointmentViewModel;
}

const Appointments: React.FC<AppointmentProps> = ({ viewModel }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await viewModel.fetchAppointments();
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch appointments.");
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <table className="w-full bg-white rounded-md shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Patient Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td className="p-3">{appointment.appointmentDate}</td>
              <td className="p-3">{appointment.time}</td>
              <td className="p-3">
                {appointment.patientName} {appointment.patientSurname}
              </td>
              <td className="p-3">{appointment.email}</td>
              <td className="p-3">{appointment.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
