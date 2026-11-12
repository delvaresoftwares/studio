'use client';

import { FOUNDER_DATA } from '../constants';

/** Keeps the displayed age accurate even when the page is statically cached. */
export default function FounderAge() {
    return (
        <time dateTime={FOUNDER_DATA.dob} suppressHydrationWarning>
            {FOUNDER_DATA.age}
        </time>
    );
}
