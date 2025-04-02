import { useQuery } from '@tanstack/react-query';
import { User } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Crown, Share2, Heart } from 'lucide-react';
import { getRandomAvatarSvg } from '@/lib/avatars';

export default function CoderOfTheMonth() {
  const { data: topCoder, isLoading } = useQuery<User>({
    queryKey: ['/api/users/top'],
  });
  
  const dummyTopCoder = {
    id: 5,
    username: 'datadragon',
    displayName: 'DataDragon',
    level: 35,
    specialization: 'Machine Learning Specialist',
    avatarId: 5,
    submissions: 98,
    stars: 342,
    trophies: 12,
    joinedAt: new Date().toISOString(),
  };
  
  const coder = topCoder || dummyTopCoder;
  
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#FFE64D] rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <span className="inline-block bg-card text-[#FFE64D] px-4 py-1 rounded-full text-sm font-medium mb-4">
            <Crown className="inline-block mr-2 h-4 w-4" /> Featured
          </span>
          <h2 className="font-bold text-3xl">Buy and sell NFTs from the world's top artists</h2>
        </div>
        
        <div className="bg-gradient-to-br from-muted to-card rounded-lg p-1">
          <div className="pixel-corners bg-background p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFE64D] to-[#FF7846] opacity-50 animate-pulse rounded-lg"></div>
                  <div 
                    className="relative rounded-lg border-2 border-[#FFE64D] overflow-hidden h-80 md:h-96"
                    dangerouslySetInnerHTML={{ __html: getRandomAvatarSvg(coder.id, 400, 400) }}
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-[#FFE64D] text-background font-pixel text-xs px-3 py-2 rounded-full flex items-center">
                      <Crown className="mr-2 h-4 w-4" /> TOP CODER
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-pixel text-2xl mb-2 text-[#FFE64D]">{coder.displayName}</h3>
                    <p className="text-gray-400 mb-4">{coder.specialization} • Level {coder.level}</p>
                  </div>
                  <div className="bg-card rounded-full h-12 w-12 flex items-center justify-center">
                    <Share2 className="h-6 w-6 text-[#FFE64D]" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                  <div className="bg-card rounded p-3 text-center">
                    <div className="text-2xl font-bold text-[#FFE64D]">{coder.submissions}</div>
                    <div className="text-xs text-gray-400">Submissions</div>
                  </div>
                  <div className="bg-card rounded p-3 text-center">
                    <div className="text-2xl font-bold text-[#FFE64D]">{coder.stars}</div>
                    <div className="text-xs text-gray-400">Stars</div>
                  </div>
                  <div className="bg-card rounded p-3 text-center">
                    <div className="text-2xl font-bold text-[#FFE64D]">{coder.trophies}</div>
                    <div className="text-xs text-gray-400">Trophies</div>
                  </div>
                  <div className="bg-card rounded p-3 text-center">
                    <div className="text-2xl font-bold text-[#FFE64D]">5</div>
                    <div className="text-xs text-gray-400">Languages</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-bold mb-2 text-gray-300">ACHIEVEMENTS</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-900 bg-opacity-50 text-purple-300 px-2 py-1 rounded text-xs">100 Days of Code</span>
                    <span className="bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded text-xs">AI Challenge Winner</span>
                    <span className="bg-green-900 bg-opacity-50 text-green-300 px-2 py-1 rounded text-xs">Hackathon Champion</span>
                    <span className="bg-red-900 bg-opacity-50 text-red-300 px-2 py-1 rounded text-xs">Bug Bounty Hunter</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-bold mb-2 text-gray-300">CODING PHILOSOPHY</h4>
                  <p className="text-gray-400 italic">"Code is like humor. When you have to explain it, it's bad."</p>
                </div>
                
                <div className="bg-card rounded p-4">
                  <h4 className="text-sm font-bold mb-2 text-gray-300">FEATURED CODE</h4>
                  <pre className="text-xs overflow-x-auto">
<span className="syntax-keyword">def</span> <span className="syntax-python">neural_network</span>(data, weights, bias):
    <span className="syntax-comment"># A simple neural network implementation</span>
    layer1 = sigmoid_activation(np.dot(data, weights[0]) + bias[0])
    output = sigmoid_activation(np.dot(layer1, weights[1]) + bias[1])
    <span className="syntax-keyword">return</span> output</pre>
                </div>
                
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="bg-card hover:bg-muted border border-[#FFE64D] text-[#FFE64D]"
                  >
                    View Full Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
