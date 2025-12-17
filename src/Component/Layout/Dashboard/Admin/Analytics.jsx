
import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Analytics = () => {
  const AxiosSecure = useAxiosSecure();

  // States
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [applicationsData, setApplicationsData] = useState([]);
  const [chartType, setChartType] = useState("university"); 
  const [pieRadius, setPieRadius] = useState(getPieRadius());
  const [showLabels, setShowLabels] = useState(getShowLabels());

  // Adjust Pie radius based on screen width
  function getPieRadius() {
    if (window.innerWidth < 640) return 50;
    if (window.innerWidth < 768) return 70;
    return 120;
  }

  function getShowLabels() {
    return window.innerWidth >= 640;
  }

  useEffect(() => {
    fetchAnalyticsData();

    const handleResize = () => {
      setPieRadius(getPieRadius());
      setShowLabels(getShowLabels());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chartType]);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch Users
      const usersRes = await AxiosSecure.get("/users");
      setTotalUsers(Array.isArray(usersRes.data) ? usersRes.data.length : 0);

      // Fetch Scholarships
      const scholarshipsRes = await AxiosSecure.get("/scholarships");
      // Check if data is array or nested
      let scholarshipsArray = [];
      if (Array.isArray(scholarshipsRes.data)) {
        scholarshipsArray = scholarshipsRes.data;
      } else if (Array.isArray(scholarshipsRes.data.scholarships)) {
        scholarshipsArray = scholarshipsRes.data.scholarships;
      }
      setTotalScholarships(scholarshipsArray.length);

      // Fetch Applications
      const appsRes = await AxiosSecure.get("/applications");
      const applications = Array.isArray(appsRes.data) ? appsRes.data : [];
      
      // Total Fees
      const paidApps = applications.filter(app => app.paymentStatus === "paid");
      const totalFeesCollected = paidApps.reduce(
        (sum, app) => sum + (app.applicationFees || 0) + (app.serviceCharge || 0),
        0
      );
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
    <div className="p-4 sm:p-6 bg-white shadow rounded max-w-7xl mx-auto space-y-6 overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-4">Platform Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <div className="p-4 bg-blue-100 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold text-black">{totalUsers}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Fees Collected</h3>
          <p className="text-2xl font-bold text-black">${totalFees}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Scholarships</h3>
          <p className="text-2xl font-bold text-black">{totalScholarships}</p>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
        <label className="font-medium">Chart Type:</label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border px-2 py-1 rounded w-full sm:w-auto"
        >
          <option value="university">Applications per University</option>
          <option value="category">Applications per Scholarship Category</option>
        </select>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-64 sm:h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={applicationsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-30} textAnchor="end" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="w-full h-64 sm:h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={applicationsData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={pieRadius}
              label={showLabels}
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
