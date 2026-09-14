import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { isAdminEmail } from '@/lib/admin';
import { fetchGa4Data, Ga4Error, type Ga4Range } from '@/lib/ga4';
import { jsonError } from '@/lib/http';

export const dynamic = 'force-dynamic';

/**
 * Serves Google Analytics 4 reports for the admin dashboard.
 * Only the configured admin email (from a valid session) may access it.
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const user = await requireAuth();
    if (!user) {
      return jsonError('Authentication required.', 401);
    }
    if (!isAdminEmail(user.email)) {
      return jsonError('Unauthorized. You are not allowed to view analytics.', 403);
    }

    const url = new URL(request.url);
    const param = url.searchParams.get('range');
    const range: Ga4Range =
      param === 'day' || param === 'week' || param === 'year' || param === 'all'
        ? param
        : 'month';

    const data = await fetchGa4Data(range);
    return NextResponse.json({ status: 'ok', range, ...data });
  } catch (error) {
    if (error instanceof Ga4Error) {
      const status =
        error.code === 'MISSING_PROPERTY'
          ? 501
          : error.code === 'NOT_AUTHORIZED' || error.code === 'TOKEN_REFRESH_FAILED'
            ? 403
            : 502;
      return jsonError(error.message, status, { code: error.code });
    }
    console.error('[admin/analytics] Unexpected error:', error);
    return jsonError('Failed to load Google Analytics data.', 500);
  }
}