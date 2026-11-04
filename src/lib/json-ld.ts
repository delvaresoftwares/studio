/**
 * Serializes structured data for embedding in a <script> tag.
 *
 * JSON.stringify alone leaves `<` intact, which lets an author-controlled
 * string such as `</script><script>…` break out of the script element. The
 * escaped characters are still valid JSON, so parsers see the original text.
 */
export function serializeJsonLd(value: unknown): string {
    return JSON.stringify(value)
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
}
