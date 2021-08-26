<script>
    import AppBar from "./components/AppBar.svelte";
    import LoanType from "./components/LoanType.svelte";
    import { loans } from "./data/api.js";
    const loanListPromise = loans.getAll();
</script>

<main>
    <AppBar class="app-bar" />
    <aside>
        <span>Loans</span>
    </aside>
    <section class="content">
        <h3>Loans</h3>
        <div class="list">
            {#each $loans as loan}
                <LoanType {loan} />
            {/each}
        </div>
    </section>
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
</style>
