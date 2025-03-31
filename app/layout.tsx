import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoreProvaider } from '@/components/provaiders/store-provaider';
import { GraphQlProvider } from '@/components/provaiders/graphql-provaider';
import NavigationSideBar from '@/components/navigation/NavigationSidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Talent Pool',
  description: 'Talent Pool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <GraphQlProvider>
          <StoreProvaider>
            <div className='h-full'>
              <div className='hidden md:flex h-full w-72 z-30 flex-col fixed inset-y-0'>
                <NavigationSideBar />
              </div>
              <main className=' md:pl-72 h-full'>{children}</main>
            </div>
          </StoreProvaider>
        </GraphQlProvider>
      </body>
    </html>
  );
}
