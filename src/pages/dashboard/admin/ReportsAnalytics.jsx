import { FiBook, FiDollarSign, FiTrendingUp, FiUsers } from "react-icons/fi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const ReportsAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: statsData, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stats");
      return data;
    },
  });

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  const {
    userRoleData = [],
    userGrowth = [],
    tuitionActivity = [],
    monthlyRevenue = [],
    stats = {},
    activities = [],
  } = statsData || {};

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="card bg-linear-to-br from-primary to-primary-focus  text-accent-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FiUsers className="text-2xl" />
              </div>
              <div>
                <p className="text-sm opacity-90">Total Users</p>
                <p className="text-3xl font-bold">
                  {stats.totalUsers?.toLocaleString() || 0}
                </p>
                <p className="text-xs opacity-75">Platform-wide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-linear-to-br from-secondary to-secondary-focus  text-accent-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FiBook className="text-2xl" />
              </div>
              <div>
                <p className="text-sm opacity-90">Total Tuitions</p>
                <p className="text-3xl font-bold">
                  {stats.totalTuitions?.toLocaleString() || 0}
                </p>
                <p className="text-xs opacity-75">All status</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-linear-to-br from-accent to-accent-focus text-accent-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FiDollarSign className="text-2xl" />
              </div>
              <div>
                <p className="text-sm opacity-90">Revenue</p>
                <p className="text-3xl font-bold">
                  ৳{stats.totalRevenue?.toLocaleString() || 0}
                </p>
                <p className="text-xs opacity-75">Total processed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-linear-to-br from-success to-success-focus text-success-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="text-2xl" />
              </div>
              <div>
                <p className="text-sm opacity-90">Success Rate</p>
                <p className="text-3xl font-bold">{stats.successRate || 0}%</p>
                <p className="text-xs opacity-75">Assigned vs Total</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* User Growth Line Chart */}
        <div className="card bg-base-100 shadow-lg border border-base-200">
          <div className="card-body">
            <h2 className="card-title mb-4">User Growth</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Role Distribution Pie Chart */}
        <div className="card bg-base-100 shadow-lg border border-base-200">
          <div className="card-body">
            <h2 className="card-title mb-4">User Role Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="card bg-base-100 shadow-lg border border-base-200">
          <div className="card-body">
            <h2 className="card-title mb-4">Monthly Revenue</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `৳${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                    name="Revenue (৳)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tuition Activity Area Chart */}
        <div className="card bg-base-100 shadow-lg border border-base-200">
          <div className="card-body">
            <h2 className="card-title mb-4">Tuition Activity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tuitionActivity}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="tuitions"
                    stroke="#F59E0B"
                    fill="#FEF3C7"
                    strokeWidth={2}
                    name="Tuitions Posted"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-lg border border-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.activity}</td>
                    <td>{item.user}</td>
                    <td>
                      <div className={`badge ${item.badge} badge-outline`}>
                        {item.type}
                      </div>
                    </td>
                    <td>{new Date(item.date).toLocaleDateString()}</td>
                    <td>
                      <div className="badge badge-ghost capitalize">
                        {item.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
