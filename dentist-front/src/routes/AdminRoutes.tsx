import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../admin/Login";
import AdminLayout from "../admin/AdminLayout";
import AppointmentsView from "../admin/AppointmentsView";
import UsersView from "../admin/UsersView";
import FreeSlotViewModel from "../Services/AddFreeSlotApi";
import AddFreeSlot from "../admin/AddFreeSlots";
import AppointmentViewModel from "../Services/AppointmentApi";

const AdminRoutes = () => {
  const AddFreeSlotViewModel = new FreeSlotViewModel();
  const appointmentViewModel = new AppointmentViewModel();
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/"
        element={true ? <AdminLayout /> : <Navigate to="/login" />}
      >
        <Route
          path="appointments"
          element={<AppointmentsView viewModel={appointmentViewModel} />}
        />
        <Route path="users" element={<UsersView />} />
        <Route
          path="add-free-slot"
          element={<AddFreeSlot viewModel={AddFreeSlotViewModel} />}
        />
      </Route>

      {/* Default Route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AdminRoutes;
