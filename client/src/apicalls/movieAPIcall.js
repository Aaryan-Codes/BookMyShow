import {axiosInstance} from './index'; 

// Movie API calls

export const GetAllMovies = async () =>{
    try {
        const response = await axiosInstance.get('/api/movies/get-all-movies');
        return response.data;
    } catch (error) {
        console.log(error);
        return error.message;
    } 
}

// Add a single movie
export const addMovie = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/movies/add-movie', payload);
        return response.data;
    }
    catch(error){
        console.log(error);
        return error.message;
    }
}

// Get a single movie by its id
export const getMovieById = async (id) => {
    try{
        const response = await axiosInstance.post(`/api/movies/movie/${id}`)
        return response.data;
    }catch(error){
        console.log(error);
        return error.message;
    }
}

// Update Movie
export const updateMovie = async (payload) => {
    try{
        const response = await axiosInstance.put('/api/movies/update-movie', payload);
        return response.data;
    }catch(error){
        console.log(error);
        return error.message;
    }
}

// Delete a movie
export const deleteMovie = async (payload) => {
    try{
        const response = await axiosInstance.put('/api/movies/delete-movie', payload);
        return response.data;
    }catch(error){
        console.log(error);
        return error.message;
    }
}