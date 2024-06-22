// Components
import WorkspaceLabel from "@/components/WorkspaceLabel";

export default function WorkspaceSection() {
  return (
    <div className="flex-col space-y-8 text-2xl">
      <h2 className="text-xl sm:text-2xl font-bold mt-20">Experience ⭐</h2>
      <WorkspaceLabel
        title="PokeSMP"
        description="Experience Minecraft like never before. Explore, catch and battle in a new, immersive Cobblemon Minecraft server."
        image="/assets/pokesmp_logo.webp"
        startDate="2023"
        endDate="Present"
        link="https://pokesmp.net"
        jobTitle="Server Owner"
      />
      <WorkspaceLabel
        title="Verart"
        description="Verart specializes in crafting unique and captivating Minecraft experiences."
        image="/assets/verart_logo.webp"
        startDate="2022"
        endDate="Present"
        link="https://verart.org"
        jobTitle="System Administrator"
      />
      <WorkspaceLabel
        title="Spark Universe"
        description="Spark Universe is a Minecraft creative, development and animation studio."
        image="/assets/sparkuniverse_logo.webp"
        startDate="2022"
        endDate="Present"
        link="https://sparkuniverse.com/"
        jobTitle="Essential Mod Tester"
      />
      <WorkspaceLabel
        title="Noxcrew"
        description="A team of creatives, Partnered with Microsoft to bring immersive experiences to Minecraft players worldwide."
        image="/assets/noxcrew_logo.webp"
        startDate="2022"
        endDate="Present"
        link="https://noxcrew.com"
        jobTitle="Internal Tester"
      />
      <WorkspaceLabel
        title="Twigo"
        description="Play and get trolled by your viewers in the most awesome ways while generating more revenue."
        image="/assets/twigo_logo.webp"
        startDate="2023"
        endDate="2024"
        link="https://twigo.gg"
        jobTitle="Game Developer"
      />
      <WorkspaceLabel
        title="RapTV"
        description="Hottest Rap News, Videos and Music."
        image="/assets/raptv_logo.webp"
        startDate="2022"
        endDate="2023"
        link="https://raptv.com"
        jobTitle="Discord Bot Developer"
      />
      <WorkspaceLabel
        title="Discount Bank"
        description="Financial services company."
        image="/assets/discount_logo.webp"
        startDate="2022"
        endDate="2023"
        link="https://www.discountbank.co.il"
        jobTitle="Security Controller"
      />
      <WorkspaceLabel
        title="TopStrix"
        description="TopStrix is the largest Minecraft network in Israel with over unique 70,000 overall players and over 3,000 daily login sessions."
        image="/assets/topstrix_logo.webp"
        startDate="2017"
        endDate="2022"
        link="https://topstrix.co.il"
        jobTitle="Java Developer"
      />
    </div>
  );
}
