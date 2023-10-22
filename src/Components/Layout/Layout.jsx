import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../Context/UserContext/UserContext";
import { Offline } from "react-detect-offline";

export default function Layout() {
  let { setUserToken } = useContext(UserContext);

  if (localStorage.getItem("userToken") !== null) {
    setUserToken(localStorage.getItem("userToken"));
  }
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      <div>
        <Offline>
          <div className="network">
            <i className="fa-solid fa-wifi me-2"></i>
            You are Offline
          </div>
        </Offline>
      </div>
      <Footer />
    </>
  );
}
