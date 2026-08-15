import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const dailyMenuCollection = defineCollection({
	loader: glob({ pattern: "tageskarte.md", base: "./src/content" }),
	schema: z.object({
		title: z.string(),
		items: z.array(
			z.object({
				name: z.string(),
				price: z.string(),
				comment: z.string().optional(),
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

export const collections = {
	"daily-menu": dailyMenuCollection,
	"privacy-policy": privacyPolicyCollection,
};
