import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { modelKey, voteType } = await req.json();

  if (!modelKey || !["good", "bad"].includes(voteType)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Check if user already voted on this model
  const { data: existing } = await supabaseAdmin
    .from("llm_votes")
    .select("id, vote_type")
    .eq("model_key", modelKey)
    .eq("voter_ip", ip)
    .maybeSingle();

  if (existing) {
    if (existing.vote_type === voteType) {
      // Same vote — remove it (toggle off)
      await supabaseAdmin.from("llm_votes").delete().eq("id", existing.id);
      return NextResponse.json({ action: "removed" });
    } else {
      // Different vote — update it
      await supabaseAdmin
        .from("llm_votes")
        .update({ vote_type: voteType })
        .eq("id", existing.id);
      return NextResponse.json({ action: "changed" });
    }
  }

  // New vote
  const { error } = await supabaseAdmin.from("llm_votes").insert({
    model_key: modelKey,
    vote_type: voteType,
    voter_ip: ip,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ action: "voted" });
}
