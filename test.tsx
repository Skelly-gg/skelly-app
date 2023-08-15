import React from "react";

import { Profile } from "skelly-app";

export function App() {
  const { fetchProfile, profile, accountId, loadingProfile, errorProfile } =
    useFetchProfile();

  React.useEffect(() => {
    fetchProfile("S1mple");
  }, []);

  if (profile) return <Profile profile={profile} />;
  else return <div>Loading profile...</div>;
}
