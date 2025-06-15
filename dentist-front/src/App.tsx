import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import WebRoutes from "./routes/WebRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/*" element={<WebRoutes />} />

        {/* Admin Panel Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
