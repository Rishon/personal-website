// Components
import WorkspaceLabel from "@/components/labels/WorkspaceLabel";

export default function WorkspaceSection() {
  const experiencesList = [
    {
      id: 1,
      title: "LoverCraft LLC",
      description:
        "LoverCraft is a Minecraft server network ran by the YouTuber LoverFella",
      image: "/assets/workspace/lovercraft_logo.webp",
      startDate: "Jul 2024",
      endDate: "Present",
      link: "https://store.loverfella.com",
      jobTitle: "Maintenance Developer",
    },
    {
      id: 2,
      title: "Twigo",
      description:
        "Play and get trolled by your viewers in the most awesome ways while generating more revenue.",
      image: "/assets/workspace/twigo_logo.webp",
      startDate: "Jun 2023",
      endDate: "Jun 2024",
      link: "https://twigo.gg",
      jobTitle: "Game Developer",
    },
    {
      id: 3,
      title: "RapTV",
      description: "Hottest Rap News, Videos and Music.",
      image: "/assets/workspace/raptv_logo.webp",
      startDate: "Mar 2022",
      endDate: "Aug 2023",
      link: "https://raptv.com",
      jobTitle: "Discord Bot Developer",
    },
    {
      id: 4,
      title: "TopStrix",
      description:
        "TopStrix is the largest Minecraft network in Israel with over unique 70,000 overall players and over 3,000 daily login sessions.",
      image: "/assets/workspace/topstrix_logo.webp",
      startDate: "Jan 2017",
      endDate: "Dec 2022",
      link: "https://topstrix.co.il",
      jobTitle: "Java Developer",
    },
    {
      id: 5,
      title: "Discount Bank",
      description: "Financial services company.",
      image: "/assets/workspace/discount_logo.webp",
      startDate: "Aug 2022",
      endDate: "Jan 2023",
      link: "https://www.discountbank.co.il",
      jobTitle: "Security Control Room Operator",
    },
  ];

  const volunteeringList = [
    {
      id: 1,
      title: "Verart",
      description:
        "Verart specializes in crafting unique and captivating Minecraft experiences.",
      image: "/assets/volunteering/verart_logo.webp",
      startDate: "Oct 2022",
      endDate: "Present",
      link: "https://verart.org",
      jobTitle: "System Administrator",
    },
    {
      id: 2,
      title: "PokeSMP",
      description:
        "Experience Minecraft like never before. Explore, catch and battle in a new, immersive Cobblemon Minecraft server.",
      image: "/assets/volunteering/pokesmp_logo.webp",
      startDate: "May 2023",
      endDate: "Present",
      link: "https://pokesmp.net",
      jobTitle: "Server Owner",
    },
    {
      id: 3,
      title: "Spark Universe",
      description:
        "Spark Universe is a Minecraft creative, development and animation studio.",
      image: "/assets/volunteering/sparkuniverse_logo.webp",
      startDate: "Feb 2022",
      endDate: "Present",
      link: "https://sparkuniverse.com/",
      jobTitle: "Essential Mod Tester",
    },
    {
      id: 4,
      title: "Noxcrew",
      description:
        "A team of creatives, Partnered with Microsoft to bring immersive experiences to Minecraft players worldwide.",
      image: "/assets/volunteering/noxcrew_logo.webp",
      startDate: "Apr 2022",
      endDate: "Present",
      link: "https://noxcrew.com",
      jobTitle: "Internal Tester",
    },
  ];

  return (
    <div className="flex-col space-y-8 text-2xl">
      <h2 className="text-xl sm:text-2xl font-bold mt-20">Experience ⭐</h2>
      {experiencesList.map((experience) => (
        <WorkspaceLabel
          key={experience.id}
          title={experience.title}
          description={experience.description}
          image={experience.image}
          startDate={experience.startDate}
          endDate={experience.endDate}
          link={experience.link}
          jobTitle={experience.jobTitle}
        />
      ))}
      <h2 className="text-xl sm:text-2xl font-bold mt-20">Volunteering 🙌</h2>
      {volunteeringList.map((volunteering) => (
        <WorkspaceLabel
          key={volunteering.id}
          title={volunteering.title}
          description={volunteering.description}
          image={volunteering.image}
          startDate={volunteering.startDate}
          endDate={volunteering.endDate}
          link={volunteering.link}
          jobTitle={volunteering.jobTitle}
        />
      ))}
    </div>
  );
}
