import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const webhookUrl = process.env.NEXT_PUBLIC_BOOKING_WEBHOOK_URL;

    // Log appointment booking data on server
    console.log("Appointment request received:", data);

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          console.warn("Webhook responded with non-200 status:", response.status);
        }
      } catch (webhookErr) {
        console.error("Failed to forward appointment to webhook:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Appointment request registered successfully",
      bookingId: `AC-${Date.now().toString().slice(-6)}`,
    });
  } catch (err) {
    console.error("Error handling appointment booking:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
