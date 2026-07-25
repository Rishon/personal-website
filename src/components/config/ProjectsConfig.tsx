export interface Project {
  title: string;
  description: string;
  image?: string;
  link: string;
  isGithub?: boolean;
  emoji?: string;
}

export const highlightedProjects: Project[] = [
  {
    title: "Zeraph",
    description:
      "Real-time DDoS protection for game servers, keeping communities secure.",
    image: "/assets/projects/zeraph_logo.webp",
    link: "https://zeraph.app",
  },
  {
    title: "Server Tracker",
    description:
      "Track Minecraft server players with real-time graphs and analytics.",
    image: "/assets/projects/server_tracker_logo.webp",
    link: "https://track.rishon.systems",
  },
  {
    title: "Mikud",
    description: "Find a zip code of an address in Israel.",
    emoji: "📍",
    link: "https://mikud.rishon.systems",
    isGithub: false,
  },
  {
    title: "Glade",
    description:
      "Community chat platform with Houses, Rooms, Voice, DMs, and end-to-end-encrypted messaging.",
    image: "/assets/projects/glade_logo.webp",
    link: "https://glade.chat",
    isGithub: false,
  },
];

export const allProjects: Project[] = [
  {
    title: "Glade",
    description:
      "Community chat platform with Houses, Rooms, Voice, DMs, and end-to-end-encrypted messaging.",
    image: "/assets/projects/glade_logo.webp",
    link: "https://glade.chat",
  },
  {
    title: "Server Tracker",
    description:
      "Track Minecraft server players with real-time graphs. Monitor player counts and server status.",
    image: "/assets/projects/server_tracker_logo.webp",
    link: "https://track.rishon.systems",
  },
  {
    title: "NovaFrame",
    description:
      "AI-powered creative platform for generating, enhancing, and transforming visuals with speed and precision.",
    image: "/assets/projects/novaframe_logo.webp",
    link: "https://novaframe.io",
  },
  {
    title: "PokeSMP",
    description:
      "An immersive Cobblemon Minecraft server experience for Pokémon fans.",
    image: "/assets/projects/pokesmp_logo.webp",
    link: "https://pokesmp.net",
  },
  {
    title: "Sync",
    description:
      "Minecraft Paper plugin that syncs player activity and data between instances seamlessly.",
    image: "/assets/projects/sync_logo.webp",
    link: "https://github.com/Rishon/sync",
    isGithub: true,
  },
  {
    title: "Zeraph",
    description: "Real-time DDoS protection for game servers.",
    image: "/assets/projects/zeraph_logo.webp",
    link: "https://zeraph.app",
  },
  {
    title: "Mikud",
    description: "Find a zip code of an address in Israel.",
    emoji: "📍",
    link: "https://mikud.rishon.systems",
    isGithub: false,
  },
  {
    title: "Verart",
    description: "A Minecraft marketplace team.",
    image: "/assets/projects/verart_logo.webp",
    link: "https://verart.org",
  },
];
