import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Telth · Care Manager Recruitment Assessment',
  description: 'Online recruitment test for the Telth Care Manager role.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-telth-mist font-body text-telth-ink antialiased">{children}</body>
    </html>
  );
}
