import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({header}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuOpen && !event.target.closest(".sidebar")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  // Close sidebar on ESC key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-[#003554] to-[#051923] text-gray-200 transition-transform transform ${
          menuOpen ? "translate-x-0" : "-translate-x-64"
        } p-5 z-50 shadow-lg sidebar`}
        onClick={(e) => e.stopPropagation()} // Prevent click outside from closing it immediately
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 hover:scale-110 transition"
        >
          <X className="text-primary w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold text-primary mb-5">Menu</h2>
        <ul className="space-y-4">
        <li
            className="hover:text-primary cursor-pointer transition"
            onClick={() => {
              navigate("/student-dashboard");
              setMenuOpen(false);
            }}
          >
            Home
          </li>
          <li
            className="hover:text-primary cursor-pointer transition"
            onClick={() => {
              navigate("/applied-jobs");
              setMenuOpen(false);
            }}
          >
            Applied Jobs
          </li>
          <li
            className="hover:text-primary cursor-pointer transition"
            onClick={() => {
              navigate("/missed-jobs");
              setMenuOpen(false);
            }}
          >
            Missed Jobs
          </li>
          <li
            className="hover:text-primary cursor-pointer transition"
            onClick={() => {
              navigate("/profile");
              setMenuOpen(false);
            }}
          >
            Profile
          </li>
          <li className="hover:text-primary cursor-pointer transition">Settings</li>
        </ul>
      </div>

      {/* Navbar */}
      <nav className="p-4 bg-deepBlue flex items-center shadow-md relative">
  {/* Menu Button (Left Aligned) */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      setMenuOpen(true);
    }}
    className="p-2 hover:scale-110 transition absolute left-4"
  >
    <Menu className="text-primary w-6 h-6" />
  </button>

  {/* Centered Title */}
  <h1 className="text-lg font-semibold text-white mx-auto">{header}</h1>
</nav>

    </>
  );
};

export default Navbar;
