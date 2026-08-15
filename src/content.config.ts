import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const menuItemSchema = z.object({
	name: z.string(),
	price: z.string(),
	comment: z.string().optional(),
});

const dailyMenuCollection = defineCollection({
	loader: glob({ pattern: "tageskarte.md", base: "./src/content" }),
	schema: z.object({
		title: z.string(),
		items: z.array(menuItemSchema),
	}),
});

const menuCollection = defineCollection({
	loader: glob({ pattern: "sommerspecials.md", base: "./src/content" }),
	schema: z.object({
		title: z.string(),
		comment: z.string().optional(),
		sections: z.array(
			z.object({
				title: z.string(),
				items: z.array(menuItemSchema),
			}),
		),
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

export const collections = {
	"daily-menu": dailyMenuCollection,
	menu: menuCollection,
	"privacy-policy": privacyPolicyCollection,
	"site-notice": siteNoticeCollection,
};
