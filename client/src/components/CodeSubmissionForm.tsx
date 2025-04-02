import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertCodeSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const submissionSchema = insertCodeSubmissionSchema.extend({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  code: z.string().min(10, { message: "Code must be at least 10 characters" }),
  language: z.string().min(1, { message: "Please select a language" }),
});

type SubmissionFormValues = z.infer<typeof submissionSchema>;

const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Rust",
  "Go",
  "Ruby",
  "PHP",
  "C#",
  "Swift",
  "Kotlin"
];

export default function CodeSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      title: "",
      code: "",
      language: "",
      userId: 1, // Default to first user for demo
    },
  });
  
  async function onSubmit(values: SubmissionFormValues) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/code-submissions", values);
      
      // Invalidate cache to refresh submissions list
      queryClient.invalidateQueries({ queryKey: ["/api/code-submissions"] });
      
      // Reset form
      form.reset({
        title: "",
        code: "",
        language: "",
        userId: 1,
      });
      
      toast({
        title: "Success!",
        description: "Your code has been submitted.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Card className="bg-card border-muted shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-pixel text-primary">Share Your Code</CardTitle>
        <CardDescription>
          Submit your code snippet to share with the CodeSphere community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Awesome sorting algorithm" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive title for your code snippet
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The programming language of your code
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="// Paste your code here"
                      className="font-mono h-48 resize-none bg-background"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Your code snippet - keep it concise and clean
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full font-pixel mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : "Submit Code"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-muted pt-4 text-xs text-muted-foreground">
        <p>All code submissions are public</p>
        <p>Syntax highlighting available</p>
      </CardFooter>
    </Card>
  );
}