import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Get all vote counts grouped by model
  const { data: allVotes } = await supabaseAdmin
    .from("llm_votes")
    .select("model_key, vote_type");

  // Get this user's votes
  const { data: userVotes } = await supabaseAdmin
    .from("llm_votes")
    .select("model_key, vote_type")
    .eq("voter_ip", ip);

  // Aggregate counts
  const counts: Record<string, { good: number; bad: number }> = {};
  for (const v of allVotes || []) {
    if (!counts[v.model_key]) counts[v.model_key] = { good: 0, bad: 0 };
    counts[v.model_key][v.vote_type as "good" | "bad"]++;
  }

  // Map user votes
  const userMap: Record<string, string> = {};
  for (const v of userVotes || []) {
    userMap[v.model_key] = v.vote_type;
  }

  return NextResponse.json({ counts, userVotes: userMap });
}
