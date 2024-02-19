import { useQuery } from "react-query"
import { toast } from "react-toastify";
import { getAllUsersFromTheCloud } from "../../Api";



const useUsers = () => {
    const { data, isLoading, isError, refetch } = useQuery("user",
        async () => {
            try {

                const users = await getAllUsersFromTheCloud();
                return users;
            } catch (error) {
                console.log(error);

                toast.error(`Error : ${error}`);

                return null;
            }
        }, {
        refetchOnWindowFocus: false
    })

    return { data, isLoading, isError, refetch, };

}

export default useUsers;