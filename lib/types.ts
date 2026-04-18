export type EmotionalLaw =
  | "collapse" | "mercy" | "repair" | "quiet anger"
  | "ordinary peace" | "waiting" | "witness" | "numbness";

export type SacredMode =
  | "none" | "near mercy" | "precise rupture"
  | "sacred weight" | "midnight psalm" | "dry prayer";

export type BuilderState = {
  law: EmotionalLaw;
  room: string;
  lane: string;
  sacred: SacredMode;
  genre: string;
  intensity: string;
  notes: string;
};

export type LogicCheck = { label: string; pass: boolean };

export type OutputPackage = {
  id: number;
  createdAt: number;
  updatedAt: number;
  title: string;
  hook: string;
  verse: string;
  chorus: string;
  production: string;
  claude: string;
  suno: string;
  gemini: string;
  research: string;
  checks: LogicCheck[];
};

export type Project = {
  id: number;
  createdAt: number;
  updatedAt: number;
  name: string;
  status: string;
  hook: string;
  lane: string;
};

export type SavedDraft = {
  id: number;
  createdAt: number;
  title: string;
  hook: string;
  law: string;
  room: string;
  lane: string;
};

export type CompareItem = {
  id: number;
  createdAt: number;
  title: string;
  hook: string;
  law: string;
  room: string;
  lane: string;
  sacred: string;
};

export type VaultEntry = {
  id: number;
  title: string;
  body: string;
  engine: string;
  law: string;
  sacred: string;
  status: string;
};
