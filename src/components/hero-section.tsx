import { GiftIcon } from "lucide-react";
import ConfettiRain from "./confetti-rain";
import { Link } from "react-router";

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80";
const HeroSection = () => (
  <div
    className="relative w-full h-[90vh] flex flex-col justify-center items-center px-6 text-center text-white overflow-hidden"
    style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="absolute inset-0 bg-[#112D4E]/80 backdrop-blur-sm"></div>

    {/* Confetti placed behind content but above overlay */}
    <div className="absolute inset-0 pointer-events-none z-10">
      <ConfettiRain />
    </div>

    <div className="relative z-20 max-w-3xl">
      <h1 className="text-6xl font-veronica-scripts mb-4 drop-shadow-lg">
        Celebrate Every Birthday 🎉
      </h1>
      <p className="text-xl font-medium drop-shadow-md mb-10 leading-relaxed">
        Organize your loved ones’ birthdays, get reminders, and make every year
        special.
      </p>
      <div className="flex justify-center gap-6">
        <Link to={'/register'}
          className="flex items-center gap-2 bg-[#3F72AF] px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#112D4E] transition duration-300"
        >
          <GiftIcon size={22} /> Get Started
        </Link>
        <Link
          to={'/login'}
          className="flex items-center gap-2 bg-[#DBE2EF] text-[#112D4E] px-8 py-3 rounded-lg font-semibold shadow hover:bg-[#B0C4E3] transition"
        >
          Login
        </Link>
      </div>
    </div>
  </div>
);

export default HeroSection