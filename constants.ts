import { ServiceItem } from './types';

// 50 ZOOM SESSIONS: 30 Full Class (55 min) + 20 Half Class (25 min)
export const SERVICES_LIST: ServiceItem[] = [
  // ============ FULL CLASS (55 MIN) - $49 - DEEP DIVE SESSIONS ============
  
  // Creative & Design
  { id: 'fc1', category: 'Creative & Design', title: 'Logo Design Workshop', description: 'From concept to 5 polished logo options — walk away with files you can use.', iconName: 'Palette', classType: 'full' },
  { id: 'fc2', category: 'Creative & Design', title: 'Music Production Session', description: 'Create a complete beat or song together — any genre, your vision, professional guidance.', iconName: 'Music', classType: 'full' },
  { id: 'fc3', category: 'Creative & Design', title: 'Brand Identity Package', description: 'Colors, fonts, logo concepts, and mood board — complete brand foundation.', iconName: 'Layers', classType: 'full' },
  { id: 'fc4', category: 'Creative & Design', title: 'Photo Editing Mastery', description: 'Transform up to 10 photos with professional retouching and learn the techniques.', iconName: 'Image', classType: 'full' },
  { id: 'fc5', category: 'Creative & Design', title: 'Video Content Creation', description: 'Plan, shoot tips, and edit a video for TikTok, Reels, or YouTube together.', iconName: 'Video', classType: 'full' },
  
  // Tech & Digital
  { id: 'fc6', category: 'Tech & Digital', title: 'Website Setup Complete', description: 'Build a simple website from scratch — domain, design, and launch-ready.', iconName: 'Globe', classType: 'full' },
  { id: 'fc7', category: 'Tech & Digital', title: 'Smartphone Power User', description: 'Master every feature of your phone — hidden tricks, organization, and productivity.', iconName: 'Smartphone', classType: 'full' },
  { id: 'fc8', category: 'Tech & Digital', title: 'Computer Speed & Security', description: 'Full cleanup, speed optimization, and security setup for your PC or Mac.', iconName: 'Monitor', classType: 'full' },
  { id: 'fc9', category: 'Tech & Digital', title: 'Social Media Strategy', description: 'Complete posting plan, content ideas, and growth strategy for your accounts.', iconName: 'Instagram', classType: 'full' },
  { id: 'fc10', category: 'Tech & Digital', title: 'Online Safety Masterclass', description: 'Passwords, privacy, scam protection — comprehensive digital safety setup.', iconName: 'Shield', classType: 'full' },
  
  // Business & Career
  { id: 'fc11', category: 'Business & Career', title: 'Side Hustle Launch', description: 'Turn your idea into a real business plan with first steps mapped out.', iconName: 'Rocket', classType: 'full' },
  { id: 'fc12', category: 'Business & Career', title: 'Freelance Business Setup', description: 'Pricing, contracts, finding clients, and getting paid — complete freelancer toolkit.', iconName: 'Briefcase', classType: 'full' },
  { id: 'fc13', category: 'Business & Career', title: 'Job Interview Bootcamp', description: 'Practice tough questions, body language, and walk in confident.', iconName: 'UserCheck', classType: 'full' },
  { id: 'fc14', category: 'Business & Career', title: 'Personal Branding Workshop', description: 'Define your story, refine your message, and stand out professionally.', iconName: 'Award', classType: 'full' },
  { id: 'fc15', category: 'Business & Career', title: 'Sell Online Workshop', description: 'Set up Etsy, eBay, or marketplace shop — listings, photos, and first sale strategy.', iconName: 'ShoppingBag', classType: 'full' },
  
  // Communication & Confidence
  { id: 'fc16', category: 'Communication', title: 'Public Speaking Intensive', description: 'Structured practice with feedback — eliminate filler words, project confidence.', iconName: 'Mic', classType: 'full' },
  { id: 'fc17', category: 'Communication', title: 'Presentation Mastery', description: 'Design stunning slides and deliver a presentation that captivates.', iconName: 'Presentation', classType: 'full' },
  { id: 'fc18', category: 'Communication', title: 'Networking & Connection', description: 'Master introductions, small talk, and building professional relationships.', iconName: 'Users', classType: 'full' },
  { id: 'fc19', category: 'Communication', title: 'Video Presence Coaching', description: 'Look and sound great on Zoom calls — lighting, audio, and on-camera confidence.', iconName: 'Camera', classType: 'full' },
  
  // Lifestyle & Home
  { id: 'fc20', category: 'Lifestyle', title: 'Home Organization System', description: 'Create lasting systems for any room — declutter and design spaces that work.', iconName: 'Home', classType: 'full' },
  { id: 'fc21', category: 'Lifestyle', title: 'Meal Planning Complete', description: 'Week of meals, shopping list, prep strategy — eat better with less stress.', iconName: 'ChefHat', classType: 'full' },
  { id: 'fc22', category: 'Lifestyle', title: 'Budget & Money Blueprint', description: 'Set up a real budget system, track spending, and build money habits.', iconName: 'PiggyBank', classType: 'full' },
  { id: 'fc23', category: 'Lifestyle', title: 'Wardrobe Makeover', description: 'Find your style, identify what works, build a capsule wardrobe plan.', iconName: 'Shirt', classType: 'full' },
  { id: 'fc24', category: 'Lifestyle', title: 'Plant Parent Bootcamp', description: 'Choose the right plants for your space and learn care routines that work.', iconName: 'Leaf', classType: 'full' },
  
  // Music & Creative Arts
  { id: 'fc25', category: 'Music & Arts', title: 'Guitar Starter Session', description: 'Learn chords, strumming, and play your first song by the end.', iconName: 'Guitar', classType: 'full' },
  { id: 'fc26', category: 'Music & Arts', title: 'Singing & Voice Session', description: 'Breathing, pitch, and performance — build real singing confidence.', iconName: 'MicVocal', classType: 'full' },
  { id: 'fc27', category: 'Music & Arts', title: 'DJ & Mixing Intro', description: 'Learn to mix tracks, create transitions, and understand DJ basics.', iconName: 'Disc', classType: 'full' },
  
  // Wellness & Growth
  { id: 'fc28', category: 'Wellness', title: 'Stress Relief System', description: 'Build a personalized toolkit — breathing, mindfulness, and daily habits.', iconName: 'Heart', classType: 'full' },
  { id: 'fc29', category: 'Wellness', title: 'Sleep Transformation', description: 'Identify what keeps you up and build a bedtime routine that works.', iconName: 'Moon', classType: 'full' },
  { id: 'fc30', category: 'Wellness', title: 'Goal Setting & Planning', description: 'Map out your goals with actionable steps and accountability structure.', iconName: 'Target', classType: 'full' },

  // ============ HALF CLASS (25 MIN) - $29 - QUICK WINS ============
  
  // Quick Creative
  { id: 'hc1', category: 'Quick Creative', title: 'Quick Logo Concepts', description: 'Fast brainstorm — 3 logo direction ideas in one session.', iconName: 'Pencil', classType: 'half' },
  { id: 'hc2', category: 'Quick Creative', title: 'Photo Quick Edit', description: 'Transform 3 photos with quick professional touch-ups.', iconName: 'ImagePlus', classType: 'half' },
  { id: 'hc3', category: 'Quick Creative', title: 'Caption & Bio Writing', description: 'Craft perfect captions or bios for your social profiles.', iconName: 'Type', classType: 'half' },
  { id: 'hc4', category: 'Quick Creative', title: 'Playlist Builder', description: 'Curated playlist for any mood, event, or vibe you need.', iconName: 'Headphones', classType: 'half' },
  
  // Quick Tech
  { id: 'hc5', category: 'Quick Tech', title: 'Fix One Tech Issue', description: 'Bring your one frustrating problem — we solve it together.', iconName: 'Wrench', classType: 'half' },
  { id: 'hc6', category: 'Quick Tech', title: 'App Setup & Tour', description: 'Get any app installed and learn to use it properly.', iconName: 'Download', classType: 'half' },
  { id: 'hc7', category: 'Quick Tech', title: 'Email Inbox Cleanup', description: 'Organize, unsubscribe, and set up folders that work.', iconName: 'Mail', classType: 'half' },
  { id: 'hc8', category: 'Quick Tech', title: 'Phone Photo Backup', description: 'Set up automatic backup so you never lose memories.', iconName: 'Cloud', classType: 'half' },
  
  // Quick Business
  { id: 'hc9', category: 'Quick Business', title: 'Resume Quick Review', description: 'Fast feedback and improvement tips on your resume.', iconName: 'FileCheck', classType: 'half' },
  { id: 'hc10', category: 'Quick Business', title: 'LinkedIn Power-Up', description: 'Quick review and tips to stand out to recruiters.', iconName: 'Linkedin', classType: 'half' },
  { id: 'hc11', category: 'Quick Business', title: 'Business Name Brainstorm', description: 'Stuck on naming? Rapid brainstorm to find the perfect name.', iconName: 'Lightbulb', classType: 'half' },
  { id: 'hc12', category: 'Quick Business', title: 'Elevator Pitch Polish', description: 'Perfect your 30-second introduction for networking.', iconName: 'MessageCircle', classType: 'half' },
  
  // Quick Lifestyle
  { id: 'hc13', category: 'Quick Lifestyle', title: 'Outfit Check', description: 'Quick advice on what to wear for any occasion.', iconName: 'Shirt', classType: 'half' },
  { id: 'hc14', category: 'Quick Lifestyle', title: 'Profile Photo Tips', description: 'Take a great profile picture with your phone.', iconName: 'User', classType: 'half' },
  { id: 'hc15', category: 'Quick Lifestyle', title: 'Gift Idea Session', description: 'Stuck on what to buy? Find the perfect gift together.', iconName: 'Gift', classType: 'half' },
  { id: 'hc16', category: 'Quick Lifestyle', title: 'Quick Recipe Help', description: 'Cooking guidance for a specific dish or meal planning.', iconName: 'Utensils', classType: 'half' },
  
  // Quick Wellness & Fun
  { id: 'hc17', category: 'Quick Fun', title: 'Motivation Boost', description: 'Feeling stuck? Quick energy boost and fresh perspective.', iconName: 'Zap', classType: 'half' },
  { id: 'hc18', category: 'Quick Fun', title: 'Trivia & Games', description: 'Fun trivia session — test your knowledge and laugh.', iconName: 'HelpCircle', classType: 'half' },
  { id: 'hc19', category: 'Quick Fun', title: 'Pet Show & Tell', description: 'Introduce your pets — stories, tricks, and fun.', iconName: 'Dog', classType: 'half' },
  { id: 'hc20', category: 'Quick Fun', title: 'Mystery Session', description: 'Surprise pick based on your mood — trust the vibe!', iconName: 'Sparkles', classType: 'half' },
];

export const CATEGORIES = Array.from(new Set(SERVICES_LIST.map(s => s.category)));

export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];