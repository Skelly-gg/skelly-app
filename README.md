# skelly-app

This library allows your to easily integrate your services with [Skelly](https://skelly.gg).

# Installation

Installing the package using npm:

```
npm install skelly-app
```

Installing the repository using git and launching the demo react app:

```
git clone https://github.com/Skelly-gg/skelly-app.git

cd skelly-app

npm install

npm run demo

start .\dist\index.html

```

You can also play with the [demo](https://skelly.gg/demo) online.

# Integration

## GraphQL

Here is how you can fetch profiles using GraphQL:

```
import { getProfile, getProfiles } from "skelly-app";

const profile = await getProfile("N0tail");
console.log(profile)

const profiles = await getProfiles(["Keria", "12728"])
console.log(profiles)
```

## React

You can easily integrate Profiles into your Raect application using our out-of-the-box component:

```
import {Profile} from "skelly-app";

export function App() {
  const { fetchProfile, accountId, loadingProfile, profile, errorProfile } =
    useFetchProfile();

  React.useEffect(() => {
    fetchProfile("S1mple");
  }, []);

  if (profile) return <Profile profile={profile} />;
  else return <div>Loading profile...</div>;
}
```

## Utilities

There are also convenient utility functions to process Skelly profiles:

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
