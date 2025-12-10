import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Tooltip, Legend } from "recharts";

const Analytics = () => {
  const barData = [
    { name: "Students", value: 120 },
    { name: "Moderators", value: 10 },
    { name: "Admins", value: 3 },
  ];

  const pieData = [
    { name: "Approved", value: 50 },
    { name: "Pending", value: 30 },
    { name: "Rejected", value: 20 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Platform Analytics</h2>

      <div className="grid grid-cols-2 gap-8">
        
        {/* Bar Chart */}
        <div className="p-4 border rounded">
          <h3 className="text-xl font-semibold mb-2">User Roles</h3>
          <BarChart width={400} height={250} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="p-4 border rounded">
          <h3 className="text-xl font-semibold mb-2">Scholarship Status</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
