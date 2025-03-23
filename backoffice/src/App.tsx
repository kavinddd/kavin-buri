import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import DashboardPage from "./features/dashboard/DashboardPage";
import LoginPage from "./features/login/LoginPage";
import MainLayout from "./components/layouts/MainLayout";
import WithUser from "./components/layouts/WithUser";
import { Toaster } from "./components/ui/sonner";
import BookingPage from "./features/booking/BookingPage";
import NotFoundPage from "./components/errors/NotFoundPage";
import RoomPage from "./features/rooms/RoomPage";
import BookingCreatePage from "./features/booking/BookingCreatePage";
import BookingShowPage from "./features/booking/BookingShowPage";
import BookingEditPage from "./features/booking/BookingEditPage";
import RoomShowPage from "./features/rooms/RoomShowPage";
import RoomEditPage from "./features/rooms/RoomEditPage";
import RoleGroupPage from "./features/roleGroups/RoleGroupPage";
import UserPage from "./features/users/UserPage";
import UserShowPage from "./features/users/UserShowPage";
import RoleGroupShowPage from "./features/roleGroups/RoleGroupShowPage";
import RoleGroupCreatePage from "./features/roleGroups/RoleGroupCreatePage";
import RoleGroupEditPage from "./features/roleGroups/RoleGroupEditPage";
import UserCreatePage from "./features/users/UserCreatePage";
import UserEditPage from "./features/users/UserEditPage";
import UserProvider from "./features/users/UserProvider";

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
          <Route path="user">
            <Route index element={<UserPage />} />
            <Route path="show/:id" element={<UserShowPage />} />
            <Route path="create" element={<UserCreatePage />} />
            <Route path="edit/:id" element={<UserEditPage />} />
          </Route>
          <Route path="roleGroup">
            <Route index element={<RoleGroupPage />} />
            <Route path="show/:id" element={<RoleGroupShowPage />} />
            <Route path="create" element={<RoleGroupCreatePage />} />
            <Route path="edit/:id" element={<RoleGroupEditPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster expand richColors={true} theme="light" />
    </UserProvider>
  );
}

export default App;
