import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Code, Search, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogin = () => {
    // Handle login/register functionality
    console.log('Login/Register clicked');
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-md z-50 border-b border-muted">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2 text-primary text-xl">
            <Code className="h-5 w-5" />
          </div>
          <Link href="/">
            <a className="font-pixel text-sm md:text-base text-white">
              FREAKISH<span className="text-primary">MIND</span>
            </a>
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/">
            <a className="text-white hover:text-primary transition-colors text-sm">Discover</a>
          </Link>
          <Link href="/share-code">
            <a className="text-white hover:text-primary transition-colors text-sm">Share Code</a>
          </Link>
          <Link href="/marketplace">
            <a className="text-white hover:text-primary transition-colors text-sm">Marketplace</a>
          </Link>
          <Link href="/about">
            <a className="text-white hover:text-primary transition-colors text-sm">About</a>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <Button 
            variant="outline" 
            className="hidden md:block glowing-btn bg-transparent text-white hover:bg-muted border border-primary text-primary"
            onClick={handleLogin}
          >
            Connect Wallet
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-muted">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/">
                  <a className="text-white hover:text-primary transition-colors text-lg">Discover</a>
                </Link>
                <Link href="/share-code">
                  <a className="text-white hover:text-primary transition-colors text-lg">Share Code</a>
                </Link>
                <Link href="/marketplace">
                  <a className="text-white hover:text-primary transition-colors text-lg">Marketplace</a>
                </Link>
                <Link href="/about">
                  <a className="text-white hover:text-primary transition-colors text-lg">About</a>
                </Link>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-transparent text-white hover:bg-muted border border-primary text-primary"
                  onClick={handleLogin}
                >
                  Connect Wallet
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
