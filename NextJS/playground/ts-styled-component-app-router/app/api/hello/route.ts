import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
    return new Response("Hello, Next.js!");
}
