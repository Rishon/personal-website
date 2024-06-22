// Components
import SocialButton from "@/components/Social";
import TechLabel from "@/components/TechLabel";

/// React
import React from "react";

// Icons
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
  SiGmail,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { RiJavaLine } from "react-icons/ri";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      {/* Main Container */}
      <div className="w-full max-w-4xl space-y-4 px-4 sm:px-0">
        {/* Introduction */}
        <div className="mt-4">
          <h1 className="text-2xl sm:text-4xl font-bold">
            Hi! I{"'"}m Rishon 👋
          </h1>
          <p className="text-lg sm:text-2xl mt-5 text-gray-300">
            I{"'"}m a 20-year-old self-taught software engineer from Israel,
            passionate about technology and always seeking new challenges to
            grow as a developer.
          </p>

          {/* Social */}
          <div className="flex space-x-4 mt-5  text-2xl">
            <SocialButton link="https://github.rishon.systems">
              <FaGithub />
            </SocialButton>
            <SocialButton link="https://x.rishon.systems">
              <FaXTwitter />
            </SocialButton>
            <SocialButton link="https://linkedin.rishon.systems">
              <FaLinkedin />
            </SocialButton>
            <SocialButton link="https://discord.rishon.systems">
              <FaDiscord />
            </SocialButton>
            <SocialButton link="mailto:mail@rishon.systems">
              <SiGmail />
            </SocialButton>
          </div>

          {/* Technologies */}
          <div className="mt-20">
            <h2 className="text-xl sm:text-2xl font-bold">Technologies</h2>
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
        </div>
      </div>
    </main>
  );
}
