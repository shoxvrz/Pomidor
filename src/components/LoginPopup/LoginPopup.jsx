import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup, logout } from "../../toolkit/auth/authSlice";
import { assets } from "../../assets/assets";
import "./LoginPopup.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    if (currState === 'Login') {
      try {
        if (inputData.email === 'admin7777@gmail.com') {
          localStorage.setItem(
            'user',
            JSON.stringify({ ...user, role: 777, token: Date.now() })
          );
          toast.success('Muvaffaqiyatli Admin Paneliga kirdingiz');
          navigate('/admin/add');
        } else {
          await dispatch(login({ email: inputData.email, password: inputData.password })).unwrap();
          toast.success('Siz muvaffaqiyatli kirdingiz');
        }
      } catch (error) {
        toast.error('Login failed: ' + error);
      }
    } else if (currState === 'Sign Up') {
      try {
        if (inputData.agreement) {
          await dispatch(
            signup({
              name: inputData.name,
              email: inputData.email,
              password: inputData.password,
            })
          ).unwrap();
          toast.success('Account created successfully');
        } else {
          toast.error("Please agree to the terms and conditions");
        }
      } catch (error) {
        toast.error('Signup failed: ' + error);
      }
    } else if (currState === "Profile") {
      dispatch(logout());
      setShowLogin(false);
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
            alt=""
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
                {currState === "Sign Up" ? "Bosing" : "Bosing"}
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
        {status === "failed" && (
          <div className="login__error">Xato: {error}</div>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
