import axios from "axios";

const apiUrl =
  "https://bcf36soklnc2hmz3bjgtkkprwa.appsync-api.us-east-1.amazonaws.com/graphql";
const apiKey = "da2-avv3ynvtwffbxp4gbql572izqm";

export interface IProfile {
  friend_id: string;
  visibility: string | null;
  avatar: string | null;
  gamer_names: string[] | null;
  real_time: {
    account: string | null;
    game: string | null;
    user_status: string | null;
  } | null;
  summary: string | null;
  country_of_residence: string | null;
  languages: string[] | null;
  social_networks:
    | {
        id: string;
        account: string | null;
      }[]
    | null;
  websites:
    | {
        url: string | null;
        title: string | null;
      }[]
    | null;
  discord: string | null;
}

const getProfilesQuery = `
    query getProfiles($friendIds: [String!]!) {
        getProfiles(friendIds: $friendIds) {
            websites {
                url
                title
            }
            visibility
            summary
            social_networks {
                account
                id
            }
            real_time {
                account
                game
                user_status
            }
            gamer_names
            languages
            friend_id
            discord
            country_of_residence
            avatar
        }
    }`;

export async function getProfile(friendId: string): Promise<IProfile> {
  const profiles = await getProfiles([friendId]);
  return profiles[0];
}

export async function getProfiles(friendIds: string[]): Promise<IProfile[]> {
  if (friendIds.length === 0) return [];

  const options = {
    url: apiUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    data: JSON.stringify({
      variables: {
        friendIds,
      },
      query: getProfilesQuery,
    }),
  };

  const result = await axios(options);

  if (result.status !== 200) {
    throw new Error("Error fetching profiles");
  }

  const profiles = result.data?.data?.getProfiles as IProfile[];

  return profiles;
}
