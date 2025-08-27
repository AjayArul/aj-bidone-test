import type { ArticleStatus } from "$lib/utils/types";

// Parse and validate ArticleStatus from string
export function parseStatus(value: string | null): ArticleStatus | undefined {
  return value === "Published" || value === "Draft" ? value : undefined;
}

// Safely parse error message from fetch Response
export async function safeParseError(res: Response): Promise<string> {
    try {
      const data = await res.json();
      return data?.message || res.statusText;
    } catch {
      return res.statusText || "Unknown error";
    }
  }
