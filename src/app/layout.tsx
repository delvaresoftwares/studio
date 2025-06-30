import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css';

export const metadata: Metadata = {
  title: 'Delvare Software Solutions | Custom Web, App & Billing Software',
  description: 'Delvare specializes in building high-performance custom websites, mobile apps, and billing & inventory software to help your business grow. Get an AI-powered cost estimate today.',
  keywords: ['custom software', 'web development', 'mobile apps', 'billing software', 'inventory management', 'delvare'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://res.cloudinary.com/dt4mweku7/image/upload/v1751266408/buissware_h6bmig.png" sizes="any" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
