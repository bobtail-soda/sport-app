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

const SignUp = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const initialFormData = {
    email: "",
    firstname: "",

    password: "",
    confirmpassword: "",
    date_of_birth: "",
    gender: "",
    height: "",
    weight: "",
    phone_Number: "",
    image: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState("");
  // const [userId, setUserId] = useState();

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
    setFormData({
      ...formData,
      [id]: value,
      // [id]:id === "height" || id === "weight" ? parseInt(value, 10) : value,
      // [id]: id === "date_of_birth" ? new Date() : id === "height" || id === "weight" ? parseInt(value, 10) : value
    });

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
    if (id === "password") {
      const isEmptyPass = isEmpty(value);
      const strongPass = isStrongPassword(value, { minSymbols: 0 });

      if (strongPass) {
        setPassMsg("Password is valid");
        setPassColorMsg("text-[#8BCA00]");
        setPassColorfield("border-[#8BCA00]");
      } else if (!strongPass) {
        setPassMsg(
          "Your password must contain 8 characters including 1 Lowercase, 1 Uppercase and 1 Numbers"
        );
        setPassColorMsg("text-red-500");
        setPassColorfield("border-red-500");
      }
      if (isEmptyPass) {
        setPassMsg("");
        setPassColorMsg("");
        setPassColorfield("border-gray-800");
      }
    }

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
    if (id === "firstname") {
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

  console.log("form data: ", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validEmail = isEmail(formData.email);
    const isEmptyFirstName = isEmpty(formData.firstname);

    // const strongPass = isStrongPassword(formData.password, { minSymbols: 0 });
    const strongPass = formData.password;
    const isPasswordMatch = equals(formData.confirmpassword, formData.password);
    const isEmptyDate = isEmpty(formData.date_of_birth);
    const isEmptyHeight = isEmpty(formData.height);
    const isEmptyWeight = isEmpty(formData.weight);
    const isPhoneNumLength = isLength(formData.phone_Number, { min: 10 });

    if (
      validEmail &&
      !isEmptyFirstName &&
      strongPass &&
      isPasswordMatch &&
      !isEmptyHeight &&
      !isEmptyWeight &&
      !isEmptyDate &&
      isPhoneNumLength
    ) {
      alert("Valid Data");
      // ทำอย่างอื่นต่อ เช่น ส่งข้่อมูลไป Back-end
      try {
        // Endpoint ของ backend API ที่คุณต้องการส่งข้อมูลไป
        const updateUserRoute = `/api/users/${userId}`;

        // สร้าง object ที่มีข้อมูลทั้งหมดที่คุณต้องการส่งไปยัง backend
        const requestData = {
          email: formData.email,
          userName: formData.firstname,
          login_password: formData.password,
          signup_gender: formData.gender,
          signup_height: toInt(formData.height),
          signup_weight: toInt(formData.weight),
          phone: formData.phone_Number,
          avatar: image,
          // เพิ่ม property ต่อไปตามต้องการ
        };

        // ส่ง HTTP POST request ไปยัง backend
        const response = await API.post(
          "/api/users/65c8f4fc9aa2f67b7fbd27a7",
          requestData,
          {
            headers: headers,
          }
        );

        // ตรวจสอบ response จาก backend
        if (response.status === 200) {
          alert("Data successfully sent to the backend!");
          // ทำอย่างอื่นต่อ เช่น redirect หน้า, แสดงข้อความ, ฯลฯ
        } else {
          alert("Failed to send data to the backend.");
        }
      } catch (error) {
        console.error("Error sending data to the backend:", error);
        alert("An error occurred while sending data to the backend.");
      }
    } else {
      alert("Invalid Data");
    }

    console.log(toDate(formData.date_of_birth));
    console.log(toInt(formData.height));
    console.log(toInt(formData.weight));
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
                <div className="md:w-4/5 flex flex-col md:flex-row justify-center">
                  <div className="pt-10 md:pt-24 p-10">
                    <div className="md:flex md:justify-evenly justify-center ">
                      <div className="md:w-2/5">
                        <label
                          className="font-medium text-xl text-gray-800"
                          htmlFor="Email"
                        >
                          Email
                        </label>
                        <input
                          className={`w-full p-2 bg-transparent border-b-2 ${emailColorField} focus:outline-none placeholder-gray-700`}
                          type="email"
                          placeholder="Email Address"
                          id="email"
                          onChange={handleInputChange}
                        />
                        <div className={`${emailMsgColor} text-sm mb-10`}>
                          {emailMsg}
                        </div>
                      </div>
                      {/* Div เปล่า ทำให้ด้านข้างเสมอกันกับข้างล่าง */}
                      <div className="md:w-2/5"></div>
                    </div>

                    <div className="md:flex justify-evenly mb-10">
                      <div className="md:w-2/5 mb-10 md:mb-0">
                        <label
                          className="font-medium text-xl text-gray-800"
                          htmlFor="First Name"
                        >
                          Username
                        </label>
                        <input
                          className={`w-full p-2 bg-transparent border-b-2 ${fnameColorfield} focus:outline-none placeholder-gray-700`}
                          type="text"
                          placeholder="Username"
                          id="firstname"
                          onChange={handleInputChange}
                        />
                        <div className={`${fnamePassColorMsg} text-sm md:w-72`}>
                          {fnameMsg}
                        </div>
                      </div>
                      <div className="md:w-2/5"></div>
                    </div>

                    <div className="md:flex md:justify-evenly">
                      <div className="md:w-2/5">
                        <label
                          className="font-medium text-xl text-gray-800"
                          htmlFor="Password"
                        >
                          Password
                        </label>
                        <input
                          className={`w-full p-2 bg-transparent border-b-2 ${passColorfield} focus:outline-none placeholder-gray-700`}
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
                          className="font-medium text-xl text-gray-800"
                          htmlFor="Confirm Password"
                        >
                          Confirm Password
                        </label>
                        <input
                          className={`w-full p-2 bg-transparent border-b-2 ${confirmPassColorfield} focus:outline-none placeholder-gray-700`}
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
                    </div>

                    <div className="md:flex md:justify-evenly">
                      <div className="md:w-2/5">
                        <label
                          className="font-medium text-xl text-gray-800"
                          htmlFor="Date of Birth"
                        >
                          Date of Birth
                        </label>
                        <input
                          className="w-full p-2 mb-10 bg-transparent border-b-2 border-gray-800 focus:outline-none placeholder-gray-700"
                          type="date"
                          id="date_of_birth"
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="md:w-2/5 md:flex md:justify-between">
                        <div className="w-full md:w-2/5">
                          <label
                            className="font-medium text-xl text-gray-800"
                            htmlFor="Height"
                          >
                            Height
                          </label>
                          <select
                            className="w-full p-2 mb-10 bg-transparent border-b-2 border-gray-800 focus:outline-none placeholder-gray-700"
                            id="height"
                            placeholder="Height : cm"
                            onChange={handleInputChange}
                          >
                            <option value="" selected>
                              Not specified
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
                            className="font-medium text-xl text-gray-800"
                            htmlFor="Weight"
                          >
                            Weight
                          </label>
                          <select
                            className="w-full p-2 mb-10 bg-transparent border-b-2 border-gray-800 focus:outline-none placeholder-gray-700"
                            id="weight"
                            placeholder="Weight : kg"
                            onChange={handleInputChange}
                          >
                            <option value="" selected>
                              Not specified
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

                    <div className="md:flex md:justify-evenly">
                      <div className="md:w-2/5">
                        <label
                          className="font-medium text-xl text-gray-800"
                          htmlFor="Gender"
                        >
                          Gender
                        </label>
                        <select
                          className="w-full p-2 mb-10 bg-transparent border-b-2 border-gray-800 focus:outline-none placeholder-gray-700"
                          id="gender"
                          onChange={handleInputChange}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="notspecified" selected>
                            Not specified
                          </option>
                        </select>
                      </div>

                      <div className="md:w-2/5 mb-20">
                        <label
                          className="font-medium text-xl text-gray-800"
                          htmlFor="PhoneNumber"
                        >
                          Phone Number
                        </label>
                        <input
                          className={`w-full p-2 bg-transparent border-b-2 ${phoneColorfield} focus:outline-none placeholder-gray-700`}
                          id="phone_Number"
                          type="tel"
                          placeholder="000-000-0000"
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
                        <button className="btn bg-[#d2fe71] hover:bg-[#a5cf4a]/80 w-full drop-shadow text-xl font-normal border-none">
                          Done
                        </button>
                      </div>
                      {/* Div เปล่า ทำให้ด้านข้างเสมอกันกับข้างล่าง */}
                      <div className="md:w-2/5"></div>
                    </div>
                  </div>

                  <div className="md:w-1/5 flex flex-col justify-start">
                    <UploadImage setImage={setImage} />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </form>
      </div>
    </>
  );
};

export default SignUp;
