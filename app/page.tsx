"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, AudioLines, ClipboardList, Copy, FileStack, FolderKanban,
  HeartPulse, Home, Music4, PanelRight, Plus, Search, SlidersHorizontal,
  Sparkles, Wand2, Waves
} from "lucide-react";
import { initialProjects, vaultEntries } from "@/data";
import { emotionalLaws, genres, intensities, rooms, sacredModes, sonicLanes } from "@/lib/constants";
import { makeOutput, filterVault } from "@/lib/generators";
import { BuilderState, CompareItem, Project, SavedDraft } from "@/lib/types";
import { loadStorage, saveStorage, storageKeys } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "builder", label: "Song Builder", icon: Music4 },
  { id: "lyrics", label: "Lyric Engine", icon: Wand2 },
  { id: "production", label: "Production", icon: AudioLines },
  { id: "prompts", label: "Prompt Hub", icon: Sparkles },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "archive", label: "Cellar", icon: FileStack }
];

const defaultBuilder: BuilderState = {
  law: "mercy",
  room: "chair by the bed",
  lane: "atmospheric presence",
  sacred: "near mercy",
  genre: "middle child core",
  intensity: "cinematic",
  notes: "dishwasher hum, witness perspective, vow louder than the cost"
};

export default function Page() {
  const [hydrated, setHydrated] = useState(false);
  const [current, setCurrent] = useState("builder");
  const [builder, setBuilder] = useState<BuilderState>(defaultBuilder);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [savedDrafts, setSavedDrafts] = useState<SavedDraft[]>([]);
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);
  const [vaultQuery, setVaultQuery] = useState("");
  const [vaultFilter, setVaultFilter] = useState("all");

  useEffect(() => {
    setBuilder(loadStorage(storageKeys.builder, defaultBuilder));
    setProjects(loadStorage(storageKeys.projects, initialProjects));
    setSavedDrafts(loadStorage(storageKeys.drafts, [] as SavedDraft[]));
    setCompareItems(loadStorage(storageKeys.compare, [] as CompareItem[]));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) saveStorage(storageKeys.builder, builder); }, [builder, hydrated]);
  useEffect(() => { if (hydrated) saveStorage(storageKeys.projects, projects); }, [projects, hydrated]);
  useEffect(() => { if (hydrated) saveStorage(storageKeys.drafts, savedDrafts); }, [savedDrafts, hydrated]);
  useEffect(() => { if (hydrated) saveStorage(storageKeys.compare, compareItems); }, [compareItems, hydrated]);

  const output = useMemo(() => makeOutput(builder), [builder]);
  const filteredVault = useMemo(() => filterVault(vaultEntries, vaultQuery, vaultFilter), [vaultQuery, vaultFilter]);

  const setField = <K extends keyof BuilderState>(key: K, value: BuilderState[K]) => setBuilder((prev) => ({ ...prev, [key]: value }));

  const saveDraft = () => {
    const item: SavedDraft = {
      id: Date.now(),
      createdAt: Date.now(),
      title: output.title,
      hook: output.hook,
      law: builder.law,
      room: builder.room,
      lane: builder.lane
    };
    setSavedDrafts((prev) => [item, ...prev]);
  };

  const addCompare = () => {
    const item: CompareItem = {
      id: Date.now(),
      createdAt: Date.now(),
      title: output.title,
      hook: output.hook,
      law: builder.law,
      room: builder.room,
      lane: builder.lane,
      sacred: builder.sacred
    };
    setCompareItems((prev) => [item, ...prev].slice(0, 3));
  };

  const createProject = () => {
    const now = Date.now();
    setProjects((prev) => [{ id: now, createdAt: now, updatedAt: now, name: output.title, status: "Draft", hook: output.hook, lane: builder.law }, ...prev]);
  };

  const copyText = async (text: string) => {
    try { await navigator.clipboard.writeText(text); } catch {}
  };

  if (!hydrated) return <div className="grid min-h-screen place-items-center bg-[#0b0d11] text-white">Loading studio…</div>;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.12),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_24%),#0b0d11] text-white">
      <div className="mx-auto max-w-[1650px] p-4 md:p-6">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-amber-200/80"><Sparkles className="h-4 w-4" /> Middle Child Studio v1 MVP</div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">A real songwriting workspace, not a static vault</h1>
          <p className="mt-3 max-w-4xl text-white/65 md:text-lg">Runnable MVP with local state, compare mode, live vault search, prompt export, projects, and a studio shell built for actual writing.</p>
        </motion.div>

        <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)_360px]">
          <div className="flex h-full flex-col justify-between rounded-[30px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
            <div>
              <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-amber-200/70">Middle Child Studio</div>
                <div className="mt-2 text-lg font-semibold text-white">Dashboard Amber</div>
                <div className="mt-2 text-sm text-white/60">DAW × A&amp;R dashboard for body-first songwriting.</div>
              </div>
              <div className="space-y-1">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setCurrent(id)} className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${current === id ? "bg-amber-400/15 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"}`}>
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-black/20 p-3 text-sm text-white/60">
              <div className="mb-1 font-medium text-white/85">Recent projects</div>
              <div className="space-y-1">{projects.slice(0, 3).map((p) => <div key={p.id} className="truncate">{p.name}</div>)}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-5">
              {[[HeartPulse, "Law", builder.law],[Music4, "Genre", builder.genre],[Waves, "Sound", builder.lane],[AudioLines, "Sacred", builder.sacred],[SlidersHorizontal, "Intensity", builder.intensity]].map(([Icon, label, value]: any) => (
                <Card key={label} className="rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="rounded-2xl bg-amber-400/10 p-3"><Icon className="h-5 w-5 text-amber-200" /></div>
                    <div><div className="text-xs uppercase tracking-[0.2em] text-white/45">{label}</div><div className="text-sm font-semibold text-white">{value}</div></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="rounded-[32px] border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Center Workspace</CardTitle>
                <div className="flex items-center gap-2 text-sm text-white/55"><PanelRight className="h-4 w-4" /> Vault drawer open</div>
              </CardHeader>
              <CardContent>
                <Tabs value={current} onValueChange={setCurrent} className="space-y-4">
                  <TabsList className="grid w-full grid-cols-6 rounded-2xl bg-black/20 p-1">
                    <TabsTrigger value="dashboard" className="rounded-xl">Dashboard</TabsTrigger>
                    <TabsTrigger value="builder" className="rounded-xl">Builder</TabsTrigger>
                    <TabsTrigger value="lyrics" className="rounded-xl">Lyrics</TabsTrigger>
                    <TabsTrigger value="production" className="rounded-xl">Production</TabsTrigger>
                    <TabsTrigger value="prompts" className="rounded-xl">Prompts</TabsTrigger>
                    <TabsTrigger value="projects" className="rounded-xl">Projects</TabsTrigger>
                  </TabsList>

                  <TabsContent value="dashboard">
                    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                      <Card className="rounded-3xl border-white/10 bg-black/20">
                        <CardHeader><CardTitle>Studio Snapshot</CardTitle></CardHeader>
                        <CardContent className="grid gap-3 md:grid-cols-2">
                          <div className="rounded-2xl bg-white/5 p-4"><div className="text-sm text-white/55">Active project</div><div className="mt-1 text-xl font-semibold">{projects[0]?.name}</div></div>
                          <div className="rounded-2xl bg-white/5 p-4"><div className="text-sm text-white/55">Pinned hook</div><div className="mt-1 text-xl font-semibold">{output.hook}</div></div>
                          <div className="rounded-2xl bg-white/5 p-4"><div className="text-sm text-white/55">Saved drafts</div><div className="mt-1 text-xl font-semibold">{savedDrafts.length}</div></div>
                          <div className="rounded-2xl bg-white/5 p-4"><div className="text-sm text-white/55">Compare slots</div><div className="mt-1 text-xl font-semibold">{compareItems.length}/3</div></div>
                        </CardContent>
                      </Card>
                      <Card className="rounded-3xl border-amber-400/15 bg-white/5 backdrop-blur-xl">
                        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><ClipboardList className="h-4 w-4" /> Logic Rail</CardTitle></CardHeader>
                        <CardContent className="space-y-2">{output.checks.map((check) => <div key={check.label} className="flex items-center justify-between rounded-2xl bg-black/20 px-3 py-2 text-sm text-white/80"><span>{check.label}</span><Badge className={check.pass ? "bg-emerald-500/15 text-emerald-200" : "bg-amber-500/15 text-amber-200"}>{check.pass ? "Pass" : "Review"}</Badge></div>)}</CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="builder">
                    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                      <Card className="rounded-3xl border-white/10 bg-black/20">
                        <CardHeader><CardTitle className="flex items-center gap-2"><SlidersHorizontal className="h-5 w-5" /> Song Builder</CardTitle></CardHeader>
                        <CardContent className="grid gap-4">
                          <div className="grid gap-2 md:grid-cols-2">
                            <div className="grid gap-2"><Label>Emotional law</Label><Select value={builder.law} onValueChange={(v) => setField("law", v as any)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{emotionalLaws.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select></div>
                            <div className="grid gap-2"><Label>Genre</Label><Select value={builder.genre} onValueChange={(v) => setField("genre", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{genres.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select></div>
                          </div>
                          <div className="grid gap-2 md:grid-cols-2">
                            <div className="grid gap-2"><Label>Room / scene</Label><Select value={builder.room} onValueChange={(v) => setField("room", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{rooms.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select></div>
                            <div className="grid gap-2"><Label>Sonic lane</Label><Select value={builder.lane} onValueChange={(v) => setField("lane", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{sonicLanes.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select></div>
                          </div>
                          <div className="grid gap-2 md:grid-cols-2">
                            <div className="grid gap-2"><Label>Sacred mode</Label><Select value={builder.sacred} onValueChange={(v) => setField("sacred", v as any)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{sacredModes.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select></div>
                            <div className="grid gap-2"><Label>Intensity</Label><Select value={builder.intensity} onValueChange={(v) => setField("intensity", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{intensities.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select></div>
                          </div>
                          <div className="grid gap-2"><Label>Notes</Label><Textarea value={builder.notes} onChange={(e) => setField("notes", e.target.value)} placeholder="dishwasher hum, witness perspective, vow louder than the cost" /></div>
                          <div className="flex flex-wrap gap-2">
                            <Button className="rounded-2xl bg-amber-500 text-black hover:bg-amber-400"><Sparkles className="mr-2 h-4 w-4" /> Generate</Button>
                            <Button variant="secondary" className="rounded-2xl" onClick={saveDraft}>Save Draft</Button>
                            <Button variant="secondary" className="rounded-2xl" onClick={addCompare}>Compare Variant</Button>
                            <Button variant="secondary" className="rounded-2xl">Pin Hook</Button>
                            <Button variant="secondary" className="rounded-2xl">Add to Vault</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="rounded-3xl border-white/10 bg-black/20">
                        <CardHeader><CardTitle>Split View Output</CardTitle></CardHeader>
                        <CardContent className="grid gap-4 xl:grid-cols-2">
                          <Card className="rounded-2xl border-white/10 bg-white/5"><CardContent className="space-y-3 p-4"><div className="text-xs uppercase tracking-[0.2em] text-white/45">Lyrics</div><div className="text-2xl font-semibold">{output.title}</div><Badge className="bg-amber-400/15 text-amber-100">Hook: {output.hook}</Badge><p className="text-sm text-white/80">{output.verse}</p><p className="text-sm text-white/80">{output.chorus}</p></CardContent></Card>
                          <Card className="rounded-2xl border-white/10 bg-white/5"><CardContent className="space-y-3 p-4"><div className="text-xs uppercase tracking-[0.2em] text-white/45">Production Brief</div><p className="text-sm text-white/80">{output.production}</p><div className="rounded-2xl bg-black/20 p-3 text-sm text-white/75">Fingerprint opening: clean electric guitar arpeggio + room hum</div><div className="rounded-2xl bg-black/20 p-3 text-sm text-white/75">Bridge role: witness / vow / repair turn</div><div className="rounded-2xl bg-black/20 p-3 text-sm text-white/75">Ending suggestion: grounded landing</div></CardContent></Card>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="lyrics">
                    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                      <Card className="rounded-3xl border-white/10 bg-black/20">
                        <CardHeader><CardTitle>Lyric Engine</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-2">{[output.hook,"you chose this room","it comes back slow","the chair stayed warm","the vow stayed loud"].map((h) => <Badge key={h} className="bg-white/10 text-white">{h}</Badge>)}</div>
                          <div className="rounded-2xl bg-white/5 p-4 text-white/80">
                            <p><strong>[Verse]</strong> Open in the {builder.room}. Name the object. Name the body cost.</p>
                            <p className="mt-2"><strong>[Pre]</strong> Tighten pressure without explaining.</p>
                            <p className="mt-2"><strong>[Chorus]</strong> Repeat the smallest true thing until it becomes law.</p>
                            <p className="mt-2"><strong>[Bridge]</strong> Choose one role: confession, witness, vow, rupture, or repair.</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="rounded-3xl border-amber-400/15 bg-white/5 backdrop-blur-xl">
                        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><ClipboardList className="h-4 w-4" /> Logic Rail</CardTitle></CardHeader>
                        <CardContent className="space-y-2">{output.checks.map((check) => <div key={check.label} className="flex items-center justify-between rounded-2xl bg-black/20 px-3 py-2 text-sm text-white/80"><span>{check.label}</span><Badge className={check.pass ? "bg-emerald-500/15 text-emerald-200" : "bg-amber-500/15 text-amber-200"}>{check.pass ? "Pass" : "Review"}</Badge></div>)}</CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="production">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="rounded-3xl border-white/10 bg-black/20"><CardHeader><CardTitle>Arrangement</CardTitle></CardHeader><CardContent className="space-y-3 text-white/80"><p>Verse: small room / narrow field / guitar witness</p><p>Pre: structural snap / pressure narrowing</p><p>Bloom: thermal expansion, not aggression</p><p>Bridge: private collapse or vow witness</p><p>Outro: afterimage or grounded landing</p></CardContent></Card>
                      <Card className="rounded-3xl border-white/10 bg-black/20"><CardHeader><CardTitle>Sound Priorities</CardTitle></CardHeader><CardContent className="space-y-3 text-white/80"><p>Clean electric guitar arpeggio</p><p>Inhale sidechain</p><p>Warm sub with subtle life</p><p>Breath / hum / room-tone realism</p><p>Sacred mode: {builder.sacred}</p></CardContent></Card>
                      <Card className="rounded-3xl border-white/10 bg-black/20"><CardHeader><CardTitle>Mix Guardrails</CardTitle></CardHeader><CardContent className="space-y-3 text-white/80"><p>Texture never replaces song identity</p><p>Bloom must be earned</p><p>Human center stays audible</p><p>Low-end life, not dance-pop bounce</p><p>Big without becoming aggressive</p></CardContent></Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="prompts">
                    <div className="grid gap-4 lg:grid-cols-2">
                      {[["Claude", output.claude],["Suno", output.suno],["Gemini", output.gemini],["Research", output.research]].map(([title, body]) => (
                        <Card key={title as string} className="rounded-3xl border-white/10 bg-black/20">
                          <CardHeader className="flex flex-row items-center justify-between"><CardTitle>{title as string}</CardTitle><Button variant="secondary" className="rounded-2xl" onClick={() => copyText(body as string)}><Copy className="mr-2 h-4 w-4" />Copy</Button></CardHeader>
                          <CardContent><p className="text-sm leading-6 text-white/80">{body as string}</p></CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="projects">
                    <div className="mb-4 flex justify-between"><CardTitle>Projects</CardTitle><Button className="rounded-2xl bg-amber-500 text-black hover:bg-amber-400" onClick={createProject}><Plus className="mr-2 h-4 w-4" />Create from Current Output</Button></div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <Card key={project.id} className="rounded-3xl border-white/10 bg-black/20"><CardContent className="space-y-3 p-4"><div className="flex items-start justify-between gap-3"><div><div className="text-lg font-semibold">{project.name}</div><div className="text-sm text-white/60">{project.lane}</div></div><Badge className="bg-white/10 text-white/80">{project.status}</Badge></div><div className="rounded-2xl bg-white/5 p-3 text-sm text-white/80">Hook: {project.hook}</div><div className="flex gap-2"><Button variant="secondary" className="rounded-2xl">Open</Button><Button variant="secondary" className="rounded-2xl">Export</Button></div></CardContent></Card>)}</div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
              <Card className="rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl"><CardHeader><CardTitle className="flex items-center gap-2"><ArrowRight className="h-5 w-5" /> Bottom Output Tray</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2"><Button className="rounded-2xl bg-amber-500 text-black hover:bg-amber-400" onClick={() => copyText(output.suno)}>Export Prompt</Button><Button variant="secondary" className="rounded-2xl" onClick={saveDraft}>Save to Project</Button><Button variant="secondary" className="rounded-2xl">Pin Hook</Button><Button variant="secondary" className="rounded-2xl">Add to Vault</Button><Button variant="secondary" className="rounded-2xl" onClick={addCompare}>Create Revision Branch</Button></CardContent></Card>
              <Card className="rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl"><CardHeader><CardTitle>Compare Mode</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-white/75">{compareItems.length === 0 && <div>No variants yet. Use “Compare Variant” from the builder.</div>}{compareItems.map((item) => <div key={item.id} className="rounded-2xl bg-black/20 p-3"><div className="font-medium text-white">{item.title}</div><div>{item.hook} • {item.law} • {item.room}</div></div>)}</CardContent></Card>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="rounded-[30px] border-white/10 bg-white/5 p-0 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10 pb-4"><CardTitle className="flex items-center justify-between gap-2 text-lg"><span className="flex items-center gap-2"><PanelRight className="h-4 w-4" /> Vault Drawer</span><Badge className="bg-amber-400/15 text-amber-100">Live reference</Badge></CardTitle></CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="grid gap-2"><Label>Search the vault</Label><Input value={vaultQuery} onChange={(e) => setVaultQuery(e.target.value)} placeholder="repair mode, endings, quiet anger" /></div>
                <div className="grid gap-2">
                  <Label>Filter</Label>
                  <Select value={vaultFilter} onValueChange={setVaultFilter}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Body-State Engine">Body-State Engine</SelectItem>
                      <SelectItem value="Song Architecture">Song Architecture</SelectItem>
                      <SelectItem value="Current Canon">Current Canon</SelectItem>
                      <SelectItem value="Sacred Subtext">Sacred Subtext</SelectItem>
                      <SelectItem value="archive">Archive</SelectItem>
                      <SelectItem value="repair">repair</SelectItem>
                      <SelectItem value="quiet anger">quiet anger</SelectItem>
                      <SelectItem value="near mercy">near mercy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="max-h-[420px] space-y-3 overflow-auto pr-1">
                  {filteredVault.map((entry) => (
                    <div key={entry.id} className="rounded-2xl bg-black/20 p-4">
                      <div className="mb-1 text-sm font-semibold text-white">{entry.title}</div>
                      <div className="mb-2 text-sm text-white/70">{entry.body}</div>
                      <div className="flex flex-wrap gap-2"><Badge className="bg-white/10 text-white/75">{entry.engine}</Badge><Badge className="bg-white/10 text-white/75">{entry.status}</Badge></div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button variant="secondary" className="rounded-2xl" onClick={() => setField("notes", `${builder.notes}${builder.notes ? "\n" : ""}${entry.title}: ${entry.body}`)}>Add to Notes</Button>
                        <Button variant="secondary" className="rounded-2xl" onClick={() => copyText(`${entry.title}: ${entry.body}`)}>Copy</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" className="w-full rounded-2xl"><Search className="mr-2 h-4 w-4" /> Advanced Search</Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl"><CardHeader><CardTitle>The Cellar</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-white/70"><div className="rounded-2xl bg-black/20 p-3">Broken verses not ready for bloom</div><div className="rounded-2xl bg-black/20 p-3">Retired hooks worth revisiting</div><div className="rounded-2xl bg-black/20 p-3">Cynical language / harder edge fragments</div><div className="rounded-2xl bg-black/20 p-3">Drafts that belong in archive, not deletion</div></CardContent></Card>
            <Card className="rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl"><CardHeader><CardTitle>Saved Drafts</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-white/75">{savedDrafts.length === 0 && <div>No saved drafts yet.</div>}{savedDrafts.map((item) => <div key={item.id} className="rounded-2xl bg-black/20 p-3"><div className="font-medium text-white">{item.title}</div><div>{item.hook} • {item.law} • {item.room}</div></div>)}</CardContent></Card>
          </div>
        </div>
      </div>
    </div>
  );
}
