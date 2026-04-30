/**
 * 원장 윤정호 스타일라이즈드 SVG 초상 — mockups/home.html 인라인 SVG 1:1.
 *
 * Phase 1 placeholder. 실제 사진 도입 시 next/image로 교체 예정.
 * 흰 가운 + 안경 + 마스크 + "한의사 윤정호" 명찰 — 의료적 신뢰 시각화.
 */
export function DirectorPortrait() {
	return (
		<svg
			viewBox="0 0 200 240"
			xmlns="http://www.w3.org/2000/svg"
			className="w-full h-auto"
			role="img"
			aria-label="윤정호 원장 일러스트"
		>
			{/* White coat body */}
			<path
				d="M40 240 L40 180 Q40 130 80 120 L100 110 L120 120 Q160 130 160 180 L160 240 Z"
				fill="#FFFDF9"
				stroke="#C7BFB2"
				strokeWidth="0.8"
			/>
			{/* Shoulders detail */}
			<path
				d="M80 120 L100 130 L120 120"
				fill="none"
				stroke="#C7BFB2"
				strokeWidth="0.6"
			/>
			{/* Coat collar */}
			<path
				d="M85 130 L100 145 L115 130 L100 122 Z"
				fill="#FAF8F5"
				stroke="#C7BFB2"
				strokeWidth="0.6"
			/>
			{/* Inner shirt */}
			<path d="M90 140 L100 155 L110 140 L110 240 L90 240 Z" fill="#F1EEE8" />
			{/* Name tag */}
			<rect
				x="115"
				y="155"
				width="30"
				height="14"
				fill="#FFFDF9"
				stroke="#C7BFB2"
				strokeWidth="0.5"
				rx="1"
			/>
			<text
				x="130"
				y="161"
				textAnchor="middle"
				fontFamily="IBM Plex Sans KR, sans-serif"
				fontSize="4.5"
				fontWeight="500"
				fill="#492E14"
			>
				한의사
			</text>
			<text
				x="130"
				y="167"
				textAnchor="middle"
				fontFamily="IBM Plex Sans KR, sans-serif"
				fontSize="5.5"
				fontWeight="700"
				fill="#492E14"
			>
				윤정호
			</text>
			{/* Head */}
			<ellipse cx="100" cy="78" rx="22" ry="26" fill="#E8C9A8" />
			{/* Hair (short) */}
			<path
				d="M78 70 Q78 52 100 50 Q122 52 122 72 Q122 75 120 76 L80 76 Q78 75 78 70Z"
				fill="#2A1B0E"
			/>
			{/* Glasses */}
			<circle
				cx="91"
				cy="80"
				r="6"
				fill="none"
				stroke="#492E14"
				strokeWidth="1.2"
			/>
			<circle
				cx="109"
				cy="80"
				r="6"
				fill="none"
				stroke="#492E14"
				strokeWidth="1.2"
			/>
			<line x1="97" y1="80" x2="103" y2="80" stroke="#492E14" strokeWidth="1" />
			{/* Mask */}
			<path
				d="M86 86 Q100 92 114 86 L116 96 Q100 102 84 96 Z"
				fill="#FAFCFE"
				stroke="#C7BFB2"
				strokeWidth="0.6"
			/>
			<line
				x1="86"
				y1="86"
				x2="84"
				y2="84"
				stroke="#C7BFB2"
				strokeWidth="0.4"
			/>
			<line
				x1="114"
				y1="86"
				x2="116"
				y2="84"
				stroke="#C7BFB2"
				strokeWidth="0.4"
			/>
			{/* Subtle shadow under */}
			<ellipse
				cx="100"
				cy="105"
				rx="20"
				ry="2"
				fill="#000"
				fillOpacity="0.06"
			/>
		</svg>
	);
}
