import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import Profile from "../features/user/Profile";
import FriendList from "../features/friend/FriendList";
import SentRequests from "../features/friend/SentRequests";
import AddFriend from "../features/friend/AddFriend";
import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import ProfileCover from "../features/user/ProfileCover";
import { styled } from "@mui/material/styles";
import Request from "../features/friend/Request";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

function HomePage() {
  const { user } = useAuth();
  console.log("homepage user ", user);
  const [currentTab, setCurrentTab] = useState("profile");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TAB = [
    {
      value: "profile",
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <Profile profile={user} />,
    },
    {
      value: "friends",
      icon: <PeopleAltIcon sx={{ fontSize: 24 }} />,
      component: <FriendList />,
    },
    {
      value: "request",
      icon: <ContactMailIcon sx={{ fontSize: 24 }} />,
      component: <Request />,
    },
    {
      value: "add_friend",
      icon: <PersonAddRoundedIcon sx={{ fontSize: 24 }} />,
      component: <AddFriend />,
    },
  ];

  return (
    <Container>
      <Card sx={{ mb: 3, height: 280, position: "relative" }}>
        <ProfileCover profile={user} />
        <TabsWrapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {PROFILE_TAB.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)} // hàm này sẽ bỏ gạch nối chân ADD_FRIEND => ADD FRIEND
              />
            ))}
          </Tabs>
        </TabsWrapperStyle>
      </Card>

      {/* render nội dung của từng tab */}
      {PROFILE_TAB.map((tab) => {
        const isMatch = tab.value === currentTab;
        return isMatch && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default HomePage;
