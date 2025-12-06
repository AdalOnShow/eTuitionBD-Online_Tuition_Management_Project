import { Link, useParams } from "react-router-dom";
import { FiMapPin, FiDollarSign, FiClock, FiCalendar, FiUser, FiBook } from "react-icons/fi";

const TuitionDetails = () => {
  const { id } = useParams();

  const tuition = {
    id: 1,
    title: "Need Math Tutor for Class 10",
    subject: "Mathematics",
    class: "Class 10",
    location: "Dhanmondi, Dhaka",
    salary: "৳8,000/month",
    type: "Home Tutoring",
    days: "4 days/week",
    duration: "1.5 hours",
    postedDate: "2 days ago",
    applicants: 12,
    studentGender: "Male",
    preferredTutorGender: "Any",
    description: "Looking for an experienced mathematics tutor for my son who is in class 10. Need someone who can explain concepts clearly and help with exam preparation.",
    requirements: [
      "Minimum 2 years of teaching experience",
      "Good communication skills",
      "Ability to explain complex topics simply",
      "Punctual and dedicated"
    ],
    schedule: "Saturday, Sunday, Tuesday, Thursday - 5:00 PM to 6:30 PM",
    studentInfo: {
      name: "Karim Ahmed",
      location: "House 12, Road 5, Dhanmondi",
      phone: "+880 1712-345678"
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold">{tuition.title}</h1>
                  <div className="badge badge-primary badge-lg">{tuition.type}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FiBook className="text-primary" />
                    <span><strong>Subject:</strong> {tuition.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser className="text-primary" />
                    <span><strong>Class:</strong> {tuition.class}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-primary" />
                    <span>{tuition.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-success" />
                    <span className="text-success font-bold">{tuition.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-primary" />
                    <span>{tuition.days}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="text-primary" />
                    <span>{tuition.duration} per session</span>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Description</h2>
                  <p className="text-base-content/80">{tuition.description}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Requirements</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {tuition.requirements.map((req, index) => (
                      <li key={index} className="text-base-content/80">{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Schedule</h2>
                  <p className="text-base-content/80">{tuition.schedule}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="font-semibold">Student Gender</p>
                    <p className="text-base-content/70">{tuition.studentGender}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Preferred Tutor Gender</p>
                    <p className="text-base-content/70">{tuition.preferredTutorGender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-lg sticky top-20">
              <div className="card-body">
                <h2 className="card-title mb-4">Apply for this Tuition</h2>
                <div className="space-y-4">
                  <button className="btn btn-primary btn-block btn-lg">
                    Apply Now
                  </button>
                  <button className="btn btn-outline btn-block">
                    Save for Later
                  </button>
                </div>

                <div className="divider"></div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-base-content/70">Posted</p>
                    <p className="font-semibold">{tuition.postedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/70">Total Applicants</p>
                    <p className="font-semibold">{tuition.applicants} tutors applied</p>
                  </div>
                </div>

                <div className="divider"></div>

                <div>
                  <h3 className="font-bold mb-2">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {tuition.studentInfo.name}</p>
                    <p><strong>Location:</strong> {tuition.studentInfo.location}</p>
                    <p><strong>Phone:</strong> {tuition.studentInfo.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/tuitions" className="btn btn-ghost">
            ← Back to All Tuitions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
