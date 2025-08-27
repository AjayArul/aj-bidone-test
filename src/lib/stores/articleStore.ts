import { writable } from "svelte/store";
import type { Article } from "../utils/types";
import type { STATUS_DRAFT, STATUS_PUBLISHED } from "$lib/utils/constants";

export const articles = writable<Article[]>([]);
export const total = writable(0);
export const page = writable(1);
export const limit = writable(10);
export const statusFilter = writable<typeof STATUS_PUBLISHED | typeof STATUS_DRAFT | undefined>(undefined);
export const searchQuery = writable("");
export const loading = writable(false);
export const error = writable<string | null>(null);

