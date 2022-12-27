import { BusinessCenter, Email, PinDrop } from "@mui/icons-material";
import { Box, Card, CardHeader, Link, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

function ProfileAbout({ profile }) {
  const { aboutMe, city, country, email, company } = profile;

  return (
    <Card>
      <CardHeader title="About" variant="h6" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{aboutMe}</Typography>

        <Stack direction="row">
          <IconStyle>
            <PinDrop />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {city} {country}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle>
            <Email />
          </IconStyle>
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle>
            <BusinessCenter />
          </IconStyle>
          <Typography variant="body2">
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileAbout;
