
DROP POLICY "Anyone can submit a booking request" ON public.booking_requests;

CREATE POLICY "Anyone can submit a valid booking request"
  ON public.booking_requests FOR INSERT TO anon, authenticated
  WITH CHECK (
    status = 'new'
    AND char_length(guest_name) BETWEEN 1 AND 200
    AND guest_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND check_out > check_in
    AND nights >= 1 AND nights <= 60
    AND adults BETWEEN 1 AND 10
    AND children BETWEEN 0 AND 10
    AND char_length(coalesce(notes,'')) <= 2000
  );
