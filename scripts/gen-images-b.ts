import ZAI from "z-ai-web-dev-sdk";
import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = "/home/z/my-project/public/images";

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
};

const JOBS: ImageJob[] = [
  {
    filename: "landmark-acropolis.png",
    size: "1024x1024",
    prompt:
      "Editorial photograph of the Acropolis of Athens at golden hour, the Parthenon in warm amber light, ancient marble columns, soft hazy Mediterranean sky, sophisticated muted color palette, architectural photography, refined and timeless, depth and atmosphere",
  },
  {
    filename: "landmark-plaka.png",
    size: "1024x1024",
    prompt:
      "Editorial street photograph of the Plaka neighborhood in Athens, narrow cobblestone lane, neoclassical houses with terracotta roofs and wrought iron balconies, climbing bougainvillea, warm afternoon light, empty quiet street, sophisticated travel photography, muted warm tones, European charm",
  },
  {
    filename: "landmark-monastiraki.png",
    size: "1024x1024",
    prompt:
      "Editorial photograph of Monastiraki square in Athens at dusk, the Tzistarakis Mosque in warm light, ancient ruins visible, soft evening atmosphere, a few distant silhouettes, muted sophisticated palette, architectural and travel photography, warm Mediterranean tones",
  },
  {
    filename: "landmark-syntagma.png",
    size: "1024x1024",
    prompt:
      "Editorial photograph of Syntagma Square in Athens, the neoclassical Greek Parliament building, warm morning light, refined composition, quiet sophisticated atmosphere, muted color palette, architectural photography, Mediterranean elegance",
  },
  {
    filename: "landmark-temple-zeus.png",
    size: "1024x1024",
    prompt:
      "Editorial photograph of the Temple of Olympian Zeus in Athens, towering Corinthian columns standing alone against a soft hazy sky, golden afternoon light, ancient ruins, sophisticated muted palette, architectural photography, timeless and monumental",
  },
  {
    filename: "landmark-national-garden.png",
    size: "1024x1024",
    prompt:
      "Editorial photograph of a path in the National Garden of Athens, dappled sunlight through tall pine trees, lush greenery, a stone bench in the distance, peaceful and refined, warm afternoon light, sophisticated muted natural palette, travel and landscape photography",
  },
  {
    filename: "destination-street.png",
    size: "864x1152",
    prompt:
      "Editorial street photograph of an Athenian backstreet, warm ivory and ochre plastered buildings, small taverna with wooden chairs, hanging laundry in soft light, a solitary figure walking, quiet Mediterranean afternoon, sophisticated muted warm tones, travel publication photography",
  },
  {
    filename: "destination-food.png",
    size: "864x1152",
    prompt:
      "Editorial overhead photograph of a refined Greek meze table, small plates of olives, feta with olive oil, fresh tomato, tzatziki, warm rustic bread, a glass of white wine, soft natural light on a stone surface, muted warm Mediterranean palette, sophisticated food photography, Cereal magazine aesthetic",
  },
  {
    filename: "destination-rooftop.png",
    size: "1440x720",
    prompt:
      "Cinematic photograph from an Athens rooftop at blue hour, the illuminated Acropolis glowing gold in the distance, rooftop terrace with low seating and warm string lights, silhouettes of the city, sophisticated and atmospheric, muted warm tones with deep blue sky, luxury travel photography",
  },
  {
    filename: "destination-nightlife.png",
    size: "864x1152",
    prompt:
      "Editorial night photograph of a sophisticated Athens cocktail bar, warm amber interior glow through a window, a lone patron, wet cobblestone street reflecting the light, quiet and atmospheric, muted warm palette with deep shadows, cinematic travel photography",
  },
];

const MIN_FILE_BYTES = 10 * 1024; // 10KB

async function generateOne(
  zai: ZAI,
  job: ImageJob,
  attempt: number
): Promise<void> {
  console.log(
    `[attempt ${attempt}] generating ${job.filename} (${job.size}) ...`
  );
  const response = await zai.images.generations.create({
    prompt: job.prompt,
    size: job.size,
  });

  if (!response || !response.data || response.data.length === 0) {
    throw new Error("empty response data");
  }

  const base64 = response.data[0].base64;
  if (!base64 || base64.length === 0) {
    throw new Error("empty base64 payload");
  }

  const buf = Buffer.from(base64, "base64");
  if (buf.length < MIN_FILE_BYTES) {
    throw new Error(
      `decoded buffer too small: ${buf.length} bytes (need > ${MIN_FILE_BYTES})`
    );
  }

  const outPath = path.join(OUTPUT_DIR, job.filename);
  fs.writeFileSync(outPath, buf);
  const stat = fs.statSync(outPath);
  console.log(
    `  saved ${outPath} (${stat.size} bytes, ${job.size})`
  );
}

async function generateWithRetry(zai: ZAI, job: ImageJob): Promise<void> {
  let lastErr: unknown = null;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      await generateOne(zai, job, attempt);
      return;
    } catch (err) {
      lastErr = err;
      console.error(`  failed attempt ${attempt}: ${(err as Error)?.message ?? err}`);
    }
  }
  throw new Error(
    `giving up on ${job.filename} after 2 attempts: ${(lastErr as Error)?.message ?? lastErr}`
  );
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`created ${OUTPUT_DIR}`);
  }

  console.log(`initializing ZAI ...`);
  const zai = await ZAI.create();
  console.log(`ZAI ready, generating ${JOBS.length} images ...`);

  const failures: string[] = [];
  for (const job of JOBS) {
    try {
      await generateWithRetry(zai, job);
    } catch (err) {
      console.error(`FAILED: ${job.filename} -> ${(err as Error).message}`);
      failures.push(job.filename);
    }
  }

  // Verify all output files exist and are > 10KB
  console.log("\n--- VERIFICATION ---");
  const allOk: string[] = [];
  const bad: string[] = [];
  for (const job of JOBS) {
    const p = path.join(OUTPUT_DIR, job.filename);
    if (!fs.existsSync(p)) {
      console.error(`MISSING: ${p}`);
      bad.push(job.filename);
      continue;
    }
    const stat = fs.statSync(p);
    if (stat.size < MIN_FILE_BYTES) {
      console.error(`TOO SMALL: ${p} (${stat.size} bytes)`);
      bad.push(job.filename);
      continue;
    }
    allOk.push(`${job.filename} (${stat.size} bytes)`);
  }

  console.log("\nOK files:");
  for (const line of allOk) console.log(`  - ${line}`);

  if (bad.length > 0 || failures.length > 0) {
    console.error("\nFailures:");
    for (const f of bad) console.error(`  - ${f}`);
    process.exitCode = 1;
  } else {
    console.log("\nALL 10 IMAGES GENERATED AND VERIFIED.");
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
