import { CodeSubmission, User } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Eye, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getRandomAvatarSvg } from '@/lib/avatars';

interface CodeCardProps {
  submission: CodeSubmission;
}

export default function CodeCard({ submission }: CodeCardProps) {
  const { data: user } = useQuery<User>({
    queryKey: [`/api/users/${submission.userId}`],
  });
  
  const formatRelativeTime = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return formatDistanceToNow(dateObj, { addSuffix: true });
    } catch (e) {
      return '3 hours ago';
    }
  };
  
  const getLanguageColor = (language: string) => {
    switch (language.toLowerCase()) {
      case 'python':
        return 'bg-blue-600';
      case 'javascript':
        return 'bg-yellow-600';
      case 'typescript':
        return 'bg-blue-500';
      case 'c++':
        return 'bg-purple-600';
      case 'rust':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };
  
  return (
    <div className="bg-background rounded-lg overflow-hidden transition-transform duration-200 hover:-translate-y-2 border border-muted">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg">{submission.title}</h3>
          <div className={`${getLanguageColor(submission.language)} text-xs px-2 py-1 rounded text-white`}>
            {submission.language}
          </div>
        </div>
        
        <div className="bg-card rounded-md p-3 h-32 overflow-hidden mb-4">
          <pre className="text-xs text-gray-300 overflow-hidden">
            {submission.code}
          </pre>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div 
              className="w-8 h-8 rounded-full mr-2 overflow-hidden bg-muted flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: user ? getRandomAvatarSvg(user.id, 32, 32) : '' }}
            />
            <span className="text-sm">{user?.displayName || 'Unknown User'}</span>
          </div>
          <div className="text-xs text-gray-400">
            {formatRelativeTime(submission.createdAt)}
          </div>
        </div>
        
        <div className="flex justify-between mt-4 pt-4 border-t border-muted">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Eye className="mr-1 h-4 w-4" /> View
          </Button>
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-secondary">
              <MessageSquare className="mr-1 h-4 w-4" /> {submission.comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-accent">
              <Heart className="mr-1 h-4 w-4" /> {submission.likes}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
