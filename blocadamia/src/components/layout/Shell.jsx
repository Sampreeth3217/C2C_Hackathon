import Header from './Header';
import Footer from './Footer';
import { Sidebar, BottomNav } from './Sidebar';

export default function Shell({ children }) {
  return (
    <div className="min-h-screen grid md:grid-cols-[220px,1fr]" >
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <BottomNav />
    </div>
  );
}
