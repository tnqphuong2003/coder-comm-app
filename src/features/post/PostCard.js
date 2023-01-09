import { MoreVert } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { fDate } from "../../utils/formatTime";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import PostReaction from "./PostReaction";
import { deletePost, editPost } from "./postSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PostCard({ post }) {
  const [newContent, setNewContent] = useState(post.content);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);
  const handleModal1Open = () => setOpen1(true);
  const handleModal1Close = () => {
    setOpen1(false);
  };

  const { user } = useAuth();
  const dispatch = useDispatch();

  // const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOpenEditForm = () => {
    handleMenuClose();
    handleModal1Open();
  };
  const handleConfirm = () => {
    handleMenuClose();
    handleModalOpen();
  };
  const handleDelete = () => {
    handleModalClose();
    dispatch(deletePost(post._id));
  };

  const handleEditPost = (e) => {
    handleModal1Close();
    dispatch(editPost(newContent, post.image, post._id));
  };

  const handleDiscard = () => {
    handleModal1Close();
    setNewContent(post.content);
  };

  const renderModal = (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Move to your recycle bin? {open ? "true" : "false"}
        </Typography>
        <Stack sx={{ flexGrow: 1 }} />
        <Stack direction="row">
          <Button onClick={handleDelete}>Confirm</Button>
          <Button onClick={handleModalClose}>Cancel</Button>
        </Stack>
      </Box>
    </Modal>
  );

  const renderModal1 = (
    <Modal
      open={open1}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          mb: 2,
          width: "600px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CardHeader
          disableTypography
          avatar={
            <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
          }
          title={
            <Link
              variant="subtitle2"
              color="text.primary"
              conponent={RouterLink}
              sx={{ fontWeight: 600 }}
              to={`/user/${post.author._id}`}
            >
              {post?.author?.name}
            </Link>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary" }}
            >
              {fDate(post.createdAt)}
            </Typography>
          }
        ></CardHeader>
        <Stack spacing={2} sx={{ p: 3 }}>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            maxRows={4}
            fullWidth
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          {post.image && (
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: 300,
                "& img": { objectFit: "cover", width: 1, height: 1 },
              }}
            >
              <img src={post.image} alt="post" />
            </Box>
          )}
          <Box
            direction="row"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{ mr: 2 }}
              onClick={handleDiscard}
            >
              Discard
            </Button>
            <LoadingButton
              variant="contained"
              size="small"
              onClick={handleEditPost}
            >
              Save
            </LoadingButton>
          </Box>
        </Stack>
      </Card>
    </Modal>
  );

  const renderMenu = (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOpenEditForm} sx={{ mx: 1 }}>
        Edit post
      </MenuItem>

      <MenuItem onClick={handleConfirm} sx={{ mx: 1 }}>
        Delete post
      </MenuItem>
    </Menu>
  );

  return (
    <>
      {renderModal}
      <Card sx={{ mt: 2, mb: 2 }}>
        <CardHeader
          disableTypography
          avatar={
            <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
          }
          title={
            <Link
              variant="subtitle2"
              color="text.primary"
              conponent={RouterLink}
              sx={{ fontWeight: 600 }}
              to={`/user/${post.author._id}`}
            >
              {post?.author?.name}
            </Link>
          }
          subheader={
            <Typography
              variant="caption"
              sx={{ display: "block", color: "text.secondary" }}
            >
              {fDate(post.createdAt)}
            </Typography>
          }
          action={
            <>
              <IconButton onClick={handleClick}>
                <MoreVert sx={{ fontSize: 25 }} />
              </IconButton>
              {post.author._id === user._id && renderMenu}
            </>
          }
        ></CardHeader>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography>{newContent}</Typography>
          {post.image && (
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: 300,
                "& img": { objectFit: "cover", width: 1, height: 1 },
              }}
            >
              <img src={post.image} alt="post" />
            </Box>
          )}

          <PostReaction post={post} />
          <CommentList postId={post._id} />
          <CommentForm postId={post._id} />
        </Stack>
      </Card>
      {renderModal1}
    </>
  );
}

export default PostCard;
