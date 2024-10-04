import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import CardsSection from '../components/CardsSection';
import ChartSection from '../components/ChartSection';

const CompanyAdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Topbar */}
        <Topbar />

        {/* Cards Section */}
        <CardsSection />

        {/* Chart Section */}
        <ChartSection />
      </main>
    </div>
  );
};

export default CompanyAdminDashboard;
