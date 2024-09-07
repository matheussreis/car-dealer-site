'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateUrl(url: string) {
  revalidatePath(url);
}
