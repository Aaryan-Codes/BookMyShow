import { axiosInstance } from ".";

export const AddShow = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/add-show', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}

export const getShowsByTheater = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/get-all-shows-by-theater', payload);
        return response.data;
    }catch(err){
        return err.response;
    }
}

export const UpdateShow = async (payload) => {    
    try{
        const response = await axiosInstance.put('/api/shows/update-show', payload);
        console.log(payload, response)
        return response.data;
    }catch(err){
        return err.response;
    }
}

export const DeleteShow = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/delete-show', payload);
        return response.data;
    }catch(err){
        return err.response;
    }
}

export const getAllTheatersByMovie = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/get-all-theaters-by-movie', payload);
        return response.data;
    }catch(err){
        return err.response;
    }
}

export const getShowById = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/get-show-by-id', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}