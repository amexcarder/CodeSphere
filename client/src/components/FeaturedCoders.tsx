import { useQuery } from '@tanstack/react-query';
import CoderCard from './CoderCard';
import { User } from '@shared/schema';
import { getRandomAvatarSvg } from '@/lib/avatars';

export default function FeaturedCoders() {
  const { data: featuredCoders, isLoading } = useQuery<User[]>({
    queryKey: ['/api/users/featured'],
  });
  
  const dummyCoders = [
    {
      id: 1,
      username: 'cyberape',
      displayName: 'CyberApe',
      level: 12,
      specialization: 'Python Specialist',
      avatarId: 1,
      submissions: 42,
      stars: 128,
      trophies: 5,
      joinedAt: new Date().toISOString(),
    },
    {
      id: 2,
      username: 'nftcold',
      displayName: 'NFT Cold',
      level: 18,
      specialization: 'JavaScript Expert',
      avatarId: 2,
      submissions: 76,
      stars: 214,
      trophies: 9,
      joinedAt: new Date().toISOString(),
    },
    {
      id: 3,
      username: 'coolmonkey',
      displayName: 'Cool Monkey',
      level: 15,
      specialization: 'Rust Developer',
      avatarId: 3,
      submissions: 31,
      stars: 102,
      trophies: 4,
      joinedAt: new Date().toISOString(),
    },
    {
      id: 4,
      username: 'algoape',
      displayName: 'AlgoApe',
      level: 21,
      specialization: 'C++ Master',
      avatarId: 4,
      submissions: 64,
      stars: 179,
      trophies: 7,
      joinedAt: new Date().toISOString(),
    }
  ];
  
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="font-bold text-3xl mb-2">Trading</h2>
            <p className="text-gray-400">Auctions</p>
          </div>
          <a href="#" className="text-primary hover:underline hidden md:block">
            View All <span className="ml-1">→</span>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="rounded-lg h-80 bg-background animate-pulse" />
            ))
          ) : (
            (featuredCoders || dummyCoders).map((coder) => (
              <CoderCard key={coder.id} coder={coder as User} />
            ))
          )}
        </div>
        
        <div className="flex justify-center mt-8 md:hidden">
          <a href="#" className="text-primary hover:underline">
            View All Coders <span className="ml-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
