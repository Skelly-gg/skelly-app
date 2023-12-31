import {
  IProfileAvatar,
  IProfileBackground,
  IProfileNamed,
} from "../graphQL/skellyGraphQL";

export const DUMMY_AVATAR = `https://skelly.gg/img/profile/avatar_dummy.svg`;

export function getAvatar(profile?: IProfileAvatar): string {
  const friendId = profile?.friend_id;
  const avatar = profile?.avatar;

  if (
    friendId === undefined ||
    friendId === null ||
    avatar === undefined ||
    avatar === null
  )
    return DUMMY_AVATAR;
  return `https://avatar.skelly.gg/${friendId}/avatar/${avatar}`.replaceAll(
    " ",
    "%20"
  );
}

export const DUMMY_BACKGROUND = `https://skelly.gg/img/profile/background_dummy.svg`;

export function getBackground(profile?: IProfileBackground): string {
  const friendId = profile?.friend_id;
  const background = profile?.background;

  if (
    friendId === undefined ||
    friendId === null ||
    background === undefined ||
    background === null
  )
    return DUMMY_BACKGROUND;
  return `https://avatar.skelly.gg/${friendId}/background/${background}`.replaceAll(
    " ",
    "%20"
  );
}

/**
 * Function returns long version of the user's name.
 *
 * @returns "<real_name> | <list of gamer_names OR username OR friend_id>"
 */
export function getLongName(profile: IProfileNamed): string {
  const names: string[] = [];

  const gamerNames = Array.isArray(profile.gamer_names)
    ? profile.gamer_names.filter((name) => !!name)
    : [];
  if (gamerNames.length > 0) {
    names.push(gamerNames?.join(", "));
  }

  if (names.length === 0) {
    if (profile.customized_id) {
      names.push(profile.customized_id);
    } else {
      names.push(profile.friend_id);
    }
  }

  return names.join(" | ");
}

/**
 *
 * @returns "real_name" OR "first gamer_name" OR "username" OR "friend_id"
 */
export function getName(profile?: IProfileNamed): string {
  return (
    profile?.real_name ||
    (profile?.gamer_names?.length ? profile.gamer_names[0] : undefined) ||
    profile?.customized_id ||
    profile?.friend_id ||
    "n/a"
  );
}
