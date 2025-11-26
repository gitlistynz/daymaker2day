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
  SESSION_DETAIL = 'SESSION_DETAIL',
  BOOK_OR_GIFT = 'BOOK_OR_GIFT',
  BOOKING = 'BOOKING',
  PAYMENT = 'PAYMENT',
  GIFT_DELIVERY = 'GIFT_DELIVERY',
  CONFIRMATION = 'CONFIRMATION',
  PROFILE = 'PROFILE'
}

export type BookingType = 'BOOK' | 'GIFT';

export type GiftDeliveryMethod = 'EMAIL' | 'COPY_LINK' | 'SHARE';

export interface BookingDetails {
  serviceId: string | null;
  date: Date | null;
  timeSlot: string | null;
  userEmail: string;
  userName: string;
  bookingType: BookingType | null; // 'BOOK' or 'GIFT'
  recipientEmail?: string; // For gifts
  recipientName?: string; // For gifts
  giftDeliveryMethod?: GiftDeliveryMethod; // How to send gift
  giftLink?: string; // Unique gift link
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