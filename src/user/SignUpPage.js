import React, { useState } from "react";
import "./sign.css";
import { Container } from "react-bootstrap";
import logo from "../images/logoNavbar 1.png";
import { CiLocationOn } from "react-icons/ci";
import { GoProjectSymlink } from "react-icons/go";
import { FaHouseUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { GiStarMedal } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sign = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "owner",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // تحقق من اسم المستخدم
    if (formData.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters.";
    }

    // يتاكد من صياغه الايميل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    // يتاكد اذا كان الرقم مصري او لا
    const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/; // تنسيق رقم هاتف مصري
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number.";
    }

    // تحقق من كلمة المرور
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // تحقق من  كلمتي المرور
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // حاله الارسال لو كان كل حاجه تمم هيبعت الطلب للسيرفر ويسجل
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          PhoneNumber: formData.phoneNumber,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      // console.log("Registration successful:", data);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You have been registered successfully.",
      });

      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "An error occurred during registration. Please try again.",
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

  // حالتين عشان تشوف كلمه السر او تخفيها
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signUp flex justify-center items-center p-10 max-md:p-0">
      <Container className="container bg-[#FDFCFC]">
        <div className="leftSide">
          <div className="flex justify-center items-center">
            <img loading="lazy" src={logo} className="my-3" alt="Logo" />
          </div>
          <h4>Why should I Join Student Hostel?</h4>
          <p>
            To have the experience of “property”, “information” and “trust” in
            the real estate world all together…
          </p>
          {/* هنا جزء الايكونات  */}
          <div className="flex justify-center flex-row flex-wrap w-[100%]">
            <div className="flex justify-center items-center flex-col w-1/2 mt-5">
              <div className="flex justify-center items-center rounded-full w-[60px] h-[60px] p-2 bg-yellow-400">
                <CiLocationOn className="text-3xl font-semibold text-white" />
              </div>
              <h6>Learn about location.</h6>
            </div>

            <div className="flex justify-center items-center flex-col w-1/2 mt-5">
              <div className="flex justify-center items-center rounded-full w-[60px] h-[60px] p-2 bg-red-400">
                <FaHouseUser className="text-3xl font-semibold text-white" />
              </div>
              <h6>Find out the value of your house free of charge.</h6>
            </div>

            <div className="flex justify-center items-center flex-col w-1/2 mt-5">
              <div className="flex justify-center items-center rounded-full w-[60px] h-[60px] p-2 bg-red-400">
                <GiStarMedal className="text-3xl font-semibold text-white" />
              </div>
              <h6>Discover houses that will improve your life quality.</h6>
            </div>
            <div className="flex justify-center items-center flex-col w-1/2 mt-5">
              <div className="flex justify-center items-center rounded-full w-[60px] h-[60px] p-2 bg-yellow-400">
                <GoProjectSymlink className="text-3xl font-semibold text-white" />
              </div>
              <h6>Be aware of new projects.</h6>
            </div>
          </div>
        </div>
        <div className="w-[1px] h-[100vh] bg-black z-10 max-md:hidden max-xl:hidden"></div>
        {/* here sec of the signup form */}
        <div className="rightSide">
          <form className="signUpForm" onSubmit={handleSubmit}>
            <div className="hr">
              <hr /> Sign Now <hr />
            </div>
            {/* username */}
            <div>
              <input
                className="name"
                type="text"
                name="username"
                placeholder="Username.."
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            {/* email */}
            <div>
              <input
                className="email"
                type="email"
                name="email"
                id="email"
                placeholder="E-mail.."
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            {/* Phone Number */}
            <div>
              <input
                className="email"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number.."
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="error">{errors.phoneNumber}</p>
              )}
            </div>
            {/* password */}
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="password"
                name="password"
                placeholder="Password.."
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
            {/* password Again*/}
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="password"
                name="confirmPassword"
                placeholder="Password (Confirm).."
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
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
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="agree">
              <label htmlFor="agree">
                <span>Choose Your Role</span>
              </label>
              <select
                className="password"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="owner">Owner</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div>
              <button
                className="SIgnUPBtn"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "SIGN UP"}
              </button>
            </div>
            <p>
              Already a member? <Link to="/login">Login now!</Link>
            </p>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Sign;
