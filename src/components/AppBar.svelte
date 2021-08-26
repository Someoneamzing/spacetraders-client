<script>
    import ResourceCount from "./ResourceCount.svelte";
    import { user } from "../data/api.js";
</script>

<nav {...$$props}>
    <span>{$user?.username || ""}</span>
    <span class="split" />
    <ResourceCount type="CREDITS" amount={$user?.credits} />
    <ResourceCount type="SHIPS" amount={$user?.shipCount} />
    <ResourceCount type="STRUCTURES" amount={$user?.structureCount} />
</nav>

<style scoped>
    nav {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        padding: 0.7rem 1rem;
        border-bottom: 1px solid hsla(var(--color-default-default), 1);
    }

    .split {
        flex-grow: 1;
    }
</style>
