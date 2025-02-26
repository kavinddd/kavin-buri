import "./App.css";
import { Route, Routes } from "react-router";
import DashboardPage from "./features/dashboard/DashboardPage";
import LoginPage from "./features/login/LoginPage";
import MainLayout from "./components/layouts/MainLayout";
import WithUser from "./components/layouts/WithUser";
import UserProvider from "./features/user/UserProvider";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <WithUser>
              <MainLayout />
            </WithUser>
          }
        >
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>

      <Toaster />
    </UserProvider>
  );
}

export default App;
