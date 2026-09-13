/**
 * V36 Suites Athens — Curated Experiences, Gallery & Guest Images
 * Task ID: 3-C (Agent: image-gen-C)
 *
 * Generates luxury editorial photography for the boutique hotel website using
 * the z-ai-web-dev-sdk image generation API.
 *
 * Run: cd /home/z/my-project && bun scripts/gen-images-c.ts
 */

import fs from "node:fs";
import path from "node:path";
import ZAI from "z-ai-web-dev-sdk";

const OUT_DIR = "/home/z/my-project/public/images";

type Size =
  | "1024x1024"
  | "768x1344"
  | "864x1152"
  | "1344x768"
  | "1152x864"
  | "1440x720"
  | "720x1440";

interface ImageJob {
  filename: string;
  size: Size;
  prompt: string;
}

const JOBS: ImageJob[] = [
  // === Curated Experiences ===
  {
    filename: "exp-acropolis-tour.png",
    size: "1344x768",
    prompt:
      "Editorial photograph of a private guided tour at the Acropolis of Athens at sunrise, a knowledgeable local guide gesturing toward the Parthenon, empty ancient site bathed in soft golden morning light, refined and exclusive atmosphere, muted sophisticated palette, premium travel photography, quiet luxury",
  },
  {
    filename: "exp-airport-pickup.png",
    size: "1024x1024",
    prompt:
      "Editorial photograph of a luxury airport transfer, a sleek dark sedan parked at Athens airport arrivals at dusk, a uniformed driver holding the door, warm evening light, sophisticated and discreet, muted warm palette, refined travel photography",
  },
  {
    filename: "exp-food-walk.png",
    size: "1024x1024",
    prompt:
      "Editorial photograph of a small curated food walking tour in an Athenian market, warm displays of olives and spices, a local guide explaining to two refined travelers, soft natural market light, muted warm Mediterranean palette, sophisticated travel photography",
  },
  {
    filename: "exp-santorini.png",
    size: "1024x1024",
    prompt:
      "Editorial photograph of Santorini at golden hour, iconic whitewashed buildings and blue domes cascading down the cliff, caldera view, warm soft light, sophisticated muted palette with restrained blues, premium travel photography, serene and timeless",
  },
  {
    filename: "exp-car-rental.png",
    size: "1024x1024",
    prompt:
      "Editorial photograph of a classic vintage convertible car parked on a quiet Athenian street with the Acropolis visible in the distance, warm afternoon light, sophisticated and cinematic, muted warm palette, refined travel photography",
  },

  // === Gallery (editorial, varied proportions) ===
  {
    filename: "gallery-bathroom.png",
    size: "864x1152",
    prompt:
      "Editorial interior photograph of a luxury boutique hotel bathroom, large travertine stone walls, freestanding oval bathtub, brushed brass fittings, soft diffused daylight from a high window, single orchid, warm ivory and stone palette, quiet luxury, architectural digest photography, refined minimal styling",
  },
  {
    filename: "gallery-dining.png",
    size: "1152x864",
    prompt:
      "Editorial photograph of an intimate breakfast setting in a boutique Athens hotel, a small round table by a window with soft morning light, fresh fruit, Greek yogurt with honey, croissants, a single ceramic vase with olive branch, crisp white linen, warm ivory interior, muted sophisticated palette, Kinfolk style food photography",
  },
  {
    filename: "gallery-architecture.png",
    size: "864x1152",
    prompt:
      "Architectural detail photograph of a boutique Athens hotel, warm ivory plaster wall meeting a curved stone staircase, soft raking morning light, refined Mediterranean minimalism, hand-troweled texture, a single shadow, sophisticated composition with negative space, architectural photography, muted warm palette",
  },
  {
    filename: "gallery-detail.png",
    size: "1024x1024",
    prompt:
      "Macro editorial photograph of refined hotel details, a brass room key resting on a folded linen napkin on a warm oak surface, soft directional light, shallow depth of field, quiet luxury aesthetic, muted warm palette, sophisticated product photography",
  },
  {
    filename: "gallery-acropolis-night.png",
    size: "1152x864",
    prompt:
      "Cinematic night photograph of the illuminated Acropolis of Athens seen from a distance across the city rooftops, the Parthenon glowing gold against a deep blue twilight sky, warm window lights of the city below, atmospheric and timeless, muted sophisticated palette, luxury travel photography",
  },

  // === Instagram feed (square) ===
  {
    filename: "ig-1.png",
    size: "1024x1024",
    prompt:
      "Editorial square photograph, Athens rooftop at sunset with Acropolis silhouette, warm golden light, a glass of wine in foreground, sophisticated travel photography, muted warm palette",
  },
  {
    filename: "ig-2.png",
    size: "1024x1024",
    prompt:
      "Editorial square photograph, close-up of a luxury suite bed with crisp white linen and a single olive branch on the pillow, warm morning light, quiet luxury, muted palette",
  },
  {
    filename: "ig-3.png",
    size: "1024x1024",
    prompt:
      "Editorial square photograph, a cobbled Athenian street corner with a small cafe, warm afternoon light, empty and serene, travel publication aesthetic, muted warm tones",
  },
  {
    filename: "ig-4.png",
    size: "1024x1024",
    prompt:
      "Editorial square photograph, overhead of a refined Greek salad on a stone surface, tomatoes, cucumber, feta, olives, olive oil, soft natural light, sophisticated food photography",
  },
  {
    filename: "ig-5.png",
    size: "1024x1024",
    prompt:
      "Editorial square photograph, marble architectural detail of the Acropolis columns in warm golden light, texture and shadow, sophisticated and timeless, muted palette",
  },
  {
    filename: "ig-6.png",
    size: "1024x1024",
    prompt:
      "Editorial square photograph, a private hotel terrace at dusk with the Acropolis illuminated in the distance, low travertine seating, warm ambient light, refined luxury travel photography",
  },

  // === Guest review avatars (portrait, displayed as small circle) ===
  {
    filename: "guest-1.png",
    size: "768x1344",
    prompt:
      "Editorial portrait photograph of an elegant European woman in her 40s, soft natural light, neutral background, warm sophisticated tone, professional portrait, muted palette",
  },
  {
    filename: "guest-2.png",
    size: "768x1344",
    prompt:
      "Editorial portrait photograph of a refined man in his 50s with greying hair, soft natural light, neutral background, warm sophisticated tone, professional portrait, muted palette",
  },
  {
    filename: "guest-3.png",
    size: "768x1344",
    prompt:
      "Editorial portrait photograph of a stylish woman in her 30s, soft natural light, neutral background, warm sophisticated tone, professional portrait, muted palette",
  },
  {
    filename: "guest-4.png",
    size: "768x1344",
    prompt:
      "Editorial portrait photograph of a distinguished man in his 40s, soft natural light, neutral background, warm sophisticated tone, professional portrait, muted palette",
  },
  {
    filename: "guest-5.png",
    size: "768x1344",
    prompt:
      "Editorial portrait photograph of an elegant woman in her 60s, soft natural light, neutral background, warm sophisticated tone, professional portrait, muted palette",
  },
];

