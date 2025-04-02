import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedCoders from '@/components/FeaturedCoders';
import CoderOfTheMonth from '@/components/CoderOfTheMonth';
import CodeLibrary from '@/components/CodeLibrary';
import JoinCommunity from '@/components/JoinCommunity';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-white code-cursor">
      <Navbar />
      <HeroSection />
      <FeaturedCoders />
      <CoderOfTheMonth />
      <CodeLibrary />
      <JoinCommunity />
      <Footer />
    </div>
  );
}
