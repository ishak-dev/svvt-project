import React, { useState } from "react";

interface User {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  historyRecords: Record[]; // List of records for each user
}

interface Record {
  id: number;
  title: string;
  date: string; // Assuming date is stored as MM/DD/YYYY or similar
  description: string; // Additional details for the record
}

interface UsersHistoryInterface {
  selectedUser: User;
  handleViewRecord: Function;
  handleAddRecord: any;
  setSelectedUser: Function;
}

const UsersHistoryRecord: React.FC<UsersHistoryInterface> = ({
  selectedUser,
  handleAddRecord,
  handleViewRecord,
  setSelectedUser,
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // State for sorting
  const [filterDate, setFilterDate] = useState<string>(""); // State for filtering by date
  const [filterTitle, setFilterTitle] = useState<string>(""); // State for filtering by title
  const [filterDescription, setFilterDescription] = useState<string>(""); // State for filtering by description

  // Helper to format clicked date to dd/MM/yyyy
  const formatToDDMMYYYY = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  // Sort records by date
  const sortedRecords = [...selectedUser.historyRecords].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Filter records by date, title, and description
  const filteredRecords = sortedRecords.filter((record) => {
    const matchesDate = !filterDate || record.date === formatToDDMMYYYY(filterDate);
    const matchesTitle = !filterTitle || record.title.toLowerCase().includes(filterTitle.toLowerCase());
    const matchesDescription = !filterDescription || record.description.toLowerCase().includes(filterDescription.toLowerCase());
    return matchesDate && matchesTitle && matchesDescription;
  });

  return (
    <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">Records for {selectedUser.fullName}</h3>

        {/* Sorting and Filtering Controls */}
        <div className="mb-4 space-y-2">
          <div className="flex justify-between">
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Sort: {sortOrder === "asc" ? "Oldest First" : "Newest First"}
            </button>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1"
              placeholder="Filter by Date"
            />
          </div>
          <input
            type="text"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
            placeholder="Filter by Title"
          />
          <input
            type="text"
            value={filterDescription}
            onChange={(e) => setFilterDescription(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full"
            placeholder="Filter by Description"
          />
        </div>

        {/* Records List */}
        <ul className="space-y-2">
          {filteredRecords.map((record) => (
            <li
              key={record.id}
              className="border border-gray-300 rounded-md p-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleViewRecord(record)}
            >
              <p className="font-bold">{record.title}</p>
              <p className="text-gray-500">{record.date}</p>
              <p className="text-gray-400">{record.description}</p>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddRecord}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add Record
          </button>
          <button
            onClick={() => setSelectedUser(null)}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersHistoryRecord;
