// src/app/api/send-message/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, company, email, service, message } = data;

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Name, email, and message are required.' }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram Bot Token or Chat ID is not defined in .env.local');
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }

  const text = `
📬 <b>New Contact Form Submission</b>

👤 <b>Name:</b>
   ${name}

🏢 <b>Company:</b>
   ${company || 'N/A'}

✉️ <b>Email:</b>
   <code>${email}</code>

🔧 <b>Service:</b>
   <i>${service || 'N/A'}</i>

📝 <b>Message:</b>
${message}
  `;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML', // --- مهم: تغيير parse_mode إلى 'HTML' ---
      } ),
    });

    const result = await response.json();

    if (!result.ok) {
      console.error('Telegram API error:', result);
      return NextResponse.json({ message: 'Failed to send message.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}
