import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CodeSubmission } from '@shared/schema';
import CodeCard from './CodeCard';
import { Button } from '@/components/ui/button';
import { Code, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CodeLibrary() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  
  const { data: codeSubmissions, isLoading } = useQuery<CodeSubmission[]>({
    queryKey: ['/api/code-submissions', selectedLanguage],
  });
  
  const dummySubmissions = [
    {
      id: 1,
      title: "Quick Sort Implementation",
      code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)`,
      language: "Python",
      userId: 2,
      comments: 8,
      likes: 24,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      title: "React Hook: useLocalStorage",
      code: `const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  // More code...`,
      language: "JavaScript",
      userId: 3,
      comments: 12,
      likes: 36,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      title: "Neural Network from Scratch",
      code: `class NeuralNetwork:
    def __init__(self, layers):
        self.layers = layers
        self.weights = []
        self.biases = []
        
        # Initialize weights and biases
        for i in range(len(layers)-1):
            w = np.random.randn(layers[i], layers[i+1])
            b = np.zeros((1, layers[i+1]))`,
      language: "Python",
      userId: 5,
      comments: 15,
      likes: 42,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ];
  
  const handleLanguageFilter = (language: string) => {
    setSelectedLanguage(language);
  };
  
  const handleLoadMore = () => {
    console.log('Load more clicked');
  };
  
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="font-bold text-3xl mb-2">Buy and sell NFTs from the world's top artists</h2>
            <p className="text-gray-400">More than 10,000 premium digital</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-card hover:bg-muted">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-card hover:bg-muted">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="rounded-lg h-96 bg-background animate-pulse" />
            ))
          ) : (
            (codeSubmissions || dummySubmissions).map((submission) => (
              <CodeCard key={submission.id} submission={submission as CodeSubmission} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
