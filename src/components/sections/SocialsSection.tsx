// Components
import SocialButton from "@/components/SocialButton";

// Icons
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

export default function SocialsSection() {
  return (
    <div className="flex space-x-4 text-2xl">
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
  );
}
