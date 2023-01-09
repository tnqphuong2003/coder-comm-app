import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  currentPageUsers: [],
  userById: {},
  totalPages: 1,
};

const slice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => {
        state.userById[user._id] = user;
      });
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
    getFriendsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => {
        state.userById[user._id] = user;
      });
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
    getFriendRequestsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => {
        state.userById[user._id] = user;
      });
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
    sendFriendRequestSuccess(state, action) {
      state.startLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.userById[targetUserId].friendship = friendship;
    },
    declineFriendRequestSuccess(state, action) {
      state.startLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.userById[targetUserId].friendship = friendship;
    },
    acceptFriendRequestSuccess(state, action) {
      state.startLoading = false;
      state.error = null;
      const { targetUserId, ...friendship } = action.payload;
      state.userById[targetUserId].friendship = friendship;
    },
    cancelFriendRequestSuccess(state, action) {
      state.startLoading = false;
      state.error = null;
      const { targetUserId, users } = action.payload;
      state.userById[targetUserId].friendship = null;

      state.totalUsers -= 1;
    },
    removeFriendRequestSuccess(state, action) {
      state.startLoading = false;
      state.error = null;
      const { targetUserId } = action.payload;
      state.userById[targetUserId].friendship = null;
    },
    getSentRequestsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => {
        state.userById[user._id] = user;
      });
      state.currentPageUsers = users.map((user) => user._id);
      state.totalUsers = count;
      state.totalPages = totalPages;
    },
  },
});

export const getUsers =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/users`, { params });
      dispatch(slice.actions.getUsersSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const getFriends =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/friends`, { params });
      dispatch(slice.actions.getFriendsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const getFriendRequests =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/friends/requests/incoming`, {
        params,
      });
      dispatch(slice.actions.getFriendRequestsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export const sendFriendRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post(`/friends/requests`, {
      to: targetUserId,
    });
    dispatch(
      slice.actions.sendFriendRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
    toast.success("Request sent");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const declineFriendRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "declined",
    });
    dispatch(
      slice.actions.declineFriendRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
    toast.success("Request declined");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const acceptFriendRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/friends/requests/${targetUserId}`, {
      status: "accepted",
    });
    dispatch(
      slice.actions.acceptFriendRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
    toast.success("Request accepted");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const cancelFriendRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(
      `/friends/requests/${targetUserId}`
    );
    dispatch(
      slice.actions.cancelFriendRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
    toast.success("Request cancelled");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const removeFriendRequest = (targetUserId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/friends/${targetUserId}`);
    dispatch(
      slice.actions.removeFriendRequestSuccess({
        ...response.data.data,
        targetUserId,
      })
    );
    toast.success("Friend removed");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getSentRequests =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.name = filterName;
      const response = await apiService.get(`/friends/requests/outgoing`, {
        params,
      });
      dispatch(slice.actions.getSentRequestsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

export default slice.reducer;
