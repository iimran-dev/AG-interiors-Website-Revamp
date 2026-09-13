import ZAI from "z-ai-web-dev-sdk";
import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = "/home/z/my-project/public/images";
const MIN_FILE_BYTES = 10 * 1024;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type ImageJob = {
  filename: string;
  size:
    | "1024x1024"
    | "768x1344"
    | "864x1152"
    | "1344x768"
    | "1152x864"
    | "1440x720"
    | "720x1440";
  prompt: string;
  note?: string;
};

const JOBS: ImageJob[] = [
  {
    // API rejects 1440x720 (code 1214). Falling back to closest supported
    // landscape size, 1344x768 (~16:9, cinematic).
    filename: "destination-rooftop.png",
    size: "1344x768",
    prompt:
      "Cinematic photograph from an Athens rooftop at blue hour, the illuminated Acropolis glowing gold in the distance, rooftop terrace with low seating and warm string lights, silhouettes of the city, sophisticated and atmospheric, muted warm tones with deep blue sky, luxury travel photography",
    note: "size fallback 1440x720 -> 1344x768 (API rejected original size)",
  },
  {
    filename: "destination-nightlife.png",
    size: "864x1152",
    prompt:
      "Editorial night photograph of a sophisticated Athens cocktail bar, warm amber interior glow through a window, a lone patron, wet cobblestone street reflecting the light, quiet and atmospheric, muted warm palette with deep shadows, cinematic travel photography",
  },
];

async function generateOne(zai: ZAI, job: ImageJob, attempt: number) {
  console.log(`[attempt ${attempt}] generating ${job.filename} (${job.size}) ...`);
  if (job.note) console.log(`  note: ${job.note}`);
  const response = await zai.images.generations.create({
    prompt: job.prompt,
    size: job.size,
  });
  if (!response?.data?.length) throw new Error("empty response data");
  const base64 = response.data[0].base64;
  if (!base64) throw new Error("empty base64 payload");
  const buf = Buffer.from(base64, "base64");
  if (buf.length < MIN_FILE_BYTES)
    throw new Error(`decoded buffer too small: ${buf.length} bytes`);
  const outPath = path.join(OUTPUT_DIR, job.filename);
  fs.writeFileSync(outPath, buf);
  const stat = fs.statSync(outPath);
  console.log(`  saved ${outPath} (${stat.size} bytes)`);
}

async function generateWithRetry(zai: ZAI, job: ImageJob) {
  let lastErr: unknown = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await generateOne(zai, job, attempt);
      return;
    } catch (err) {
      lastErr = err;
      console.error(`  attempt ${attempt} failed: ${(err as Error)?.message ?? err}`);
      // backoff for rate-limit (429) errors
      await sleep(15000 * attempt);
    }
  }
  throw new Error(
    `giving up on ${job.filename}: ${(lastErr as Error)?.message ?? lastErr}`
  );
}

async function main() {
  console.log(`initializing ZAI ...`);
  const zai = await ZAI.create();
  for (const job of JOBS) {
    // only generate if missing
    const p = path.join(OUTPUT_DIR, job.filename);
    if (fs.existsSync(p) && fs.statSync(p).size >= MIN_FILE_BYTES) {
      console.log(`already exists, skipping: ${p}`);
      continue;
    }
    try {
      await generateWithRetry(zai, job);
    } catch (err) {
      console.error(`FAILED: ${job.filename} -> ${(err as Error).message}`);
      process.exitCode = 1;
    }
    await sleep(8000); // be nice to rate limiter between jobs
  }

  console.log("\n--- FINAL VERIFICATION ---");
  const allFiles = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".png"));
  for (const f of allFiles.sort()) {
    const fp = path.join(OUTPUT_DIR, f);
    const s = fs.statSync(fp);
    console.log(`  ${f}: ${s.size} bytes`);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
