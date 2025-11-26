import { ServiceItem } from './types';

// 50 FUN + SIMPLE 25-MIN ZOOM SESSIONS
export const SERVICES_LIST: ServiceItem[] = [
  // 🔥 AI + CREATIVE FUN (1-12)
  { id: '1', category: 'AI + Creative Fun', title: 'AI Logo Remix', description: 'You describe a vibe → I generate 5 logo concepts live.', iconName: 'Palette' },
  { id: '2', category: 'AI + Creative Fun', title: 'AI Rap/Song Maker', description: 'We create a funny or sentimental song for someone.', iconName: 'Music' },
  { id: '3', category: 'AI + Creative Fun', title: 'Family Song Session', description: 'Make a custom family theme song together.', iconName: 'Users' },
  { id: '4', category: 'AI + Creative Fun', title: 'AI Photo Glow-Up', description: 'Upgrade one selfie or pet photo together.', iconName: 'Image' },
  { id: '5', category: 'AI + Creative Fun', title: 'Brand Name Generator', description: 'Live brainstorm + AI-generated names.', iconName: 'Lightbulb' },
  { id: '6', category: 'AI + Creative Fun', title: 'AI Gift Creator', description: 'Design a digital gift (poster, card, avatar).', iconName: 'Gift' },
  { id: '7', category: 'AI + Creative Fun', title: 'AI Pet Portrait', description: 'Turn your pet into a knight, queen, superhero.', iconName: 'Dog' },
  { id: '8', category: 'AI + Creative Fun', title: 'AI Poster Party', description: 'Make a mini movie poster of YOU.', iconName: 'Film' },
  { id: '9', category: 'AI + Creative Fun', title: 'AI Superhero Version of You', description: 'Create a character with powers and backstory.', iconName: 'Zap' },
  { id: '10', category: 'AI + Creative Fun', title: 'AI Cartoon Avatar', description: 'Turn yourself into a cartoon.', iconName: 'Smile' },
  { id: '11', category: 'AI + Creative Fun', title: 'Custom Playlist Builder', description: 'Pick your mood → we build a playlist.', iconName: 'Volume2' },
  { id: '12', category: 'AI + Creative Fun', title: 'Story-to-Song Session', description: 'Tell me a story → I turn it into a rhyme.', iconName: 'Mic' },

  // 💡 IDEA DEVELOPMENT (13-17)
  { id: '13', category: 'Idea Development', title: 'Small Business Starter Spark', description: 'Light brainstorming for a new side hustle.', iconName: 'Briefcase' },
  { id: '14', category: 'Idea Development', title: 'Product Idea Check', description: 'Talk through a quick idea to see if it\'s solid.', iconName: 'Zap' },
  { id: '15', category: 'Idea Development', title: 'Brand Personality Builder', description: 'Define the tone/look of your future brand.', iconName: 'Palette' },
  { id: '16', category: 'Idea Development', title: 'Catchy Slogan Workshop', description: 'Create 3–6 memorable taglines.', iconName: 'Type' },
  { id: '17', category: 'Idea Development', title: 'Concept Sharpening', description: 'You bring an idea → we make it stronger.', iconName: 'Edit' },

  // 🧩 LIGHT TECH HELP (18-22)
  { id: '18', category: 'Light Tech Help', title: 'Phone Cleanup Party', description: 'Organize apps/files — quick, painless.', iconName: 'Smartphone' },
  { id: '19', category: 'Light Tech Help', title: 'Email Clean Sweep', description: 'Sort your inbox fast, make folders + rules.', iconName: 'Mail' },
  { id: '20', category: 'Light Tech Help', title: 'AI Prompt Help', description: 'Learn how to get better results with ANY AI.', iconName: 'MessageCircle' },
  { id: '21', category: 'Light Tech Help', title: 'Quick Website Review', description: 'I give feedback on your site (simple + friendly).', iconName: 'Globe' },
  { id: '22', category: 'Light Tech Help', title: 'Basic Canva Assist', description: 'Make a flyer, post, or banner together.', iconName: 'Layout' },

  // 👔 STYLE + SOCIAL (23-27)
  { id: '23', category: 'Style + Social', title: 'Outfit Advice', description: 'Pick an outfit for a date, meeting, event.', iconName: 'Shirt' },
  { id: '24', category: 'Style + Social', title: 'Vibe Makeover', description: 'Pick a color palette that fits your look.', iconName: 'Paintbrush' },
  { id: '25', category: 'Style + Social', title: 'Room Style Rating (Friendly)', description: 'Fast décor suggestions.', iconName: 'Home' },
  { id: '26', category: 'Style + Social', title: 'Profile Picture Selection', description: 'Choose your best photo for socials.', iconName: 'Camera' },
  { id: '27', category: 'Style + Social', title: 'Kind Fashion Roast', description: 'Fun, gentle feedback with humor.', iconName: 'Smile' },

  // 🎤 PUBLIC SPEAKING + CONFIDENCE (28-31)
  { id: '28', category: 'Public Speaking + Confidence', title: 'Public Speaking Tune-Up', description: 'Fix filler words + boost clarity.', iconName: 'Mic' },
  { id: '29', category: 'Public Speaking + Confidence', title: 'Mini Speech Practice', description: 'Perfect a short intro or message.', iconName: 'Volume2' },
  { id: '30', category: 'Public Speaking + Confidence', title: 'Voice Confidence Session', description: 'Warm-ups + speaking tips (none medical).', iconName: 'Radio' },
  { id: '31', category: 'Public Speaking + Confidence', title: 'First Impression Tips', description: 'Fun, safe social confidence boosts.', iconName: 'Star' },

  // 🏡 HOME & LIFESTYLE (32-36)
  { id: '32', category: 'Home & Lifestyle', title: 'Small Task Game Plan', description: 'Pick 1 home task and get a quick plan.', iconName: 'CheckSquare' },
  { id: '33', category: 'Home & Lifestyle', title: 'Pantry Refresh Ideas', description: 'Organize food in 10 mins.', iconName: 'Apple' },
  { id: '34', category: 'Home & Lifestyle', title: 'Home Office Quick Upgrade', description: 'Fast suggestions using what you already have.', iconName: 'Briefcase' },
  { id: '35', category: 'Home & Lifestyle', title: 'Fridge Organization Tips', description: 'Simple, family-friendly ideas.', iconName: 'Box' },
  { id: '36', category: 'Home & Lifestyle', title: 'Garage Declutter Strategy', description: 'One small section to start.', iconName: 'Trash2' },

  // 🎉 JUST FUN + SOCIAL (37-46)
  { id: '37', category: 'Just Fun + Social', title: 'Desert-Themed Trivia', description: 'Local restaurants, streets, history, celebrities.', iconName: 'Compass' },
  { id: '38', category: 'Just Fun + Social', title: 'Neighborhood Guessing Game', description: 'Guess which Ahwatukee area (The Foothills, etc.)', iconName: 'MapPin' },
  { id: '39', category: 'Just Fun + Social', title: 'Emoji Life Story', description: 'Tell your story using only emojis.', iconName: 'Smile' },
  { id: '40', category: 'Just Fun + Social', title: 'Guess My Favorite Things', description: 'Fun question round.', iconName: 'HelpCircle' },
  { id: '41', category: 'Just Fun + Social', title: 'Random Wheel of Topics', description: 'Spin → random fun conversation.', iconName: 'RotateCw' },
  { id: '42', category: 'Just Fun + Social', title: 'Yes or No Speed Round', description: 'Rapid-fire choices.', iconName: 'Zap' },
  { id: '43', category: 'Just Fun + Social', title: 'Would You Rather: Arizona Edition', description: 'Funny, harmless local scenarios.', iconName: 'GitBranch' },
  { id: '44', category: 'Just Fun + Social', title: 'Pet Show & Tell', description: 'Introduce your pets — chaos included.', iconName: 'Dog' },
  { id: '45', category: 'Just Fun + Social', title: 'Funny Story Swap', description: 'Share hilarious fails.', iconName: 'Laugh' },
  { id: '46', category: 'Just Fun + Social', title: 'Room Zoom Challenge', description: 'Find one weird item in your room.', iconName: 'Search' },

  // 🎧 MUSIC & ENTERTAINMENT (47-49)
  { id: '47', category: 'Music & Entertainment', title: 'Mini Roast (Nice Only)', description: 'Jokes about your hobbies + interests (friendly).', iconName: 'Laugh' },
  { id: '48', category: 'Music & Entertainment', title: 'Your Life as a Movie', description: 'We build your movie title + poster concept.', iconName: 'Film' },
  { id: '49', category: 'Music & Entertainment', title: 'Mini Smart Home Tips', description: 'Basic, easy boosts (no survival, no repairs).', iconName: 'Zap' },

  // 💳 LIGHT BUSINESS + CREDIT (50)
  { id: '50', category: 'Mystery Pick', title: 'Mystery Session', description: 'We pick something fun for you. Stay surprised!', iconName: 'HelpCircle' },
];

export const CATEGORIES = Array.from(new Set(SERVICES_LIST.map(s => s.category)));

export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];