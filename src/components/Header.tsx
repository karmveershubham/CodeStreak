import Image from 'next/image';
import logo from "@/../../public/images/codestreaklogo.webp"
import { RainbowButton } from "@/components/ui/rainbow-button";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-6">
      <div className="flex items-center space-x-2">
        <div className="p-2">
          <Image src={logo} alt="CodeStreak Logo" width={40} height={40} />
        </div>
        <span className="font-bold text-lg">CodeStreak</span>
      </div>
      <nav className="flex space-x-6">
        <a href="#" className="mt-2 hover:underline">About</a>
        <a href="#" className="mt-2 hover:underline">Features</a>
        <a href="\login" > <RainbowButton>Get Started</RainbowButton></a>
      </nav>
    </header>
  );
};

export default Header;
