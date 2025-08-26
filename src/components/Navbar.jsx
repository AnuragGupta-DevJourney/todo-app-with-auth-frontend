import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const handleLogoutApp = () => {
    const token = sessionStorage.clear("token");
    toast.success("logout successfully", { duration: 800 });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <header className="bg-[#110D0C] text-blue-600 content-full py-4">
      <nav className="flex justify-between content-wrapper items-center">
        <div>
          <h1 className="text-3xl font-bold text-white max-sm:text-2xl">
            &lt;Todo<span className="text-blue-600">App</span> /&gt;
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            to={"/create"}
            className="flex gap-1.5 items-center justify-center bg-blue-700 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer max-sm:text-sm max-sm:gap-1 "
          >
            <FaPlus className="max-sm:text-sm" fontSize={16} />
            New Note
          </Link>

          <button
            onClick={handleLogoutApp}
            title="logout"
            className="text-3xl p-2 rounded-md  text-white bg-red-600 cursor-pointer"
          >
            <i>
              <MdLogout />
            </i>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
