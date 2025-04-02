import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertCodeSubmissionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Get featured coders
  app.get('/api/users/featured', async (_req, res) => {
    try {
      const users = await storage.getFeaturedUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch featured users' });
    }
  });
  
  // Get top coder
  app.get('/api/users/top', async (_req, res) => {
    try {
      const topUser = await storage.getTopUser();
      if (!topUser) {
        return res.status(404).json({ message: 'Top user not found' });
      }
      res.json(topUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch top user' });
    }
  });
  
  // Get user by ID
  app.get('/api/users/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  });
  
  // Create user
  app.post('/api/users', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid user data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create user' });
    }
  });
  
  // Get code submissions
  app.get('/api/code-submissions', async (req, res) => {
    try {
      const language = req.query.language as string || 'all';
      const submissions = await storage.getCodeSubmissions(language);
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch code submissions' });
    }
  });
  
  // Get code submission by ID
  app.get('/api/code-submissions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid submission ID' });
      }
      
      const submission = await storage.getCodeSubmission(id);
      if (!submission) {
        return res.status(404).json({ message: 'Code submission not found' });
      }
      
      res.json(submission);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch code submission' });
    }
  });
  
  // Create code submission
  app.post('/api/code-submissions', async (req, res) => {
    try {
      const submissionData = insertCodeSubmissionSchema.parse(req.body);
      const submission = await storage.createCodeSubmission(submissionData);
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid submission data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create code submission' });
    }
  });
  
  // Get user achievements
  app.get('/api/users/:id/achievements', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user achievements' });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
