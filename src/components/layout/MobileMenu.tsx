"use client";

import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/icons/LogoMark";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { clinic, kakaoChatUrl } from "@/lib/settings";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";

/**
 * 모바일 햄버거 메뉴 — 우측 슬라이드 드로어.
 * - ESC 키 / 백드롭 클릭 / 링크 클릭 시 닫힘
 * - 열린 동안 body 스크롤 잠금
 * - aria-expanded · aria-modal · role="dialog" 지원
 */
export function MobileMenu({ formUrl }: { formUrl: string }) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [open]);

	const close = () => setOpen(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setOpen(true)}
				aria-label="메뉴 열기"
				aria-expanded={open}
				aria-controls="mobile-menu-panel"
				className="inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-md text-ink-primary hover:bg-bg-muted transition-colors"
			>
				<Menu className="size-6" aria-hidden="true" />
			</button>

			<button
				type="button"
				onClick={close}
				aria-hidden={!open}
				tabIndex={open ? 0 : -1}
				aria-label="메뉴 닫기"
				className={cn(
					"fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-200",
					open ? "opacity-100" : "opacity-0 pointer-events-none",
				)}
			/>

			<aside
				id="mobile-menu-panel"
				role="dialog"
				aria-modal="true"
				aria-label="모바일 메뉴"
				aria-hidden={!open}
				className={cn(
					"fixed top-0 right-0 z-50 h-dvh w-[min(86vw,360px)]",
					"bg-bg-base shadow-xl border-l border-border-subtle",
					"flex flex-col",
					"transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
					open ? "translate-x-0" : "translate-x-full",
				)}
			>
				<div className="flex items-center justify-between px-5 h-16 border-b border-border-subtle">
					<div className="flex items-center gap-2">
						<LogoMark size="sm" className="text-brand" />
						<strong className="text-sm tracking-tight">{clinic.nameKo}</strong>
					</div>
					<button
						type="button"
						onClick={close}
						aria-label="메뉴 닫기"
						className="inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-md text-ink-secondary hover:bg-bg-muted transition-colors"
					>
						<X className="size-5" aria-hidden="true" />
					</button>
				</div>

				<nav className="flex-1 overflow-y-auto py-4">
					<ul className="flex flex-col">
						{NAV_ITEMS.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									onClick={close}
									className="flex items-center px-5 py-3.5 text-base text-ink-primary font-medium hover:bg-bg-subtle transition-colors"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="flex flex-col gap-2 p-5 border-t border-border-subtle bg-bg-subtle">
					<Button
						asChild
						size="lg"
						className="w-full bg-vermilion hover:bg-vermilion-hover text-cream-50 [a]:hover:bg-vermilion-hover"
					>
						<Link
							href={formUrl}
							target="_blank"
							rel="noopener"
							onClick={() => {
								track("cta_telemedicine_click", {
									location: "mobile_menu",
									channel: "naver_form",
								});
								close();
							}}
						>
							비대면 진료 접수 →
						</Link>
					</Button>
					<div className="grid grid-cols-2 gap-2">
						<Button asChild variant="outline" className="border-border-default">
							<Link
								href={kakaoChatUrl()}
								target="_blank"
								rel="noopener"
								onClick={() => {
									track("kakao_chat_open", { location: "mobile_menu" });
									close();
								}}
							>
								카톡 상담
							</Link>
						</Button>
						<Button asChild variant="outline" className="border-border-default">
							<Link
								href={clinic.phone.tel}
								onClick={() => {
									track("phone_call_click", { location: "mobile_menu" });
									close();
								}}
							>
								<Phone className="size-3.5" aria-hidden="true" />
								{clinic.phone.display}
							</Link>
						</Button>
					</div>
				</div>
			</aside>
		</>
	);
}
