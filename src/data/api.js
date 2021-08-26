import APIContext from "./APIContext.js";
import CachedStore from "./CachedStore.js";
import env from "../env.js";
import { writable } from "svelte/store";
export const api = new APIContext("https://api.spacetraders.io", env.TOKEN);
export const loanTypes = new CachedStore(api, "loan", "/types/loans", "type");
export const shipTypes = new CachedStore(api, "ship", "/types/ships", "type");
export const ships = new CachedStore(api, "ship", "/my/ships");
export const loans = new CachedStore(api, "loan", "/my/loans");
export const user = writable(null);
export const loaded = api
    .fetch("/my/account")
    .then((json) => {
        user.set(json.user);
    })
    .catch(console.error);

window.REPL = { api, loanTypes, shipTypes, ships, loans };
