import { useParams, Link } from "react-router-dom";
import { FiStar, FiMapPin, FiDollarSign, FiAward, FiBook } from "react-icons/fi";

const TutorProfile = () => {
  const { id } = useParams();

  const tutor = {
    id: 1,
    name: "Dr. Ahmed Rahman",
    subject: "Mathematics",
    education: "PhD in Mathematics, Dhaka University",
    experience: "10 years",
    rating: 4.9,
    reviews: 45,
    students: 150,
    location: "Dhanmondi, Dhaka",
    hourlyRate: "৳500/hour",
    bio: "Experienced mathematics tutor with a passion for teaching. Specialized in SSC, HSC, and university-level mathematics. My teaching methodology focuses on building strong fundamentals and problem-solving skills.",
    specializations: ["Algebra", "Calculus", "Geometry", "Statistics"],
    achievements: [
      "Best Teacher Award 2023",
      "100% pass rate in board exams",
      "Published research papers in mathematics"
    ],
    availability: ["Saturday", "Sunday", "Tuesday", "Thursday"]
  };

  const reviews = [
    {
      id: 1,
      student: "Rahim Khan",
      rating: 5,
      comment: "Excellent teacher! Very patient and explains concepts clearly.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      student: "Sara Ahmed",
      rating: 5,
      comment: "Best math tutor I've ever had. Highly recommended!",
      date: "1 month ago"
    }
  ];

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-lg mb-6">
              <div className="card-body">
                <div className="flex items-start gap-6 mb-6">
                  <div className="avatar">
                    <div className="w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-4xl font-bold">
                      {tutor.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{tutor.name}</h1>
                    <p className="text-xl text-primary mb-2">{tutor.subject} Specialist</p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <FiStar className="text-warning fill-warning" />
                        <span className="font-bold">{tutor.rating}</span>
                        <span className="text-base-content/70">({tutor.reviews} reviews)</span>
                      </div>
                      <span className="text-base-content/70">•</span>
                      <span className="text-base-content/70">{tutor.students} students taught</span>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <FiMapPin />
                      <span>{tutor.location}</span>
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">About</h2>
                  <p className="text-base-content/80">{tutor.bio}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Education</h2>
                  <p className="text-base-content/80">{tutor.education}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Experience</h2>
                  <p className="text-base-content/80">{tutor.experience} of teaching experience</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Specializations</h2>
                  <div className="flex flex-wrap gap-2">
                    {tutor.specializations.map((spec, index) => (
                      <div key={index} className="badge badge-primary badge-lg">{spec}</div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Achievements</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {tutor.achievements.map((achievement, index) => (
                      <li key={index} className="text-base-content/80">{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="text-xl font-bold mb-4">Student Reviews</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-base-300 pb-4 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{review.student}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <FiStar key={i} className="text-warning fill-warning text-sm" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-base-content/70">{review.date}</span>
                      </div>
                      <p className="text-base-content/80">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-lg sticky top-20">
              <div className="card-body">
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-primary">{tutor.hourlyRate}</p>
                  <p className="text-sm text-base-content/70">Per hour</p>
                </div>

                <button className="btn btn-primary btn-block btn-lg mb-2">
                  Contact Tutor
                </button>
                <button className="btn btn-outline btn-block">
                  Save Profile
                </button>

                <div className="divider"></div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-base-content/70 mb-1">Availability</p>
                    <div className="flex flex-wrap gap-2">
                      {tutor.availability.map((day, index) => (
                        <div key={index} className="badge badge-outline">{day}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/tutors" className="btn btn-ghost">
            ← Back to All Tutors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
