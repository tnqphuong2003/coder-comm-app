import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { COMMENTS_PER_POST } from "../../app/config";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  commentsById: {}, //  commentsById: { key: commnentId, value: commentContent}      mỗi 1 key là 1 comment Id - lưu nội dung của comment
  commentsByPost: {}, //  commentsByPost: { "post1": ["cmt1", "cmt2"] , "post2" : [ "cmt3", "cmt4" ] }  - chỉ lưu Id của comment
  currentPageByPost: {},
  totalCommentsByPost: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { postId, comments, page, count } = action.payload;
      comments.forEach(
        (comment) => (state.commentsById[comment._id] = comment)
      );
      state.commentsByPost[postId] = comments
        .map((comment) => comment._id)
        .reverse();
      state.currentPageByPost[postId] = page;
      state.totalCommentsByPost[postId] = count;
    },
    sendCommentReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, reactions } = action.payload;
      state.commentsById[commentId].reactions = reactions;
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId, postId } = action.payload;
      delete state.commentsById[commentId];
      state.commentsByPost[postId] = state.commentsByPost[postId].filter(
        (comment) => comment !== commentId
      );
      state.totalCommentsByPost -= 1;
    },
    editCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      // const comments = action.payload;
      // comments.forEach((comment) => {
      //   state.commentsById[comment._id] = comment;
      //   if (!state.commentsByPost.includes(comment._id))
      //     state.currentPagePosts.push(comment._id);
      // });
    },
  },
});

export const createComment =
  ({ postId, content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comments", {
        content,
        postId,
      });
      dispatch(slice.actions.createCommentSuccess(response.data.data));
      dispatch(getComments({ postId })); // tạo comment mà success thì sẽ get comment
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getComments =
  ({ postId, page = 1, limit = COMMENTS_PER_POST }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/${postId}/comments`, {
        params,
      });
      dispatch(
        slice.actions.getCommentSuccess({ ...response.data.data, postId, page })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const sendCommentReaction =
  ({ commentId, emoji }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/reactions`, {
        targetType: "Comment",
        targetId: commentId,
        emoji,
      });
      dispatch(
        slice.actions.sendCommentReactionSuccess({
          commentId,
          reactions: response.data.data,
        })
      );
    } catch (error) {}
  };

export const deleteComment = (commentId, postId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/comments/${commentId}`);
    dispatch(
      slice.actions.deleteCommentSuccess({
        commentId,
        postId,
      })
    );
    toast.success("Delete success");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const editComment = (commentId, content) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    console.log(content);
    const response = await apiService.put(`/comments/${commentId}`, {
      content,
    });
    dispatch(slice.actions.editCommentSuccess(...response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;
