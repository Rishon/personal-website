// Components
import TechLabel from "@/components/TechLabel";

// Icons
import {
  SiKotlin,
  SiTypescript,
  SiReact,
  SiMysql,
  SiGit,
  SiLinux,
  SiIntellijidea,
  SiVisualstudiocode,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiCsharp,
  SiDocker,
  SiVisualstudio,
  SiVercel,
  SiMariadb,
  SiRedis,
  SiCloudflare,
  SiNginx,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { RiJavaLine } from "react-icons/ri";

export default function TechStackSection() {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mt-20">Technologies 💻</h2>
      <div className="flex flex-wrap gap-4 mt-5 text-gray-300">
        <TechLabel label="Java">
          <RiJavaLine />
        </TechLabel>
        <TechLabel label="TypeScript">
          <SiTypescript />
        </TechLabel>
        <TechLabel label="Next.js">
          <TbBrandNextjs />
        </TechLabel>
        <TechLabel label="Git">
          <SiGit />
        </TechLabel>
        <TechLabel label="MariaDB">
          <SiMariadb />
        </TechLabel>
        <TechLabel label="Linux">
          <SiLinux />
        </TechLabel>
        <TechLabel label="Kotlin">
          <SiKotlin />
        </TechLabel>
        <TechLabel label="JavaScript">
          <SiJavascript />
        </TechLabel>
        <TechLabel label="Vercel">
          <SiVercel />
        </TechLabel>
        <TechLabel label="Docker">
          <SiDocker />
        </TechLabel>
        <TechLabel label="Redis">
          <SiRedis />
        </TechLabel>
        <TechLabel label="Cloudflare">
          <SiCloudflare />
        </TechLabel>
        <TechLabel label="Nginx">
          <SiNginx />
        </TechLabel>
        <TechLabel label="React">
          <SiReact />
        </TechLabel>
        <TechLabel label="MySQL">
          <SiMysql />
        </TechLabel>
        <TechLabel label="Node.js">
          <SiNodedotjs />
        </TechLabel>
        <TechLabel label="MongoDB">
          <SiMongodb />
        </TechLabel>
        <TechLabel label="C#">
          <SiCsharp />
        </TechLabel>
        <TechLabel label="Visual Studio Code">
          <SiVisualstudiocode />
        </TechLabel>
        <TechLabel label="Visual Studio">
          <SiVisualstudio />
        </TechLabel>
        <TechLabel label="IntelliJ IDEA">
          <SiIntellijidea />
        </TechLabel>
      </div>
    </div>
  );
}
