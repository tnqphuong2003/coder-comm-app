import { MoreVert } from "@mui/icons-material";
import {
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
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { fDate } from "../../utils/formatTime";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import PostForm from "./PostForm";
import PostReaction from "./PostReaction";
import { deletePost } from "./postSlice";

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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => {
    setOpen(false);
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
  const handleEdit = () => {
    handleMenuClose();
  };
  const handleConfirm = () => {
    handleMenuClose();
    handleModalOpen();
  };
  const handleDelete = () => {
    handleModalClose();
    dispatch(deletePost(post._id));
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
      <MenuItem onClick={handleEdit} sx={{ mx: 1 }}>
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
                <MoreVert sx={{ fontSize: 30 }} />
              </IconButton>
              {post.author._id === user._id && renderMenu}
            </>
          }
        ></CardHeader>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography>{post.content}</Typography>
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
    </>
  );
}

export default PostCard;
