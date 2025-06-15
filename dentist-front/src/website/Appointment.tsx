import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Appointments.css";
import AppointmentViewModel from "../Services/AppointmentApi";
import ChartComponent from "./ChartComponent";


interface AppointmentProps {
  viewModel: AppointmentViewModel;
}

const Appointment: React.FC<AppointmentProps> = ({ viewModel }) => {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selecteDateProp, setSelecteDateProp] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<
    { id: number; startTime: string; endTime: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    id: number;
    startTime: string;
    endTime: string;
  } | null>(null);
  const [visibleChart, setVisibleChart] = useState(false)
  const [chartData, setChartData] = useState({})

  const [slotsCache, setSlotsCache] = useState<
    Record<string, { id: number; startTime: string; endTime: string }[]>
  >({});

  const fetchAvailableDates = async () => {
    const slots = await viewModel.getAvailableSlots();
    console.log("SLOTS", slots);
    const dates = Object.keys(slots);

    console.log("DATES", dates);
    setAvailableDates(dates);
    setSlotsCache(slots);
  };

  useEffect(() => {
    fetchAvailableDates();
  }, [viewModel]);

  const handleDateChange: any = (date: Date) => {
    const formattedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    setSelectedDate(formattedDate);
    setSelecteDateProp(formattedDate)


    if (slotsCache[formattedDate]) {
      setAvailableSlots(slotsCache[formattedDate]);
    } else {
      viewModel.getAvailableSlots().then((slots) => {
        setSlotsCache((prevCache) => ({
          ...prevCache,
          ...slots,
        }));
        setAvailableSlots(slots[formattedDate] || []);
      });
    }
  };

  const handleSlotClick = (slot: {
    id: number;
    startTime: string;
    endTime: string;
  }) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const normalizedDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      return availableDates.includes(normalizedDate) ? "available-date" : null;
    }
    return null;
  };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  //   setSelectedSlot(null);
  // };

  // const handleFormSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(`Booking for ${selectedDate} at ${selectedSlot?.startTime}`);
  //   handleModalClose();
  // };

  return (
    <div className="appointment-container" id="appointment">
      <h2 className="text-2xl font-bold text-center my-6">
        Book Your Appointment
      </h2>
      <div className="calendar-section shadow-lg rounded-lg p-4 bg-white">
        <Calendar onChange={handleDateChange} tileClassName={tileClassName} />
      </div>
      {visibleChart != false && <ChartComponent chartDataProp= {chartData} selectedDate = {selecteDateProp}/>}

      <div className="slots-section mt-8">
        {selectedDate ? (
          <>
            <h3 className="text-lg font-semibold mb-4 text-center">
              Available Slots for {selectedDate}:
            </h3>
            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 justify-items-center">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    className="slot-item bg-blue-500 text-white p-3 rounded-md shadow hover:bg-blue-600 focus:ring focus:ring-blue-300"
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No slots available for this date.
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600">
            Please select a date to view available slots.
          </p>
        )}
      </div>

      {/* Modal for booking */}
      {isModalOpen && selectedSlot && (
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Book Appointment</h3>
            <p className="mb-2">
              <strong>Date:</strong> {selectedDate}
            </p>
            <p className="mb-4">
              <strong>Time:</strong> {selectedSlot.startTime} -{" "}
              {selectedSlot.endTime}
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const appointmentData: any = {
                  appointmentDate: selectedDate!,
                  time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
                  patientName: formData.get("patientName") as string,
                  patientSurname: formData.get("patientName") as string,
                  notes: formData.get("notes") as string,
                  email: formData.get("email") as string,
                };

                try {
                  const result = await viewModel.createAppointment(appointmentData);
                  console.log("Appointment created:", result.appointment);
                  console.log("User data:", result.user);
                  setChartData(result.user.historyRecords)
                  
                  setVisibleChart(true)
                  await viewModel.reserveAppointment(selectedSlot.id);
                  alert("Appointment booked successfully!");
                  setIsModalOpen(false);
                  fetchAvailableDates();
                  
                  setSelectedDate(null);
                } catch(error) {
                  alert("Failed to book appointment. Please try again. " + error);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Patient Surname
                </label>
                <input
                  type="text"
                  name="patientSurname"
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="text"
                  name="email"
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <input
                  type="text"
                  name="notes"
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
