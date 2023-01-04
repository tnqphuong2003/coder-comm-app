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
import { getSentRequests } from "./friendSlice";
import SearchInput from "../../components/SearchInput";
import UserCard from "./UserCard";

function SentRequests() {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(1);
  const { currentPageUsers, userById, totalUsers, totalPages } = useSelector(
    (state) => state.friend
  );

  const users = currentPageUsers.map((userId) => userById[userId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSentRequests({ filterName, page }));
  }, [filterName, page, dispatch]);

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
  };

  return (
    <Container>
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
                ? `${totalUsers} requests found`
                : totalUsers === 1
                ? `${totalUsers} requests found`
                : `No request found`}
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

export default SentRequests;
