import { STATUS_DRAFT, STATUS_PUBLISHED } from '$lib/utils/constants';
import { z } from 'zod';

export const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title too long must be less than 100 characters'),

  author: z
    .string()
    .trim()
    .min(3, 'Author must be at least 3 characters')
    .max(50, 'Author name too long must be less than 50 characters'),

  status: z.enum([STATUS_DRAFT, STATUS_PUBLISHED]),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
