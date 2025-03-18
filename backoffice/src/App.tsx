import "./App.css";
import { Route, Routes } from "react-router";
import DashboardPage from "./features/dashboard/DashboardPage";
import LoginPage from "./features/login/LoginPage";
import MainLayout from "./components/layouts/MainLayout";
import WithUser from "./components/layouts/WithUser";
import UserProvider from "./features/user/UserProvider";
import { Toaster } from "./components/ui/sonner";
import BookingPage from "./features/booking/BookingPage";
import NotFoundPage from "./components/errors/NotFoundPage";
import RoomPage from "./features/rooms/RoomPage";

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
          <Route path="booking" element={<BookingPage />} />
          <Route path="room" element={<RoomPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster expand richColors={true} theme="light" />
    </UserProvider>
  );
}

export default App;
