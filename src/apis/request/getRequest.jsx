import axios from "axios";

export const requestApi = async () => {
    const response = await axios.get("/api/");
    return response.data;
};