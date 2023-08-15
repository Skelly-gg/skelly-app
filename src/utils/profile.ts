import { IProfileShort } from "../graphQL/skellyGraphQL";

export const DUMMY_AVATAR = `https://skelly.gg/img/profile/avatar_dummy.svg`;

export function getAvatar(profile?: IProfileShort): string {
  const friendId = profile?.friend_id;
  const avatar = profile?.avatar;

  if (
    friendId === undefined ||
    friendId === null ||
    avatar === undefined ||
    avatar === null
  )
    return DUMMY_AVATAR;
  return `https://avatar.skelly.gg/${friendId}/avatar/${avatar}`;
}

/**
 *
 * @returns "<real_name> | <list of gamer_names OR friend_id>"
 */
export function getLongName(profile: IProfileShort): string {
  const names: string[] = [];

  const gamerName =
    Array.isArray(profile.gamer_names) && profile.gamer_names.length > 0
      ? profile.gamer_names.join(", ")
      : undefined;
  if (gamerName) {
    names.push(gamerName);
  }

  if (names.length === 0) {
    names.push(profile.friend_id);
  }

  return names.join(" | ");
}

/**
 *
 * @returns "real_name" OR "first gamer_name" OR "friend_id"
 */
export function getName(profile?: IProfileShort): string {
  return (
    (profile?.gamer_names?.length ? profile.gamer_names[0] : undefined) ||
    profile?.friend_id ||
    "n/a"
  );
}
