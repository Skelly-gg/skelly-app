import React from "react";
import { IProfile, getProfiles } from "../graphQL/skellyGraphQL";

/**
 * Hook returns profiles based on a list of Skelly friend ids.
 *
 */
export function useProfiles() {
  const [friendIds, setFriendIds] = React.useState<string[] | undefined>(
    undefined
  );
  const [profiles, setProfiles] = React.useState<IProfile[] | undefined>(
    undefined
  );
  const [profilesById, setProfilesById] = React.useState<
    Record<string, IProfile> | undefined
  >(undefined);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const fetchProfiles = async (friendIds: string[]) => {
    if (loading) throw "ParallelLoadingNotSupported";

    setError(undefined);
    setFriendIds(friendIds);
    setProfiles(undefined);
    setProfilesById(undefined);
    setLoading(true);

    try {
      const profiles = await getProfiles(friendIds);
      setProfiles(profiles);
      setProfilesById(
        Object.fromEntries(profiles.map((p) => [p.friend_id, p]))
      );
    } catch (err: any) {
      setError(typeof err === "string" ? err : err.toString());
    }
    setLoading(false);
  };

  return {
    fetchProfiles,
    friendIds,
    loadingProfiles: loading,
    profiles,
    profilesById,
    errorProfiles: error,
  };
}
