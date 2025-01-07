import { NextRequest } from "next/server";
import { generateUrl } from "@/utils";


export async function GET(
  req: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const address = params.address;

    const redirectUrl = generateUrl(`${process.env.NEXT_PUBLIC_REFERRAL_URL}`, {
      referral: address,
    });
    if (address) {
      console.log("address", address);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/report/data`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          list: [
            {
              t: 1,
              v: address,
            },
          ],
        }),
      });
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectUrl,
      },
    });
  } catch (error) {
    console.error("Redirect error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
