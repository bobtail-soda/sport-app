import { useEffect, useState } from "react";
import validator from "validator";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";
import isAlpha from "validator/lib/isAlpha";
import equals from "validator/lib/equals";
import isStrongPassword from "validator/lib/isStrongPassword";
import isNumeric from "validator/lib/isNumeric";
import toDate from "validator/lib/toDate";
import toInt from "validator/lib/toInt";
import axios, { isCancel, AxiosError } from "axios";
import { Link } from "react-router-dom";
import Navmenu from "../../components/shared/Navmenu";
import Copyright from "../../components/shared/Copyright";
import Navbar from "../../components/shared/Navbar";
import API from "../../api/axios";
import UploadImage from "../../components/UploadImage/UploadImage";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteButtonNested = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handleSubmitDelete = async (e) => {
    e.preventDefault();

    const deleteUserRoute = `/api/users/${userId}`;
    try {
      const response = await API.delete(deleteUserRoute, {
        headers: headers,
      });
      // ตรวจสอบ response จาก backend
      if (response.status === 200) {
        alert("Deleted ");
        // ทำอย่างอื่นต่อ เช่น redirect หน้า, แสดงข้อความ, ฯลฯ
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error("Error sending delete request", error);
      alert("An error occurred while sending data to the backend.");
    }
    navigate("/login");
  };
  return (
    <button
      onClick={handleSubmitDelete}
      className="rounded-4xl text-white bg-red text-sm w-full px-5 py-2.5 text-center"
    >
      Delete for sure
    </button>
  );
};
const DeleteButton = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <div className="flex justify-center">
      <button
        onClick={handleOpen}
        className="rounded-4xl text-white bg-red text-sm w-full px-5 py-2.5 text-center"
      >
        Delete Account
      </button>
      <Modal
        className="self-center"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="rounded-4xl text-black bg-red text-sm w-full px-5 py-2.5 text-center"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You are going to delete accout
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure about this ?
          </Typography>

          <DeleteButtonNested />
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteButton;
