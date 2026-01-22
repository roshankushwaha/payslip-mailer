export function numberToWords(num: number) {
    if (num === 0) return "zero";

    const belowTwenty = [
        "", "one", "two", "three", "four", "five", "six", "seven",
        "eight", "nine", "ten", "eleven", "twelve", "thirteen",
        "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    ];

    const tens = [
        "", "", "twenty", "thirty", "forty", "fifty",
        "sixty", "seventy", "eighty", "ninety"
    ];

    function helper(n: number): any{
        if (n < 20) {
            return belowTwenty[n];
        } else if (n < 100) {
            return tens[Math.floor(n / 10)] + (n % 10 ? " " + belowTwenty[n % 10] : "");
        } else if (n < 1000) {
            return (
                belowTwenty[Math.floor(n / 100)] +
                " hundred" +
                (n % 100 ? " " + helper(n % 100) : "")
            );
        }
        return "";
    }

    let result = "";

    if (num >= 1000) {
        result += helper(Math.floor(num / 1000)) + " thousand";
        num %= 1000;
        if (num > 0) result += " ";
    }

    result += helper(num);

    return result.trim();
}
