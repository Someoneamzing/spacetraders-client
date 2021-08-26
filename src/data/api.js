import APIContext from "./APIContext.js";
import CachedStore from "./CachedStore.js";
import env from "../env.js";
import { writable } from "svelte/store";
export const api = new APIContext("https://api.spacetraders.io", env.TOKEN);
export const loans = new CachedStore(api, "loan", "/types/loans", "type");
export const ships = new CachedStore(api, "ship", "/types/ships");
export const user = writable(null);
api.fetch("/my/account")
    .then((json) => {
        user.set(json.user);
    })
    .catch(console.error);

window.REPL = { api, loans, ships };
