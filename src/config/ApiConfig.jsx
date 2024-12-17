import axios from "axios";
import endpoint from "./endpoint";

export const generateName = async (prompt) => {
    try{
        const url = `${endpoint.base_url}${endpoint.generateName}`
        const response = await axios.post(url, 
            {
                "prompt": prompt
            },
            {
                headers: {
                    "Content-Type" : "application/json"
                },
            }
        );

        return response.data;
    }catch(err){
        console.error("Error generating response", err)
    }
}

export const getDomains = async (name) => {
    try{
        const url = `${endpoint.base_url}${endpoint.getDomains}`
        console.log("ur", url)
        const response = await axios.post( url ,
            {
                domainName : name,
            },
            {    headers:{
                    "Content-type": "application/json"
                },
            }
        );
        console.log("response of get domain",response)
        return response.data;

    }catch(err){
        console.error("Error fetching domains", err);
    }
}