/** Generate one image with a single retry on failure. Returns bytes saved or throws. */
async function generateOne(
  zai: Awaited<ReturnType<typeof ZAI.create>>,
  job: ImageJob,
): Promise<number> {
  const outPath = path.join(OUT_DIR, job.filename);
  const attempts = 2;
  let lastErr: unknown = null;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      console.log(
        `  [attempt ${attempt}] generating ${job.filename} (${job.size})...`,
      );
      const response = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size,
      });
      const b64 = response.data?.[0]?.base64;
      if (!b64) {
        throw new Error("response.data[0].base64 missing");
      }
      const buf = Buffer.from(b64, "base64");
      if (buf.length < 1024) {
        throw new Error(`decoded buffer too small (${buf.length} bytes)`);
      }
      fs.writeFileSync(outPath, buf);
      console.log(`  ✓ saved ${job.filename} (${buf.length} bytes)`);
      return buf.length;
    } catch (err) {
      lastErr = err;
      console.log(
        `  ✗ attempt ${attempt} failed for ${job.filename}: ${
          err instanceof Error ? err.message : String(err)
        }`,
      );
      // short pause before retry
      if (attempt < attempts) {
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
  }
  throw new Error(
    `Failed to generate ${job.filename} after ${attempts} attempts: ${
      lastErr instanceof Error ? lastErr.message : String(lastErr)
    }`,
  );
}

async function main() {
  // Ensure output directory exists
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`V36 Suites — image generation (Task 3-C)`);
  console.log(`Output dir: ${OUT_DIR}`);
  console.log(`Total images: ${JOBS.length}`);

  const zai = await ZAI.create();

  const results: { filename: string; size: Size; bytes: number; ok: boolean }[] =
    [];
  const failures: string[] = [];

  for (let i = 0; i < JOBS.length; i++) {
    const job = JOBS[i];
    const outPath = path.join(OUT_DIR, job.filename);

    // Idempotent: skip files that already exist and are > 10KB
    try {
      const existingStat = fs.statSync(outPath);
      if (existingStat.size > 10 * 1024) {
        console.log(
          `\n[${i + 1}/${JOBS.length}] ${job.filename} (${job.size}) — already exists (${existingStat.size.toLocaleString()} bytes), skipping`,
        );
        results.push({
          filename: job.filename,
          size: job.size,
          bytes: existingStat.size,
          ok: true,
        });
        continue;
      }
    } catch {
      // file does not exist, proceed to generate
    }

    console.log(`\n[${i + 1}/${JOBS.length}] ${job.filename} (${job.size})`);
    try {
      const bytes = await generateOne(zai, job);
      results.push({ filename: job.filename, size: job.size, bytes, ok: true });
    } catch (err) {
      console.log(`  !! ${err instanceof Error ? err.message : String(err)}`);
      failures.push(job.filename);
      results.push({
        filename: job.filename,
        size: job.size,
        bytes: 0,
        ok: false,
      });
    }
  }

  // Post-verification: confirm each file exists & is > 10KB
  console.log("\n=== Verification ===");
  let verified = 0;
  let badFiles: string[] = [];
  for (const r of results) {
    const p = path.join(OUT_DIR, r.filename);
    try {
      const stat = fs.statSync(p);
      if (stat.size > 10 * 1024) {
        console.log(
          `  ✓ ${r.filename} — ${stat.size.toLocaleString()} bytes`,
        );
        verified++;
      } else {
        console.log(
          `  ✗ ${r.filename} — TOO SMALL (${stat.size} bytes)`,
        );
        badFiles.push(r.filename);
      }
    } catch {
      console.log(`  ✗ ${r.filename} — MISSING`);
      badFiles.push(r.filename);
    }
  }

  console.log(`\nSummary: ${verified}/${JOBS.length} verified (>10KB)`);
  if (failures.length > 0) {
    console.log(`Generation failures: ${failures.join(", ")}`);
  }
  if (badFiles.length > 0) {
    console.log(`Verification failures: ${badFiles.join(", ")}`);
  }
  if (verified === JOBS.length) {
    console.log("✓ All images generated and verified successfully.");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
