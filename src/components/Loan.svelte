<script>
    import ResourceCount from "./ResourceCount.svelte";
    import Attribute from "./Attribute.svelte";
    import { loanTypes } from "../data/api.js";

    export let loan;
    $: loanType = $loanTypes.get(loan.type);
</script>

<div class:paid={loan.status === "PAID" || true}>
    <span>{loan.type}</span>
    <ResourceCount type="CREDITS" amount={loan.repaymentAmount} />
    <Attribute icon="calendar_today">{loan.due}</Attribute>
    <ResourceCount type="RATE" amount={loanType?.rate} />
    <span class="material-icons">
        {loanType?.collateralRequired ? "lock" : "lock_open"}
    </span>
</div>

<style scoped>
    div {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: auto;
        align-items: center;
        justify-items: center;
    }

    .paid {
        position: relative;
    }

    .paid::after {
        position: absolute;
        display: block;
        border-top: 2px solid currentColor;
        top: 50%;
        left: 0;
        width: 100%;
        height: 0px;
    }
</style>
