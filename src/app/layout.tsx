import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});


export const metadata: Metadata = {
  title: 'Delvare Software Solutions | Custom Web, App & Billing Software',
  description: 'Delvare specializes in building high-performance custom websites, mobile apps, and billing & inventory software to help your business grow. Get an AI-powered cost estimate today.',
  keywords: ['custom software', 'web development', 'mobile apps', 'billing software', 'inventory management', 'delvare'],
  icons: {
    icon: 'https://res.cloudinary.com/dt4mweku7/image/upload/v1751266408/buissware_h6bmig.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
