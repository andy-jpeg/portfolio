import type { Metadata } from "next";
import Link from "next/link";
import { Archivo } from "next/font/google";
import styles from "./stagehand.module.css";

// Archivo's width axis drives the condensed/expanded headings, matching the
// Stagehand build-plan design. Body mono comes from the global JetBrains Mono.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Stagehand · andy's portfolio",
  description:
    "Pull-request preview environments for Shello, World!: every PR gets its own playable build on a $0/month Kubernetes cluster.",
};

// Tape colours carried over from the build plan, one per part of the stack.
const C = {
  go: "#2DB8B1",
  jenkins: "#F5904A",
  k8s: "#EE6B98",
  tf: "#9C86E8",
  cloudflare: "#EF6A5E",
  dashboard: "#67BE72",
  docker: "#F2C230",
};

type Tape = { value: string; label: string; color: string };

const STATS: Tape[] = [
  { value: "1 wk → 3 days", label: "playtest turnaround", color: C.go },
  { value: "$0/mo", label: "to run", color: C.dashboard },
  { value: "1 per PR", label: "preview environment", color: C.k8s },
  { value: "ARM + x86", label: "container images", color: C.docker },
];

const STEPS: { title: string; body: string }[] = [
  {
    title: "A pull request opens or gets a new push.",
    body: "Jenkins picks it up and starts a pipeline run for that branch.",
  },
  {
    title: "Jenkins builds the game.",
    body: "It exports the Godot project for the web and packages it in a Docker image for both ARM and x86, then pushes the image to a registry.",
  },
  {
    title: "Stagehand deploys it.",
    body: "Jenkins calls the Go service's /deploy endpoint. Stagehand creates a namespace for the PR, like pr-12, with its own Deployment, Service and Ingress on the cluster.",
  },
  {
    title: "The link lands on the PR.",
    body: "Stagehand comments the preview link on the pull request and updates that same comment on later pushes. PRs from development into main also refresh a shared latest build.",
  },
  {
    title: "Testers play it.",
    body: "They sign in through Cloudflare Access at andyjpeg.dev/shello-test/pr-12/. Traffic reaches the cluster over a Cloudflare Tunnel, so the server opens no web ports to the internet.",
  },
  {
    title: "Merged or closed, it cleans up.",
    body: "Closing the PR sends a signed GitHub webhook; Stagehand verifies it and deletes the namespace. Previews nobody has pushed to in seven days are removed automatically.",
  },
];

const PARTS: { name: string; color: string; what: string }[] = [
  {
    name: "Stagehand service",
    color: C.go,
    what: "A Go program that drives Kubernetes with client-go: it deploys and tears down previews, verifies GitHub webhooks and posts the PR comment.",
  },
  {
    name: "Jenkins",
    color: C.jenkins,
    what: "A multibranch pipeline that runs on every PR: headless Godot web export, multi-architecture Docker build, then the deploy call.",
  },
  {
    name: "Kubernetes (k3s)",
    color: C.k8s,
    what: "A single-node k3s cluster. Each preview lives in its own namespace, and Traefik routes /shello-test/pr-N to it.",
  },
  {
    name: "Terraform + Oracle Cloud",
    color: C.tf,
    what: "The server, network and tunnel are all defined in Terraform, on an Always Free Ampere ARM VM.",
  },
  {
    name: "Cloudflare",
    color: C.cloudflare,
    what: "A Tunnel carries traffic in, Access puts a login in front of the previews, and a Worker serves them under andyjpeg.dev.",
  },
  {
    name: "Dashboard",
    color: C.dashboard,
    what: "A small web page, served by the Go service behind Access, that lists every preview with its PR, branch, commit and age, with a Delete button.",
  },
];

const DECISIONS: { title: string; body: string }[] = [
  {
    title: "One namespace per pull request",
    body: "Everything a preview needs lives in one namespace, so tearing it down is a single delete and nothing gets left behind.",
  },
  {
    title: "Redeploys are safe to repeat",
    body: "Deploys use server-side apply, so pushing to the same PR again updates the preview in place instead of failing because it already exists.",
  },
  {
    title: "Built for ARM",
    body: "Oracle's Always Free tier is ARM, which is what keeps the bill at zero. Jenkins builds every image for ARM and x86 so one image tag works on the ARM server and on x86 machines.",
  },
  {
    title: "Nothing exposed by default",
    body: "The cluster is only reachable through the Cloudflare Tunnel. Testers sign in with Access, and GitHub's webhooks are checked against an HMAC-SHA256 signature before Stagehand acts on them.",
  },
  {
    title: "One comment per PR, kept current",
    body: "Instead of a new comment on every push, Stagehand finds its own comment by a hidden marker and edits it, so the PR thread stays readable.",
  },
];

const STACK = ["Go", "Kubernetes (k3s)", "Docker", "Jenkins", "Terraform", "Oracle Cloud", "Cloudflare", "Linux"];

function Arrow({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <g>
      <line className={styles.dLine} x1={x} y1={y1} x2={x} y2={y2 - 8} />
      <polygon className={styles.dHead} points={`${x - 5},${y2 - 9} ${x + 5},${y2 - 9} ${x},${y2}`} />
    </g>
  );
}

function Box({ x, y, w, h, title, sub, mono }: { x: number; y: number; w: number; h: number; title: string; sub: string; mono?: boolean }) {
  const cx = x + w / 2;
  return (
    <g>
      <rect className={styles.dBox} x={x} y={y} width={w} height={h} rx={8} />
      <text className={styles.dT} x={cx} y={y + 21} textAnchor="middle">
        {title}
      </text>
      <text className={mono ? styles.dM : styles.dS} x={cx} y={y + h - 13} textAnchor="middle">
        {sub}
      </text>
    </g>
  );
}

