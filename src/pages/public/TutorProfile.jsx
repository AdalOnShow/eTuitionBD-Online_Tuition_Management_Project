import { useParams, Link } from "react-router-dom";
import { FiStar, FiMapPin, FiDollarSign, FiAward, FiBook } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

const TutorProfile = () => {
  const { id } = useParams();

  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutor", id],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/user/${id}`);
      return res.data;
    },
  })

  if(isLoading) return <LoadingSpinner />

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
      <div className="max-w-11/12 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-lg mb-6">
              <div className="card-body">
                <div className="flex items-start gap-6 mb-6">
                  <div className="avatar">
                    <div className="w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center text-4xl font-bold">
                      <img src={tutor.photo} alt={tutor.name} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{tutor.name}</h1>
                    <p className="text-xl text-primary mb-2">{tutor.subjects[0]} Specialist</p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <FiStar className="text-warning fill-warning" />
                        <span className="font-bold">4.8</span>
                        <span className="text-base-content/70">(88 reviews)</span>
                      </div>
                      <span className="text-base-content/70">•</span>
                      <span className="text-base-content/70">44 students taught</span>
                    </div>
                    <div className="flex items-center gap-2 text-base-content/70">
                      <FiMapPin />
                      <span>{tutor.address}</span>
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
                    {tutor.subjects.map((spec, index) => (
                      <div key={index} className="badge badge-primary badge-lg">{spec}</div>
                    ))}
                  </div>
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
                  <p className="text-3xl font-bold text-primary">৳{tutor.hourly_rate}</p>
                  <p className="text-sm text-base-content/70">Per hour</p>
                </div>

                <button className="btn btn-primary btn-block btn-lg mb-2">
                  Contact Tutor
                </button>
                <button className="btn btn-outline btn-block">
                  Save Profile
                </button>
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
