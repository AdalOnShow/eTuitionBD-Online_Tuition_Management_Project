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

const ReportsAnalytics = () => {
  // Chart Data
  const userGrowthData = [
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1800 },
    { month: "Mar", users: 2400 },
    { month: "Apr", users: 3200 },
    { month: "May", users: 4100 },
    { month: "Jun", users: 5234 },
  ];

  const monthlyRevenueData = [
    { month: "Jan", revenue: 180000 },
    { month: "Feb", revenue: 220000 },
    { month: "Mar", revenue: 195000 },
    { month: "Apr", revenue: 280000 },
    { month: "May", revenue: 320000 },
    { month: "Jun", revenue: 380000 },
  ];

  const userRoleData = [
    { name: "Students", value: 65, count: 3402 },
    { name: "Tutors", value: 30, count: 1570 },
    { name: "Admins", value: 5, count: 262 },
  ];

  const tuitionActivityData = [
    { month: "Jan", tuitions: 120 },
    { month: "Feb", tuitions: 180 },
    { month: "Mar", tuitions: 240 },
    { month: "Apr", tuitions: 320 },
    { month: "May", tuitions: 410 },
    { month: "Jun", tuitions: 456 },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

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
                <p className="text-3xl font-bold">5,234</p>
                <p className="text-xs opacity-75">+12% from last month</p>
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
                <p className="text-3xl font-bold">1,456</p>
                <p className="text-xs opacity-75">+8% from last month</p>
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
                <p className="text-3xl font-bold">৳2.5M</p>
                <p className="text-xs opacity-75">+15% from last month</p>
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
                <p className="text-3xl font-bold">95%</p>
                <p className="text-xs opacity-75">+2% from last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* User Growth Line Chart */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">User Growth (Last 6 Months)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Role Distribution Pie Chart */}
        <div className="card bg-base-100 shadow-lg">
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
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Monthly Revenue</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`৳${value.toLocaleString()}`, "Revenue"]}
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
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Tuition Activity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tuitionActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
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
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="table">
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
                <tr>
                  <td>New tuition posted</td>
                  <td>Karim Ahmed</td>
                  <td>
                    <div className="badge badge-primary">Tuition</div>
                  </td>
                  <td>2024-01-20 10:30 AM</td>
                  <td>
                    <div className="badge badge-success">Active</div>
                  </td>
                </tr>
                <tr>
                  <td>New user registered</td>
                  <td>Sara Khan</td>
                  <td>
                    <div className="badge badge-secondary">User</div>
                  </td>
                  <td>2024-01-20 09:15 AM</td>
                  <td>
                    <div className="badge badge-success">Verified</div>
                  </td>
                </tr>
                <tr>
                  <td>Application submitted</td>
                  <td>Dr. Ahmed Rahman</td>
                  <td>
                    <div className="badge badge-accent">Application</div>
                  </td>
                  <td>2024-01-20 08:45 AM</td>
                  <td>
                    <div className="badge badge-warning">Pending</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
