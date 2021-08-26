<script context="module">
    const RESOURCE_TYPES = {
        CREDITS: "monetization_on",
        SHIPS: "send",
        STRUCTURES: "business",
        DURATION: "calendar_today",
        RATE: "trending_up",
    };
</script>

<script>
    import { sepThousands } from "../utils/format";
    export let amount;
    export let type;
</script>

<span class="outer">
    <span class="material-icons">{RESOURCE_TYPES[type]}</span>
    {!isNaN(amount) ? sepThousands(amount) : "----"}
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
