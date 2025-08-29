import { STATUS_DRAFT, STATUS_PUBLISHED } from '$lib/utils/constants';
import { z } from 'zod';

export const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title too long must be less than 200 characters'),

  author: z
    .string()
    .trim()
    .min(3, 'Author must be at least 3 characters')
    .max(100, 'Author name too long must be less than 100 characters'),

  status: z.enum([STATUS_DRAFT, STATUS_PUBLISHED]),

  content: z
    .string()
    .trim()
    .min(10, 'Content must be at least 10 characters')
    .max(5000, 'Content too long')
    .optional(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
