export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  iconName: string; // Mapping to Lucide icons conceptually
}

export enum AppView {
  HOME = 'HOME',
  MENU = 'MENU',
  BOOKING = 'BOOKING',
  CONFIRMATION = 'CONFIRMATION',
  PROFILE = 'PROFILE'
}

export interface BookingDetails {
  serviceId: string | null;
  date: Date | null;
  timeSlot: string | null;
  userEmail: string;
  userName: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface UserProfileData {
  name: string;
  email: string;
  bio: string;
}

export interface BookingHistoryItem {
  id: string;
  serviceTitle: string;
  dateStr: string;
  status: 'COMPLETED' | 'UPCOMING' | 'CANCELLED';
}