"use client";
import {
  useGetDashboardOverviewQuery,
  useGetDashboardPaymentOverviewQuery,
} from "@/redux/features/category/categoryApi";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const AdminDashboardChart = () => {
  const { data: stats, isLoading } = useGetDashboardOverviewQuery(undefined, {
    refetchOnFocus: true,
  });
  const { data: paymentData, isLoading: paymentLoading } =
    useGetDashboardPaymentOverviewQuery(undefined, {
      refetchOnFocus: true,
    });

  return (
    <div className=" min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Posts" value={stats?.data?.totalPosts} />
        <StatCard title="Pending Posts" value={stats?.data?.pendingPosts} />
        <StatCard title="Approved Posts" value={stats?.data?.approvedPosts} />
        <StatCard title="Rejected Posts" value={stats?.data?.rejectedPosts} />
        <StatCard title="Total Users" value={stats?.data?.users} />
        <StatCard title="Subscriptions" value={stats?.data?.subscriptions} />
        <StatCard
          title="Active Subscriptions"
          value={stats?.data?.activeSubscriptions}
        />
        <StatCard title="Payments" value={stats?.data?.payments} />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Monthly Payments
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={paymentData?.data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="payments" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-white p-5 rounded-xl shadow-md text-center">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-1 text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default AdminDashboardChart;
