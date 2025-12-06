import { FiUser, FiMapPin, FiPhone } from "react-icons/fi";

const OngoingTuitions = () => {
  const tuitions = [
    {
      id: 1,
      studentName: "Karim Ahmed",
      subject: "Mathematics",
      class: "Class 10",
      location: "Dhanmondi, Dhaka",
      salary: "৳8,000/month",
      schedule: "Sat, Sun, Tue, Thu - 5:00 PM",
      startDate: "2024-01-20",
      phone: "+880 1712-345678"
    },
    {
      id: 2,
      studentName: "Sara Rahman",
      subject: "Physics",
      class: "O Level",
      location: "Gulshan, Dhaka",
      salary: "৳12,000/month",
      schedule: "Mon, Wed, Fri - 6:00 PM",
      startDate: "2024-01-15",
      phone: "+880 1812-345678"
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ongoing Tuitions</h1>

      <div className="grid grid-cols-1 gap-6">
        {tuitions.map((tuition) => (
          <div key={tuition.id} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                        {tuition.studentName.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{tuition.studentName}</h3>
                      <p className="text-base-content/70">{tuition.subject} - {tuition.class}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-primary" />
                      <span className="text-sm">{tuition.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-primary" />
                      <span className="text-sm">{tuition.phone}</span>
                    </div>
                    <div>
                      <p className="text-sm"><strong>Schedule:</strong> {tuition.schedule}</p>
                    </div>
                    <div>
                      <p className="text-sm"><strong>Started:</strong> {tuition.startDate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 lg:items-end">
                  <div className="text-2xl font-bold text-success">{tuition.salary}</div>
                  <button className="btn btn-primary btn-sm">Contact Student</button>
                  <button className="btn btn-outline btn-sm">View Details</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tuitions.length === 0 && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body text-center py-12">
            <p className="text-base-content/70">No ongoing tuitions at the moment</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OngoingTuitions;