function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 440 616" role="img" aria-labelledby="arch-title arch-desc">
      <title id="arch-title">How a pull request becomes a preview</title>
      <desc id="arch-desc">
        A pull request triggers Jenkins, which builds an ARM and x86 image and calls Stagehand. Stagehand applies a per-PR
        namespace to a k3s cluster on Oracle Cloud. Testers reach it through Cloudflare Tunnel and Access. GitHub webhooks
        and PR comments flow between GitHub and Stagehand.
      </desc>

      <Box x={120} y={8} w={200} h={48} title="Pull request" sub="Shello, World! on GitHub" />
      <Arrow x={220} y1={56} y2={96} />
      <Box x={90} y={96} w={260} h={52} title="Jenkins" sub="Godot web export → ARM + x86 image" />

      <Arrow x={220} y1={148} y2={204} />
      <rect className={styles.dChip} x={176} y={166} width={88} height={20} rx={4} />
      <text className={styles.dM} x={220} y={180} textAnchor="middle">
        POST /deploy
      </text>

      <Box x={90} y={204} w={260} h={52} title="Stagehand · Go" sub="creates or deletes one preview per PR" />

      {/* GitHub <-> Stagehand: close webhooks in, PR comments out */}
      <path className={styles.dDash} d="M320 32 H394 V230 H350" />
      <text className={styles.dM} transform="translate(408 131) rotate(90)" textAnchor="middle">
        webhook · PR comment
      </text>

      <Arrow x={220} y1={256} y2={300} />

      <rect className={styles.dBox} x={40} y={300} width={360} height={130} rx={10} />
      <text className={styles.dT} x={56} y={323}>
        k3s on Oracle Cloud
      </text>
      <text className={styles.dS} x={384} y={323} textAnchor="end">
        Always Free · ARM
      </text>
      {["pr-12", "pr-15", "latest"].map((ns, i) => (
        <g key={ns}>
          <rect className={styles.dChip} x={60 + i * 110} y={336} width={100} height={40} rx={6} />
          <text className={styles.dMStrong} x={110 + i * 110} y={361} textAnchor="middle">
            {ns}
          </text>
        </g>
      ))}
      <text className={styles.dS} x={56} y={397}>
        each namespace: Deployment · Service · Ingress
      </text>
      <text className={styles.dM} x={56} y={417}>
        provisioned with Terraform
      </text>

      <Arrow x={220} y1={430} y2={470} />
      <Box x={90} y={470} w={260} h={52} title="Cloudflare Tunnel + Access" sub="sign-in required, no open web ports" />
      <Arrow x={220} y1={522} y2={558} />
      <Box x={110} y={558} w={220} h={48} title="Playtester" sub="andyjpeg.dev/shello-test/pr-12/" mono />
    </svg>
  );
}

export default function StagehandPage() {
  return (
    <div className={`${styles.page} ${archivo.variable}`}>
      <main className={styles.wrap}>
        <p className={styles.kicker}>Project · 2026 · source is private</p>
        <h1 className={styles.h1}>Stagehand</h1>
        <p className={styles.lede}>
          Preview environments for pull requests. Every PR to my team&apos;s game, <em>Shello, World!</em>, gets its own
          playable web build, so playtesters can try a change before it merges, on infrastructure that costs nothing
          to run.
        </p>

        <ul className={styles.tapes} aria-label="Results">
          {STATS.map((s) => (
            <li key={s.label} className={styles.tape} style={{ "--c": s.color } as React.CSSProperties}>
              <span className={styles.tapeValue}>{s.value}</span>
              <span className={styles.tapeLabel}>{s.label}</span>
            </li>
          ))}
        </ul>

        <ul className={styles.stack} aria-label="Stack">
          {STACK.map((t) => (
            <li key={t}>
              <code>{t}</code>
            </li>
          ))}
        </ul>

        <h2 className={styles.h2}>Why I built it</h2>
        <p>
          Shello, World! is built in Godot by a five-person team. Playable builds only went out at the end of each
          development phase, and trying a branch before then meant cloning it and opening Godot, which only the
          developers could do. Feedback on a change took about a week to come back.
        </p>
        <p>
          Stagehand puts a playable link on every pull request instead. Playtest turnaround dropped from about a week
          to three days, and testers no longer need anything installed.
        </p>

        <h2 className={styles.h2}>How a pull request becomes a preview</h2>
        <figure className={styles.arch}>
          <ArchitectureDiagram />
        </figure>
        <ol className={styles.journey}>
          {STEPS.map((s) => (
            <li key={s.title}>
              <strong>{s.title}</strong> {s.body}
            </li>
          ))}
        </ol>

        <h2 className={styles.h2}>The pieces</h2>
        <div className={styles.parts}>
          {PARTS.map((p) => (
            <section key={p.name} className={styles.part}>
              <h3 className={styles.partTag} style={{ "--c": p.color } as React.CSSProperties}>
                {p.name}
              </h3>
              <p>{p.what}</p>
            </section>
          ))}
        </div>

        <h2 className={styles.h2}>Decisions worth explaining</h2>
        {DECISIONS.map((d) => (
          <div key={d.title} className={styles.note}>
            <strong>{d.title}</strong>
            <p>{d.body}</p>
          </div>
        ))}

        <h2 className={styles.h2}>What&apos;s next</h2>
        <p>
          A <strong>Report bug</strong>{" "}button inside each preview that opens a GitHub issue with the PR number and
          commit already filled in, so a playtest goes straight from &ldquo;that&apos;s broken&rdquo; to a ticket the
          team can act on.
        </p>

        <p className={styles.closing}>
          The repository is private, but I&apos;m happy to walk through the code.{" "}
          <Link href="/">Back to andyjpeg.dev</Link>
        </p>
      </main>
    </div>
  );
}
