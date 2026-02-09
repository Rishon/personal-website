import {
  SiKotlin,
  SiTypescript,
  SiReact,
  SiMysql,
  SiGit,
  SiLinux,
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
  SiAnsible,
  SiGnubash,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import { TbBrandNextjs, TbBrandCSharp } from "react-icons/tb";
import { RiJavaLine } from "react-icons/ri";
import { FaShieldAlt, FaNetworkWired } from "react-icons/fa";
import { IconType } from "react-icons";

interface SkillCategory {
  name: string;
  skills: { name: string; icon: IconType }[];
}

const categories: SkillCategory[] = [
  {
    name: "Backend",
    skills: [
      { name: "Java", icon: RiJavaLine },
      { name: "Kotlin", icon: SiKotlin },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "C#", icon: TbBrandCSharp },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: TbBrandNextjs },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "MariaDB", icon: SiMariadb },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "Linux", icon: SiLinux },
      { name: "Bash", icon: SiGnubash },
      { name: "Git", icon: SiGit },
      { name: "Nginx", icon: SiNginx },
      { name: "Ansible", icon: SiAnsible },
      { name: "Grafana", icon: SiGrafana },
      { name: "Cloudflare", icon: SiCloudflare },
      { name: "Vercel", icon: SiVercel },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section className="animate-section animation-delay-200">
      <h2 className="section-title">Skills</h2>
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.name}>
            <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span key={skill.name} className="skill-badge">
                  <skill.icon className="text-sm" />
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
