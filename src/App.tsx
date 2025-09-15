import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from './screen/main/home';
import Login from './screen/auth/LoginPage/login';
import RegisterUser from './screen/auth/RegisterPage/registerUser';
import ForgotPassword from './screen/auth/ForgotPasswordPage/forgotPassword';
import UploadPage from './screen/others/uploadPage';
import WatchVideoPage from './screen/others/watchVideoPage';
import Profile from './screen/main/Profile/profile';

function App() {
  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/videos/:id' element={<WatchVideoPage />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;