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
import { useProfiles } from "../react/useProfiles";
import Profile from "../react/Profile";

export default function App() {
  const [disabled, setDisabled] = React.useState<boolean>(true);

  const textFieldRef = React.useRef<HTMLTextAreaElement>(null);

  const { fetchProfiles, profiles, loadingProfiles, errorProfiles } =
    useProfiles();

  return (
    <Stack gap="3rem" style={{ padding: "1rem" }}>
      <Typography variant="h3">Skelly-app demo</Typography>

      <Stack direction="row" gap="1rem" style={{ flexWrap: "wrap" }}>
        <Tooltip
          title={
            <Typography variant="body1">
              Sample friend ids are 12746, 12750 and 12754.
            </Typography>
          }
          arrow
          followCursor
        >
          <TextField
            placeholder="Skelly friend id"
            inputRef={textFieldRef}
            onChange={(e) => {
              const value = !e.target.value;
              if (value !== disabled) setDisabled(value);
            }}
          />
        </Tooltip>

        <Button
          variant="contained"
          disabled={disabled || loadingProfiles}
          onClick={() => {
            if (disabled || loadingProfiles) return;
            const friendId = textFieldRef.current?.value;
            if (friendId) fetchProfiles([friendId]);
          }}
        >
          Fetch profile
        </Button>
      </Stack>

      <Stack>
        {loadingProfiles ? (
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
        ) : profiles ? (
          <>
            <Typography variant="h6">
              Profile {profiles[0].friend_id}
            </Typography>
            <Stack direction="row" gap="1rem" style={{ flexWrap: "wrap" }}>
              <Profile
                profile={profiles[0]}
                onClick={() => {
                  const url = `https://skelly.gg/g/${profiles[0].friend_id}`;
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
                  {JSON.stringify(profiles[0], null, 2)}
                </Typography>
              </Paper>
            </Stack>
          </>
        ) : errorProfiles ? (
          <div>Error</div>
        ) : null}
      </Stack>
    </Stack>
  );
}
