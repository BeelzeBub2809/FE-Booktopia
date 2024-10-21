export default function noOnlySpacesValidator() {
    return value => value && value.trim().length === 0 ? { noOnlySpaces: true } : null;
}