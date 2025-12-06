import { Link } from "react-router-dom";
import { FiSearch, FiUsers, FiCheckCircle, FiTrendingUp, FiBook, FiAward, FiClock } from "react-icons/fi";

const Home = () => {
  const stats = [
    { icon: <FiUsers />, value: "5000+", label: "Verified Tutors" },
    { icon: <FiBook />, value: "10000+", label: "Tuitions Posted" },
    { icon: <FiCheckCircle />, value: "8000+", label: "Successful Matches" },
    { icon: <FiTrendingUp />, value: "95%", label: "Success Rate" },
  ];

  const features = [
    {
      icon: <FiSearch />,
      title: "Easy Search",
      description: "Find the perfect tutor or tuition based on your requirements with advanced filters."
    },
    {
      icon: <FiCheckCircle />,
      title: "Verified Tutors",
      description: "All tutors are verified with proper credentials and background checks."
    },
    {
      icon: <FiClock />,
      title: "Quick Response",
      description: "Get responses from tutors within 24 hours of posting your requirement."
    },
    {
      icon: <FiAward />,
      title: "Quality Assured",
      description: "We ensure quality education through regular monitoring and feedback."
    },
  ];

  const recentTuitions = [
    {
      id: 1,
      title: "Need Math Tutor for Class 10",
      subject: "Mathematics",
      class: "Class 10",
      location: "Dhanmondi, Dhaka",
      salary: "৳8,000/month",
      type: "Home Tutoring"
    },
    {
      id: 2,
      title: "English Medium Physics Teacher",
      subject: "Physics",
      class: "O Level",
      location: "Gulshan, Dhaka",
      salary: "৳12,000/month",
      type: "Online"
    },
    {
      id: 3,
      title: "Chemistry Tutor Required",
      subject: "Chemistry",
      class: "HSC",
      location: "Mirpur, Dhaka",
      salary: "৳10,000/month",
      type: "Home Tutoring"
    },
  ];

  const topTutors = [
    {
      id: 1,
      name: "Dr. Ahmed Rahman",
      subject: "Mathematics",
      education: "PhD in Mathematics, DU",
      experience: "10 years",
      rating: 4.9,
      students: 150
    },
    {
      id: 2,
      name: "Fatima Khan",
      subject: "English",
      education: "MA in English, JU",
      experience: "7 years",
      rating: 4.8,
      students: 120
    },
    {
      id: 3,
      name: "Karim Hossain",
      subject: "Physics",
      education: "MSc in Physics, BUET",
      experience: "8 years",
      rating: 4.9,
      students: 135
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Perfect <span className="text-primary">Tutor</span> or <span className="text-secondary">Tuition</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 mb-8">
              Bangladesh's most trusted platform connecting students with verified tutors. 
              Post your requirement or browse thousands of opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tuitions" className="btn btn-primary btn-lg">
                <FiSearch className="mr-2" /> Browse Tuitions
              </Link>
              <Link to="/tutors" className="btn btn-outline btn-lg">
                <FiUsers className="mr-2" /> Find Tutors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-primary mb-1">{stat.value}</h3>
                <p className="text-base-content/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose eTuitionBD?</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              We provide a seamless experience for both students and tutors with our advanced features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body items-center text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="card-title text-lg">{feature.title}</h3>
                  <p className="text-sm text-base-content/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Tuitions */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recent Tuitions</h2>
              <p className="text-base-content/70">Latest tuition opportunities posted by students</p>
            </div>
            <Link to="/tuitions" className="btn btn-primary btn-sm">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTuitions.map((tuition) => (
              <div key={tuition.id} className="card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title text-lg">{tuition.title}</h3>
                    <div className="badge badge-primary badge-sm">{tuition.type}</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Subject:</span> {tuition.subject}</p>
                    <p><span className="font-semibold">Class:</span> {tuition.class}</p>
                    <p><span className="font-semibold">Location:</span> {tuition.location}</p>
                    <p className="text-primary font-semibold text-base">{tuition.salary}</p>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/tuitions/${tuition.id}`} className="btn btn-primary btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Tutors */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Top Rated Tutors</h2>
              <p className="text-base-content/70">Meet our most experienced and highly rated tutors</p>
            </div>
            <Link to="/tutors" className="btn btn-primary btn-sm">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topTutors.map((tutor) => (
              <div key={tutor.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold">
                        {tutor.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{tutor.name}</h3>
                      <p className="text-sm text-base-content/70">{tutor.subject}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Education:</span> {tutor.education}</p>
                    <p><span className="font-semibold">Experience:</span> {tutor.experience}</p>
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-1">
                        <div className="rating rating-sm">
                          <input type="radio" className="mask mask-star-2 bg-orange-400" checked readOnly />
                        </div>
                        <span className="font-semibold">{tutor.rating}</span>
                      </div>
                      <span className="text-xs text-base-content/70">{tutor.students} students</span>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/tutors/${tutor.id}`} className="btn btn-primary btn-sm btn-block">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students and tutors already using eTuitionBD
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn btn-lg bg-white text-primary hover:bg-base-100">
              Register as Student
            </Link>
            <Link to="/register" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary">
              Register as Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
