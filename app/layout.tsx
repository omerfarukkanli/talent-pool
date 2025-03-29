import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import AppContent from '@/components/app-content';
import { StoreProvaider } from '@/components/provaiders/store-provaider';
import { GraphQlProvider } from '@/components/provaiders/graphql-provaider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Talent Pool',
  description: 'Talent Pool',
};

export default function RootLayout() {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <GraphQlProvider>
          <StoreProvaider>
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
          </StoreProvaider>
        </GraphQlProvider>
      </body>
    </html>
  );
}
