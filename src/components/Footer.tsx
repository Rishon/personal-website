// Icons
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

// Components
import SocialButton from "@/components/SocialButton";

export default function Footer() {
  return (
    <footer className="w-full max-w-4xl mx-auto pb-10 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
        {/* Name */}
        <div className="font-bold text-xl mb-5 sm:mb-0 sm:inline-block text-left">
          Rishon Jaffe
          <p className="text-sm text-gray-600 font-medium text-center sm:text-left">
            Software Engineer
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 flex-wrap justify-center sm:justify-end text-xl mt-2 sm:mt-0">
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
      </div>
    </footer>
  );
}
