export function sepThousands(value) {
    return [...value.toString(10)].reduceRight(
        (str, d) =>
            `${d}${str.length % 3 === 0 && str.length ? "," : ""}${str}`,
        ""
    );
}
