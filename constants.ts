import { ServiceItem } from './types';

// 50 DAYMAKER2DAY SESSIONS: 30 Full Class (55 min) + 20 Half Class (25 min)
export const SERVICES_LIST: ServiceItem[] = [
  // ============ FULL CLASS (55 MIN) - $49 ============
  
  { id: 'fc1', category: 'Creative', title: 'Daymaker Beat Jam', description: 'Create a simple beat or melody with free tools. Tips included to enhance your music.', iconName: 'Music', classType: 'full' },
  { id: 'fc2', category: 'Creative', title: 'Daymaker Logo Lab', description: 'Brainstorm 3–5 logo concepts for your project. Get help refining your designs.', iconName: 'Palette', classType: 'full' },
  { id: 'fc3', category: 'Creative', title: 'Daymaker Photo Glow-Up', description: 'Pick 5–8 photos and enhance them together with easy editing tips.', iconName: 'Image', classType: 'full' },
  { id: 'fc4', category: 'Creative', title: 'Daymaker Content Planner', description: 'Map 2 weeks of social posts with brainstorming and scheduling help.', iconName: 'Calendar', classType: 'full' },
  { id: 'fc5', category: 'Creative', title: 'Daymaker Voice Studio', description: 'Practice and record a short voiceover or podcast intro with guided prompts.', iconName: 'Mic', classType: 'full' },
  
  { id: 'fc6', category: 'Tech', title: 'Daymaker Phone Refresh', description: 'Organize apps, delete junk, and set up folders with helpful tips.', iconName: 'Smartphone', classType: 'full' },
  { id: 'fc7', category: 'Tech', title: 'Daymaker Speed Boost', description: 'Clean files, close apps, and optimize your computer for better performance.', iconName: 'Monitor', classType: 'full' },
  { id: 'fc8', category: 'Tech', title: 'Daymaker Password Vault', description: 'Organize your passwords safely with step-by-step guidance.', iconName: 'Shield', classType: 'full' },
  { id: 'fc9', category: 'Tech', title: 'Daymaker Canva Class', description: 'Make a flyer or social graphic step-by-step with design suggestions.', iconName: 'Layout', classType: 'full' },
  { id: 'fc10', category: 'Tech', title: 'Daymaker Drive Detox', description: 'Sort files, create folders, and set up a system that works.', iconName: 'FolderOpen', classType: 'full' },
  
  { id: 'fc11', category: 'Business', title: 'Daymaker Side Hustle Lab', description: 'Explore your idea and plan next steps with brainstorming tips.', iconName: 'Lightbulb', classType: 'full' },
  { id: 'fc12', category: 'Business', title: 'Daymaker Resume Refresh', description: 'Improve wording and format with tools to refine your text.', iconName: 'FileText', classType: 'full' },
  { id: 'fc13', category: 'Business', title: 'Daymaker LinkedIn Glow-Up', description: 'Rewrite your headline and about section with smart suggestions.', iconName: 'Linkedin', classType: 'full' },
  { id: 'fc14', category: 'Business', title: 'Daymaker Pitch Perfect', description: 'Rehearse a pitch or presentation with helpful prompts.', iconName: 'Presentation', classType: 'full' },
  { id: 'fc15', category: 'Business', title: 'Daymaker Interview Prep', description: 'Run through common interview questions with confidence tips.', iconName: 'UserCheck', classType: 'full' },
  
  { id: 'fc16', category: 'Lifestyle', title: 'Daymaker Week Planner', description: 'Organize tasks and goals with smart planning tips.', iconName: 'Calendar', classType: 'full' },
  { id: 'fc17', category: 'Lifestyle', title: 'Daymaker Declutter Hour', description: 'Pick a drawer, closet, or desk and organize with fresh ideas.', iconName: 'Home', classType: 'full' },
  { id: 'fc18', category: 'Lifestyle', title: 'Daymaker Meal Prep', description: 'Plan 5–7 meals and a shopping list with helpful suggestions.', iconName: 'ChefHat', classType: 'full' },
  { id: 'fc19', category: 'Lifestyle', title: 'Daymaker Budget Boost', description: 'Track spending and plan simple savings with smart tips.', iconName: 'PiggyBank', classType: 'full' },
  { id: 'fc20', category: 'Lifestyle', title: 'Daymaker Wardrobe Edit', description: 'Go through your closet and style outfits with fresh suggestions.', iconName: 'Shirt', classType: 'full' },
  
  { id: 'fc21', category: 'Fun', title: 'Daymaker Playlist Party', description: 'Build a playlist based on your vibe with music suggestions.', iconName: 'Headphones', classType: 'full' },
  { id: 'fc22', category: 'Fun', title: 'Daymaker Card Trick Class', description: 'Step-by-step guidance on an impressive card trick.', iconName: 'Spade', classType: 'full' },
  { id: 'fc23', category: 'Fun', title: 'Daymaker Trivia Showdown', description: 'Fun trivia across topics — test your knowledge!', iconName: 'HelpCircle', classType: 'full' },
  { id: 'fc24', category: 'Fun', title: 'Daymaker Watch List', description: 'Get a personalized movie/show watchlist just for you.', iconName: 'Film', classType: 'full' },
  { id: 'fc25', category: 'Fun', title: 'Daymaker Pet Party', description: 'Introduce your pets and share fun stories together.', iconName: 'Dog', classType: 'full' },
  
  { id: 'fc26', category: 'Creative', title: 'Daymaker Creative Chat', description: 'Talk ideas for hobbies, crafts, or fun projects with inspiration.', iconName: 'MessageCircle', classType: 'full' },
  { id: 'fc27', category: 'Creative', title: 'Daymaker Story Studio', description: 'Create short stories or mini-scripts with guided prompts.', iconName: 'BookOpen', classType: 'full' },
  { id: 'fc28', category: 'Creative', title: 'Daymaker Mini Music Jam', description: 'Make a mini tune together with creative guidance.', iconName: 'Music2', classType: 'full' },
  { id: 'fc29', category: 'Creative', title: 'Daymaker DIY Lab', description: 'Try a fun craft or small project with fresh inspiration.', iconName: 'Scissors', classType: 'full' },
  { id: 'fc30', category: 'Creative', title: 'Daymaker Idea Generator', description: 'Generate ideas for projects, content, or hobbies with guidance.', iconName: 'Zap', classType: 'full' },

  // ============ HALF CLASS (25 MIN) - $29 ============
  
  { id: 'hc1', category: 'Quick Style', title: 'Daymaker Style Check', description: 'Quick outfit feedback with color combo tips.', iconName: 'Shirt', classType: 'half' },
  { id: 'hc2', category: 'Quick Tech', title: 'Daymaker Inbox Tidy', description: 'Organize emails and files with quick shortcuts.', iconName: 'Mail', classType: 'half' },
  { id: 'hc3', category: 'Quick Help', title: 'Daymaker Message Helper', description: 'Improve texts or emails with smart prompts.', iconName: 'MessageSquare', classType: 'half' },
  { id: 'hc4', category: 'Quick Creative', title: 'Daymaker Creative Spark', description: 'Paper airplane, doodle, or short song with inspiration.', iconName: 'Sparkles', classType: 'half' },
  { id: 'hc5', category: 'Quick Help', title: 'Daymaker Life Hack Fix', description: 'Solve a small task or project with quick guidance.', iconName: 'Wrench', classType: 'half' },
  
  { id: 'hc6', category: 'Quick Style', title: 'Daymaker Accessory Add-On', description: 'Jewelry or outfit tweaks with style suggestions.', iconName: 'Gem', classType: 'half' },
  { id: 'hc7', category: 'Quick Tech', title: 'Daymaker Device Tips', description: 'Learn phone or tablet tricks with quick tips.', iconName: 'Smartphone', classType: 'half' },
  { id: 'hc8', category: 'Quick Tech', title: 'Daymaker Email Organizer', description: 'Set up folders and priorities with guidance.', iconName: 'Inbox', classType: 'half' },
  { id: 'hc9', category: 'Quick Growth', title: 'Daymaker Social Boost', description: 'Practice conversation starters with prompts.', iconName: 'Users', classType: 'half' },
  { id: 'hc10', category: 'Quick Creative', title: 'Daymaker Mood Boost', description: 'Tiny craft or creative project with suggestions.', iconName: 'Heart', classType: 'half' },
  
  { id: 'hc11', category: 'Quick Lifestyle', title: 'Daymaker Desk Detox', description: 'Organize your workspace with quick tips.', iconName: 'Monitor', classType: 'half' },
  { id: 'hc12', category: 'Quick Help', title: 'Daymaker Decision Helper', description: 'Solve small decisions with guided prompts.', iconName: 'GitBranch', classType: 'half' },
  { id: 'hc13', category: 'Quick Creative', title: 'Daymaker Song Spark', description: 'Create a 1-minute song with creative guidance.', iconName: 'Music', classType: 'half' },
  { id: 'hc14', category: 'Quick Creative', title: 'Daymaker Idea Boost', description: 'Brainstorm hobby or project ideas with suggestions.', iconName: 'Lightbulb', classType: 'half' },
  { id: 'hc15', category: 'Quick Growth', title: 'Daymaker Confidence Boost', description: 'Build confidence in a light, fun way with prompts.', iconName: 'Star', classType: 'half' },
  
  { id: 'hc16', category: 'Quick Creative', title: 'Daymaker Quick Design', description: 'Make a quick Canva graphic with tips.', iconName: 'Layout', classType: 'half' },
  { id: 'hc17', category: 'Quick Creative', title: 'Daymaker Story Prompt', description: 'Create a short story with guided prompts.', iconName: 'BookOpen', classType: 'half' },
  { id: 'hc18', category: 'Quick Lifestyle', title: 'Daymaker Daily Hack', description: 'Organize routines or small projects with tips.', iconName: 'CheckSquare', classType: 'half' },
  { id: 'hc19', category: 'Quick Help', title: 'Daymaker Gift Finder', description: 'Brainstorm gifts for friends/family with suggestions.', iconName: 'Gift', classType: 'half' },
  { id: 'hc20', category: 'Quick Fun', title: 'Daymaker Celebration Planner', description: 'Plan a small fun celebration with tips.', iconName: 'PartyPopper', classType: 'half' },
];

export const CATEGORIES = Array.from(new Set(SERVICES_LIST.map(s => s.category)));

export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];