import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { deleteComment, editComment } from "./commentSlice";

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

function CommentCard({ comment }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => {
    setOpen(false);
  };

  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (e) => {
    handleMenuClose();
    console.log(comment._id);
    dispatch(editComment(comment._id, `cmt 3`));
  };
  const handleConfirm = () => {
    handleMenuClose();
    handleModalOpen();
  };
  const handleDelete = () => {
    handleModalClose();
    dispatch(deleteComment(comment._id, comment.post));
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
      {/* <MenuItem onClick={handleEdit} sx={{ mx: 1 }}>
        Edit comment
      </MenuItem> */}

      <MenuItem onClick={handleConfirm} sx={{ mx: 1 }}>
        Delete comment
      </MenuItem>
    </Menu>
  );
  return (
    <>
      {renderModal}
      <Stack direction="row" spacing={2}>
        <Avatar src={comment?.author?.avatarUrl} alt={comment?.author?.name} />
        <Paper sx={{ p: 1.5, flexGrow: 1, bgCorlor: "background.neutral" }}>
          <Stack
            direction="row"
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: 0.5 }}
          >
            <Stack
              direction="row"
              alignItems={{ sm: "center" }}
              justifyContent="flex-start"
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {comment?.author?.name}
              </Typography>
              <IconButton onClick={handleClick}>
                <MoreVert sx={{ fontSize: 20 }} />
              </IconButton>
              {comment?.author?._id === user._id && renderMenu}
            </Stack>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {fDate(comment.createdAt)}
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {comment.content} - {comment._id}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CommentReaction comment={comment} />
          </Box>
        </Paper>
      </Stack>
    </>
  );
}

export default CommentCard;
