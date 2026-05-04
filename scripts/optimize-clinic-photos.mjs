#!/usr/bin/env node
/**
 * 한의원 내부·원장 사진 최적화.
 *
 * 입력:  /reference/images/<한글이름>.{png,jpeg,jpg}
 * 출력:  /public/photos/clinic/<영문 슬러그>.webp
 *
 * - 최대 너비 1600px (사진 갤러리·hero 사용에 충분)
 * - WebP quality 82 (시각적 손실 최소, 원본 1.8–3MB → ~150–350KB)
 * - 변경된 원본만 재생성 (원본 mtime > 출력 mtime일 때만)
 *
 * 실행: node scripts/optimize-clinic-photos.mjs
 *
 * Phase 1엔 1회성 수동 실행. Phase 2 운영자 도입 시 Storage 업로드 + 서버 변환 파이프라인으로 대체.
 */

import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const inputDir = path.join(repoRoot, "reference", "images");
const outputDir = path.join(repoRoot, "public", "photos", "clinic");

/** 한글 파일명 → 영문 슬러그 + 의미 라벨 */
const FILE_MAP = {
	"대기실.png": { slug: "waiting-room", caption: "대기실" },
	"마사지룸.png": { slug: "massage-room", caption: "마사지룸" },
	"복도.png": { slug: "hallway", caption: "복도" },
	"실내전경.png": { slug: "interior", caption: "실내 전경" },
	"안내데스크1.png": { slug: "reception-1", caption: "안내데스크" },
	"안내데스크2.jpeg": { slug: "reception-2", caption: "안내데스크" },
	"원장.png": { slug: "director", caption: "윤정호 원장" },
	"진료1.jpeg": { slug: "consult-1", caption: "진료실" },
	"진료2.jpeg": { slug: "consult-2", caption: "진료실" },
	"진료3.jpeg": { slug: "consult-3", caption: "진료실" },
	"진료실1.png": { slug: "exam-room-1", caption: "진료실" },
	"진료실2.png": { slug: "exam-room-2", caption: "진료실" },
	"진료실3.png": { slug: "exam-room-3", caption: "진료실" },
	"진료실4.png": { slug: "exam-room-4", caption: "진료실" },
	"추나배드.png": { slug: "chuna-bed", caption: "추나 베드" },
	"추나치료실.png": { slug: "chuna-room", caption: "추나 치료실" },
	"탕전실1.jpeg": { slug: "dispensary-1", caption: "원내 탕전실" },
	"탕전실2.jpeg": { slug: "dispensary-2", caption: "원내 탕전실" },
};

const MAX_WIDTH = 1600;
const QUALITY = 82;

async function maybeStat(p) {
	try {
		return await stat(p);
	} catch {
		return null;
	}
}

async function main() {
	const files = await readdir(inputDir);
	const meta = [];
	let processed = 0;
	let skipped = 0;

	for (const file of files) {
		// macOS NFD → NFC 정규화. FILE_MAP의 키는 NFC.
		const key = file.normalize("NFC");
		const map = FILE_MAP[key];
		if (!map) continue;

		const inPath = path.join(inputDir, file);
		const outPath = path.join(outputDir, `${map.slug}.webp`);

		const inStat = await maybeStat(inPath);
		const outStat = await maybeStat(outPath);

		if (inStat && outStat && outStat.mtimeMs >= inStat.mtimeMs) {
			// 이미 최신
			const img = sharp(outPath);
			const m = await img.metadata();
			meta.push({ slug: map.slug, caption: map.caption, w: m.width, h: m.height });
			skipped++;
			continue;
		}

		const buf = await readFile(inPath);
		const pipeline = sharp(buf)
			.rotate() // EXIF orientation 정규화
			.resize({ width: MAX_WIDTH, withoutEnlargement: true })
			.webp({ quality: QUALITY, effort: 5 });

		const out = await pipeline.toBuffer({ resolveWithObject: true });
		await writeFile(outPath, out.data);

		meta.push({
			slug: map.slug,
			caption: map.caption,
			w: out.info.width,
			h: out.info.height,
		});
		processed++;
		console.log(
			`✓ ${file}  →  ${path.relative(repoRoot, outPath)}  (${out.info.width}×${out.info.height}, ${(out.data.length / 1024).toFixed(0)}KB)`,
		);
	}

	// 갤러리 컴포넌트가 import할 수 있는 메타데이터 — 가로/세로 비율을 알면 CLS 0
	const indexPath = path.join(repoRoot, "src", "data", "clinic-photos.ts");
	const sorted = meta.sort((a, b) => a.slug.localeCompare(b.slug));
	const indexContent = `/**
 * 한의원 내부·원장 사진 메타데이터.
 *
 * 자동 생성 — \`scripts/optimize-clinic-photos.mjs\` 실행 결과.
 * 직접 수정 금지. 사진을 추가/교체하려면 reference/images/에 원본 두고 스크립트 재실행.
 */

export interface ClinicPhoto {
	slug: string;
	caption: string;
	w: number;
	h: number;
}

export const CLINIC_PHOTOS = ${JSON.stringify(sorted, null, "\t")} as const satisfies readonly ClinicPhoto[];

export type ClinicPhotoSlug = (typeof CLINIC_PHOTOS)[number]["slug"];

export function clinicPhoto(slug: ClinicPhotoSlug): ClinicPhoto {
	const found = CLINIC_PHOTOS.find((p) => p.slug === slug);
	if (!found) throw new Error(\`unknown clinic photo: \${slug}\`);
	return found;
}
`;
	await writeFile(indexPath, indexContent);

	console.log(
		`\n${processed} processed · ${skipped} skipped · index → ${path.relative(repoRoot, indexPath)}`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
