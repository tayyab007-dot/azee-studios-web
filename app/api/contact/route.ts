import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ContactLead from "@/lib/models/ContactLead";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, service, message } = body;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB
    await connectToDatabase();

    // 3. Create lead document in database
    const newLead = await ContactLead.create({
      name,
      email,
      service: service || "General Inquiry",
      message,
    });

    console.log("✅ Contact lead saved to MongoDB:", newLead._id);

    // 4. Send Instant Email Alert to Startup Founders (If SMTP credentials exist)
    if (process.env.NOTIFICATION_EMAIL_USER && process.env.NOTIFICATION_EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.NOTIFICATION_EMAIL_USER,
            pass: process.env.NOTIFICATION_EMAIL_PASS, // Gmail App Password
          },
        });

        await transporter.sendMail({
          from: `"Azee Studios Web" <${process.env.NOTIFICATION_EMAIL_USER}>`,
          to: process.env.FOUNDER_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL_USER,
          subject: `🚀 New Lead: ${name} (${service})`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 12px;">
              <h2 style="color: #ff1e56;">New Project Inquiry Received!</h2>
              <p><strong>Client Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Service Requested:</strong> ${service}</p>
              <hr style="border-color: #334155; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <div style="background-color: #1e293b; padding: 15px; border-radius: 8px; font-style: italic;">
                "${message}"
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
                Submitted via Azee Studios Landing Page • Saved in Admin Dashboard
              </p>
            </div>
          `,
        });
        console.log("📩 Instant founder email alert sent successfully!");
      } catch (emailErr) {
        console.error("⚠️ Failed to send notification email alert:", emailErr);
        // We do not fail the request if email fails, as lead is safely in DB
      }
    }

    return NextResponse.json(
      { message: "Contact request received and saved successfully!", leadId: newLead._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ MongoDB Save Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Failed to save submission." },
      { status: 500 }
    );
  }
}