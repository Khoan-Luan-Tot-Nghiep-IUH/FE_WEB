import React from "react";
import { Tabs, Row, Col } from "antd";
import CompletedTripsChart from "../components/Revenue/CompletedTripsChart";

import RevenueChart from "../components/Revenue/RevenueChart";

import UserGrowthChart from "../components/Revenue/UserGrowthChart";

const { TabPane } = Tabs;

const Dashboard = () => {
  return (
    <div className="p-6 h-[1000px] bg-white">
      <Tabs defaultActiveKey="1">
      <TabPane tab="Tăng trưởng người dùng" key="1">
          <Row gutter={16}>
            <Col span={24}>
              <UserGrowthChart />
            </Col>
          </Row>
        </TabPane>
      <TabPane tab="Doanh thu" key="2">
          <Row gutter={16}>
            <Col span={24}>
              <RevenueChart />
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Chuyến đi" key="3">
          <Row gutter={16}>
            <Col span={24}>
              <CompletedTripsChart />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;
