export default function formatDate(isoDate) {
    const date = new Date(isoDate);

    return date.toLocaleDateString('en-GB', {
        month: 'numeric',
        year: 'numeric',
    });
}
