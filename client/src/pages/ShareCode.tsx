import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CodeSubmission, User } from "@shared/schema";
import CodeSubmissionForm from "@/components/CodeSubmissionForm";
import CodeCard from "@/components/CodeCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";

export default function ShareCode() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  
  const { data: submissions = [], isLoading } = useQuery<CodeSubmission[]>({
    queryKey: ["/api/code-submissions"],
  });
  
  // Get all unique languages from submissions
  const languages = Array.from(new Set(submissions.map(sub => sub.language)));
  
  // Filter submissions based on search term and selected language
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = searchTerm === "" || 
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.code.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesLanguage = selectedLanguage === null || 
      submission.language === selectedLanguage;
      
    return matchesSearch && matchesLanguage;
  });
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLanguage(null);
  };
  
  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="sticky top-24">
            <CodeSubmissionForm />
          </div>
        </div>
        
        <div className="md:w-2/3">
          <h1 className="text-3xl font-pixel text-primary mb-6">Code Library</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by title or code..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {languages.map(language => (
                <Button
                  key={language}
                  variant={selectedLanguage === language ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(language === selectedLanguage ? null : language)}
                  className="text-xs"
                >
                  {language}
                </Button>
              ))}
              
              {(searchTerm || selectedLanguage) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Code</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 animate-pulse">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-muted rounded-lg h-64"></div>
                  ))}
                </div>
              ) : filteredSubmissions.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {filteredSubmissions.map(submission => (
                    <CodeCard key={submission.id} submission={submission} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No code snippets found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || selectedLanguage ? 
                      "Try adjusting your filters" : 
                      "Be the first to share code with the community!"}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="popular" className="mt-4">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 animate-pulse">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-muted rounded-lg h-64"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredSubmissions
                    .sort((a, b) => b.likes - a.likes)
                    .slice(0, 5)
                    .map(submission => (
                      <CodeCard key={submission.id} submission={submission} />
                    ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recent" className="mt-4">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-6 animate-pulse">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-muted rounded-lg h-64"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredSubmissions
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5)
                    .map(submission => (
                      <CodeCard key={submission.id} submission={submission} />
                    ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}