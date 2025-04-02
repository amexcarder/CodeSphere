import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const handleCreateProfile = () => {
    console.log('Create profile clicked');
  };
  
  return (
    <section className="pt-20 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-card to-background"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
              Create, Explore &Collect<span className="text-primary">✻</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-8">Digital Art NFTs</h2>
            
            <div className="mt-12 gap-8 hidden">
              <div className="flex flex-col items-center">
                <span className="text-primary font-pixel text-2xl md:text-3xl">78k+</span>
                <span className="text-gray-400 text-sm mt-1">Active User</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-secondary font-pixel text-2xl md:text-3xl">27k+</span>
                <span className="text-gray-400 text-sm mt-1">Artist</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-accent font-pixel text-2xl md:text-3xl">44k+</span>
                <span className="text-gray-400 text-sm mt-1">Collectors</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-primary opacity-50 blur-xl animate-pulse rounded-xl"></div>
              <div className="relative z-10">
                <svg className="w-72 h-72 md:w-80 md:h-80" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M67.6,-20.6C74.3,7.3,59.7,42.2,33.4,59.7C7.1,77.2,-30.8,77.4,-55.3,58.6C-79.9,39.9,-91,2.2,-80.9,-26.6C-70.9,-55.5,-39.7,-75.4,-6.9,-73.1C25.9,-70.7,60.9,-48.4,67.6,-20.6Z" 
                    fill="#ccff00" 
                    transform="translate(100 100)" 
                  />
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-52 h-52" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100 100)">
                      {/* Simplified monkey with headphones SVG */}
                      <svg width="200" height="200" viewBox="-100 -100 200 200">
                        <path d="M0,-60 C30,-60 60,-30 60,0 C60,30 30,60 0,60 C-30,60 -60,30 -60,0 C-60,-30 -30,-60 0,-60 Z" fill="#3a3a3a" />
                        <path d="M-40,-10 C-30,-40 30,-40 40,-10 C45,0 45,30 40,40 C30,60 -30,60 -40,40 C-45,30 -45,0 -40,-10 Z" fill="#5a5a5a" />
                        <path d="M-20,-5 C-10,-15 10,-15 20,-5 C25,0 25,15 20,20 C10,30 -10,30 -20,20 C-25,15 -25,0 -20,-5 Z" fill="#7a7a7a" />
                        <circle cx="-15" cy="-20" r="10" fill="white" />
                        <circle cx="15" cy="-20" r="10" fill="white" />
                        <circle cx="-13" cy="-18" r="6" fill="black" />
                        <circle cx="13" cy="-18" r="6" fill="black" />
                        <path d="M-10,5 C-5,10 5,10 10,5" stroke="black" fill="none" strokeWidth="2" />
                        {/* Headphones */}
                        <rect x="-40" y="-35" width="15" height="30" rx="5" fill="black" />
                        <rect x="25" y="-35" width="15" height="30" rx="5" fill="black" />
                        <path d="M-25,-20 L-45,-20 C-50,-20 -55,-15 -55,-10 L-55,10 C-55,15 -50,20 -45,20 L-40,20" stroke="black" fill="none" strokeWidth="4" />
                        <path d="M25,-20 L45,-20 C50,-20 55,-15 55,-10 L55,10 C55,15 50,20 45,20 L40,20" stroke="black" fill="none" strokeWidth="4" />
                        <path d="M-55,0 L-65,0 C-70,0 -75,5 -75,10 L-75,20 C-75,25 -70,30 -65,30 L-60,30" stroke="black" fill="none" strokeWidth="3" />
                        <path d="M55,0 L65,0 C70,0 75,5 75,10 L75,20 C75,25 70,30 65,30 L60,30" stroke="black" fill="none" strokeWidth="3" />
                      </svg>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="flex flex-wrap mt-8 gap-8 justify-center md:justify-start">
          <div className="flex flex-col items-center">
            <span className="text-primary font-pixel text-2xl md:text-3xl">78k+</span>
            <span className="text-gray-400 text-sm mt-1">Active User</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-secondary font-pixel text-2xl md:text-3xl">27k+</span>
            <span className="text-gray-400 text-sm mt-1">Artist</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-accent font-pixel text-2xl md:text-3xl">44k+</span>
            <span className="text-gray-400 text-sm mt-1">Collectors</span>
          </div>
        </div>
      </div>
    </section>
  );
}
