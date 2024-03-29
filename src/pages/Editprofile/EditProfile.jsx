import { useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";
import isAlpha from "validator/lib/isAlpha";
import equals from "validator/lib/equals";
import isStrongPassword from "validator/lib/isStrongPassword";
import isNumeric from "validator/lib/isNumeric";
import toDate from "validator/lib/toDate";
import toInt from "validator/lib/toInt";
import { Link } from "react-router-dom";
import Navmenu from "../../components/shared/Navmenu";
import Navbar from "../../components/shared/Navbar";
import API from "../../api/axios";
import UploadImage from "../../components/UploadImage/UploadImage";
import DeleteButton from "./DeleteButton";
import ChangePassword from "./ChangePassword";

const EditProfile = () => {
  // token
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [field, setField] = useState([]);
  const initialFormData = {
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    date_of_birth: "",
    height: "",
    weight: "",
    gender: "",
    phone: "",
  };
  //useEffect
  useEffect(() => {
    const getData = async () => {
      const response = await API.get(`api/users/${userId}`, {
        headers: headers,
      });
      console.log(response.data.data);
      setField(response.data.data);
    };

    getData();
  }, []);

  useEffect(() => {
    setFormData(field);
  }, [field]);

  console.log("This is field: ", field);

  const [formData, setFormData] = useState(initialFormData);
  console.log("this is form", formData);
  const [image, setImage] = useState("");

  //Set Email input
  const [emailMsg, setEmailMsg] = useState("");
  const [emailMsgColor, setEmailMsgColor] = useState("");
  const [emailColorField, setEmailColorField] = useState("border-gray-800");

  //Set Password input
  const [passMsg, setPassMsg] = useState("");
  const [passColorMsg, setPassColorMsg] = useState("");
  const [passColorfield, setPassColorfield] = useState("border-gray-800");

  //Set ConfirmPassword input
  const [confirmPassMsg, setConfirmPassMsg] = useState("");
  const [confirmPassColorMsg, setConfirmPassColorMsg] = useState("");
  const [confirmPassColorfield, setConfirmPassColorfield] =
    useState("border-gray-800");

  //Set FirstName input
  const [fnameMsg, setFnameMsg] = useState("");
  const [fnamePassColorMsg, setFnameColorMsg] = useState("");
  const [fnameColorfield, setFnameColorfield] = useState("border-gray-800");

  //Set PhoneNumber input
  const [phoneMsg, setPhoneMsg] = useState("");
  const [phoneColorMsg, setPhoneColorMsg] = useState("");
  const [phoneColorfield, setPhoneColorfield] = useState("border-gray-800");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    //Check Email
    if (id === "email") {
      const isEmptyEmail = isEmpty(value);
      const isEmailCorrect = isEmail(value);

      if (isEmailCorrect) {
        setEmailMsg("Email is Valid");
        setEmailMsgColor("text-[#8BCA00]");
        setEmailColorField("border-[#8BCA00]");
      } else if (!isEmailCorrect) {
        setEmailMsg("Email is Invalid");
        setEmailMsgColor("text-red-500");
        setEmailColorField("border-red-500");
      }
      if (isEmptyEmail) {
        setEmailMsg("");
        setEmailMsgColor("");
        setEmailColorField("border-gray-800");
      }
    }

    //Check password

    //Check Confirm password
    if (id === "confirmpassword") {
      const isEmptyPass = isEmpty(value);
      const isPasswordMatch = equals(value, formData.password);

      if (isPasswordMatch) {
        setConfirmPassMsg("Your confirm password match");
        setConfirmPassColorMsg("text-[#8BCA00]");
        setConfirmPassColorfield("border-[#8BCA00]");
      } else if (!isPasswordMatch) {
        setConfirmPassMsg("Your confirm password don't match");
        setConfirmPassColorMsg("text-red-500");
        setConfirmPassColorfield("border-red-500");
      }
      if (isEmptyPass) {
        setConfirmPassMsg("");
        setConfirmPassColorMsg("");
        setConfirmPassColorfield("border-gray-800");
      }
    }

    //Check FirstName
    if (id === "firstName") {
      const isAlphabet = isAlpha(value);
      const isEmptyFirstName = isEmpty(value);
      const isFnameLength = isLength(value, { min: 2 });

      if (isAlphabet && isFnameLength) {
        setFnameMsg("Your name is valid");
        setFnameColorMsg("text-[#8BCA00]");
        setFnameColorfield("border-[#8BCA00]");
      } else if (!isAlphabet) {
        setFnameMsg("Your name is Invalid");
        setFnameColorMsg("text-red-500");
        setFnameColorfield("border-red-500");
      }
      if (isEmptyFirstName) {
        setFnameMsg("");
        setFnameColorMsg("");
        setFnameColorfield("border-gray-800");
      }
    }

    //Check PhoneNumber
    if (id === "phone_Number") {
      const phoneLength = isLength(value, { min: 10 });
      const isPhoneNumeric = isNumeric(value);
      const isEmptyPhone = isEmpty(value);

      if (isPhoneNumeric && phoneLength) {
        setPhoneMsg("Your phone number is valid");
        setPhoneColorMsg("text-[#8BCA00]");
        setPhoneColorfield("border-[#8BCA00]");
      } else if (!isPhoneNumeric && !phoneLength) {
        setPhoneMsg("Your phone number is Invalid");
        setPhoneColorMsg("text-red-500");
        setPhoneColorfield("border-red-500");
      }
      if (isEmptyPhone) {
        setPhoneMsg("");
        setPhoneColorMsg("");
        setPhoneColorfield("border-gray-800");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบข้อมูลตามเงื่อนไขที่กำหนด
    const validEmail = isEmail(formData.email);
    const validFirstName =
      !isEmpty(formData.firstName) && isAlpha(formData.firstName);
    const validLastName =
      !isEmpty(formData.lastName) && isAlpha(formData.lastName);

    const validDateOfBirth =
      !isEmpty(formData.date_of_birth) &&
      toDate(formData.date_of_birth) !== null;
    const validHeight = !isEmpty(formData.height) && isNumeric(formData.height);
    const validWeight = !isEmpty(formData.weight) && isNumeric(formData.weight);
    const validPhone =
      !isEmpty(formData.phone_Number) &&
      isNumeric(formData.phone_Number) &&
      isLength(formData.phone_Number, { min: 10 });

    // ตรวจสอบว่าข้อมูลถูกต้องหรือไม่
    if (true) {
      // ทำอะไรก็ตามที่ต้องการเมื่อข้อมูลถูกต้อง

      try {
        // ส่งข้อมูลไปยัง Backend
        const updateUserRoute = `/api/users/${userId}`;
        const requestData = {
          email: formData.email,
          userName: formData.userName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          date_of_birth: formData.date_of_birth,
          gender: formData.gender,
          height: formData.height,
          weight: formData.weight,
          phone: formData.phone,
          avatar: image,
        };
        const response = await API.post(updateUserRoute, requestData, {
          headers: headers,
        });

        // ตรวจสอบ response จาก Backend
        if (response.status === 200) {
          alert("Data successfully sent");
          // ทำอะไรต่อเมื่อส่งข้อมูลสำเร็จ เช่น รีเซ็ตฟอร์ม แสดงข้อความ เป็นต้น
        } else {
          alert("Failed to send data to the backend.");
        }
      } catch (error) {
        console.error("Error sending data to the backend:", error);
        alert("An error occurred while sending data to the backend.");
      }
    } else {
      alert("Invalid Data");
      console.log("Invalid Data");
    }
  };

  return (
    <>
      <div className="bg-[url('/moutain_pic.png')] bg-fixed bg-no-repeat bg-cover min-h-[1800px] md:min-h-[1100px] h-screen w-screen">
        <Navbar className="flex justify-evenly items-center" />
        <Navmenu />
        <form onSubmit={handleSubmit} noValidate>
          <main className="container mx-auto font-poppins">
            <section className="pt-20 relative">
              <Link to="/login"></Link>

              <div className="flex flex-col md:flex-row justify-center bg-[rgb(255,255,255)]/75 ">
                <div className="md:w-4/5 flex flex-col md:flex-row justify-center gap-10">
                  <div className="w-2/5">
                    {/* email */}
                    <div className="md:flex justify-evenly ">
                      <div className="flex flex-col justify-end md:w-2/5 ">
                        <label
                          className="text-left block mb-3 mt-6 text-sm"
                          htmlFor="Email"
                        >
                          Email
                        </label>
                        <input
                          className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-black text-sm block w-full p-2.5"
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          id="email"
                          onChange={handleInputChange}
                        />

                        <div className={`${emailMsgColor} text-sm md:w-72`}>
                          {emailMsg}
                        </div>
                      </div>
                      <div className="md:w-2/5"></div>
                    </div>

                    {/* username */}
                    <div className="md:flex justify-evenly ">
                      <div className="md:w-2/5 mb-10 md:mb-0">
                        <label
                          className="text-left block mb-3 mt-6 text-sm"
                          htmlFor="First Name"
                        >
                          Username
                        </label>
                        <input
                          className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-black text-sm block w-full p-2.5"
                          type="text"
                          placeholder="Username"
                          value={formData.userName}
                          id="userName"
                          onChange={handleInputChange}
                        />
                        <div className={`${fnamePassColorMsg} text-sm md:w-72`}>
                          {fnameMsg}
                        </div>
                      </div>
                      <div className="md:w-2/5"></div>
                    </div>

                    {/* firstname */}
                    <div className="md:flex justify-evenly ">
                      <div className="md:w-2/5 mb-10 md:mb-0">
                        <label
                          className="text-left block mb-3 mt-6 text-sm"
                          htmlFor="First Name"
                        >
                          Firstname
                        </label>
                        <input
                          className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-black text-sm block w-full p-2.5"
                          type="text"
                          placeholder="Firstname"
                          value={formData.firstName}
                          id="firstName"
                          onChange={handleInputChange}
                        />
                        <div className={`${fnamePassColorMsg} text-sm md:w-72`}>
                          {fnameMsg}
                        </div>
                      </div>
                      <div className="md:w-2/5"></div>
                    </div>

                    {/* lastname */}
                    <div className="md:flex justify-evenly ">
                      <div className="md:w-2/5 mb-10 md:mb-0">
                        <label
                          className="text-left block mb-3 mt-6 text-sm"
                          htmlFor="Lastname"
                        >
                          Lastname
                        </label>
                        <input
                          className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-black text-sm block w-full p-2.5"
                          type="text"
                          placeholder="Lastname"
                          value={formData.lastName}
                          id="lastName"
                          onChange={handleInputChange}
                        />
                        <div className={`${fnamePassColorMsg} text-sm md:w-72`}>
                          {fnameMsg}
                        </div>
                      </div>
                      <div className="md:w-2/5"></div>
                    </div>

                    {/* change pass button */}
                    {/* <div className="md:flex md:justify-evenly">
                      <div className="md:w-2/5">
                        <label
                          className="text-left block mb-3 mt-6 text-sm"
                          htmlFor="Password"
                        >
                          Password
                        </label>

                        <button className="rounded-4xl text-white bg-pink text-sm w-full px-5 py-2.5 text-center">
                          <a href="">Change Password</a>
                        </button>
                      </div>
                      <div className="md:w-2/5"></div>
                    </div> */}

                    {/* button from ChangePassword */}
                    <div className="md:flex justify-evenly ">
                      <div className="md:w-2/5 mb-10 md:mb-0">
                        <label
                          className="text-left block mb-3 mt-6 text-sm"
                          htmlFor="First Name"
                        >
                          Change Password
                        </label>
                        <ChangePassword />
                      </div>
                      <div className="md:w-2/5"></div>
                    </div>

                    {/* password input */}
                    {/* <div className="md:flex md:justify-evenly">
                      <div className="md:w-2/5">
                        <label
                          className="text-left block mb-3 mt-6 text-sm"
                          htmlFor="Password"
                        >
                          Password
                        </label>
                        <input
                          className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-black text-sm block w-full p-2.5"
                          type="password"
                          placeholder="Password"
                          id="password"
                          onPaste={(e) => e.preventDefault()}
                          onCopy={(e) => e.preventDefault()}
                          onCut={(e) => e.preventDefault()}
                          onDrop={(e) => e.preventDefault()}
                          onChange={handleInputChange}
                        />
                        <div
                          className={`${passColorMsg} text-sm mb-10 md:w-72`}
                        >
                          {passMsg}
                        </div>
                      </div>
                      <div className="md:w-2/5 mb-20">
                        <label
                          className="text-left block mb-3 mt-6 text-sm"
                          htmlFor="Confirm Password"
                        >
                          Confirm Password
                        </label>
                        <input
                          className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-black text-sm block w-full p-2.5"
                          type="password"
                          placeholder="Confirm Password"
                          id="confirmpassword"
                          onPaste={(e) => e.preventDefault()}
                          onCopy={(e) => e.preventDefault()}
                          onCut={(e) => e.preventDefault()}
                          onDrop={(e) => e.preventDefault()}
                          onChange={handleInputChange}
                        />
                        <div
                          className={`${confirmPassColorMsg} text-sm md:w-72`}
                        >
                          {confirmPassMsg}
                        </div>
                      </div>
                    </div> */}

                    {/* date */}
                    <div className="md:flex md:justify-evenly">
                      <div className="md:w-2/5">
                        <label
                          className="text-left block mb-3 mt-6 text-sm"
                          htmlFor="Date of Birth"
                        >
                          Date of Birth
                        </label>
                        <input
                          className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-white text-sm block w-full p-2.5"
                          type="date"
                          id="date_of_birth"
                          value={formData.date_of_birth}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* height */}
                      <div className="md:w-2/5 md:flex md:justify-between">
                        <div className="w-full md:w-2/5">
                          <label
                            className="text-left block mb-3 mt-6 text-sm"
                            htmlFor="Height"
                          >
                            Height
                          </label>
                          <select
                            className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-white text-sm block w-full p-2.5"
                            id="height"
                            placeholder="Height : cm"
                            value={formData.height}
                            onChange={handleInputChange}
                          >
                            <option value="" selected>
                              Select
                            </option>
                            <option value="" defaultValue disabled hidden>
                              Height : cm
                            </option>
                            {Array.from({ length: 211 - 130 }, (_, index) => (
                              <option key={index + 130} value={index + 130}>
                                {index + 130}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="w-full md:w-2/5">
                          <label
                            className="text-left block mb-3 mt-6 text-sm"
                            htmlFor="Weight"
                          >
                            Weight
                          </label>
                          <select
                            className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-white text-sm block w-full p-2.5"
                            id="weight"
                            placeholder="Weight : kg"
                            value={formData.weight}
                            onChange={handleInputChange}
                          >
                            <option value="" selected>
                              select
                            </option>
                            <option value="" defaultValue disabled hidden>
                              Height : cm
                            </option>
                            {Array.from(
                              { length: 120 - 40 + 1 },
                              (_, index) => (
                                <option key={index + 40} value={index + 40}>
                                  {index + 40}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* gender */}
                    <div className="md:flex md:justify-evenly">
                      <div className="md:w-2/5">
                        <label
                          className="text-left block mb-3 mt-6 text-sm"
                          htmlFor="Gender"
                        >
                          Gender
                        </label>
                        <select
                          className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-white text-sm block w-full p-2.5"
                          id="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        >
                          <option value="select" className="placeholder-white">
                            select
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>

                      <div className="md:w-2/5 mb-20">
                        <label
                          className="text-left block mb-3 mt-6 text-sm"
                          htmlFor="PhoneNumber"
                        >
                          Phone Number
                        </label>
                        <input
                          className="outline-0 pl-5 placeholder-white border-transparent rounded-4xl bg-blue text-black text-sm block w-full p-2.5"
                          id="phone"
                          type="tel"
                          placeholder="000-000-0000"
                          value={formData.phone}
                          maxLength={10}
                          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          onChange={handleInputChange}
                        />
                        <div className={`${phoneColorMsg} text-sm`}>
                          {phoneMsg}
                        </div>
                      </div>
                    </div>
                    <div className="md:flex md:justify-evenly">
                      <div className="md:w-2/5">
                        <button
                          className="rounded-4xl text-white bg-pink text-sm w-full px-5 py-2.5 text-center"
                          type="submit"
                        >
                          Done
                        </button>
                      </div>
                      {/* Div เปล่า ทำให้ด้านข้างเสมอกันกับข้างล่าง */}
                      <div className="md:w-2/5"></div>
                    </div>
                  </div>

                  <div className="md:w-1/5 flex flex-col justify-start">
                    <UploadImage setImage={setImage} className="p-5" />
                    {/* delete button */}
                    <DeleteButton />
                  </div>
                  {/* delete zone */}
                </div>
              </div>
            </section>
          </main>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
