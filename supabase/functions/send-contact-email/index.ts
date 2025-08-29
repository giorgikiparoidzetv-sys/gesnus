import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const sendGridApiKey = Deno.env.get('SENDGRID_API_KEY')!;
    const contactEmail = Deno.env.get('CONTACT_EMAIL')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const formData: ContactFormData = await req.json();

    console.log('Received contact form submission:', {
      email: formData.email,
      subject: formData.subject
    });

    // 1. Store in Supabase database
    const { data: savedMessage, error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error(`Failed to save message: ${dbError.message}`);
    }

    console.log('Message saved to database:', savedMessage.id);

    // 2. Send email via SendGrid
    const emailData = {
      personalizations: [{
        to: [{ email: contactEmail }],
        subject: `Contact Form: ${formData.subject}`
      }],
      from: { email: "noreply@snusshop.com", name: "SnusShop Contact Form" },
      content: [{
        type: "text/html",
        value: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <div style="background: #f5f5f5; padding: 15px; margin-top: 10px; border-radius: 5px;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This message was submitted through the SnusShop contact form at ${new Date().toLocaleString()}.
            Message ID: ${savedMessage.id}
          </p>
        `
      }]
    };

    const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendGridApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('SendGrid error:', errorText);
      throw new Error(`Failed to send email: ${emailResponse.status} ${errorText}`);
    }

    console.log('Email sent successfully via SendGrid');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully',
        messageId: savedMessage.id
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process contact form submission',
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);