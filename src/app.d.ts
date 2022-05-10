/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare interface ImportMetaEnv {
    VITE_DB_NAME: string,
    VITE_DB_HOST: string,
    VITE_DB_PORT: string,
}
