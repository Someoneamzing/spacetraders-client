<script>
    export let icon;
</script>

<span class="outer">
    <span class="material-icons">{icon}</span>
    <slot />
</span>

<style scoped>
    .outer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5em;
        width: fit-content;
    }
</style>
