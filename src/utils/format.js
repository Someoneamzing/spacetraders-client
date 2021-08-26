export function sepThousands(value) {
    return [...value.toString(10)].reduceRight(
        (str, d, i, arr) =>
            `${d}${
                (arr.length - i - 1) % 3 === 0 && arr.length - i - 1 ? "," : ""
            }${str}`,
        ""
    );
}
