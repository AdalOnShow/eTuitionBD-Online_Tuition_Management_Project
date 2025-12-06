import { FiUsers, FiBook, FiDollarSign, FiTrendingUp } from "react-icons/fi";

const ReportsAnalytics = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="card bg-gradient-to-br from-primary to-primary-focus text-primary-content shadow-lg">
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

        <div className="card bg-gradient-to-br from-secondary to-secondary-focus text-secondary-content shadow-lg">
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

        <div className="card bg-gradient-to-br from-accent to-accent-focus text-accent-content shadow-lg">
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

        <div className="card bg-gradient-to-br from-success to-success-focus text-success-content shadow-lg">
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
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">User Growth</h2>
            <div className="h-64 flex items-center justify-center bg-base-200 rounded-lg">
              <p className="text-base-content/50">Chart Placeholder - Line Chart</p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Tuition Distribution</h2>
            <div className="h-64 flex items-center justify-center bg-base-200 rounded-lg">
              <p className="text-base-content/50">Chart Placeholder - Pie Chart</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Monthly Revenue</h2>
            <div className="h-64 flex items-center justify-center bg-base-200 rounded-lg">
              <p className="text-base-content/50">Chart Placeholder - Bar Chart</p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Subject Popularity</h2>
            <div className="h-64 flex items-center justify-center bg-base-200 rounded-lg">
              <p className="text-base-content/50">Chart Placeholder - Doughnut Chart</p>
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
                  <td><div className="badge badge-primary">Tuition</div></td>
                  <td>2024-01-20 10:30 AM</td>
                  <td><div className="badge badge-success">Active</div></td>
                </tr>
                <tr>
                  <td>New user registered</td>
                  <td>Sara Khan</td>
                  <td><div className="badge badge-secondary">User</div></td>
                  <td>2024-01-20 09:15 AM</td>
                  <td><div className="badge badge-success">Verified</div></td>
                </tr>
                <tr>
                  <td>Application submitted</td>
                  <td>Dr. Ahmed Rahman</td>
                  <td><div className="badge badge-accent">Application</div></td>
                  <td>2024-01-20 08:45 AM</td>
                  <td><div className="badge badge-warning">Pending</div></td>
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
