import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-lg font-bold">Admin Panel</div>
        <nav className="mt-6">
          <ul>
            <li className="p-2 hover:bg-gray-700">
              <Link to="/admin/appointments">Appointments</Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
              <Link to="/admin/users">Users</Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
              <Link to="/admin/add-free-slot">Add Slot</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
