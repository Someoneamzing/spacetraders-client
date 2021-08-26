<script context="module">
    import AppBar from "./components/AppBar.svelte";
    import AssetList from "./components/AssetList.svelte";
    import Loan from "./components/Loan.svelte";
    import LoanType from "./components/LoanType.svelte";
    import { loanTypes, loaded, loans } from "./data/api.js";

    const pages = [
        {
            title: "Loans",
            store: loans,
            component: Loan,
            type: "loan",
            actions: [["Pay", () => {}]],
        },
        {
            title: "Loan Types",
            store: loanTypes,
            component: LoanType,
            type: "loan",
            actions: [["Borrow", () => {}]],
        },
    ];
</script>

<script>
    let pageIndex = 0;
    let storeValue = null;
    let unsubscribe = null;
    $: page = pages[pageIndex];
    $: {
        unsubscribe?.();
        unsubscribe = page.store.subscribe((value) => {
            storeValue = value;
        });
    }
</script>

<main>
    {#await loaded}
        <div class="spinner" />
    {:then}
        <AppBar class="app-bar" />
        <aside>
            {#each pages as p, i}
                <span
                    on:click={() => {
                        pageIndex = i;
                    }}
                    class:active={pageIndex === i}
                >
                    {p.title}
                </span>
            {/each}
        </aside>
        <section class="content">
            <AssetList
                list={[...storeValue].map(([, item]) => item)}
                itemProp={page.type}
                ItemComponent={page.component}
                title={page.title}
                actions={page.actions}
            />
        </section>
    {:catch err}
        <pre>{err.toString()}</pre>
    {/await}
</main>

<style>
    main {
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            "bar bar bar"
            "left-sidebar content right-sidebar"
            "left-sidebar footer right-sidebar";
        height: 100vh;
    }

    :global(.app-bar) {
        grid-area: bar;
    }

    aside {
        grid-area: left-sidebar;
        min-width: 10rem;
        border-right: 1px solid hsla(var(--color-default-default), 1);
        display: flex;
        flex-direction: column;
    }

    aside > span {
        padding: 0.5em 1em;
    }

    aside > span.active {
        color: hsla(var(--color-default-active), 1);
    }

    aside > span:hover {
        background-color: hsla(var(--color-default-active), 0.3);
        color: hsla(var(--color-default-active), 1);
    }

    .content {
        grid-area: content;
        padding: 1em;
    }

    @keyframes spin {
        from {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }

    .spinner {
        width: 10rem;
        height: 10rem;
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        animation: spin 1s linear infinite;
        border: 0.5em solid hsla(var(--color-default-default), 1);
        border-bottom-color: transparent;
        border-right-color: transparent;
        border-radius: 50%;
    }
</style>
