<script>
    import AppBar from "./components/AppBar.svelte";
    import Loan from "./components/Loan.svelte";
    import LoanType from "./components/LoanType.svelte";
    import { loanTypes, loaded, loans } from "./data/api.js";
</script>

<main>
    {#await loaded}
        <div class="spinner" />
    {:then}
        <AppBar class="app-bar" />
        <aside>
            <span>Loans</span>
        </aside>
        <section class="content">
            <h3>Loans</h3>
            <div class="list">
                {#each [...$loans] as [loanId, loan]}
                    <Loan {loan} />
                {/each}
            </div>
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

    h3 {
        line-height: 1;
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

    .content {
        grid-area: content;
        padding: 1em;
    }

    .list {
        padding-top: 1em;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
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
