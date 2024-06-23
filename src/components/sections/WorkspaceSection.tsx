// Components
import WorkspaceLabel from "@/components/WorkspaceLabel";

export default function WorkspaceSection() {
  const experiencesList = [
    {
      id: 1,
      title: "Twigo",
      description:
        "Play and get trolled by your viewers in the most awesome ways while generating more revenue.",
      image: "/assets/twigo_logo.webp",
      startDate: "2023",
      endDate: "2024",
      link: "https://twigo.gg",
      jobTitle: "Game Developer",
    },
    {
      id: 2,
      title: "RapTV",
      description: "Hottest Rap News, Videos and Music.",
      image: "/assets/raptv_logo.webp",
      startDate: "2022",
      endDate: "2023",
      link: "https://raptv.com",
      jobTitle: "Discord Bot Developer",
    },
    {
      id: 3,
      title: "TopStrix",
      description:
        "TopStrix is the largest Minecraft network in Israel with over unique 70,000 overall players and over 3,000 daily login sessions.",
      image: "/assets/topstrix_logo.webp",
      startDate: "2017",
      endDate: "2022",
      link: "https://topstrix.co.il",
      jobTitle: "Java Developer",
    },
    {
      id: 4,
      title: "Discount Bank",
      description: "Financial services company.",
      image: "/assets/discount_logo.webp",
      startDate: "2022",
      endDate: "2023",
      link: "https://www.discountbank.co.il",
      jobTitle: "Security Controller",
    },
  ];

  const volunteeringList = [
    {
      id: 1,
      title: "Verart",
      description:
        "Verart specializes in crafting unique and captivating Minecraft experiences.",
      image: "/assets/verart_logo.webp",
      startDate: "2022",
      endDate: "Present",
      link: "https://verart.org",
      jobTitle: "System Administrator",
    },
    {
      id: 2,
      title: "PokeSMP",
      description:
        "Experience Minecraft like never before. Explore, catch and battle in a new, immersive Cobblemon Minecraft server.",
      image: "/assets/pokesmp_logo.webp",
      startDate: "2023",
      endDate: "Present",
      link: "https://pokesmp.net",
      jobTitle: "Server Owner",
    },
    {
      id: 3,
      title: "Spark Universe",
      description:
        "Spark Universe is a Minecraft creative, development and animation studio.",
      image: "/assets/sparkuniverse_logo.webp",
      startDate: "2022",
      endDate: "Present",
      link: "https://sparkuniverse.com/",
      jobTitle: "Essential Mod Tester",
    },
    {
      id: 4,
      title: "Noxcrew",
      description:
        "A team of creatives, Partnered with Microsoft to bring immersive experiences to Minecraft players worldwide.",
      image: "/assets/noxcrew_logo.webp",
      startDate: "2022",
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
