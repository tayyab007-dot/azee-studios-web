import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import ContactLead from "@/lib/models/ContactLead";

// Force dynamic fetch to ensure fresh leads are always served in production
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all leads sorted by newest first
    const leads = await ContactLead.find({}).sort({ createdAt: -1 }).lean();

    // Return both 'leads' and 'inquiries' key to prevent frontend interface mismatch
    return NextResponse.json(
      { 
        success: true,
        leads, 
        inquiries: leads 
      }, 
      { 
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate",
        }
      }
    );
  } catch (error: any) {
    console.error("Fetch Leads Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact leads." },
      { status: 500 }
    );
  }
}