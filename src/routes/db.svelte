<script lang="ts">
    import { type NoteDb } from '$lib/types';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    export let message: string = '';
    let notes = writable<NoteDb>({});

    onMount(async () => {
        const stores = await import('$lib/stores');
        notes = await stores.notes;
    });

    const addMessage = async (evt: Event) => {
        if (message.length == 0) return;
        console.log('addMessage', { $notes });
        await notes.push({ body: message });
        console.log('addMessage', { $notes, message });
        message = '';
    }
</script>

{#each Object.entries($notes) as [id, note]}
<li><a {id}>{note.body}</a></li>
{/each}

<form on:submit|preventDefault={addMessage}>
    <input type="text" bind:value={message} placeholder="say something">
    <input type="submit">
</form>
