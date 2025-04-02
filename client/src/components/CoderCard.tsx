import React from 'react';
import { User } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { FileCode, Star, Trophy } from 'lucide-react';
import { getRandomAvatarSvg } from '@/lib/avatars';

interface CoderCardProps {
  coder: User;
  variant?: 'purple' | 'blue' | 'pink' | 'green';
}

const colorClasses = {
  purple: {
    bg: 'bg-purple-600',
    text: 'text-purple-600',
    specialization: 'bg-blue-600',
  },
  blue: {
    bg: 'bg-blue-400',
    text: 'text-blue-400',
    specialization: 'bg-yellow-600',
  },
  pink: {
    bg: 'bg-pink-500',
    text: 'text-pink-500',
    specialization: 'bg-orange-500',
  },
  green: {
    bg: 'bg-green-400',
    text: 'text-green-400',
    specialization: 'bg-green-600',
  },
};

const backgrounds = [
  'bg-purple-500',
  'bg-[#ceff00]',
  'bg-orange-500'
];

export default function CoderCard({ coder, variant = 'purple' }: CoderCardProps) {
  const cardColors = colorClasses[variant];
  const randomBg = backgrounds[coder.id % backgrounds.length];

  const handleViewProfile = () => {
    console.log(`View profile clicked for ${coder.username}`);
  };
  
  return (
    <div className={`${randomBg} pixel-corners overflow-hidden transition-transform duration-200 hover:-translate-y-2 cartridge-card`}>
      <div className="relative p-4">
        <div className="absolute top-3 left-3 bg-[#40b5ff] text-[#111111] text-xs px-2 py-1 rounded-sm font-medium">
          Limited Edition
        </div>
        <div className="h-48 md:h-52 flex justify-center items-center">
          <div 
            className="max-w-[80%] h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: getRandomAvatarSvg(coder.id) }}
          />
        </div>
      </div>
      <div className="p-4 text-center bg-[#111111] mt-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 text-left text-xs text-gray-300">
            End in
          </div>
          <div className="flex-1 text-right text-xs text-gray-300">
            {`21h : 56m : 21s`}
          </div>
        </div>
        <Button 
          className="w-full bg-card hover:bg-muted py-2 text-white text-sm transition-colors duration-200 font-medium"
          onClick={handleViewProfile}
        >
          BID NOW
        </Button>
        
        <div className="mt-3 text-center text-xs">
          <span className="text-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 256 417" className="mr-1">
              <path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
              <path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/>
              <path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"/>
              <path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z"/>
              <path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z"/>
              <path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z"/>
            </svg>
            50 Ethereum
          </span>
        </div>
      </div>
    </div>
  );
}
