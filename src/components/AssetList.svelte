<script>
    export let list;
    export let ItemComponent;
    export let title;
    export let itemProp;
    export let actions;
</script>

<div class="container">
    <h3>{title}</h3>
    <div class="actions">
        {#each actions as [label, action]}
            <button on:click={action}>{label}</button>
        {/each}
    </div>
    <div class="list">
        {#each list as item}
            <svelte:component this={ItemComponent} {...{ [itemProp]: item }} />
        {/each}
    </div>
</div>

<style scoped>
    h3 {
        grid-area: title;
        line-height: 1;
        align-self: center;
    }

    .container {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr;
        grid-template-areas:
            "title actions"
            "list list";
    }

    .actions {
        grid-area: actions;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .list {
        grid-area: list;
        padding-top: 1em;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
    }
</style>
