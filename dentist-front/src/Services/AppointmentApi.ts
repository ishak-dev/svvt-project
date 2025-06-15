import axios from "axios";
import { UsersApi } from "./UsersApi";

const API_URL = "http://localhost:8080/api/appointments";
const API_URL_FREE_SLOTS =
  "http://localhost:8080/api/availability/free-slots";
const API_AVAILABILITY = "http://localhost:8080/api/availability";

interface Slot {
  id: number;
  startTime: string;
  endTime: string;
}

interface ProcessedSlots {
  [date: string]: Slot[];
}

class AppointmentViewModel {
  async fetchAppointments() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  }

  async getAvailableSlots(): Promise<ProcessedSlots> {
    try {
      const response = await axios.get(API_URL_FREE_SLOTS);
      const slots = response.data;
      console.log("response", slots);
      const processedSlots: ProcessedSlots = slots.reduce(
        (acc: ProcessedSlots, slot: any) => {
          if (slot.available) {
            const { date, startTime, endTime, id } = slot;

            if (!acc[date]) {
              acc[date] = [];
            }

            acc[date].push({ id: id, startTime, endTime });
          }
          return acc;
        },
        {}
      );

      return processedSlots;
    } catch (error) {
      console.error("Failed to fetch available slots:", error);
      return {};
    }
  }

  async createAppointment(appointment: {
    date: string;
    time: string;
    patientName: string;
    email: string;
    patientSurname: string;
  }) {
    try {
      const appointmentResponse = await axios.post(API_URL, appointment);
      const userData = await UsersApi.fetchUsersByEmail(appointment.email);

      // Combine and return both responses
      return {
        appointment: appointmentResponse.data,
        user: userData,
      };
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error;
    }
  }

  async deleteAppointment(id: number) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      throw error;
    }
  }

  async reserveAppointment(id: number): Promise<void> {
    try {
      await axios.patch(`${API_AVAILABILITY}/${id}?isAvailable=false`);
    } catch (error) {
      console.error("Failed to reserve appointment:", error);
      throw error;
    }
  }
}

export default AppointmentViewModel;
