import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const Analytics = () => {
  const AxiosSecure = useAxiosSecure();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [applicationsData, setApplicationsData] = useState([]);
  const [chartType, setChartType] = useState("university");

  const [pieRadius, setPieRadius] = useState(80);
  const [showLabels, setShowLabels] = useState(true);

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#A855F7"];

  useEffect(() => {
    fetchAnalyticsData();

    const handleResize = () => {
      setPieRadius(window.innerWidth < 768 ? 60 : 100);
      setShowLabels(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chartType]);

  const fetchAnalyticsData = async () => {
    try {
      const usersRes = await AxiosSecure.get("/users");
      setTotalUsers(usersRes.data?.length || 0);

      const scholarshipsRes = await AxiosSecure.get("/scholarships");
      const scholarshipsArray = Array.isArray(scholarshipsRes.data)
        ? scholarshipsRes.data
        : scholarshipsRes.data?.scholarships || [];

      setTotalScholarships(scholarshipsArray.length);

      const appsRes = await AxiosSecure.get("/applications");
      const applications = Array.isArray(appsRes.data) ? appsRes.data : [];

      const paidApps = applications.filter(app => app.paymentStatus === "paid");

      const totalFeesCollected = paidApps.reduce(
        (sum, app) => sum + (app.applicationFees || 0) + (app.serviceCharge || 0),
        0
      );

      setTotalFees(totalFeesCollected);

      const chartData = {};
      applications.forEach(app => {
        const key =
          chartType === "category"
            ? app.scholarshipCategory
            : app.universityName;

        chartData[key] = (chartData[key] || 0) + 1;
      });

      const formattedData = Object.keys(chartData).map(key => ({
        name: key,
        count: chartData[key],
      }));

      setApplicationsData(formattedData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-white dark:bg-black text-black dark:text-white">

      {/* HEADER */}
      <h2 className="text-3xl font-bold">Platform Analytics</h2>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <motion.div whileHover={{ scale: 1.05 }}
          className="p-5 rounded-xl bg-blue-50 dark:bg-white/10 shadow">
          <h3>Total Users</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}
          className="p-5 rounded-xl bg-green-50 dark:bg-white/10 shadow">
          <h3>Total Fees</h3>
          <p className="text-2xl font-bold">${totalFees}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}
          className="p-5 rounded-xl bg-yellow-50 dark:bg-white/10 shadow">
          <h3>Total Scholarships</h3>
          <p className="text-2xl font-bold">{totalScholarships}</p>
        </motion.div>

      </div>

      {/* SELECTOR */}
      <div className="flex gap-4 items-center">
        <label className="font-medium">Chart Type:</label>

        <select
          className="border p-2 rounded"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="university">University</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* BAR CHART (ANIMATED) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={chartType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={applicationsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>

      {/* PIE CHART */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={applicationsData}
              dataKey="count"
              nameKey="name"
              outerRadius={pieRadius}
              label={showLabels}
            >
              {applicationsData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

    </div>
  );
};

export default Analytics;