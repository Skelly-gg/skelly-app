import React from "react";
import { useTheme, Stack, Box } from "@mui/material";
import { getIconURL, socialNetworksById } from "../utils/socialNetworksRef";
import { IProfile } from "../graphQL/skellyGraphQL";

/**
 * React component
 *
 * @param param0
 * @returns
 */
export function SocialNetworks({ profile }: { profile: IProfile }) {
  const theme = useTheme();
  const mode = theme.palette.mode;

  if (!profile.social_networks?.length) return null;
  const socialNetworks = profile.social_networks;

  return (
    <Stack
      direction="column"
      gap="0.5rem"
      style={{
        flexWrap: "wrap",
        width: "2rem",
        //backgroundColor: "red"
      }}
    >
      {socialNetworks
        .slice(0)
        .reverse()
        .map((socialNetwork) => {
          if (!socialNetwork.account) return null;

          const networkDetails = socialNetworksById[socialNetwork.id];

          if (networkDetails === undefined)
            return (
              <div>
                Invalid identifier '{socialNetwork.id}' for the social network
              </div>
            );

          const url =
            socialNetwork.account &&
            networkDetails.getUrl(socialNetwork.account);

          const networkIcon =
            mode === "dark" && networkDetails.iconDark
              ? networkDetails.iconDark
              : networkDetails.icon;

          return (
            <Box
              sx={{
                filter: "grayscale(1)",
                "&:hover": {
                  filter: "grayscale(0)",
                },
              }}
            >
              <img
                key={networkDetails.id}
                src={getIconURL(networkIcon)}
                style={{
                  width: "2rem",
                  cursor: socialNetwork.account ? "pointer" : undefined,
                }}
                onClick={() => {
                  if (socialNetwork.account) {
                    window.open(url, "_blank");
                  }
                }}
              />
            </Box>
          );
        })}
    </Stack>
  );
}
