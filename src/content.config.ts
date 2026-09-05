import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const menuItemSchema = z.object({
	name: z.string(),
	allergens: z.string().optional(),
	price: z.string(),
	comment: z.string().optional(),
});

const menuSectionSchema = z.object({
	title: z.string().optional(),
	comment: z.string().optional(),
	note: z.string().optional(),
	items: z.array(menuItemSchema),
});

const dailyMenuCollection = defineCollection({
	loader: glob({ pattern: "tageskarte.md", base: "./src/content" }),
	schema: z.object({
		title: z.string(),
		items: z.array(menuItemSchema),
	}),
});

const menuCollection = defineCollection({
	loader: glob({ pattern: "*.md", base: "./src/content/menu" }),
	schema: z.object({
		title: z.string(),
		comment: z.string().optional(),
		note: z.string().optional(),
		order: z.number().optional(),
		sections: z.array(menuSectionSchema),
	}),
});

const privacyPolicyCollection = defineCollection({
	loader: glob({ pattern: "datenschutz.md", base: "./src/content" }),
	schema: z.object({
		title: z.string(),
	}),
});

const siteNoticeCollection = defineCollection({
	loader: glob({ pattern: "impressum.md", base: "./src/content" }),
	schema: z.object({
		title: z.string(),
	}),
});

const allergensCollection = defineCollection({
	loader: glob({ pattern: "allergene.md", base: "./src/content" }),
	schema: z.object({
		title: z.string(),
		comment: z.string().optional(),
		items: z.array(
			z.object({
				code: z.string(),
				label: z.string(),
			}),
		),
	}),
});

const googleReviewsCollection = defineCollection({
	loader: glob({ pattern: "google-reviews.md", base: "./src/content" }),
	schema: z.object({
		ratingLabel: z.string(),
		items: z.array(
			z.object({
				text: z.string(),
				stars: z.number().min(1).max(5).default(5),
			}),
		),
	}),
});

const heroBannerCollection = defineCollection({
	loader: glob({ pattern: "hero-banner.md", base: "./src/content" }),
	schema: z.object({
		text: z.string(),
		startDate: z.coerce.date().optional(),
		endDate: z.coerce.date().optional(),
	}),
});

export const collections = {
	"daily-menu": dailyMenuCollection,
	menu: menuCollection,
	"privacy-policy": privacyPolicyCollection,
	"site-notice": siteNoticeCollection,
	allergens: allergensCollection,
	"google-reviews": googleReviewsCollection,
	"hero-banner": heroBannerCollection,
};
