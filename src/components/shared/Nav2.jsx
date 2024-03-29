import React from "react";
import { Typography } from "@mui/material";

function Nav2() {
  return (
    <div className="navbar px-20" style={{ backgroundColor: "#E76F6D" }}>
      <div className="flex-1">
        <img
          style={{ width: "100px", height: "auto", maxWidth: "100%" }}
          alt="logo Navbar component"
          src="public\images\logoRemoveBg.png"
        />
      </div>
      <div className="flex-none gap-2">
        <div className="flex-none font-semibold text-white">
          <ul className="menu menu-horizontal px-2 text-base">
            <li>
              <a href="/dashboard">Home</a>
            </li>
            <li>
              <a href="/activity-type">Classes</a>
            </li>
            <li>
              <a href="/history">History</a>
            </li>
            <li>
              <a href="/edit-profile">Edit Profile</a>
            </li>
          </ul>
        </div>
        <div className="form-control h-10">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto rounded-full"
          />
        </div>
        <div className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="public/images/avatar.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav2;
