import { 
  User, InsertUser, 
  CodeSubmission, InsertCodeSubmission,
  Achievement, InsertAchievement,
  UserAchievement, InsertUserAchievement 
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getFeaturedUsers(): Promise<User[]>;
  getTopUser(): Promise<User | undefined>;
  
  // Code submission operations
  getCodeSubmission(id: number): Promise<CodeSubmission | undefined>;
  getCodeSubmissions(language?: string): Promise<CodeSubmission[]>;
  createCodeSubmission(submission: InsertCodeSubmission): Promise<CodeSubmission>;
  
  // Achievement operations
  getAchievement(id: number): Promise<Achievement | undefined>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  // User achievements operations
  getUserAchievements(userId: number): Promise<Achievement[]>;
  addUserAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private codeSubmissions: Map<number, CodeSubmission>;
  private achievements: Map<number, Achievement>;
  private userAchievements: Map<number, UserAchievement>;
  private userIdCounter: number;
  private submissionIdCounter: number;
  private achievementIdCounter: number;
  private userAchievementIdCounter: number;

  constructor() {
    this.users = new Map();
    this.codeSubmissions = new Map();
    this.achievements = new Map();
    this.userAchievements = new Map();
    this.userIdCounter = 1;
    this.submissionIdCounter = 1;
    this.achievementIdCounter = 1;
    this.userAchievementIdCounter = 1;
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample users
    const users: InsertUser[] = [
      {
        username: 'cyberape',
        password: 'password123',
        displayName: 'CyberApe',
        specialization: 'Python Specialist',
        avatarId: 1,
      },
      {
        username: 'bytebender',
        password: 'password123',
        displayName: 'ByteBender',
        specialization: 'JavaScript Expert',
        avatarId: 2,
      },
      {
        username: 'quantumkat',
        password: 'password123',
        displayName: 'QuantumKat',
        specialization: 'Rust Developer',
        avatarId: 3,
      },
      {
        username: 'algoace',
        password: 'password123',
        displayName: 'AlgoAce',
        specialization: 'C++ Master',
        avatarId: 4,
      },
      {
        username: 'datadragon',
        password: 'password123',
        displayName: 'DataDragon',
        specialization: 'Machine Learning Specialist',
        avatarId: 5,
      },
    ];

    // Create sample users
    users.forEach(user => {
      this.createUser(user);
    });

    // Update user stats
    this.updateUser(1, { submissions: 42, stars: 128, trophies: 5, level: 12 });
    this.updateUser(2, { submissions: 76, stars: 214, trophies: 9, level: 18 });
    this.updateUser(3, { submissions: 31, stars: 102, trophies: 4, level: 15 });
    this.updateUser(4, { submissions: 64, stars: 179, trophies: 7, level: 21 });
    this.updateUser(5, { submissions: 98, stars: 342, trophies: 12, level: 35 });

    // Sample code submissions
    const submissions: InsertCodeSubmission[] = [
      {
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
      },
      {
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
      },
      {
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
      },
    ];

    // Create sample submissions
    submissions.forEach(submission => {
      this.createCodeSubmission(submission);
    });

    // Update submission stats
    this.updateSubmission(1, { comments: 8, likes: 24 });
    this.updateSubmission(2, { comments: 12, likes: 36 });
    this.updateSubmission(3, { comments: 15, likes: 42 });

    // Sample achievements
    const achievements: InsertAchievement[] = [
      {
        name: "100 Days of Code",
        description: "Completed the 100 days of code challenge",
        badgeClass: "bg-purple-900 bg-opacity-50 text-purple-300",
      },
      {
        name: "AI Challenge Winner",
        description: "Won the AI programming challenge",
        badgeClass: "bg-blue-900 bg-opacity-50 text-blue-300",
      },
      {
        name: "Hackathon Champion",
        description: "Won a hackathon event",
        badgeClass: "bg-green-900 bg-opacity-50 text-green-300",
      },
      {
        name: "Bug Bounty Hunter",
        description: "Found and fixed 10 critical bugs",
        badgeClass: "bg-red-900 bg-opacity-50 text-red-300",
      },
    ];

    // Create sample achievements
    achievements.forEach(achievement => {
      this.createAchievement(achievement);
    });

    // Assign achievements to users
    this.addUserAchievement({ userId: 5, achievementId: 1 });
    this.addUserAchievement({ userId: 5, achievementId: 2 });
    this.addUserAchievement({ userId: 5, achievementId: 3 });
    this.addUserAchievement({ userId: 5, achievementId: 4 });
    this.addUserAchievement({ userId: 2, achievementId: 1 });
    this.addUserAchievement({ userId: 2, achievementId: 3 });
    this.addUserAchievement({ userId: 3, achievementId: 2 });
    this.addUserAchievement({ userId: 4, achievementId: 4 });
  }

  private updateUser(id: number, updates: Partial<User>): void {
    const user = this.users.get(id);
    if (user) {
      this.users.set(id, { ...user, ...updates });
    }
  }

  private updateSubmission(id: number, updates: Partial<CodeSubmission>): void {
    const submission = this.codeSubmissions.get(id);
    if (submission) {
      this.codeSubmissions.set(id, { ...submission, ...updates });
    }
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date().toISOString();
    const user: User = {
      id,
      ...insertUser,
      level: 1,
      submissions: 0,
      stars: 0,
      trophies: 0,
      joinedAt: now,
    };
    this.users.set(id, user);
    return user;
  }

  async getFeaturedUsers(): Promise<User[]> {
    return Array.from(this.users.values())
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 4);
  }

  async getTopUser(): Promise<User | undefined> {
    return Array.from(this.users.values())
      .sort((a, b) => b.trophies - a.trophies)
      .slice(0, 1)[0];
  }

  // Code submission operations
  async getCodeSubmission(id: number): Promise<CodeSubmission | undefined> {
    return this.codeSubmissions.get(id);
  }

  async getCodeSubmissions(language?: string): Promise<CodeSubmission[]> {
    let submissions = Array.from(this.codeSubmissions.values());
    
    if (language && language !== 'all') {
      submissions = submissions.filter(
        (submission) => submission.language.toLowerCase() === language.toLowerCase()
      );
    }
    
    return submissions.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async createCodeSubmission(insertSubmission: InsertCodeSubmission): Promise<CodeSubmission> {
    const id = this.submissionIdCounter++;
    const now = new Date().toISOString();
    const submission: CodeSubmission = {
      id,
      ...insertSubmission,
      comments: 0,
      likes: 0,
      createdAt: now,
    };
    this.codeSubmissions.set(id, submission);
    
    // Update user submission count
    const user = await this.getUser(insertSubmission.userId);
    if (user) {
      this.updateUser(user.id, { submissions: user.submissions + 1 });
    }
    
    return submission;
  }

  // Achievement operations
  async getAchievement(id: number): Promise<Achievement | undefined> {
    return this.achievements.get(id);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.achievementIdCounter++;
    const achievement: Achievement = {
      id,
      ...insertAchievement,
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  // User achievements operations
  async getUserAchievements(userId: number): Promise<Achievement[]> {
    const userAchievementIds = Array.from(this.userAchievements.values())
      .filter((ua) => ua.userId === userId)
      .map((ua) => ua.achievementId);
    
    return Promise.all(
      userAchievementIds.map((id) => this.getAchievement(id))
    ).then((achievements) => achievements.filter((a): a is Achievement => a !== undefined));
  }

  async addUserAchievement(insertUserAchievement: InsertUserAchievement): Promise<UserAchievement> {
    const id = this.userAchievementIdCounter++;
    const now = new Date().toISOString();
    const userAchievement: UserAchievement = {
      id,
      ...insertUserAchievement,
      earnedAt: now,
    };
    this.userAchievements.set(id, userAchievement);
    return userAchievement;
  }
}

export const storage = new MemStorage();
