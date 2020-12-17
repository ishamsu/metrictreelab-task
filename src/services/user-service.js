import axios from "../axiosconfg";
import authHeader from './auth-header';

//here we define all type & content related apis

class userservice {

  // getalltype() {
  //   return axios.get("/type", {headers: authHeader() });
  // }
  // gettypebyid(id){
  //   return axios.get(`/type/${id}`,{headers: authHeader() });
  
  // }

  // updatetypebyid(id, data) {
  //   return axios.put(`/type/${id}`, data,{headers: authHeader() });
  // }
  // deleteypebyid(id) {
  //   return axios.delete(`/type/${id}`,{headers: authHeader() });
  // }
  // getcontentbytypeid(id) {
  //   return axios.get(`/content/getByTypeId/${id}`, {headers: authHeader() });
  // }
  // getcontentbyid(id){
  //   return axios.get(`/content/${id}`,{headers: authHeader() });
  
  // }
  
  // updatecontentbyid(id, data){
  //   return axios.put(`/content/${id}`, data,{headers: authHeader() });
  
  // }
  // deletecontentbyid(id) {
  //   return axios.delete(`/content/${id}`,{headers: authHeader() });
  // }
  getdatabymasterid(id)
  {
    return axios.get(`/data/${id}`,{headers: authHeader() });
  }
  
  createdatabymasterid(id,data)
  {
    return axios.post(`/data/${id}`,data,{headers: authHeader() });
  }
  getalldata()
  {
    return axios.get(`/users`,{headers: authHeader() });
  }
  getuserbymasterid(id)
  {
    return axios.get(`/user/${id}`,{headers: authHeader() });
  }
  
}





export default new userservice();