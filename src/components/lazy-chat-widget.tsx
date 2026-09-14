'use client';

import dynamic from 'next/dynamic';

const AIChatWidget = dynamic(() => import('@/components/ai-chat-widget'), {
  ssr: false,
  loading: () => null,
});

const LazyChatWidget = () => <AIChatWidget />;

export default LazyChatWidget;