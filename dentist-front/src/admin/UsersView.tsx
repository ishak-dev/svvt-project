import React, { useState, useEffect } from "react";
import { UsersApi } from "../Services/UsersApi";
import { UsersRecordApi } from "../Services/UsersRecordsApi";
import UsersHistoryRecord from "./UsersHistoryRecord";

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
  date: string;
  description: string; // Additional details for the record
}

const UsersView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State for the selected user
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null); // State for the selected record
  const [isAddingRecord, setIsAddingRecord] = useState(false); // State for adding a record
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({ fullName: "", email: "", phoneNumber: "" });
  const [isLoading, setIsLoading] = useState(false);

  const [newRecord, setNewRecord] = useState<Pick<Record,  "title" | "date" | "description">>({
    title: "",
    date: "",
    description: "",
  }); // State for the new record form

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await UsersApi.fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);
    

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setSelectedRecord(null);
    setIsAddingRecord(false);
  };

  const handleViewRecord = (record: Record) => {
    setSelectedRecord(record);
    setIsAddingRecord(false);
  };

  const handleAddRecord = () => {
    setIsAddingRecord(true);
    setSelectedRecord(null);
  };

  const handleSaveRecord = async () => {
    if (selectedUser && newRecord.title && newRecord.date && newRecord.description) {
      try {
        setIsLoading(true);
        
        // Call API to add record for the user
        console.log("ID OF USER", selectedUser )
        const addedRecord = await UsersRecordApi.addUserRecord(selectedUser.id, newRecord);
        
        // Update local state with the new record
        const updatedUsers = users.map((user) => {
          if (user.id === selectedUser.id) {
            const formattedDate = new Date(addedRecord.date).toLocaleDateString('en-GB'); // This will give you dd/mm/yyyy format

            return {
              ...user,
              historyRecords: [...user.historyRecords,{
                ...addedRecord,
                date: formattedDate, // Update date to the formatted one
              },],
            };
          }
          return user;
        });
  
        setUsers(updatedUsers);
        setSelectedUser(updatedUsers.find((user) => user.id === selectedUser.id) || null);
        
        // Reset the form
        setNewRecord({ title: "", date: "", description: "" });
        setIsAddingRecord(false);
      } catch (error) {
        console.error("Failed to save record:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("All fields are required!");
    }
  };
  
  const handleAddUser = async () => {
    if (newUser.fullName && newUser.email && newUser.phoneNumber) {
      try {
        setIsLoading(true);
        const addedUser = await UsersApi.addUser(newUser);
        setUsers((prev) => [...prev, addedUser]);
        setNewUser({ fullName: "", email: "", phoneNumber: "" });
        setIsAddingUser(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    console.log(isLoading)
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full mr-4"
        />
        <button
          onClick={() => setIsAddingUser(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add User
        </button>
      </div>

      {isAddingUser && (
        <div className="p-4 bg-gray-100 rounded-md mb-4">
          <h3 className="text-lg font-bold mb-2">Add New User</h3>
          <input
            type="text"
            placeholder="Name"
            value={newUser.fullName}
            onChange={(e) => setNewUser((prev) => ({ ...prev, fullName: e.target.value }))}
            className="p-2 border border-gray-300 rounded-md mb-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
            className="p-2 border border-gray-300 rounded-md mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newUser.phoneNumber}
            onChange={(e) => setNewUser((prev) => ({ ...prev, phoneNumber: e.target.value }))}
            className="p-2 border border-gray-300 rounded-md mb-2 w-full"
          />
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
          >
            Save User
          </button>
          <button
            onClick={() => setIsAddingUser(false)}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
        </div>
      )}

      {/* User Table */}
      
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-left">Phone</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{user.fullName}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.phoneNumber}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleViewUser(user)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  View Records
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredUsers.length === 0 && (
        <p className="text-gray-500 mt-4">No users found.</p>
      )}

      {/* User Records View */}
      {selectedUser && !selectedRecord && !isAddingRecord && (
        <UsersHistoryRecord selectedUser={selectedUser} handleViewRecord={handleViewRecord} handleAddRecord={handleAddRecord} setSelectedUser={setSelectedUser} />
      )}

      {/* Add Record Form */}
      {isAddingRecord && (
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add Record for {selectedUser?.fullName}</h3>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1">Title</label>
              <input
                type="text"
                value={newRecord.title}
                onChange={(e) =>
                  setNewRecord((prev) => ({ ...prev, title: e.target.value }))
                }
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1">Date</label>
              <input
                type="date"
                value={newRecord.date}
                onChange={(e) =>
                  setNewRecord((prev) => ({ ...prev, date: e.target.value }))
                }
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1">Details</label>
              <textarea
                value={newRecord.description}
                onChange={(e) =>
                  setNewRecord((prev) => ({ ...prev, description: e.target.value }))
                }
                className="p-2 border border-gray-300 rounded-md w-full"
              ></textarea>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsAddingRecord(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRecord}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Detail View */}
      {selectedRecord && (
        <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">{selectedRecord.title}</h3>
            <p><strong>Date:</strong> {selectedRecord.date}</p>
            <p><strong>Details:</strong> {selectedRecord.description}</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Back to Records
              </button>
              <button
                onClick={() => {
                  setSelectedRecord(null);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersView;
