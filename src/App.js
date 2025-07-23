import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./footer/footer";
import Header from "./header/Header";
import Home from "./homePage/Home";
import Login from "./user/logInPage";
import Sign from "./user/SignUpPage";
import Advertise from "./advirtise/Advertise";
import ContactPage from "./Contact/ContactPage";
import Apartments from "./shopPage/Apartments";
import InformationApartment from "./InformationApartments/InformationApartments";
import AdminDashboard from "./Dashboard/AdminDashboard/Admin";
import OwnerDashboard from "./Dashboard/OwnerDashboard/Owner";
import StudentDashboard from "./Dashboard/StudentDashboard/Student";
import AboutUs from "./AboutUs/AboutUs";
import { AuthProvider } from "./AuthCheck";
import Aos from "aos";
import "aos/dist/aos.css";
Aos.init({ duration: 3000 });
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <div className="px-4 max-md:px-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<Sign />} />
            <Route path="/advirtise" element={<Advertise />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/details/:apartment_Id/owner/:owner_Id"
              element={<InformationApartment />}
            />
            <Route path="/OwnerDashboard" element={<OwnerDashboard />} />
            <Route path="/shop" element={<Apartments />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/StudentDashboard" element={<StudentDashboard />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
