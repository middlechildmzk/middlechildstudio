export const metadata = {
  title: "Middle Child Audio Forensics Lab",
  description: "Local-first stem and mix forensic analysis for Middle Child production QC."
};

export default function ForensicsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#090b10" }}>
      <iframe
        src="/forensics/index.html"
        title="Middle Child Audio Forensics Lab"
        style={{
          width: "100%",
          minHeight: "100vh",
          border: 0,
          display: "block",
          background: "#090b10"
        }}
      />
    </main>
  );
}
