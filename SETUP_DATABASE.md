# Database Setup for 50-Person Focus Group

## Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Sign up with GitHub
3. Create new project: `daymaker2day`
4. Wait 2 minutes for database to initialize

## Step 2: Create Tables (Run in Supabase SQL Editor)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  service_id TEXT NOT NULL,
  service_title TEXT NOT NULL,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT DEFAULT 'confirmed', -- confirmed, cancelled, completed
  host_name TEXT DEFAULT 'DayMaker',
  zoom_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies (allow all for now - you can restrict later)
CREATE POLICY "Allow all users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all bookings" ON bookings FOR ALL USING (true);
```

## Step 3: Get Your API Keys
1. Go to Project Settings → API
2. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key

## Step 4: Add to Vercel Environment Variables
Go to: https://vercel.com/gitlistynz/daymaker2day/settings/environment-variables

Add these:
- `SUPABASE_URL`: your-project-url
- `SUPABASE_ANON_KEY`: your-anon-key

## Current Capacity

**Free Tier Limits:**
- ✅ 500MB database (enough for 10,000+ bookings)
- ✅ 50,000 monthly active users
- ✅ 2GB bandwidth/month
- ✅ Unlimited API requests

**Your 50 people will use:**
- ~50 user records = ~5KB
- ~500 bookings/month = ~50KB
- Well within free tier! 🎉
