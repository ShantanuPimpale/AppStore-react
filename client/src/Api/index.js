import { toast } from "react-toastify";
import { auth } from "../config/firebase.config";
import { baseURL } from "../utils/helpers";


export const getAuthenticatedUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then(async (token) => {
                    console.log(`Token :${token}`)
                    try {
                        const response = await fetch(`${baseURL}/validateToken`, {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                        });

                        if (!response.ok) {
                            throw new Error(`Network response was not ok : ${response.statusText}`);
                        }

                        const data = await response.json();
                        console.log("data : ", data?.user);
                        resolve(data?.user);
                    } catch (error) {
                        console.error("Error fetching data:", error);
                        reject(error);
                    }
                });
            } else {
                reject(new Error("User is not authenticated"));
            }

            unsubscribe();
        });
    });
};


export const saveAppDataToCloud=async(data)=>{
    try{
        const res=await fetch(`${baseURL}/createNewApp`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json",
            },
            body :  JSON.stringify(data)
        })
        if(!res.ok){
            toast.error("Failed to Create New App")
        }

        const resData= await res.json()
        return resData;
    }catch(error){
        toast.error(`Error: ${error}`);
    }
};

export const getAllAppsFromTheCloud=async()=>{
    try{
        const res=await fetch(`${baseURL}/getAllApps`)
        if(!res.ok)
{
    toast.error("Failed to Create New App")
} 
    const apps=await res.json();
    return apps;
}catch(error){
        toast.error(`Error: ${error}`);
    }
}

export const deleteAnAppFromCloud=async(id)=>{
    try{
       const res= await fetch(`${baseURL}/deleteAnApp?id=${id}`);
        if(!res.ok)
{
    toast.error("Failed to Create New App")
} 
    const message=await res.json();
    return message;
    
}catch(error){
        toast.error(`Error: ${error}`);
    }
};

// function to call the api endpoint to getall users
export const getAllUsersFromTheCloud=async ()=>{
    try{
        const res=await fetch(`${baseURL}/getAllUsers`)
        if(!res.ok)
{
    toast.error("Failed to Create New App")
} 
    const users=await res.json();
    return users;
}catch(error){
        toast.error(`Error: ${error}`);
    }
}

//update user data to cloud data
export const updateUserDataToCloud = async (data) => {
    try {
      const res = await fetch(`${baseURL}/updateTheUser`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        toast.error('Failed to create an app');
      }
  
      const resData = await res.json();
      return resData;
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };