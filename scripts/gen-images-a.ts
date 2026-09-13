/**
 * V36 Suites Athens — Hero & Suite image generation (Task 3-A)
 *
 * Uses z-ai-web-dev-sdk to generate luxury editorial photography for the
 * boutique hotel brand. Saves PNGs to /home/z/my-project/public/images.
 *
 * Run with: bun scripts/gen-images-a.ts
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public/images';

type ImageSpec = {
  filename: string;
  size: "1440x720" | "1344x768" | "864x1152" | "1024x1024" | "768x1344" | "1152x864" | "720x1440";
  prompt: string;
};

const IMAGES: ImageSpec[] = [
  {
    filename: 'hero-athens-sunset.png',
    size: '1440x720',
    prompt:
      'Cinematic wide aerial photograph of Athens at golden hour sunset, the Acropolis and Parthenon glowing in warm amber light, terracotta rooftops of the city stretching to the horizon, soft hazy atmosphere, Mount Lycabettus in distance, warm Mediterranean sunset tones, editorial travel photography, sophisticated muted color palette, atmospheric depth, ultra high quality, professional architectural photography',
  },
  {
    filename: 'suite-signature.png',
    size: '1344x768',
    prompt:
      'Editorial interior photograph of a luxury boutique hotel suite in Athens, warm ivory walls, natural oak flooring, king bed with crisp white linen and muted stone-toned throws, floor-to-ceiling window with sheer linen curtains filtering golden afternoon light, minimalist European furniture, brass and stone accents, soft shadows, sophisticated warm minimalism, architectural digest style, professional interior photography, muted refined palette',
  },
  {
    filename: 'suite-acropolis-view.png',
    size: '1344x768',
    prompt:
      'Editorial interior photograph of a luxury boutique hotel room with a framed view of the Acropolis Parthenon through a large window, warm ivory interiors, low platform bed with white linens, a single brass reading lamp, stone and oak textures, soft directional light, quiet sophisticated atmosphere, warm Mediterranean tones, architectural photography, premium travel publication aesthetic',
  },
  {
    filename: 'suite-terrace.png',
    size: '1344x768',
    prompt:
      'Editorial photograph of a private hotel terrace in Athens at dusk, stone paving, low travertine seating with linen cushions, a small olive tree in a clay pot, view over Athenian rooftops toward the Acropolis illuminated in the evening, warm ambient lighting, candle glow, refined European luxury, calm and intimate, architectural digest photography, muted warm tones',
  },
  {
    filename: 'suite-garden.png',
    size: '1344x768',
    prompt:
      'Editorial interior photograph of a serene ground-floor boutique hotel suite opening onto a private stone courtyard garden, lush greenery and olive branches visible through arched opening, warm ivory plaster walls, natural linen upholstery, terracotta and oak floor, soft diffused daylight, quiet luxury Mediterranean atmosphere, sophisticated minimal styling, architectural photography',
  },
  {
    filename: 'suite-penthouse.png',
    size: '1344x768',
    prompt:
      'Editorial interior photograph of a top-floor penthouse suite in a boutique Athens hotel, vaulted whitewashed ceiling with exposed wooden beams, large arched window with panoramic city view at blue hour, low modern furniture in stone and charcoal tones, brass floor lamp casting warm glow, refined minimalist composition, sophisticated European luxury, architectural digest photography',
  },
  {
    filename: 'brand-story.png',
    size: '864x1152',
    prompt:
      'Architectural detail photograph of a boutique hotel in Athens, warm ivory plaster wall meeting a stone archway, soft raking morning light casting long shadows, a single brass wall sconce, texture of hand-troweled plaster, refined Mediterranean minimalism, quiet luxury, editorial architectural photography, muted warm palette, sophisticated composition with negative space',
  },
];

const MIN_FILE_BYTES = 10 * 1024; // 10KB

/**
 * NOTE on size 1440x720: the SDK lists it as supported, but the underlying
 * API rejects it because 720 is not a multiple of 32 ("size的长宽均需满足512px-2880px
 * 之间,且为32整数倍"). For the hero image we substitute 1536x768 (exact 2:1 ratio,
 * both dims multiples of 32, px well under 2^22). Filename kept identical so
 * downstream consumers are unaffected.
 */
const SIZE_OVERRIDES: Record<string, string> = {
  'hero-athens-sunset.png': '1536x768',
};

async function generateOne(
  zai: Awaited<ReturnType<typeof ZAI.create>>,
  spec: ImageSpec
): Promise<{ ok: boolean; path: string; bytes: number; error?: string; skipped?: boolean }> {
  const outPath = path.join(OUTPUT_DIR, spec.filename);
  const effectiveSize = SIZE_OVERRIDES[spec.filename] ?? spec.size;

  // Skip if already generated and valid
  if (fs.existsSync(outPath)) {
    const existingBytes = fs.statSync(outPath).size;
    if (existingBytes >= MIN_FILE_BYTES) {
      console.log(`[${spec.filename}] already exists (${existingBytes} B), skipping`);
      return { ok: true, path: outPath, bytes: existingBytes, skipped: true };
    }
  }

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      console.log(`[${spec.filename}] attempt ${attempt} (${effectiveSize})...`);
      const response = await zai.images.generations.create({
        prompt: spec.prompt,
        size: effectiveSize as any,
      });

      if (!response?.data?.[0]?.base64) {
        throw new Error('No base64 data in response');
      }

      const buf = Buffer.from(response.data[0].base64, 'base64');
      fs.writeFileSync(outPath, buf);
      const bytes = fs.statSync(outPath).size;

      if (bytes < MIN_FILE_BYTES) {
        throw new Error(`File too small: ${bytes} bytes`);
      }

      console.log(`  ✓ saved ${spec.filename} (${bytes} bytes)`);
      return { ok: true, path: outPath, bytes };
    } catch (err: any) {
      console.error(`  ✗ attempt ${attempt} failed: ${err?.message ?? err}`);
      if (attempt === 2) {
        return { ok: false, path: outPath, bytes: 0, error: String(err?.message ?? err) };
      }
      // brief backoff
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
  return { ok: false, path: outPath, bytes: 0, error: 'unreachable' };
}

async function main() {
  // Ensure output dir exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const zai = await ZAI.create();

  const results: Array<ImageSpec & { ok: boolean; bytes: number; error?: string }> = [];
  for (const spec of IMAGES) {
    const r = await generateOne(zai, spec);
    results.push({ ...spec, ok: r.ok, bytes: r.bytes, error: r.error });
  }

  console.log('\n=== Summary ===');
  let successCount = 0;
  for (const r of results) {
    const effectiveSize = SIZE_OVERRIDES[r.filename] ?? r.size;
    const status = r.ok ? 'OK ' : 'FAIL';
    const skipTag = (r as any).skipped ? ' (cached)' : '';
    const sizeNote = effectiveSize !== r.size ? `  [override: ${effectiveSize}]` : '';
    console.log(
      `${status}  ${r.filename}  requested=${r.size}${sizeNote}  ${r.bytes}B${skipTag}${r.error ? '  (' + r.error + ')' : ''}`
    );
    if (r.ok) successCount++;
  }
  console.log(`\n${successCount}/${results.length} images generated successfully.`);

  if (successCount !== results.length) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
