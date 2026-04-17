export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    image: string;
    tags: string[];
}

export const blogs: BlogPost[] = [
    {
        slug: 'ai-for-business-growth',
        title: 'How AI is Changing Small Businesses in 2026',
        excerpt: 'Find out how simple AI tools can save you hours of work every single week.',
        content: `
      # How AI is Changing Small Businesses in 2026

      AI is no longer just for big tech companies. Today, small businesses are using AI to automate their boring tasks, talk to customers 24/7, and even predict what they will sell next month.

      ## Why You Should Care
      If you are not using AI, you are probably spending too much time on things that a machine could do in seconds. At Delvare, we help you pick the right tools that actually make a difference to your bank account.

      ### Key Benefits:
      1. **Time Saving**: Automate your emails and scheduling.
      2. **Better Customer Service**: Chatbots that actually understand people.
      3. **Smart Decisions**: Use your data to see where your money is going.

      The future is bright for those who embrace these simple changes.
    `,
        date: 'March 4, 2026',
        author: 'Delvare Team',
        image: '/assets/blog_ai_business_1772616812117.png',
        tags: ['AI', 'Growth', 'Business']
    },
    {
        slug: 'cloud-hosting-secrets',
        title: 'Why Your Website Speed Matters More Than Ever',
        excerpt: 'Slow websites lose customers. Learn how modern cloud hosting keeps you fast.',
        content: `
      # Why Your Website Speed Matters More Than Ever

      Studies show that if your website takes more than 3 seconds to load, half of your visitors will just leave. That is money flying out of your pocket.

      ## The Solution: Modern Cloud
      We use technologies like Next.js and high-speed cloud servers to make sure your site loads in the blink of an eye. 

      ### What We Focus On:
      - **Global CDNs**: Your site is fast in New York, London, and Mumbai.
      - **Serverless Tech**: You only pay for what you use.
      - **Secure Backups**: Your data is always safe with us.

      Don't let a slow site hold your business back.
    `,
        date: 'March 1, 2026',
        author: 'Tech Lead',
        image: '/assets/nanotech_curved_2_1772615432367.png',
        tags: ['Cloud', 'Performance', 'Tech']
    }
];
