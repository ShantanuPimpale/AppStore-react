import {useQuery} from "react-query"
import {getAuthenticatedUser} from "../../Api"
import { toast } from "react-toastify";

export const useUser = ()=>{
    const {data, isLoading, isError,refetch} = useQuery(
        "user",
        async () => {
            try{
                const userDetail = await getAuthenticatedUser()
                return userDetail;
            }catch(error){
                    console.log(error);
                    if(!error.message.includes("not authenticated")){
                        toast.error(`Error : ${error}`);
                    }
                   return null; 
            }
        },{
            refetchOnWindowFocus : false
        }
    );

    return {
        data, isLoading, isError, refetch,
    }
};

export default useUser;