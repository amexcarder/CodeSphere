import { useState } from "react";
import { CodeSubmission, User } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { Eye, MessageSquare, Heart, Copy, Check, Share2, ExternalLink, Code as CodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getRandomAvatarSvg } from '@/lib/avatars';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CodeCardProps {
  submission: CodeSubmission;
}

export default function CodeCard({ submission }: CodeCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
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
      case 'java':
        return 'bg-red-500';
      case 'c++':
        return 'bg-purple-600';
      case 'rust':
        return 'bg-orange-600';
      case 'go':
        return 'bg-cyan-600';
      case 'ruby':
        return 'bg-red-600';
      case 'php':
        return 'bg-indigo-600';
      case 'c#':
        return 'bg-green-600';
      case 'swift':
        return 'bg-orange-500';
      case 'kotlin':
        return 'bg-purple-500';
      default:
        return 'bg-gray-600';
    }
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(submission.code);
    setIsCopied(true);
    toast({ title: "Code copied to clipboard" });
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  const handleShare = () => {
    // Create a shareable link (simplified for demo)
    const shareText = `Check out this ${submission.language} code: ${submission.title}`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: submission.title,
        text: shareText,
        url: shareUrl,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast({ title: "Share link copied to clipboard" });
    }
  };

  // Format code with some basic syntax highlighting
  const formatCode = (code: string, language: string) => {
    let formattedCode = code;
    
    // Extremely simple syntax highlighting based on language
    switch (language.toLowerCase()) {
      case 'javascript':
      case 'typescript':
        formattedCode = formattedCode
          .replace(/(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await)/g, '<span class="text-purple-400">$1</span>')
          .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-yellow-300">$1</span>')
          .replace(/(\/\/.*)/g, '<span class="text-green-400">$1</span>');
        break;
      case 'python':
        formattedCode = formattedCode
          .replace(/(def|class|import|from|as|return|if|elif|else|for|while|try|except|with)/g, '<span class="text-purple-400">$1</span>')
          .replace(/(".*?"|'.*?')/g, '<span class="text-yellow-300">$1</span>')
          .replace(/(#.*)/g, '<span class="text-green-400">$1</span>');
        break;
      // Add more languages as needed
    }
    
    return formattedCode;
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
        
        <div 
          className={`bg-card rounded-md p-3 ${expanded ? 'h-auto' : 'h-32'} overflow-hidden mb-4 relative group`}
          onClick={() => setExpanded(!expanded)}
        >
          <pre 
            className="text-xs text-gray-300 overflow-hidden font-mono"
            dangerouslySetInnerHTML={{ __html: formatCode(submission.code, submission.language) }}
          />
          
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent">
              <Button
                variant="ghost"
                size="sm"
                className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(true);
                }}
              >
                Expand
              </Button>
            </div>
          )}
          
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 rounded-full bg-card/50"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyCode();
              }}
            >
              {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
          </div>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Eye className="mr-1 h-4 w-4" /> View
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>{submission.title}</span>
                    <span className={`${getLanguageColor(submission.language)} text-xs px-2 py-1 rounded text-white ml-2`}>
                      {submission.language}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCopyCode}>
                      {isCopied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
                      {isCopied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="mr-1 h-4 w-4" /> Share
                    </Button>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <div 
                    className="w-6 h-6 rounded-full mr-2 overflow-hidden bg-muted flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: user ? getRandomAvatarSvg(user.id, 24, 24) : '' }}
                  />
                  <span className="text-sm">{user?.displayName || 'Unknown User'}</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{formatRelativeTime(submission.createdAt)}</span>
                </div>
                
                <div className="bg-card rounded-md p-4 max-h-[60vh] overflow-y-auto">
                  <pre 
                    className="text-sm text-gray-300 font-mono whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: formatCode(submission.code, submission.language) }}
                  />
                </div>
                
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center mr-4">
                    <Heart className="mr-1 h-4 w-4" />
                    {submission.likes} likes
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    {submission.comments} comments
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-secondary">
              <MessageSquare className="mr-1 h-4 w-4" /> {submission.comments}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-accent">
              <Heart className="mr-1 h-4 w-4" /> {submission.likes}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleCopyCode}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy code
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share link
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in sandbox
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CodeIcon className="mr-2 h-4 w-4" />
                  Fork code
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
