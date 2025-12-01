import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // GET - Fetch all bookings or bookings for specific user
    if (req.method === 'GET') {
      const { userEmail } = req.query;

      let query = supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: true });

      if (userEmail) {
        // Get user first
        const { data: users } = await supabase
          .from('users')
          .select('id')
          .eq('email', userEmail as string)
          .single();

        if (users) {
          query = query.eq('user_id', users.id);
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      return res.status(200).json({ bookings: data });
    }

    // POST - Create new booking
    if (req.method === 'POST') {
      const { userName, userEmail, serviceId, serviceTitle, bookingDate, timeSlot } = req.body;

      // Create or get user
      let userId;
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (existingUser) {
        userId = existingUser.id;
      } else {
        const { data: newUser, error: userError } = await supabase
          .from('users')
          .insert({ name: userName, email: userEmail })
          .select()
          .single();

        if (userError) throw userError;
        userId = newUser.id;
      }

      // Create booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: userId,
          service_id: serviceId,
          service_title: serviceTitle,
          booking_date: bookingDate,
          time_slot: timeSlot,
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      return res.status(201).json({ booking, message: 'Booking created successfully' });
    }

    // DELETE - Cancel booking
    if (req.method === 'DELETE') {
      const { bookingId } = req.query;

      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId as string);

      if (error) throw error;

      return res.status(200).json({ message: 'Booking cancelled' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Database error:', error);
    return res.status(500).json({ error: error.message });
  }
}
