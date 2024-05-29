import { axiosInstance } from "./index";

export const AddTheater = async (value) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/add-theater",
      value
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateTheater = async (value) => {
  try {
    const response = await axiosInstance.put(
      "/api/theaters/update-theater",
      value
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteTheater = async (value) => {
  try {
    const response = await axiosInstance.put(
      "/api/theaters/delete-theater",
      value
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Get all theaters for Admin Route

export const getAllTheatersForAdmin = async (res,req) => {
  try {
    const response = await axiosInstance.get("/api/theaters/get-all-theater");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Get theaters for a specific owner
export const getAllTheaters = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/get-all-theaters-by-owner",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
