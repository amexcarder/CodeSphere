import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  level: integer("level").notNull().default(1),
  specialization: text("specialization"),
  avatarId: integer("avatar_id").notNull().default(1),
  submissions: integer("submissions").notNull().default(0),
  stars: integer("stars").notNull().default(0),
  trophies: integer("trophies").notNull().default(0),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  specialization: true,
  avatarId: true,
});

// Code submission schema
export const codeSubmissions = pgTable("code_submissions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  userId: integer("user_id").notNull(),
  comments: integer("comments").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCodeSubmissionSchema = createInsertSchema(codeSubmissions).pick({
  title: true,
  code: true,
  language: true,
  userId: true,
});

// Achievements schema
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  badgeClass: text("badge_class").notNull(),
});

export const insertAchievementSchema = createInsertSchema(achievements).pick({
  name: true,
  description: true,
  badgeClass: true,
});

// User achievements schema
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: integer("achievement_id").notNull(),
  earnedAt: timestamp("earned_at").notNull().defaultNow(),
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).pick({
  userId: true,
  achievementId: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type CodeSubmission = typeof codeSubmissions.$inferSelect;
export type InsertCodeSubmission = z.infer<typeof insertCodeSubmissionSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
