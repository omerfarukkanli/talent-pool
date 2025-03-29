import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import AppContent from '@/components/app-content';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Talent Pool',
  description: 'Talent Pool',
};

export default function RootLayout() {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider
          style={
            {
              '--sidebar-width': '18.125rem',
              '--sidebar-width-mobile': '20rem',
            } as React.CSSProperties
          }
        >
          <div className='flex h-screen w-full bg-background'>
            <AppSidebar />
            <AppContent />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
