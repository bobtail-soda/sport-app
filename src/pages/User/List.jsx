import React, { useState, useEffect } from 'react'
import API from '../../api/axios';
import UserCreate from './Create';


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(false);
    const userRoute = "users";

    useEffect(() => {
        getUserData();
      }, [reload]);
    
    //get user data
    const getUserData = async () => {
          
      const response = await API.get(`${userRoute}`); // [GET] https://localhost:5000/api/users
      console.log("response: ", response.data.data)
      // set member here
      if (response.status === 200 && response.data.data) {
        setUsers([...response.data.data]);
      }
    };
    // Create data to api
    const createData = async (userName, email, password, phone) => {
        const requestData = {
        userName: userName,
        email: email,
        password: password,
        phone: phone,
        };
        console.log(requestData);
        const response = await API.post(`${userRoute}`, requestData);// [POST] https://localhost:5000/api/users , requestData

        if (response.status === 201) {
        setReload(!reload);
        }

        console.log(response);
    };

    // Delete data
    const removeData = async (id) => {
      console.log(id);
      const user_id = id
      
      
      const response = await API.delete(`${userRoute}/${user_id}`) // [DELETE] https://localhost:5000/api/users/:id

      if (response.status === 200) {
        setReload(!reload);
        console.log(response);
      }
    };
    return (
        <>
        <h1>Home - Admin</h1>
        {/* create form */}
        <UserCreate createData={createData} />
        {/* table */}
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Create Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Update Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                  {/* Start loop */}
                  {users.map((user,index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user._id}
                        </th>
                        <td className="px-6 py-4">
                            {user.userName} 
                        </td>
                        <td className="px-6 py-4">
                            {user.email}
                        </td>
                        <td className="px-6 py-4">
                            {user.phone}
                        </td>
                        <td className="px-6 py-4">
                            
                            <img src={user.avatar} alt={user.userName} className='w-10' />
                        </td>
                        <td className="px-6 py-4">
                            {user.createdAt}
                        </td>
                        <td className="px-6 py-4">
                            {user.updatedAt}
                        </td>
                        <td className="px-6 py-4">
                          <button type="button" className="focus:outline-none text-white bg-blue hover:bg-blue focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                  onClick={() => removeData(user._id)}
                          >  
                            DELETE
                          </button>
                        </td>
                    </tr>
                    
                  ))}
                  {/*End loop*/}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default UserList