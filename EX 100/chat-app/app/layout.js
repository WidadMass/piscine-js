import '../frontend/styles/globals.css';

export const metadata = {
  title: 'Chat Web AI',
  description: 'Projet Chat Web avec Next.js et SQLite',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
