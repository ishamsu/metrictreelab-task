import axios from "../axiosconfg";
import authHeader from './auth-header';



class dwuser {

  loginuser(username, password) {
    return axios
      .post("/users/login", {username,password})
    .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.data.token)

        }

        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }

  createuser(username, password) {
    return axios.post("/users",{username, password})
    .then(response => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data.token)

      }

      return response.data;
    });
  }

  updateuser(id, username,password) {
    return axios.put(`/users/${id}`,{username,password},{headers: authHeader() });

  }
  getcurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

}

export default new dwuser();