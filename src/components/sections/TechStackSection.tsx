// Components
import TechLabel from "@/components/labels/TechLabel";

// Icons
import {
  SiKotlin,
  SiTypescript,
  SiReact,
  SiMysql,
  SiGit,
  SiLinux,
  SiIntellijidea,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiDocker,
  SiVercel,
  SiMariadb,
  SiRedis,
  SiCloudflare,
  SiNginx,
  SiGrafana,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import { BiLogoVisualStudio } from "react-icons/bi";
import { TbBrandNextjs, TbBrandCSharp } from "react-icons/tb";
import { RiJavaLine } from "react-icons/ri";

export default function TechStackSection() {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mt-20">Technologies 💻</h2>
      <div className="flex flex-wrap gap-4 mt-5 text-[var(--paragraph-color)]">
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
        <TechLabel label="Grafana">
          <SiGrafana />
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
        <TechLabel label="">
          <TbBrandCSharp />
        </TechLabel>
        <TechLabel label="Visual Studio Code">
          <BiLogoVisualStudio />
        </TechLabel>
        <TechLabel label="Visual Studio">
          <DiVisualstudio />
        </TechLabel>
        <TechLabel label="IntelliJ IDEA">
          <SiIntellijidea />
        </TechLabel>
      </div>
    </div>
  );
}
