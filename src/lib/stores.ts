import { getStore } from '$lib/db';
import { type NoteDb } from '$lib/types';

export const notes = getStore<NoteDb>('notes', {});
