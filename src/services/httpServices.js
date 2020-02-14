
import axios from 'axios';



//ERROR Management: INTERCEPTOR. 
//The interceptor kicks in when a catch block occurs.  
//... .interceptors.response.use(param1,param2). 
//param1: function to handle success outcomes
//param2: function to handle errors
axios.interceptors.response.use(null,error =>{ 
      const expectedError= 
      error.response &&
      error.response.status>=400 &&
      error.response.status<500;

      
      if(!expectedError){
        console.log("Logged Error:", error);
        alert("An unexpected error occured");
      }
      console.log("INTERCEPTOR has been called")
      return Promise.reject(error);

    }
);

export default{
get:axios.get,
post: axios.post,
put:axios.put,
delete:axios.delete


};