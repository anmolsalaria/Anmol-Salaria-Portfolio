"use server"

import nodemailer from 'nodemailer';

// WhatsApp configuration
const WHATSAPP_PHONE_NUMBER = process.env.WHATSAPP_PHONE_NUMBER || '+916306150846';
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_BUSINESS_ID = process.env.WHATSAPP_BUSINESS_ID;

// Function to send WhatsApp message using WhatsApp Business API
async function sendWhatsAppMessage(name: string, email: string, message: string) {
  if (!WHATSAPP_API_TOKEN || !WHATSAPP_BUSINESS_ID) {
    console.log('WhatsApp API credentials not configured');
    return false;
  }

  try {
    const whatsappMessage = `*New Contact Form Message*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
    
    const response = await fetch(`https://graph.facebook.com/v18.0/${WHATSAPP_BUSINESS_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: WHATSAPP_PHONE_NUMBER,
        type: 'text',
        text: {
          body: whatsappMessage
        }
      })
    });

    if (response.ok) {
      console.log('WhatsApp message sent successfully');
      return true;
    } else {
      console.error('Failed to send WhatsApp message:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return false;
  }
}

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  // Validate the form data
  if (!name || !email || !message) {
    return {
      success: false,
      message: "Please fill in all fields.",
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  // Send email using nodemailer
  try {
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      return {
        success: false,
        message: "Email service is not configured. Please try again later.",
      }
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const mailOptions = {
      from: smtpUser,
      to: "anmolsalaria31@gmail.com",
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    // Try to send WhatsApp message
    const whatsappSent = await sendWhatsAppMessage(name, email, message);

    return {
      success: true,
      message: whatsappSent 
        ? "Message sent successfully! You'll receive a confirmation on both email and WhatsApp."
        : "Message sent successfully! You'll receive a confirmation on email.",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    }
  }
}
