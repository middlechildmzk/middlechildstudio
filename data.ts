import { Project, VaultEntry } from "@/lib/types";

export const initialProjects: Project[] = [
  { id: 1, createdAt: Date.now(), updatedAt: Date.now(), name: "Chair by the Bed", status: "Active", hook: "you chose this room", lane: "witness" },
  { id: 2, createdAt: Date.now(), updatedAt: Date.now(), name: "Breath Finds Me", status: "Flagship", hook: "breath finds me", lane: "mercy" },
  { id: 3, createdAt: Date.now(), updatedAt: Date.now(), name: "Heavy Silence", status: "Frontier", hook: "the vow stayed loud", lane: "quiet anger" }
];

export const vaultEntries: VaultEntry[] = [
  { id: 1, title: "Repair Mode", body: "Re-entry, small functioning acts, warmth without spectacle.", engine: "Body-State Engine", law: "repair", sacred: "near mercy", status: "active" },
  { id: 2, title: "Quiet Anger", body: "Low-burn heat, sacred disappointment, narrowed verse field.", engine: "Body-State Engine", law: "quiet anger", sacred: "dry prayer", status: "active" },
  { id: 3, title: "Endings Engine", body: "Grounded landing, held-room fade, afterimage return.", engine: "Song Architecture", law: "ordinary peace", sacred: "none", status: "active" },
  { id: 4, title: "Originality Gate", body: "What is only Middle Child here?", engine: "Reference Intelligence", law: "witness", sacred: "precise rupture", status: "active" },
  { id: 5, title: "Atmospheric Presence Music", body: "Music where nothing changes externally — but everything changes internally.", engine: "Current Canon", law: "mercy", sacred: "sacred weight", status: "current canon" },
  { id: 6, title: "Near Mercy", body: "Use pressure, breath, waiting, and endurance instead of sermon language.", engine: "Sacred Subtext", law: "mercy", sacred: "near mercy", status: "active" }
];

export const hookBank: Record<string, string[]> = {
  mercy: ["breath finds me", "you stayed this close", "the room breathes"],
  repair: ["it comes back slow", "something returned", "I can hold this"],
  witness: ["you chose this room", "I watched you stay", "the vow stayed loud"],
  "quiet anger": ["I kept it in", "not soft enough", "I felt it bite"],
  collapse: ["still in the room", "the floor held", "I didn't leave it"],
  waiting: ["not yet, still here", "I can wait here", "until it changes"],
  numbness: ["I heard the hum", "not all the way here", "the static stayed"],
  "ordinary peace": ["nothing asked for more", "the light stayed warm", "I could stay here"]
};
