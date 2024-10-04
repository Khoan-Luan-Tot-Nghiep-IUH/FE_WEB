import React from 'react';

const StatsSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold">Total Revenue</h4>
        <p className="mt-4 text-gray-600">12.04.2022 - 12.05.2022</p>
        <div className="mt-4 h-24 bg-gray-100 rounded-lg"></div> {/* Placeholder for a chart */}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold">Total Sales</h4>
        <p className="mt-4 text-gray-600">12.04.2022 - 12.05.2022</p>
        <div className="mt-4 h-24 bg-gray-100 rounded-lg"></div> {/* Placeholder for a chart */}
      </div>
    </section>
  );
};

export default StatsSection;
