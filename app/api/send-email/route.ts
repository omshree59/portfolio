import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  checkRateLimit,
  getClientIp,
  verifyCsrfOrigin,
  escapeHtml,
  sanitizeEmail,
  sanitizeText,
} from "@/lib/security";

export async function POST(req: Request) {
  try {
    // 1. CSRF Origin Verification
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json(
        { error: "Forbidden: Cross-site request rejected." },
        { status: 403 }
      );
    }

    // 2. IP-based Rate Limiting (Max 5 requests per 10 minutes)
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`email_${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Rate limit exceeded. Please wait ${rateCheck.retryAfterSec} seconds before sending another message.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSec),
          },
        }
      );
    }

    // 3. Parse & Validate Payload Size
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    const { email, message, name } = body;

    // 4. Input Sanitization & Anti-Injection Checks
    const validatedEmail = sanitizeEmail(email);
    if (!validatedEmail) {
      return NextResponse.json(
        { error: "A valid email address is required (max 254 chars, standard format)." },
        { status: 400 }
      );
    }

    const messageContent = sanitizeText(message, 3000);
    if (!messageContent) {
      return NextResponse.json(
        { error: "Message details cannot be empty." },
        { status: 400 }
      );
    }

    const senderName = sanitizeText(name, 80) || validatedEmail.split("@")[0];
    const recipient = "paridaomshree@gmail.com";

    // 5. HTML Entity Escaping for XSS/HTML Injection Prevention
    const safeSenderName = escapeHtml(senderName);
    const safeSenderEmail = escapeHtml(validatedEmail);
    const safeMessageHtml = escapeHtml(messageContent);

    // 6. Secure Environment Access (Strictly Server-Side)
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;

    if (emailUser && emailPass) {
      const cleanPass = emailPass.replace(/\s+/g, "");
      const transporter = nodemailer.createTransport(
        smtpHost
          ? {
              host: smtpHost,
              port: smtpPort,
              secure: smtpPort === 465,
              auth: {
                user: emailUser,
                pass: cleanPass,
              },
            }
          : {
              service: "gmail",
              auth: {
                user: emailUser,
                pass: cleanPass,
              },
            }
      );

      const mailOptions = {
        from: `"Portfolio Contact - ${safeSenderName}" <${emailUser}>`,
        to: recipient,
        replyTo: validatedEmail,
        subject: `🚀 Portfolio Message from ${safeSenderName}`,
        text: `New message from your portfolio contact chatbox:\n\nFrom: ${senderName} <${validatedEmail}>\nDate: ${new Date().toLocaleString()}\n\nMessage Details:\n${messageContent}\n\n---\nHit 'Reply' in your email client to reply directly to ${validatedEmail}.`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0c; color: #f4f4f5; border: 1px solid rgba(6, 182, 212, 0.4); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.8);">
            <div style="background: linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(0,0,0,0.8) 100%); padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.1);">
              <div style="display: inline-block; padding: 4px 12px; background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 9999px; color: #22d3ee; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                Cloud5 AI Direct Line
              </div>
              <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 6px 0; font-weight: 800;">
                New Portfolio Message
              </h1>
              <p style="color: #a1a1aa; font-size: 14px; margin: 0;">
                A visitor submitted details through the Contact Chatbox to connect with you.
              </p>
            </div>
            
            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #71717a; font-size: 13px; width: 100px;">FROM:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${safeSenderName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717a; font-size: 13px;">EMAIL:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${safeSenderEmail}" style="color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 500;">${safeSenderEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #71717a; font-size: 13px;">RECEIVED:</td>
                  <td style="padding: 8px 0; color: #d4d4d8; font-size: 13px;">${new Date().toLocaleString()}</td>
                </tr>
              </table>

              <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-left: 4px solid #06b6d4; border-radius: 8px; padding: 18px; margin-top: 10px;">
                <p style="margin: 0 0 8px 0; color: #22d3ee; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</p>
                <div style="color: #f4f4f5; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${safeMessageHtml}</div>
              </div>

              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center;">
                <a href="mailto:${safeSenderEmail}" style="display: inline-block; background-color: #06b6d4; color: #000000; font-weight: 700; font-size: 14px; padding: 10px 20px; border-radius: 9999px; text-decoration: none;">
                  Reply to ${safeSenderEmail}
                </a>
              </div>
            </div>

            <div style="background-color: rgba(0, 0, 0, 0.6); padding: 14px 24px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; color: #52525b; font-size: 11px;">
              Sent via Omshree Parida's Portfolio AI Chatbox (Cloud5)
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      // Keep sensitive message data out of production logs
      if (process.env.NODE_ENV !== "production") {
        console.log(`[SMTP] Email successfully dispatched.`);
      }

      return NextResponse.json({
        success: true,
        simulated: false,
        message: "Your message has been sent to Omshree at paridaomshree@gmail.com!",
      });
    } else {
      // Development mode
      if (process.env.NODE_ENV !== "production") {
        console.log("[DEV MODE] Email delivery simulated (Set EMAIL_USER & EMAIL_PASS in .env.local)");
      }

      return NextResponse.json({
        success: true,
        simulated: true,
        message:
          "Demo mode: Message recorded in terminal. Add EMAIL_USER and EMAIL_PASS to .env.local for live Gmail forwarding.",
      });
    }
  } catch (error: any) {
    // Prevent internal stack trace disclosure
    if (process.env.NODE_ENV !== "production") {
      console.error("Internal mail dispatch error:", error?.message || error);
    }
    return NextResponse.json(
      {
        error: "Unable to send message at this time. Please email directly to paridaomshree@gmail.com",
      },
      { status: 500 }
    );
  }
}
