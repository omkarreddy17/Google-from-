import { createClient } from '@supabase/supabase-js';

// Retrieve credentials from Vite environment variables (.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Submits student registration data directly to Supabase Database.
 * Maps camelCase JS variables to snake_case database columns.
 * 
 * @param {Object} data - The student form data object from React state
 * @returns {Promise<Object>} The inserted database rows
 */
export async function submitStudentData(data) {
  console.log('API Service: Submitting to Supabase...', data);

  const dbRow = {
    first_name: data.firstName,
    middle_name: data.middleName,
    last_name: data.lastName,
    phone: data.phone,
    email: data.email,
    college: data.college,
    course: data.course,
    course_year: data.courseYear,
    parent_name: data.parentName,
    parent_phone: data.parentPhone
  };

  const { data: responseData, error } = await supabase
    .from('students')
    .insert([dbRow])
    .select();

  if (error) {
    console.error('Supabase DB Error:', error);
    throw new Error(error.message || 'An error occurred during submission.');
  }

  console.log('API Service: Registration successful!', responseData);
  return responseData;
}

/**
 * Fetches all student registration records from Supabase, ordered by ID descending.
 * 
 * @returns {Promise<Array>} List of registered students
 */
export async function fetchStudents() {
  console.log('API Service: Fetching all student records...');

  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Supabase DB Fetch Error:', error);
    throw new Error(error.message || 'An error occurred during fetch.');
  }

  return data;
}

/**
 * Sends an email notification to the administrator using the EmailJS REST API.
 * 
 * @param {Object} data - The student registration details object
 * @returns {Promise<Object>} Response from EmailJS API
 */
export async function sendAdminNotification(data) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  // Do not send if variables are not configured
  if (
    !serviceId || serviceId.includes('placeholder') ||
    !templateId || templateId.includes('placeholder') ||
    !publicKey || publicKey.includes('placeholder')
  ) {
    console.warn('API Service: EmailJS credentials are not configured. Skipping admin notification email.');
    return { success: false, message: 'EmailJS credentials not configured' };
  }

  console.log('API Service: Dispatching admin notification email...');

  const fullName = `${data.firstName} ${data.middleName ? data.middleName + ' ' : ''}${data.lastName}`;

  const payload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      admin_email: adminEmail,
      
      // Default EmailJS template parameters (name, message, time)
      name: fullName,
      message: `A new student has registered with the following details:
- Email: ${data.email}
- Phone: ${data.phone}
- College: ${data.college}
- Course: ${data.course}
- Course Year: ${data.courseYear}
- Parent's Name: ${data.parentName}
- Parent's Phone: ${data.parentPhone}`,
      time: new Date().toLocaleString(),

      // Custom/HTML EmailJS template parameters
      student_name: fullName,
      student_email: data.email,
      student_phone: data.phone,
      student_college: data.college,
      student_course: data.course,
      course_year: data.courseYear,
      parent_name: data.parentName,
      parent_phone: data.parentPhone
    }
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to dispatch email notification via EmailJS.');
  }

  console.log('API Service: Admin notification email sent successfully!');
  return { success: true };
}


