// Components
import SocialButton from "@/components/SocialButton";

// Icons
import { RxDiscordLogo } from "react-icons/rx";
import { FiGithub } from "react-icons/fi";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

export default function SocialsSection() {
  return (
    <div className="flex space-x-4 text-2xl">
      <SocialButton link="https://github.rishon.systems">
        <FiGithub />
      </SocialButton>
      <SocialButton link="https://x.rishon.systems">
        <FaXTwitter />
      </SocialButton>
      <SocialButton link="https://linkedin.rishon.systems">
        <AiOutlineLinkedin />
      </SocialButton>
      <SocialButton link="https://discord.rishon.systems">
        <RxDiscordLogo />
      </SocialButton>
      <SocialButton link="mailto:mail@rishon.systems">
        <MdOutlineEmail />
      </SocialButton>
    </div>
  );
}
