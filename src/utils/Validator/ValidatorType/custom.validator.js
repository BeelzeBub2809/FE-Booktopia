export default function customPatternValidator(pattern, message) {
    return value => pattern.test(value) ? null : { pattern: { message } };
}