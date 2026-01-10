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

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];
  const GRADIENTS = [
    "from-[#6366F1] to-[#a855f7]",
    "from-[#10B981] to-[#34d399]",
    "from-[#F59E0B] to-[#fbbf24]",
    "from-[#F43F5E] to-[#fb7185]",
  ];

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
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Reports & <span className="text-primary italic">Analytics</span>
          </h1>
          <p className="text-base-content/60 mt-1 uppercase text-xs font-bold tracking-widest">
            Platform performance overview
          </p>
        </div>
        <div className="badge badge-primary badge-outline px-4 py-3 font-semibold uppercase tracking-tighter">
          Updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Users",
            val: stats.totalUsers,
            icon: FiUsers,
            grad: GRADIENTS[0],
            sub: "Platform-wide",
          },
          {
            label: "Total Tuitions",
            val: stats.totalTuitions,
            icon: FiBook,
            grad: GRADIENTS[1],
            sub: "All status",
          },
          {
            label: "Revenue",
            val: `৳${stats.totalRevenue?.toLocaleString()}`,
            icon: FiDollarSign,
            grad: GRADIENTS[2],
            sub: "Total processed",
          },
          {
            label: "Success Rate",
            val: `${stats.successRate}%`,
            icon: FiTrendingUp,
            grad: GRADIENTS[3],
            sub: "Assigned vs Total",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`card bg-linear-to-br ${item.grad} text-white shadow-xl shadow-primary/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative group`}
          >
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
              <item.icon size={120} />
            </div>
            <div className="card-body relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                  <item.icon className="text-2xl" />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-3xl font-black">{item.val || 0}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm font-medium opacity-90">{item.label}</p>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mt-2">
                  {item.sub}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Line Chart */}
        <div className="card bg-base-100/50 backdrop-blur-xl border border-base-content/5 shadow-2xl overflow-hidden">
          <div className="card-body">
            <div className="flex items-center justify-between mb-8">
              <h2 className="card-title text-xl font-bold flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#6366F1] rounded-full"></span>
                User Growth
              </h2>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowth}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="opacity-5"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "currentColor", opacity: 0.6 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "currentColor", opacity: 0.6 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      borderRadius: "12px",
                      border: "none",
                      color: "#fff",
                      backdropFilter: "blur(4px)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="url(#lineGrad)"
                    strokeWidth={4}
                    dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: "#fff", stroke: "#6366F1" }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* User Role Distribution Pie Chart */}
        <div className="card bg-base-100/50 backdrop-blur-xl border border-base-content/5 shadow-2xl overflow-hidden">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold flex items-center gap-2 mb-8">
              <span className="w-1.5 h-6 bg-[#F59E0B] rounded-full"></span>
              Role Distribution
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    dataKey="value"
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-opacity cursor-pointer focus:outline-hidden"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      borderRadius: "12px",
                      border: "none",
                      color: "#fff",
                      backdropFilter: "blur(4px)",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Bar Chart */}
        <div className="card bg-base-100/50 backdrop-blur-xl border border-base-content/5 shadow-2xl overflow-hidden">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold flex items-center gap-2 mb-8">
              <span className="w-1.5 h-6 bg-[#10B981] rounded-full"></span>
              Revenue Trend
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="opacity-5"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "currentColor", opacity: 0.6 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "currentColor", opacity: 0.6 }}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `৳${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      borderRadius: "12px",
                      border: "none",
                      color: "#fff",
                      backdropFilter: "blur(4px)",
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="url(#barGrad)"
                    radius={[10, 10, 0, 0]}
                    name="Revenue (৳)"
                    animationDuration={2000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tuition Activity Area Chart */}
        <div className="card bg-base-100/50 backdrop-blur-xl border border-base-content/5 shadow-2xl overflow-hidden">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold flex items-center gap-2 mb-8">
              <span className="w-1.5 h-6 bg-[#F59E0B] rounded-full"></span>
              Tuition Velocity
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tuitionActivity}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="currentColor"
                    className="opacity-5"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "currentColor", opacity: 0.6 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "currentColor", opacity: 0.6 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      borderRadius: "12px",
                      border: "none",
                      color: "#fff",
                      backdropFilter: "blur(4px)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="tuitions"
                    stroke="#F59E0B"
                    strokeWidth={4}
                    fill="url(#areaGrad)"
                    name="Tuitions Posted"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-2xl border border-base-content/5 overflow-hidden">
        <div className="card-body">
          <div className="flex items-center justify-between mb-8">
            <h2 className="card-title text-2xl font-black">Pulse Feed</h2>
            <button className="btn btn-ghost btn-sm text-xs font-bold uppercase tracking-widest text-primary">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-base-200/50">
                <tr className="text-base-content/40 border-none uppercase text-[10px] tracking-widest font-black">
                  <th className="rounded-l-xl">Operation</th>
                  <th>Entity</th>
                  <th>Category</th>
                  <th>Timestamp</th>
                  <th className="rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-content/5">
                {activities.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-base-200/30 transition-colors"
                  >
                    <td className="font-bold text-sm py-4">{item.activity}</td>
                    <td className="text-sm font-medium opacity-70">
                      {item.user}
                    </td>
                    <td>
                      <div
                        className={`badge ${item.badge} badge-md font-bold text-[10px] uppercase py-3`}
                      >
                        {item.type}
                      </div>
                    </td>
                    <td className="text-xs font-mono opacity-50 italic">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-tight opacity-70">
                          {item.status}
                        </span>
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
