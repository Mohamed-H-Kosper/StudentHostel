import React, { useState } from "react";
import "./logIn.css";
import { Container } from "react-bootstrap";
import logo from "../images/logoNavbar 1.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useAuth } from "../AuthCheck";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { fetchUserData } = useAuth();

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // تحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    // تحقق من كلمة المرور
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please check your inputs and try again.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        if (fetchUserData) {
          await fetchUserData();
        }

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You have been logged in successfully.",
        });

        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="logInPage">
      <Container className="flex justify-center items-center">
        <form
          className="loginForm shadow-xl min-h-[80vh]"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex justify-center items-center">
            <img loading="lazy" src={logo} alt="Logo" />
          </div>
          {/* email  */}
          <div>
            <input
              className="email"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          {/* password */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              className="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "11%",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div>
            <button className="loginBtn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "LOGIN"}
            </button>
          </div>
          <div className="hr">
            <hr /> or <hr />
          </div>
          <div>
            <span>Still not a member?</span>{" "}
            <Link to="/signUp">Sign Up Now ?</Link>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;
