import { useQuery } from "react-query"
import { toast } from "react-toastify";
import { getAllAppsFromTheCloud } from "../../Api";


const useApps = () => {
    const { data, isLoading, isError, refetch } = useQuery("apps", 
    async () => { 
        try{
            
          const apps=await getAllAppsFromTheCloud();
          return apps;
        }catch(error){
                console.log(error);
                
                    toast.error(`Error : ${error}`);
                
               return null; 
        }
    }, {
        refetchOnWindowFocus: false
    })

    return { data, isLoading, isError, refetch, };

}

export default useApps;