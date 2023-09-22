import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";


import LoginPage from "./pages/LoginPage";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";

import AdminLayout from "./components/layout/AdminLayout";
import GlobalPage from "./pages/GlobalPage";
import StudentsPage from "./pages/StudentsPage";

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<AdminLayout />}>
          <Route path="global" element={<GlobalPage />} />
          <Route path="teacher" element={<TeacherPage />} />
          <Route path="student" element={<StudentPage />} />
          <Route path="students/:id" element={<StudentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
