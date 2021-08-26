<script>
    import ResourceCount from "./ResourceCount.svelte";
    import Attribute from "./Attribute.svelte";
    import { loanTypes } from "../data/api.js";

    export let loan;
    $: loanType = $loanTypes.get(loan.type);
</script>

<div>
    <span>{loan.type}</span>
    <ResourceCount type="CREDITS" amount={loan.repaymentAmount} />
    <Attribute icon="calendar_today">{loan.due}</Attribute>
    <ResourceCount type="RATE" amount={loanType.rate} />
    <span class="material-icons">
        {loanType.collateralRequired ? "lock" : "lock_open"}
    </span>
</div>
