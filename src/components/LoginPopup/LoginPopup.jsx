import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup, logout } from "../../toolkit/auth/authSlice";
import { assets } from "../../assets/assets";
import "./LoginPopup.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import authService from "../../service/Auth";
import { useGetAllDataQuery } from "../../toolkit/auth/usersApi";

const LoginPopup = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [currState, setCurrState] = useState(user ? "Profile" : "Sign Up");
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    agreement: false,
  });
  const { data: usersData } = useGetAllDataQuery(); 
  const navigate = useNavigate();
  const regexName = /^[A-za-z]{1,14}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (user) {
      setCurrState("Profile");
    } else {
      setCurrState("Sign Up");
    }
  }, [user]);

  const handleChange = () => {
    setCurrState(currState === "Login" ? "Sign Up" : "Login");
  };

  const inputHandler = (e) => {
    const { name, type, value, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setInputData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    if (currState === 'Sign Up' && !regexName.test(inputData.name)) {
      toast.error("Ism 1-14 ta harfdan iborat bo'lishi kerak.");
      return;
    }
  
    if (!emailRegex.test(inputData.email)) {
      toast.error("Yaroqli elektron pochta manzili kiriting.");
      return;
    }
  
    if (!passwordRegex.test(inputData.password)) {
      toast.error("Parol kamida 8 ta belgidan iborat bo'lishi, katta harf, raqam va maxsus belgi o'z ichiga olishi kerak.");
      return;
    }
  
    try {
      if (currState === 'Login') {
        const credentials = {
          email: inputData.email,
          password: inputData.password,
        };
  
        if (credentials.email === 'admin7777@gmail.com' && credentials.password === '7777Admin@') {
          localStorage.setItem(
            'user',
            JSON.stringify({ role: 777, token: Date.now() })
          );
          toast.success('Muvaffaqiyatli Admin Paneliga kirdingiz');
          navigate('/admin/add');
        } else {
          await dispatch(login(credentials)).unwrap();
          toast.success('Siz muvaffaqiyatli kirdingiz');
        }
      } else if (currState === 'Sign Up') {
        if (inputData.agreement) {
          const existingUser = usersData.find(user => user.email === inputData.email);
  
          if (existingUser) {
            toast.error('Foydalanuvchi mavjud');
            return;
          }
  
          const userData = {
            name: inputData.name,
            email: inputData.email,
            password: inputData.password,
          };
  
          await dispatch(signup(userData)).unwrap();
          toast.success('Hisob muvaffaqiyatli yaratildi');
        } else {
          toast.error("Iltimos foydalanish va maxfiylik siyosatiga rozilik bering");
        }
      } else if (currState === "Profile") {
        dispatch(logout());
        setShowLogin(false);
      }
    } catch (error) {
      toast.error("Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring");
    }
  };
  

  return (
    <div className="login">
      <form className="login__container" onSubmit={handleSubmit}>
        <div className="login__title">
          <h2>{currState === "Profile" ? "Profile" : currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        {currState !== "Profile" ? (
          <>
            <div className="login__inputs">
              {currState === "Sign Up" && (
                <input
                  onChange={inputHandler}
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={inputData.name}
                  required
                />
              )}
              <input
                name="email"
                onChange={inputHandler}
                type="email"
                placeholder="Your Email"
                value={inputData.email}
                required
              />
              <input
                name="password"
                onChange={inputHandler}
                type="password"
                placeholder="Password"
                value={inputData.password}
                required
              />
            </div>
            {currState === "Sign Up" && (
              <div className="login__condition">
                <input
                  name="agreement"
                  onChange={inputHandler}
                  type="checkbox"
                  checked={inputData.agreement}
                  required
                />
                <p>
                  Davom etish orqali men foydalanish shartlari va maxfiylik
                  siyosatiga rozilik bildiraman.
                </p>
              </div>
            )}
            <button type="submit">
              {currState === "Sign Up" ? "Yangi hisob ochish" : "Kirish"}
            </button>
            <p>
              {currState === "Sign Up"
                ? "Hisobingiz bormi?"
                : "Yangi hisob yaratilsinmi?"}
              <span style={{ cursor: "pointer" }} onClick={handleChange}>
                {currState === "Sign Up" ? "Kirish" : "Yangi hisob ochish"}
              </span>
            </p>
          </>
        ) : (
          <div className="login__profile">
            <div className="login__profile--pic">
              <AccountCircleIcon
                sx={{
                  fontSize: "120px",
                  color: "tomato",
                }}
              />
              <h1>Profil</h1>
            </div>
            <div className="login__profile--info">
              <div>
                <PersonIcon
                  sx={{
                    fontSize: "35px",
                    color: "tomato",
                  }}
                />
                <p>{user?.name}</p>
              </div>
              <div>
                <AlternateEmailIcon
                  sx={{
                    fontSize: "35px",
                    color: "tomato",
                  }}
                />
                <p>{user?.email}</p>
              </div>
            </div>
            <button type="button" onClick={() => dispatch(logout())}>
              Chiqish
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
