import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  updateProfile: null,
  selectedUser: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedUser = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.updatedProfile = action.payload;
    },
  },
});

export const getUser = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${id}`);
    dispatch(slice.actions.getUserSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const updateUserProfile =
  ({
    userId,
    name,
    jobTitle,
    company,
    coverUrl,
    city,
    country,
    aboutMe,
    facebookLink,
    instagramLink,
    linkedinLink,
    twitterLink,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name,
        jobTitle,
        company,
        coverUrl,
        city,
        country,
        aboutMe,
        facebookLink,
        instagramLink,
        linkedinLink,
        twitterLink,
      };
      const response = await apiService.put(`/users/${userId}`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data.data));
      toast.success("Update Profile Successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

export default slice.reducer;
