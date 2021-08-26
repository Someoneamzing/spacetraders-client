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
    import Attribute from "./Attribute.svelte";
    import { sepThousands } from "../utils/format";
    export let amount;
    export let type;
</script>

<Attribute icon={RESOURCE_TYPES[type]}
    >{!isNaN(amount) ? sepThousands(amount) : "----"}</Attribute
>
