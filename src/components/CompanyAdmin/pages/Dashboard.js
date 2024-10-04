import React from "react";
import Card from '../components/CardsSection';
import { FaUsers, FaChartLine, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import StatsSection from "../components/StatsSection";
const Dashboard = () => {
  return (
    <div className="p-6 mt-16">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <Card
          title="Total Views"
          value="3.456K"
          growth={0.43}
          icon={<FaChartLine />}
          color="text-blue-500"
        />
        <Card
          title="Total Profit"
          value="$45.2K"
          growth={4.35}
          icon={<FaDollarSign />}
          color="text-green-500"
        />
        <Card
          title="Total Product"
          value="2.450"
          growth={2.59}
          icon={<FaShoppingCart />}
          color="text-purple-500"
        />
        <Card
          title="Total Users"
          value="3.456"
          growth={0.95}
          icon={<FaUsers />}
          color="text-yellow-500"
        />
      </div>

      {/* Stats Section */}
      <StatsSection />
    </div>
  );
};
export default Dashboard;
