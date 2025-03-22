import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import DashboardPage from "./features/dashboard/DashboardPage";
import LoginPage from "./features/login/LoginPage";
import MainLayout from "./components/layouts/MainLayout";
import WithUser from "./components/layouts/WithUser";
import UserProvider from "./features/user/UserProvider";
import { Toaster } from "./components/ui/sonner";
import BookingPage from "./features/booking/BookingPage";
import NotFoundPage from "./components/errors/NotFoundPage";
import RoomPage from "./features/rooms/RoomPage";
import BookingForm from "./features/booking/BookingForm";
import BookingCreatePage from "./features/booking/BookingCreatePage";
import BookingShowPage from "./features/booking/BookingShowPage";
import BookingEditPage from "./features/booking/BookingEditPage";
import RoomShowPage from "./features/rooms/RoomShowPage";
import RoomEditPage from "./features/rooms/RoomEditPage";

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
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="booking">
            <Route index element={<BookingPage />} />
            <Route path="show/:id" element={<BookingShowPage />} />
            <Route path="create" element={<BookingCreatePage />} />
            <Route path="edit/:id" element={<BookingEditPage />} />
          </Route>
          <Route path="room">
            <Route index element={<RoomPage />} />
            <Route path="show/:id" element={<RoomShowPage />} />
            <Route path="edit/:id" element={<RoomEditPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster expand richColors={true} theme="light" />
    </UserProvider>
  );
}

export default App;
