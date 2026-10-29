import { NextRequest } from 'next/server';
import { SITE_KNOWLEDGE } from '@/lib/site-knowledge';

export const runtime = 'nodejs';

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
    },
  });
}

export async function OPTIONS() {
  return new Response('ok', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message || body?.messages?.[body.messages.length - 1]?.content || '';
    const system = body?.system || SITE_KNOWLEDGE;

    // Simple rule-based responses based on SITE_KNOWLEDGE
    const lower = (message + ' ' + system).toLowerCase();
    
    // Return a concise answer based on the knowledge base
    let reply = '';
    
    if (lower.includes('service') && lower.includes('offer')) {
      reply = `**Services (starting prices, USD):**\n\n| Service | Starting price | Key features |\n| :-- | :-- | :-- |\n| SEO & Digital Presence | $48 | keyword strategy, content marketing, technical SEO, local SEO |\n| Strategic Business Analysis | $145 | operational efficiency, market analysis, strategic planning |\n| Custom Software Solutions | $240 | enterprise software, web apps, scalable systems |\n| Business Intelligence Dashboards | $180 | real-time reporting, data visualization |\n| Process Automation & AI | $120 | workflow automation, AI integration |\n| UI/UX Design & Strategy | $60 | user research, interface design, usability testing |\n| Cloud Infrastructure | $36 | cloud migration, hosting, architecture design |\n| Professional Cybersecurity | $42 | security audits, data protection, threat mitigation |\n| Business Support & Consulting | $6/mo | on-demand technical support and consulting |`;
    } else if (lower.includes('ecbill')) {
      reply = `**ECBills.in** - intelligent & rapid billing system (PaaS) for retail/enterprise. Fast billing, live stock tracking, multi-store & staff roles, accounting & reports, built-in team chat, secure cloud sync.`;
    } else if (lower.includes('blendly')) {
      reply = `**Blendly.sbs** - social network for literature lovers. Lend & borrow books nearby, read/write poetry, discover nearby readers, community driven.`;
    } else if (lower.includes('found') && lower.includes('delvare')) {
      reply = `**Founder:** Alfas B - Founder & CEO of Delvare. Skills across software engineering, system architecture, cybersecurity, business strategy, UI/UX, cloud computing and AI. Also author of "Nature of the Divine".`;
    } else if (lower.includes('contact')) {
      reply = `**Contact:** Email: admin@delvare.in | Address: CO-Space, VSV Building, 4th Floor, Spectra School of Designs, East of Iron Bridge, CCNB Road, Aleppuzha (Alleppey), Kerala, India - 688001. Meetings can be scheduled via the "Schedule Meetings" option on the site.`;
    } else if (lower.includes('dvenue')) {
      reply = `**Dvenue** (dvenue.space / dvenue.bublnet.in): last-minute venue booking app for events.`;
    } else if (lower.includes('price') || lower.includes('cost')) {
      reply = `Prices start from: SEO $48, UI/UX $60, Automation/AI $120, BI Dashboards $180, Custom Software $240, Cybersecurity $42, Cloud $36, Business Analysis $145, Support $6/mo. For custom quotes, please use Schedule Meetings or the contact form.`;
    } else {
      reply = `Delvare delivers custom software, SaaS/PaaS, cloud & infrastructure, AI automation, and cybersecurity. We built ECBills.in (billing/inventory), Blendly.sbs (literature community), and Dvenue. Ask me about services, products, pricing, or the team!`;
    }

    // Check if client expects streaming (SSE)
    const accept = req.headers.get('accept') || '';
    if (accept.includes('text/event-stream')) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          // Send start
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'start' })}\n\n`));
          // Send delta in chunks
          const chunks = reply.match(/.{1,80}/g) || [reply];
          for (let i = 0; i < chunks.length; i++) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'delta', text: chunks[i] })}\n\n`));
          }
          // Send done
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
          controller.close();
        }
      });
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Return JSON format that widget expects
    return jsonResponse({ reply, response: reply, answer: reply });
  } catch (error: any) {
    return jsonResponse({ error: error.message || 'AI request failed' }, 500);
  }
}
