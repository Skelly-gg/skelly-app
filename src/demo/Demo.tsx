import React from "react";
import {
  Stack,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Tooltip,
  Paper,
} from "@mui/material";
import { Profile } from "../react/Profile";
import { useFetchProfile } from "../react/useFetchProfile";

export function Demo() {
  const [disabled, setDisabled] = React.useState<boolean>(true);

  const textFieldRef = React.useRef<HTMLTextAreaElement>(null);

  const { fetchProfile, profile, accountId, loadingProfile, errorProfile } =
    useFetchProfile();

  return (
    <Stack gap="3rem" style={{ padding: "1rem" }}>
      <Typography variant="h3">Skelly-app demo</Typography>

      <Stack direction="row" gap="1rem" style={{ flexWrap: "wrap" }}>
        <Tooltip
          title={
            <Typography variant="body1">
              Sample accounts ids are N0tail, s1mple, or 12754.
            </Typography>
          }
          arrow
          followCursor
        >
          <TextField
            placeholder="Skelly username or friend id"
            inputRef={textFieldRef}
            onChange={(e) => {
              const value = !e.target.value;
              if (value !== disabled) setDisabled(value);
            }}
            onKeyDown={(event) => {
              //console.log(event);
              if (event.key === "Enter") {
                if (disabled || loadingProfile) return;
                const friendId = textFieldRef.current?.value;
                if (friendId) fetchProfile(friendId);
              }
            }}
            style={{
              minWidth: "16rem",
            }}
          />
        </Tooltip>

        <Button
          variant="contained"
          disabled={disabled || loadingProfile}
          onClick={() => {
            if (disabled || loadingProfile) return;
            const friendId = textFieldRef.current?.value;
            if (friendId) fetchProfile(friendId);
          }}
        >
          Fetch profile
        </Button>
      </Stack>

      <Stack>
        {loadingProfile ? (
          <Stack
            gap="1.5rem"
            style={{
              alignItems: "center",
              marginRight: "auto",
            }}
          >
            <Typography variant="h6">Fetching profile</Typography>
            <CircularProgress size="4rem" />
          </Stack>
        ) : profile === null ? (
          <Typography variant="h6">Profile {accountId} not found</Typography>
        ) : profile ? (
          <>
            <Typography variant="h6">
              Profile {profile.customized_id || profile.friend_id}
            </Typography>
            <Stack direction="row" gap="1rem" style={{ flexWrap: "wrap" }}>
              <Profile
                profile={profile}
                onClick={() => {
                  const url = `https://skelly.gg/g/${
                    profile.customized_id || profile.friend_id
                  }`;
                  window.open(url, "_blank");
                }}
              />
              <Paper
                elevation={4}
                style={{
                  padding: "1rem",
                  width: "25rem",
                  //maxWidth: "50rem",
                }}
              >
                <Typography
                  variant="body1"
                  component="pre"
                  style={{
                    whiteSpace: "break-spaces",
                    //backgroundColor: "#f0f0f0",
                    fontSize: "0.8rem",
                  }}
                >
                  {JSON.stringify(profile, null, 2)}
                </Typography>
              </Paper>
            </Stack>
          </>
        ) : errorProfile ? (
          <div>Error</div>
        ) : null}
      </Stack>
    </Stack>
  );
}
