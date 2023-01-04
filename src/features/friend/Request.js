import { Box, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import FriendRequests from "./FriendRequests";
import SentRequests from "./SentRequests";

function Request() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("friend_requests");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const REQUEST_TAB = [
    {
      value: "friend_requests",
      component: <FriendRequests />,
    },
    {
      value: "sent_requests",
      component: <SentRequests />,
    },
  ];
  return (
    <>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => handleChangeTab(value)}
      >
        {REQUEST_TAB.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            label={capitalCase(tab.value)} // hàm này sẽ bỏ gạch nối chân ADD_FRIEND => ADD FRIEND
          />
        ))}
      </Tabs>
      {REQUEST_TAB.map((tab) => {
        const isMatch = tab.value === currentTab;
        return isMatch && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </>
  );
}

export default Request;
