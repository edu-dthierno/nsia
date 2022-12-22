import { writable } from "svelte/store";

// Alert Display
export const displayAlert = writable(false);
export const messageAlert = writable("A simple primary alert—check it out!")

// Authentication variables
export const userConnected = writable(false)
export const userCred = writable(undefined)