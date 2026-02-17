import '../frontend/styles/globals.css';
import { AuthProvider } from '../frontend/hooks/useAuth';

export const metadata = {
  title: 'Chat Web AI',
  description: 'Projet Chat Web avec Next.js et SQLite',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💬</text></svg>" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
