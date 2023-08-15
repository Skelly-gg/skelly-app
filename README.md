# skelly-app

This library allows your to easily integrate your services with [Skelly](https://skelly.gg).

# Installation

Installing package using npm:

```
npm install skelly-app
```

Installing repository using git and trying demo react app:

```
git clone https://github.com/Skelly-gg/skelly-app.git
cd skelly-app
npm install
npm run demo
start .\dist\index.html
```

You can also test the [demo online](https://skelly.gg/demo).

# Integration

## GraphQL

Fetching profiles using GraphQL:

```
import { getProfile, getProfiles } from "skelly-app";

const profile = await getProfile("N0tail");
console.log(profile)

const profiles = await getProfiles(["Keria", "12728"])
console.log(profiles)
```

## React

Integrating the Profile component into your React application:

```
import {Profile} from "skelly-app";

export function App() {
  const { fetchProfile, profile, accountId, loadingProfile, errorProfile } =
    useFetchProfile();

  React.useEffect(() => {
    fetchProfile("S1mple");
  }, []);

  if (profile) return <Profile profile={profile} />;
  else return <div>Loading profile...</div>;
}
```

## Utilities

Utility functions to manage Skelly profiles:

```
import { getProfile, getAvatar, getName, getLongName } from "skelly-app";

const profile = await getProfile("N0tail");

const avatarURL = getAvatar(profile)
console.log(avatarURL)

const name = getName(profile)
console.log(name)

const longName = getLongName(profile)
console.log(longName)
```
