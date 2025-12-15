import { FiBook, FiDollarSign, FiTrendingUp, FiUsers } from "react-icons/fi";

const ReportsAnalytics = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="card bg-linear-to-br from-primary to-primary-focus text-primary-content shadow-lg">
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

        <div className="card bg-linear-to-br from-secondary to-secondary-focus text-secondary-content shadow-lg">
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
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">User Growth</h2>
            <div className="h-64 flex items-center justify-center bg-base-200 rounded-lg">
              <p className="text-base-content/50">
                Chart Placeholder - Line Chart
              </p>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Tuition Distribution</h2>
            <div className="h-64 bg-base-200 rounded-lg p-4 flex items-center justify-center">
              {/* Simple Pie Chart */}
              <div className="relative">
                <div
                  className="w-32 h-32 rounded-full border-8 border-primary"
                  style={{
                    background: `conic-gradient(
                         hsl(var(--p)) 0deg 180deg,
                         hsl(var(--s)) 180deg 270deg,
                         hsl(var(--a)) 270deg 360deg
                       )`,
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-base-100 w-16 h-16 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">Types</span>
                  </div>
                </div>
              </div>
              <div className="ml-8 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span className="text-sm">Home Tuition (50%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded"></div>
                  <span className="text-sm">Online (25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded"></div>
                  <span className="text-sm">Group Study (25%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Monthly Revenue</h2>
            <div className="h-64 bg-base-200 rounded-lg p-4 relative">
              {/* Simple Bar Chart */}
              <div className="absolute bottom-4 left-4 right-4 h-40">
                <div className="flex items-end justify-between h-full gap-2">
                  {[60, 80, 45, 90, 75, 95, 85, 70, 88, 92, 78, 100].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className="bg-gradient-to-t from-success to-success-focus rounded-t w-full transition-all duration-1000"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs mt-1 text-base-content/60 rotate-45 origin-bottom-left">
                          {
                            [
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sep",
                              "Oct",
                              "Nov",
                              "Dec",
                            ][index]
                          }
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <span className="text-sm text-base-content/60">
                  Revenue in ৳ (Thousands)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Subject Popularity</h2>
            <div className="h-64 bg-base-200 rounded-lg p-4">
              {/* Subject Popularity Bars */}
              <div className="space-y-3 h-full flex flex-col justify-center">
                {[
                  {
                    subject: "Mathematics",
                    percentage: 85,
                    color: "bg-primary",
                  },
                  { subject: "Physics", percentage: 70, color: "bg-secondary" },
                  { subject: "Chemistry", percentage: 65, color: "bg-accent" },
                  { subject: "Biology", percentage: 55, color: "bg-success" },
                  { subject: "English", percentage: 45, color: "bg-warning" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-20 text-sm font-medium">
                      {item.subject}
                    </div>
                    <div className="flex-1 bg-base-300 rounded-full h-4 relative overflow-hidden">
                      <div
                        className={`${item.color} h-full rounded-full transition-all duration-1000`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm text-right">
                      {item.percentage}%
                    </div>
                  </div>
                ))}
              </div>
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
