<script>
    import ResourceCount from "./ResourceCount.svelte";

    export let loan;
</script>

<div>
    <span>{loan.type}</span>
    <ResourceCount type="CREDITS" amount={loan.amount} />
    <ResourceCount type="DURATION" amount={loan.termInDays} />
    <ResourceCount type="RATE" amount={loan.rate} />
    <span class="material-icons"
        >{loan.collateralRequired ? "lock" : "lock_open"}</span
    >
</div>

<style scoped>
    div {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: auto;
        align-items: center;
        justify-items: center;
    }
</style>
