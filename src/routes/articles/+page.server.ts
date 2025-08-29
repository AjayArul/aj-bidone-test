import { createArticle } from '$lib/api/articleService';
import { getZodFieldErrors } from '$lib/utils/helper';
import type { Article } from '$lib/utils/types';
import { articleSchema } from '$lib/utils/validators';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, fetch }) => {
    let formData = Object.fromEntries(await request.formData());
    const validatedForm = articleSchema.safeParse(formData);

    if (!validatedForm?.success) {
      const fieldErrors = getZodFieldErrors(validatedForm.error.issues);
      return fail(400, {
        data: validatedForm.data,
        errors: fieldErrors,
      });
    } else {
      try {
        const payload: Omit<Article, 'id'> = {
          ...validatedForm.data,
          createdAt: Date.now(),
        };
        const data = await createArticle(payload);
        return {
          message: 'Article saved successfully!',
          data: payload,
          success: true,
          errors: null,
        };
      } catch (error) {
        return {
          message: 'Article failed to create!',
          data: validatedForm.data,
          success: false,
          error: 'Failed to create article',
          errors: null,
        };
      }
    }
  },
};
