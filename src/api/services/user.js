import API from '../api';

const getRoute = "users" 

const getUserData = async () => {
    const response = await API.get(
      `${getRoute}` //localhost:8000/todos
    );
    // set member here
    if (response.status === 200 && response.data) {
      setUsers([...response.data]);
    }
  };

const deleteUser = () => {
    API.delete(`users/${this.state.id}`)
    .then(res => {
        console.log(res);
        console.log(res.data);
    })
}


export default {
    getUserData,
    deleteUser
};