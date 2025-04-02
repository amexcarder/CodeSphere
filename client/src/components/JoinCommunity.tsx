import { Button } from '@/components/ui/button';
import { Code, Trophy, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JoinCommunity() {
  const handleCreateProfile = () => {
    console.log('Create profile clicked');
  };
  
  const handleLearnMore = () => {
    console.log('Learn more clicked');
  };
  
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold text-3xl md:text-4xl mb-4">Ready to join our coding community?</h2>
            <p className="text-gray-400 mb-8 text-lg">Create your profile, showcase your work, and connect with other student coders!</p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                className="glowing-btn bg-primary hover:bg-primary/90 text-background font-bold px-8 py-6 rounded-md text-lg transition-all duration-300"
                onClick={handleCreateProfile}
              >
                Create Your Profile
              </Button>
              <Button
                variant="outline"
                className="bg-transparent hover:bg-card border border-white text-white px-8 py-6 rounded-md text-lg transition-colors"
                onClick={handleLearnMore}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-lg bg-card flex items-center justify-center mx-auto mb-4">
                <Code className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">Share Your Code</h3>
              <p className="text-gray-400">Upload projects and get feedback from peers</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-lg bg-card flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-[#FFE64D] h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">Earn Achievements</h3>
              <p className="text-gray-400">Level up and earn badges as you learn</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 rounded-lg bg-card flex items-center justify-center mx-auto mb-4">
                <Users className="text-secondary h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl mb-2">Build Connections</h3>
              <p className="text-gray-400">Connect with other students and mentors</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
