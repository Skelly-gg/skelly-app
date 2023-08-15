import React from "react";
import Typography from "@mui/material/Typography";
import { Paper, Stack } from "@mui/material";
import { IProfile } from "../graphQL/skellyGraphQL";
import { getAvatar, getLongName, getName } from "../utils/profile";
import { SocialNetworks } from "./SocialNetworks";

export function Profile({
  profile,
  onClick,
}: {
  profile: IProfile;
  onClick?: () => void;
}) {
  const [mouseIn, setMouseIn] = React.useState<boolean>(false);

  if (!profile) return null;

  const longName = getLongName(profile);
  const name = getName(profile);

  return (
    <Paper
      elevation={4}
      style={{
        padding: "1rem",
        width: profile.social_networks ? "16rem" : "13rem",
        minWidth: profile.social_networks ? "16rem" : "13rem",
        overflow: "hidden",
        cursor: "pointer",
        height: "fit-content",
      }}
      onClick={onClick}
    >
      <Stack
        direction="row"
        gap="1rem"
        style={
          {
            //backgroundColor: "green"
          }
        }
      >
        <Stack
          gap="1rem"
          style={{
            //backgroundColor: "blue",
            width: "11rem",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              //backgroundColor: "blue",
              height: "11rem",
              width: "11rem",
              borderRadius: "1rem",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundImage: `url(${getAvatar(profile)})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                transform: mouseIn ? "scale(1.1)" : "scale(1.0)",
                transition: "1s",
                //height: "11rem",
                //width: "fit-content",
                width: "100%",
                height: "100%",
              }}
              onMouseEnter={() => {
                setMouseIn(true);
              }}
              onMouseLeave={() => {
                setMouseIn(false);
              }}
            />
          </div>

          <Typography
            variant="subtitle1"
            style={
              {
                //whiteSpace: "nowrap",
                //textOverflow: "ellipsis",
                //overflow: "hidden",
              }
            }
            component="div"
          >
            {longName}
          </Typography>
          {profile?.summary ? (
            <Typography variant="body1" component="div">
              {profile.summary}
            </Typography>
          ) : null}
        </Stack>
        <SocialNetworks profile={profile} />
      </Stack>
    </Paper>
  );
}
