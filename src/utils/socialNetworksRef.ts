export const socialNetworks: ISocialNetwork[] = [
  {
    id: "sTwitter",
    name: "Twitter",
    url: "https://twitter.com",
    getUrl: (account?: string) => `https://twitter.com/${account}`,
    icon: "twitter.webp",
  },
  {
    id: "sFB",
    name: "Facebook",
    url: "https://www.facebook.com",
    getUrl: (account?: string) => `https://www.facebook.com/${account}`,
    icon: "facebook.webp",
  },
  {
    id: "sInsta",
    name: "Instagram",
    url: "https://www.instagram.com",
    getUrl: (account?: string) => `https://www.instagram.com/${account}`,
    icon: "instagram.webp",
  },
  {
    id: "sPinterest",
    name: "Pinterest",
    url: "https://www.pinterest.com/",
    getUrl: (account?: string) => `https://www.pinterest.ch/${account}`,
    icon: "pinterest.png",
  },
  {
    id: "sTwitch",
    name: "Twitch",
    url: "https://www.twitch.tv",
    getUrl: (account?: string) => `https://www.twitch.tv/${account}`,
    icon: "TwitchGlitchPurple.svg",
  },
  {
    id: "sDouYu",
    name: "DouYu",
    url: "https://www.douyu.com",
    getUrl: (account?: string) => `https://www.douyu.com/${account}`,
    icon: "douyu.png",
  },
  {
    id: "sAfreecaTV",
    name: "AfreecaTV",
    url: "https://www.afreecatv.com/",
    getUrl: (account?: string) => `https://bj.afreecatv.com/${account}`,
    icon: "afreecatv.png",
  },
  {
    id: "sYouTube",
    name: "YouTube",
    url: "https://www.youtube.com",
    getUrl: (account?: string) => `https://www.youtube.com/channel/${account}`,
    icon: "youtube.png",
  },
  {
    id: "sVK",
    name: "VK",
    url: "https://vk.com",
    getUrl: (account?: string) => `https://vk.com/${account}`,
    icon: "vk.png",
  },
  {
    id: "sTelegram",
    name: "Telegram",
    url: "https://telegram.org/",
    getUrl: (account?: string) => `https://t.me/${account}`,
    icon: "telegram.webp",
  },
  {
    id: "sKick",
    name: "Kick",
    url: "https://kick.com/",
    getUrl: (account?: string) => `https://kick.com/${account}`,
    icon: "kick.svg",
    iconDark: "kick_dark.svg",
  },
  {
    id: "sTikTok",
    name: "TikTok",
    url: "https://www.tiktok.com/",
    getUrl: (account?: string) => `https://www.tiktok.com/@${account}`,
    icon: "TikTok.svg",
    iconDark: "TikTok_dark.svg",
  },
  {
    id: "sDiscord",
    name: "Discord server",
    url: "https://www.discord.com",
    getUrl: (url?: string) => url || "",
    icon: "discord.png",
    placeholder: "URL",
  },
];

export const socialNetworksSorted = socialNetworks.sort((a, b) =>
  a.name > b.name ? 1 : -1
);

export const socialNetworksById: Record<string, ISocialNetwork> =
  Object.fromEntries(socialNetworks.map((network) => [network.id, network]));

export interface ISocialNetwork {
  id: string;
  name: string;
  placeholder?: string; // Default is "Account"
  url: string;
  getUrl: (account?: string) => string;
  icon: string;
  iconDark?: string;
}

export function getIconURL(icon: string): string {
  return `https://skelly.gg/img/socialNetworks/${icon}`;
}
