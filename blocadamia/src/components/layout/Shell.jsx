import Header from './Header';
import Footer from './Footer';
import { Sidebar } from './Sidebar';

export default function Shell({ children }) {
  return (
    <div className="min-h-screen grid md:grid-cols-[220px,1fr]">
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <Header />
  <main className="w-full px-4 md:px-8 py-4 md:py-6 flex-1">
          {children}
        </main>
        <Footer />
      </div>
  {/* BottomNav removed in favor of header menu on mobile */}
    </div>
  );
}
