import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { LeadsTable } from '@/components/leads/LeadsTable';
import { ExchangesView } from '@/components/exchanges/ExchangesView';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadsTable />;
      case 'exchanges':
        return <ExchangesView />;
      case 'industries':
        return <PlaceholderPage title="Industries" description="Configure industry-specific fields and campaigns" />;
      case 'clients':
        return <PlaceholderPage title="Clients" description="Manage client accounts and contracts" />;
      case 'import':
        return <PlaceholderPage title="Import Leads" description="Import leads from CSV/XLSX with column mapping" />;
      case 'export':
        return <PlaceholderPage title="Export Data" description="Export leads and reports to CSV" />;
      case 'settings':
        return <PlaceholderPage title="Settings" description="Configure platform settings and preferences" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="pl-16 lg:pl-64 transition-all duration-300">
        <Header />
        <main className="p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
        <p className="text-muted-foreground">This section is coming soon...</p>
      </div>
    </div>
  );
}

export default Index;
