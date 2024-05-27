import { toast } from "react-toastify";
import { UserDetails } from "./interface";
import axiosInstance from "./AxiosConfig";

export const getUserDetailsById = async (id: number) => {
    let responseFromApi!: UserDetails;
    try {
        const response = await axiosInstance.get(`/user_details/${id}`);
        if (response.status === 200) {
            responseFromApi = await response.data;
        } else {
            toast.error('Something went wrong');
        }
    } catch (error) {
        console.error('Error during loading:', error);
        toast.error('Something went wrong');
    }
    return responseFromApi;
};