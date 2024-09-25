import axios from "axios";


//login for postman

const loginPostman = async ({email,password})=>{
  
        const response = await axios.post(
            "https://thin-tables-flash.loca.lt/api/office/agentlogin",
        {
            email,password
        }
        );
        return response.data
        //returning a promise
        //tanstack will auto handle trycatch errors
    
    
}