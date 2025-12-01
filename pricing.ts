export const PRICING_PLANS = [
  {
    id: 'single-session',
    name: 'Single Session',
    price: 25,
    duration: '25 minutes',
    features: [
      '1-on-1 Zoom session',
      'Expert guidance',
      'Instant scheduling',
      'Session recording available'
    ],
    popular: false
  },
  {
    id: 'focus-group-discount',
    name: 'Focus Group Special',
    price: 15,
    originalPrice: 25,
    duration: '25 minutes',
    features: [
      'All Single Session features',
      '40% discount for feedback',
      'Help shape the future',
      'Early access to new services',
      'Provide 5-min feedback after session'
    ],
    popular: true,
    badge: 'BEST VALUE'
  },
  {
    id: 'extended-session',
    name: 'Extended Session',
    price: 50,
    duration: '55 minutes',
    features: [
      'Deep-dive 1-on-1 session',
      'Comprehensive guidance',
      'Priority scheduling',
      'Session materials included',
      'Follow-up email summary'
    ],
    popular: false
  },
  {
    id: '3-pack',
    name: '3-Session Pack',
    price: 60,
    originalPrice: 75,
    duration: '3 × 25 minutes',
    features: [
      'Save $15 per session',
      'Use within 30 days',
      'Mix any services',
      'Priority booking',
      'Flexible scheduling'
    ],
    popular: false
  }
];

export type PricingPlan = typeof PRICING_PLANS[0];
