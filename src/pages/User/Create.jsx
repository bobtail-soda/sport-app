import React, { useState } from 'react'

const UserCreate = ({createData}) => {
  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [phone , setPhone] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.userName.trim()) {
      errors.userName = "UserName is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      createData(formData);
      console.log("Form data submitted:", formData);
    } else {
      console.log("Form submission failed due to validation errors.");
    }
  }

  return (
    <>
    <div>Create User Here</div>
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label htmlFor="userName" className="block mt-10 text-sm font-medium text-gray-900 dark:text-white">
                  UserName
          </label>
          <input type="text" name="userName" placeholder="UserName" value={formData.userName} onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          <span className="error text-red">{formErrors.userName}</span>
        </div>

        <div className="mb-8">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
          </label>
          <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
           <span className="error">{formErrors.email}</span>
        </div>

        <div className="mb-8">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
          </label>
          <input type="password" name="password" placeholder="Password"  value={formData.password} onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          <span className="error">{formErrors.password}</span>
        </div>
        <div className="mb-8">
          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              Phone
          </label>
          <input type="phone" name="password" placeholder="Phone" value={formData.phone} onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          <span className="error">{formErrors.phone}</span>
        </div>
        <button type="submit" className="text-white bg-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Create
        </button>
      </form>
    </div>
    </>
  );
}

export default UserCreate;