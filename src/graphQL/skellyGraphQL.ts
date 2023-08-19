import axios from "axios";

const apiUrl =
  "https://bcf36soklnc2hmz3bjgtkkprwa.appsync-api.us-east-1.amazonaws.com/graphql";

// This api key is publicly available (and might change over time)
// You can request your api key by contacting us
const apiKey = "da2-avv3ynvtwffbxp4gbql572izqm";

export interface IProfile extends IProfileShort {
  customized_id: string | null;
  accounts:
    | {
        account: string;
        game: string;
        verified: boolean | null;
        // Dota 2
        dota2_mmr: number | null;
        dota2_confidence: number | null;
        dota2_rank: number | null;
        dota2_timestamp: number; // # time when Dota 2 data was last updated
        // Valorant
        valorant_rank: number | null;
        valorant_timestamp: number | null;
      }[]
    | null;
}

export interface IProfileShort
  extends IProfileNamed,
    IProfileAvatar,
    IProfileBase {
  visibility: string | null;
  subscription: string | null;
  birthdate_display: string | null;
  birthdate: number | null;

  background: string | null;
  real_name: string | null;
  real_time: {
    account: string | null;
    game: string | null;
    user_status: string | null;
  } | null;
  summary: string | null;
  country_of_residence: string | null;
  languages: string[] | null;
  nationalities: string[] | null;
  games:
    | {
        id: string;
      }[]
    | null;
  social_networks:
    | {
        id: string;
        account: string | null;
      }[]
    | null
    | null;
  websites:
    | {
        url: string | null;
        title: string | null;
      }[]
    | null;
  followees_count: number | null;
  followers_count: number | null;
  eMail: string | null;
  phone: string | null;
  discord: string | null;
  platforms:
    | {
        id: string;
      }[]
    | null;
}

export interface IProfileAvatar extends IProfileBase {
  avatar: string | null;
}

export interface IProfileNamed extends IProfileBase {
  gamer_names: string[] | null;
}

export interface IProfileBase {
  friend_id: string;
}

/**
 * Takes a friend id or customized id (i.e. username)
 */
const getProfileQuery = `
    query getProfile($accountId: String!) {
      getProfile(accountId: $accountId) {
        friend_id
        visibility
        subscription
        birthdate_display
        birthdate
        customized_id
        accounts {
          account
          game
          verified
          dota2_mmr
          dota2_confidence
          dota2_rank
          dota2_timestamp
          valorant_rank
          valorant_timestamp
        }
        avatar
        background
        eMail
        discord
        country_of_residence
        gamer_names
        followees_count
        followers_count
        games {
          id
        }
        languages
        nationalities
        phone
        platforms {
          id
        }
        real_name
        social_networks {
          id
          account
        }
        real_time {
          user_status
          timestamp
          valorant {
            round_number
            region
            ranked
            mode
            map
            custom
            agent
            match_outcome
            roster {
              character
              local
              name
              rank
              teammate
            }
          }
          game
          minecraft {
            mc_version
            name
            scene
            server
          }
          account
          dota {
            confidence
            game_mode
            game_state
            hero
            lobby_type
            match_id
            match_outcome
            mmr
            players {
              account
              hero
              name
              team_slot
              team
              rank
            }
            team_name
          }
        }
        summary
        teams {
          to
          role
          name
          id
          from
          active
        }
        tournaments {
          rank
          name
          id
          date
        }
        websites {
          url
          title
        }
      }
    }`;

/**
 * Only works with friend Id and has less information than getProfile.
 */
const getProfilesQuery = `
    query getProfiles($friendIds: [String!]!) {
      getProfiles(friendIds: $friendIds) {
        friend_id
        visibility
        subscription
        birthdate_display
        birthdate
        avatar
        background
        eMail
        discord
        country_of_residence
        gamer_names
        followees_count
        followers_count
        games {
          id
        }
        languages
        nationalities
        phone
        platforms {
          id
        }
        real_name
        social_networks {
          id
          account
        }
        real_time {
          user_status
          timestamp
          valorant {
            round_number
            region
            ranked
            mode
            map
            custom
            agent
            match_outcome
            roster {
              character
              local
              name
              rank
              teammate
            }
          }
          game
          minecraft {
            mc_version
            name
            scene
            server
          }
          account
          dota {
            confidence
            game_mode
            game_state
            hero
            lobby_type
            match_id
            match_outcome
            mmr
            players {
              account
              hero
              name
              team_slot
              team
              rank
            }
            team_name
          }
        }
        summary
        teams {
          to
          role
          name
          id
          from
          active
        }
        tournaments {
          rank
          name
          id
          date
        }
        websites {
          url
          title
        }
      }
    }`;

export async function getProfile(accountId: string): Promise<IProfile> {
  const options = {
    url: apiUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    data: JSON.stringify({
      variables: {
        accountId,
      },
      query: getProfileQuery,
    }),
  };

  const result = await axios(options);

  if (result.status !== 200) {
    throw new Error("Error fetching profiles");
  }

  const profile = result.data?.data?.getProfile as IProfile;

  return profile;
}

export async function getProfiles(
  friendIds: string[]
): Promise<IProfileShort[]> {
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

  const profiles = result.data?.data?.getProfiles as IProfileShort[];

  return profiles;
}
