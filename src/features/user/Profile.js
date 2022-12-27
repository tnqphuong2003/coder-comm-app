import { Grid, Stack } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";
import PostForm from "../post/PostForm";
import PostList from "../post/PostList";
import ProfileAbout from "./ProfileAbout";
import ProfileScorecard from "./ProfileScorecard";
import ProfileSocialInfo from "./ProfileSocialInfo";

function Profile({ profile }) {
  const { user } = useAuth();
  console.log("user = ", user);
  console.log("Profile user = ", profile);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        {/*  màn hình nhỏ thì chiếm 12 cột, màn hình lớn thì chiếm 4 cột */}
        <Stack spacing={3}>
          <ProfileScorecard profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileSocialInfo profile={profile} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        {/*  màn hình nhỏ thì chiếm 12 cột, màn hình lớn thì chiếm 8 cột */}
        <Stack spacing={3}>
          {user._id === profile._id && <PostForm />}
          <PostList userId={profile._id} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Profile;
