import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "./friendSlice";
import SearchInput from "../../components/SearchInput";
import UserCard from "./UserCard";

function FriendList() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const { currentPageUsers, userById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );

  const users = currentPageUsers.map((userId) => userById[userId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriends({ filterName, page }));
  }, [filterName, page, dispatch]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />

            <Box sx={{ flexGrow: 1 }} />

            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalUsers > 1
                ? `${totalUsers} friends found`
                : totalUsers === 1
                ? `${totalUsers} friends found`
                : `No friend found`}
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            ></Pagination>
          </Stack>
        </Stack>

        <Grid container spacing={2} my={1}>
          {users.map((user) => (
            <Grid key={user._id} item xs={12} md={4}>
              <UserCard profile={user} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default FriendList;
