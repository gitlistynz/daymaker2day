import { ServiceItem } from './types';

// A diverse list of 50 micro-services for 25-minute slots
export const SERVICES_LIST: ServiceItem[] = [
  // Wellness & Mindset
  { id: '1', category: 'Wellness', title: 'Guided Breathwork', description: 'Reset your nervous system.', iconName: 'Wind' },
  { id: '2', category: 'Wellness', title: 'Power Meditation', description: '25 min deep focus guided meditation.', iconName: 'Brain' },
  { id: '3', category: 'Wellness', title: 'Desktop Yoga', description: 'Stretch without leaving your chair.', iconName: 'Activity' },
  { id: '4', category: 'Wellness', title: 'Nutrition Audit', description: 'Quick review of your daily intake.', iconName: 'Apple' },
  { id: '5', category: 'Wellness', title: 'Sleep Hygiene Check', description: 'Optimize your bedroom for rest.', iconName: 'Moon' },
  { id: '6', category: 'Wellness', title: 'Anxiety Release', description: 'Grounding techniques for stress.', iconName: 'Anchor' },
  { id: '7', category: 'Wellness', title: 'Positive Affirmations', description: 'Live guided affirmation session.', iconName: 'Heart' },
  { id: '8', category: 'Wellness', title: 'Ergonomic Review', description: 'Fix your desk posture now.', iconName: 'Monitor' },
  { id: '9', category: 'Wellness', title: 'Hydration Strategy', description: 'Plan your water intake.', iconName: 'Droplet' },
  { id: '10', category: 'Wellness', title: 'Digital Detox Plan', description: 'Strategy to unplug effectively.', iconName: 'SmartphoneOff' },

  // Professional & Productivity
  { id: '11', category: 'Productivity', title: 'Email Inbox Zero', description: 'Slay your inbox with a pro.', iconName: 'Mail' },
  { id: '12', category: 'Productivity', title: 'LinkedIn Profile Roast', description: 'Honest feedback on your profile.', iconName: 'Linkedin' },
  { id: '13', category: 'Productivity', title: 'Resume Quick-Fix', description: 'Spot check for major errors.', iconName: 'FileText' },
  { id: '14', category: 'Productivity', title: 'Task Prioritization', description: 'Sort your to-do list for today.', iconName: 'List' },
  { id: '15', category: 'Productivity', title: 'Pitch Deck Review', description: 'Feedback on your slide logic.', iconName: 'Presentation' },
  { id: '16', category: 'Productivity', title: 'Negotiation Prep', description: 'Roleplay a tough conversation.', iconName: 'Users' },
  { id: '17', category: 'Productivity', title: 'Idea Brainstorm', description: 'Bounce ideas off a creative.', iconName: 'Lightbulb' },
  { id: '18', category: 'Productivity', title: 'Notion Setup', description: 'Quick page organization.', iconName: 'Layout' },
  { id: '19', category: 'Productivity', title: 'Goal Setting', description: 'Define your weekly OKRs.', iconName: 'Target' },
  { id: '20', category: 'Productivity', title: 'Time Blocking', description: 'Structure your calendar.', iconName: 'Calendar' },

  // Tech & Skills
  { id: '21', category: 'Tech', title: 'Excel Formula Fix', description: 'Solve that one broken cell.', iconName: 'Grid' },
  { id: '22', category: 'Tech', title: 'React Component Debug', description: 'Second pair of eyes on code.', iconName: 'Code' },
  { id: '23', category: 'Tech', title: 'OBS Setup', description: 'Look better on your next stream.', iconName: 'Video' },
  { id: '24', category: 'Tech', title: 'Cybersecurity Audit', description: 'Check your password hygiene.', iconName: 'Lock' },
  { id: '25', category: 'Tech', title: 'AI Prompt Engineering', description: 'Refine your LLM prompts.', iconName: 'Cpu' },
  { id: '26', category: 'Tech', title: 'Canva Quick Design', description: 'Make a flyer in 25 mins.', iconName: 'Image' },
  { id: '27', category: 'Tech', title: 'Home WiFi Optimization', description: 'Tips to boost your signal.', iconName: 'Wifi' },
  { id: '28', category: 'Tech', title: 'Smart Home Setup', description: 'Connect your lights/assistant.', iconName: 'Home' },
  { id: '29', category: 'Tech', title: 'Crypto Wallet Basics', description: 'Safe setup walkthrough.', iconName: 'Bitcoin' },
  { id: '30', category: 'Tech', title: 'Photo Editing Basics', description: 'Quick Lightroom/phone tips.', iconName: 'Camera' },

  // Lifestyle & Fun
  { id: '31', category: 'Lifestyle', title: 'Outfit Check', description: 'Stylist opinion on your look.', iconName: 'Shirt' },
  { id: '32', category: 'Lifestyle', title: 'Quick Tarot Reading', description: '3-card spread for the day.', iconName: 'Star' },
  { id: '33', category: 'Lifestyle', title: 'Dream Interpretation', description: 'Analyze last night\'s dream.', iconName: 'CloudMoon' },
  { id: '34', category: 'Lifestyle', title: 'Pet Training Tip', description: 'Solve one specific behavior.', iconName: 'Dog' },
  { id: '35', category: 'Lifestyle', title: 'Plant Doctor', description: 'Show us your dying plant.', iconName: 'Leaf' },
  { id: '36', category: 'Lifestyle', title: 'Gift Ideation', description: 'Find the perfect present.', iconName: 'Gift' },
  { id: '37', category: 'Lifestyle', title: 'Travel Itinerary', description: 'Plan a day in a new city.', iconName: 'Map' },
  { id: '38', category: 'Lifestyle', title: 'Book Recommendation', description: 'Curated list based on taste.', iconName: 'Book' },
  { id: '39', category: 'Lifestyle', title: 'Playlist Curation', description: 'Build a vibe for your event.', iconName: 'Music' },
  { id: '40', category: 'Lifestyle', title: 'Joke Workshop', description: 'Improve your stand-up bit.', iconName: 'Mic' },

  // Miscellaneous
  { id: '41', category: 'Misc', title: 'Vent Session', description: 'Just someone to listen.', iconName: 'Ear' },
  { id: '42', category: 'Misc', title: 'Decision Maker', description: 'Help making a tough choice.', iconName: 'Shuffle' },
  { id: '43', category: 'Misc', title: 'Language Practice', description: '25 mins of Spanish/French.', iconName: 'Globe' },
  { id: '44', category: 'Misc', title: 'Mock Interview', description: 'Practice one tough question.', iconName: 'Briefcase' },
  { id: '45', category: 'Misc', title: 'Recipe Rescue', description: 'What to cook with your fridge.', iconName: 'Utensils' },
  { id: '46', category: 'Misc', title: 'Fantasy Sports Lineup', description: 'Set your team for the week.', iconName: 'Trophy' },
  { id: '47', category: 'Misc', title: 'Gaming Co-Pilot', description: 'Help with a boss fight.', iconName: 'Gamepad' },
  { id: '48', category: 'Misc', title: 'Virtual Coffee', description: 'Casual chat with a stranger.', iconName: 'Coffee' },
  { id: '49', category: 'Misc', title: 'News Briefing', description: 'Catch up on specific topics.', iconName: 'Newspaper' },
  { id: '50', category: 'Misc', title: 'Mystery Session', description: 'We pick something for you.', iconName: 'HelpCircle' },
];

export const CATEGORIES = Array.from(new Set(SERVICES_LIST.map(s => s.category)));

export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];