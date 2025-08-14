import { Github, Instagram, Send } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => (
  <footer className="bg-[#DBE2EF] py-10 mt-20">
    <div className="container flex flex-col md:flex-row justify-between items-center gap-6 text-[#112D4E]">
      <div className="text-center md:text-left">
        <p className="font-semibold text-lg">
          Made with 💙 by <strong>Kholmuminov</strong>
        </p>
        <p className="text-sm opacity-80 mt-1">
          © {new Date().getFullYear()} Birthmark. All rights reserved.
        </p>
      </div>
      <div className="flex gap-8 text-3xl">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="hover:text-[#3F72AF] transition-transform transform hover:scale-110"
        >
          <a
            href="https://t.me/yourhandle"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
          >
            <Send />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="hover:text-[#3F72AF] transition-transform transform hover:scale-110"
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="hover:text-[#3F72AF] transition-transform transform hover:scale-110"
        >
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Instagram />
          </a>
        </Button>
      </div>
    </div>
  </footer>
);

export default Footer