// Components
import ProjectLabel from "@/components/labels/ProjectLabel";

export default function Projects() {
  const projectsList = [
    {
      id: 1,
      title: "Server Tracker",
      description:
        "Website to track Minecraft servers players with graph display.",
      image: "/assets/projects/server_tracker_logo.webp",
      link: "https://track.rishon.systems",
    },
    {
      id: 2,
      title: "NovaFrame",
      description: "AI-powered creative platform for generating, enhancing, and transforming visuals with speed and precision. ",
      image: "/assets/projects/novaframe_logo.webp",
      link: "https://novaframe.io",
    },
    {
      id: 3,
      title: "Verart",
      description: "A Minecraft realms team that creates Minecraft maps and event hosting.",
      image: "/assets/volunteering/verart_logo.webp",
      link: "https://verart.org",
    },
    {
      id: 4,
      title: "Hystrix",
      description: "Building a new Hytale experience, together with the community.",
      image: "/assets/projects/hystrix_logo.webp",
      link: "https://hystrix.gg",
    },
    {
      id: 5,
      title: "PokeSMP",
      description: "An immersive Cobblemon Minecraft server.",
      image: "/assets/volunteering/pokesmp_logo.webp",
      link: "https://pokesmp.net",
    },
    {
      id: 6,
      title: "Sync",
      description:
        "Sync is a Minecraft Paper plugin that syncs player activity and data between instances.",
      image: "/assets/projects/sync_logo.webp",
      link: "https://github.com/Rishon/sync",
    },
    {
      id: 7,
      title: "Nametag",
      description:
        "Nametag is a Minecraft Paper plugin that allows you to create custom dynamic player name tags.",
      image: "/assets/projects/nametag_logo.webp",
      link: "https://github.com/Rishon/nametag",
    },
  ];

  return (
    <main className="p-4 space-y-20">
      {/* Main Container */}
      <div className="w-full max-w-4xl space-y-4 text-left">
        <h1 className="text-2xl sm:text-3xl font-bold">Projects 🔨</h1>
        <p className="text-lg sm:text-lg text-[var(--paragraph-color)]">
          Here are some of the projects I{"'"}ve worked on.
        </p>
        <div className="flex-col space-y-8 text-2xl">
          {projectsList.map((project) => (
            <ProjectLabel
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
