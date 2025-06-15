import React, { useState } from "react";
import FreeSlotViewModel from "../Services/AddFreeSlotApi";

interface AddFreeSlotsProps {
  viewModel: FreeSlotViewModel;
}

const AddFreeSlot: React.FC<AddFreeSlotsProps> = ({ viewModel }) => {
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddSlot = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await viewModel.addFreeSlot(date, startTime, endTime);
      setSuccessMessage("Free slot added successfully!");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <div className="add-free-slot-container">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Free Slot</h2>
      <form onSubmit={handleAddSlot} className="space-y-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="start-time">
            Start Time
          </label>
          <input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="end-time">
            End Time
          </label>
          <input
            id="end-time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Slot
        </button>
      </form>
      {successMessage && (
        <p className="mt-4 text-green-600">{successMessage}</p>
      )}
      {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default AddFreeSlot;
