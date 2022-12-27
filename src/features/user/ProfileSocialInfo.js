import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { Box, Card, CardHeader, Link, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const IconStyle = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

function ProfileSocialInfo({ profile }) {
  const { facbookLink, instagramLink, linkedinLink, twitterLink } = profile;

  const SOCIALS = [
    {
      name: "Linkedin",
      icon: (
        <IconStyle color="#006097">
          <LinkedIn />
        </IconStyle>
      ),
      href: linkedinLink,
    },
    {
      name: "Twitter",
      icon: (
        <IconStyle color="#1877F2">
          <Twitter />
        </IconStyle>
      ),
      href: twitterLink,
    },
    {
      name: "Facbook",
      icon: (
        <IconStyle color="#1C9CEA">
          <Facebook />
        </IconStyle>
      ),
      href: facbookLink,
    },
    {
      name: "Instagram",
      icon: (
        <IconStyle color="#D7336D">
          <Instagram />
        </IconStyle>
      ),
      href: instagramLink,
    },
  ];

  return (
    <Card>
      <CardHeader title="Social" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {SOCIALS.map((link) => (
          <Stack key={link.name} direction="row" alignItems="center">
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

export default ProfileSocialInfo;
