/** Formats an ISO `YYYY-MM-DD` date for article bylines and metadata. */
export const formatBlogDate = (isoDate: string) =>
    new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    });
