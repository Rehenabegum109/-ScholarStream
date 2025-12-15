import React, { useEffect, useState } from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Analytics = () => {
  const AxiosSecure = useAxiosSecure();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [applicationsData, setApplicationsData] = useState([]);
  const [chartType, setChartType] = useState("university"); 

  useEffect(() => {
    fetchAnalyticsData();
  }, [chartType]);

  const fetchAnalyticsData = async () => {
    try {
      // Total Users
      const usersRes = await AxiosSecure.get("/users");
      setTotalUsers(usersRes.data.length);

      // Total Scholarships
      const scholarshipsRes = await AxiosSecure.get("/scholarships");
      setTotalScholarships(scholarshipsRes.data.length);

      // Applications
      const appsRes = await AxiosSecure.get("/applications");
      const applications = appsRes.data;

      // Total Fees Collected (paid applications)
      const paidApps = applications.filter(app => app.paymentStatus === "paid");
      const totalFeesCollected = paidApps.reduce((sum, app) => sum + (app.applicationFees || 0) + (app.serviceCharge || 0), 0);
      setTotalFees(totalFeesCollected);

      // Prepare chart data
      const chartData = {};
      applications.forEach(app => {
        const key = chartType === "category" ? app.scholarshipCategory : app.universityName;
        if (!chartData[key]) chartData[key] = 0;
        chartData[key] += 1;
      });

      const formattedData = Object.keys(chartData).map(key => ({ name: key, count: chartData[key] }));
      setApplicationsData(formattedData);

    } catch (err) {
      console.error("Error fetching analytics data:", err);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF0", "#FF6384", "#36A2EB"];

  return (
    <div className="p-6 bg-white shadow rounded max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-4">Platform Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Fees Collected</h3>
          <p className="text-2xl font-bold">${totalFees}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Scholarships</h3>
          <p className="text-2xl font-bold">{totalScholarships}</p>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex gap-4 items-center mb-4">
        <label className="font-medium">Chart Type:</label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="university">Applications per University</option>
          <option value="category">Applications per Scholarship Category</option>
        </select>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-96">
        <ResponsiveContainer>
          <BarChart data={applicationsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Optional: Pie Chart */}
      <div className="w-full h-96">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={applicationsData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#82ca9d"
              label
            >
              {applicationsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
