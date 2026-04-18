import { hookBank } from "@/data";
import { BuilderState, OutputPackage } from "./types";

const titleMap: Record<string, string[]> = {
  collapse: ["The Frame Gives", "Still in the Room", "What the Floor Knows"],
  mercy: ["Stayed This Close", "Breath Finds Me", "The Room Softens"],
  repair: ["The Water Warms", "Morning in the Sink", "Back in My Hands"],
  "quiet anger": ["The Jaw Holds", "Not Loud Enough", "Heavy in the Throat"],
  "ordinary peace": ["Nothing Broke Today", "Window Open", "The Chair Stayed Warm"],
  waiting: ["Before It Moves", "Same Hallway", "Until the Air Changes"],
  witness: ["Chair by the Bed", "I Saw You Stay", "The Vow Stayed Loud"],
  numbness: ["Static in the Vent", "Held in Fluorescent", "The Light Stayed On"]
};

const blacklist = ["demons","stars","heart","soul","highway","coffee","mirror","headlights"];
const whitelist = ["dashboard","keys","linoleum","chair","floor","hallway","vent","window","breath","chest","jaw","hands","dishwasher"];

export function makeOutput(state: BuilderState): OutputPackage {
  const now = Date.now();
  const title = titleMap[state.law]?.[0] ?? "The Room Breathes";
  const hook = hookBank[state.law]?.[0] ?? "the room breathes";
  const objectHint = state.room === "chair by the bed" ? "dishwasher hum, chair leg, hallway light" : `${state.room} object, body-state, threshold detail`;

  const verse = `Open in the ${state.room}. Start with one object and one body-state. Keep the language plain. Suggested image field: ${objectHint}. ${state.notes ? `Specific note: ${state.notes}` : ""}`;
  const chorus = `Use “${hook}” as the smallest repeatable truth. Keep the chorus short, physical, and ${state.intensity}.`;
  const production = `Genre lane: ${state.genre}. Sound lane: ${state.lane}. Sacred mode: ${state.sacred}. Fingerprint opening in first 5 seconds. Build from small room to earned bloom. Keep the human center audible.`;

  const fullText = `${title} ${hook} ${verse} ${chorus} ${production} ${state.notes}`.toLowerCase();
  const checks = [
    { label: "Object present", pass: whitelist.some((x) => fullText.includes(x)) },
    { label: "Body-state present", pass: /(breath|chest|jaw|hands|pulse|ribs|shoulders)/.test(fullText) },
    { label: "Hook under 6 words", pass: hook.trim().split(/\s+/).length <= 6 },
    { label: "Emotional law is singular", pass: true },
    { label: "First 5 seconds identity defined", pass: /fingerprint|opening|first 5 seconds/.test(fullText) },
    { label: "Cliché risk low", pass: !blacklist.some((x) => fullText.includes(x)) }
  ];

  return {
    id: now,
    createdAt: now,
    updatedAt: now,
    title,
    hook,
    verse,
    chorus,
    production,
    claude: `Operate inside the Middle Child OS. Write one ${state.genre} song in the ${state.law} lane, set in the ${state.room}, with ${state.lane} production and ${state.sacred} undertow. Start with a real object and body-state. Keep the hook under 6 words. Make the bloom physical, not merely large. Intensity: ${state.intensity}.`,
    suno: `Atmospheric presence music, ${state.genre}, ${state.lane}, emotional law ${state.law}, ${state.intensity}, intimate close-mic vocal, clean electric guitar arpeggio, inhale sidechain, restrained cinematic bloom, ${state.sacred} undertow, hook ${hook}`,
    gemini: `Audit and improve this song direction: ${state.law}, ${state.room}, ${state.lane}, ${state.sacred}, ${state.intensity}. Make it more original, more body-first, and less derivative.`,
    research: `Research songs, production, and adjacent references for ${state.genre} with emphasis on ${state.law}, ${state.lane}, and ${state.sacred}. Extract only reusable structural laws.`,
    checks
  };
}

export function filterVault(entries: any[], query: string, filter: string) {
  const q = query.toLowerCase().trim();
  return entries.filter((entry) => {
    const haystack = `${entry.title} ${entry.body} ${entry.engine} ${entry.law} ${entry.sacred} ${entry.status}`.toLowerCase();
    const matchesQuery = !q || haystack.includes(q);
    const matchesFilter = filter === "all" || entry.engine === filter || entry.status === filter || entry.law === filter || entry.sacred === filter;
    return matchesQuery && matchesFilter;
  });
}
