import React from "react";
import { getProfile, IProfile } from "../graphQL/skellyGraphQL";

/**
 * Hook returns profiles based on a list of Skelly friend ids.
 *
 * If there is no such profile, then profile is set to 'null'.
 *
 */
export function useFetchProfile() {
  const [accountId, setAccountId] = React.useState<string | undefined>(
    undefined
  );
  const [profile, setProfile] = React.useState<IProfile | null | undefined>(
    undefined
  );

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const fetchProfile = async (accountId: string) => {
    if (loading) throw "ParallelLoadingNotSupported";

    setError(undefined);
    setAccountId(accountId);
    setProfile(undefined);
    setLoading(true);

    try {
      const profile = await getProfile(accountId);
      //console.log(`useFetchProfile(): profile: `, JSON.stringify(profile));
      setProfile(profile);
    } catch (err: any) {
      //console.log(`useFetchProfile(): getProfile failed, error: `, err);
      setError(typeof err === "string" ? err : err.toString());
    }
    setLoading(false);
  };

  return {
    fetchProfile,
    accountId,
    loadingProfile: loading,
    profile,
    errorProfile: error,
  };
}
