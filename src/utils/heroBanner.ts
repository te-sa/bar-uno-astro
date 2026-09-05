const BERLIN_TIMEZONE = "Europe/Berlin";

export type HeroBannerData = {
	text: string;
	startDate?: Date;
	endDate?: Date;
};

export function formatBerlinDate(date: Date): string {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: BERLIN_TIMEZONE,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(date);
}

/** Omit expired banners from static HTML at build time. */
export function shouldRenderHeroBannerAtBuild(
	banner: HeroBannerData,
	now = new Date(),
): boolean {
	if (!banner.text.trim()) {
		return false;
	}

	if (
		banner.endDate &&
		formatBerlinDate(now) > formatBerlinDate(banner.endDate)
	) {
		return false;
	}

	return true;
}
