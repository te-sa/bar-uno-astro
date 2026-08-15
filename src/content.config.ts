import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const menuItemSchema = z.object({
	name: z.string(),
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

export const collections = {
	"daily-menu": dailyMenuCollection,
	menu: menuCollection,
	"privacy-policy": privacyPolicyCollection,
	"site-notice": siteNoticeCollection,
};
