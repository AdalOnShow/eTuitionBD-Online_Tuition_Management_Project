import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import {
  FiAward,
  FiBook,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  const heroRef = useRef();
  const statsRef = useRef();
  const featuresRef = useRef();

  useEffect(() => {
    // Hero section animations
    gsap.fromTo(
      heroRef.current.querySelector("h1"),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      heroRef.current.querySelector("p"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
    );

    gsap.fromTo(
      heroRef.current.querySelector(".hero-buttons"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power2.out" }
    );

    // Stats animation
    gsap.fromTo(
      statsRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 1,
        ease: "power2.out",
      }
    );

    // Features animation
    gsap.fromTo(
      featuresRef.current.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 1.5,
        ease: "power2.out",
      }
    );
  }, []);

  const {
    data: homeStats = {},
    isLoading: isStatsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["homeStats"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/stats`);
      return res.data;
    },
  });

  const formatNumber = (n) => {
    if (n === undefined || n === null) return "0";
    try {
      return n.toLocaleString();
    } catch (e) {
      return String(n);
    }
  };

  const stats = [
    {
      icon: <FiUsers />,
      value: isStatsLoading ? "..." : formatNumber(homeStats.totalUsers),
      label: "Total Users",
    },
    {
      icon: <FiUsers />,
      value: isStatsLoading ? "..." : formatNumber(homeStats.totalTutors),
      label: "Total Tutors",
    },
    {
      icon: <FiBook />,
      value: isStatsLoading ? "..." : formatNumber(homeStats.totalTuitions),
      label: "Total Tuitions",
    },
    {
      icon: <FiTrendingUp />,
      value:
        isStatsLoading || homeStats.successRate === undefined
          ? "..."
          : `${homeStats.successRate}%`,
      label: "Success Rate",
    },
  ];

  const features = [
    {
      icon: <FiSearch />,
      title: "Easy Search",
      description:
        "Find the perfect tutor or tuition based on your requirements with advanced filters.",
    },
    {
      icon: <FiCheckCircle />,
      title: "Verified Tutors",
      description:
        "All tutors are verified with proper credentials and background checks.",
    },
    {
      icon: <FiClock />,
      title: "Quick Response",
      description:
        "Get responses from tutors within 24 hours of posting your requirement.",
    },
    {
      icon: <FiAward />,
      title: "Quality Assured",
      description:
        "We ensure quality education through regular monitoring and feedback.",
    },
  ];

  const {
    data: recentTuitions = [],
    isLoading: isRecentLoading,
    error: recentError,
  } = useQuery({
    queryKey: ["recentTuitions"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/tuitions`);
      return res.data.tuitions.slice(0, 6);
    },
  });

  const {
    data: topTutors = [],
    isLoading: isTutorsLoading,
    error: tutorsError,
  } = useQuery({
    queryKey: ["topTutors"],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_API_URL}/tutors`
      );
      return res.data.slice(0, 6);
    },
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
        <div className="max-w-11/12 mx-auto px-4">
          <div ref={heroRef} className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Perfect <span className="text-primary">Tutor</span> or{" "}
              <span className="text-secondary">Tuition</span>
            </h1>
            <p className="text-lg md:text-xl text-base-content/70 mb-8">
              Bangladesh's most trusted platform connecting students with
              verified tutors. Post your requirement or browse thousands of
              opportunities.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
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

      {/* How It Works Section */}
      <section className="py-16 bg-base-100" aria-labelledby="home-how-heading">
        <div className="max-w-11/12 mx-auto px-4">
          <h2 id="home-how-heading" className="text-3xl md:text-4xl font-bold mb-8">How eTuitionBD Works</h2>
          <ol className="space-y-6">
            <li className="flex gap-5 items-start bg-base-200 p-5 rounded-lg shadow-sm">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">1</div>
              <div>
                <h3 className="font-semibold text-lg">Student posts a tuition</h3>
                <p className="text-sm text-base-content/70 mt-1">Students create a tuition posting with subject, class, schedule and location so tutors can evaluate fit.</p>
              </div>
            </li>

            <li className="flex gap-5 items-start bg-base-200 p-5 rounded-lg shadow-sm">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">2</div>
              <div>
                <h3 className="font-semibold text-lg">Tutors apply with proposals</h3>
                <p className="text-sm text-base-content/70 mt-1">Tutors submit applications including rates and a short teaching approach for students to review.</p>
              </div>
            </li>

            <li className="flex gap-5 items-start bg-base-200 p-5 rounded-lg shadow-sm">
              <div className="shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">3</div>
              <div>
                <h3 className="font-semibold text-lg">Admin oversight & confirmation</h3>
                <p className="text-sm text-base-content/70 mt-1">Admin tools enable monitoring for policy compliance; students confirm the tutor and scheduling to begin lessons.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-base-200" aria-labelledby="home-faq-heading">
        <div className="max-w-11/12 mx-auto px-4">
          <h2 id="home-faq-heading" className="text-3xl md:text-4xl font-bold mb-8">Frequently Asked Questions — Students</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <details className="group bg-base-100 p-5 rounded-lg shadow-sm">
              <summary className="cursor-pointer flex justify-between items-center font-semibold text-base">How do I post a tuition request?<span className="text-sm opacity-60">▾</span></summary>
              <p className="mt-3 text-sm text-base-content/70">Visit your student dashboard and choose “Post Tuition”. Provide subject, class/level, preferred schedule and location (online/offline). After posting, tutors may apply and you can review proposals.</p>
            </details>

            <details className="group bg-base-100 p-5 rounded-lg shadow-sm">
              <summary className="cursor-pointer flex justify-between items-center font-semibold text-base">How are tutors verified on eTuitionBD?<span className="text-sm opacity-60">▾</span></summary>
              <p className="mt-3 text-sm text-base-content/70">Tutors complete a profile and may submit credentials; verification badges appear on profiles when the tutor completes verification steps.</p>
            </details>

            <details className="group bg-base-100 p-5 rounded-lg shadow-sm md:col-span-2">
              <summary className="cursor-pointer flex justify-between items-center font-semibold text-base">Can I edit or cancel a posted tuition?<span className="text-sm opacity-60">▾</span></summary>
              <p className="mt-3 text-sm text-base-content/70">Yes — go to `My Tuitions` in your dashboard to edit or cancel a posting; applied tutors receive an automatic notification when a posting is cancelled.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Statistics / Trust Section */}
      <section className="py-16 bg-base-100" aria-labelledby="home-trust-heading">
        <div className="max-w-11/12 mx-auto px-4">
          <h2 id="home-trust-heading" className="text-3xl md:text-4xl font-bold mb-8">Platform Snapshot</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card bg-base-100 border border-base-300 shadow-sm p-6 rounded-lg">
              <p className="text-xs uppercase tracking-wide text-base-content/60">Verified Tutors</p>
              <p className="text-3xl font-extrabold text-primary mt-3">{homeStats?.verifiedTutors ?? '—'}</p>
              <p className="text-xs mt-3 text-base-content/70">Counts are fetched from the platform API when available.</p>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-sm p-6 rounded-lg">
              <p className="text-xs uppercase tracking-wide text-base-content/60">Active Tuitions</p>
              <p className="text-3xl font-extrabold text-primary mt-3">{homeStats?.activeTuitions ?? '—'}</p>
              <p className="text-xs mt-3 text-base-content/70">Reflects currently open tuition postings from backend data.</p>
            </div>

            <div className="card bg-base-100 border border-base-300 shadow-sm p-6 rounded-lg">
              <p className="text-xs uppercase tracking-wide text-base-content/60">Recent Matches (30 days)</p>
              <p className="text-3xl font-extrabold text-primary mt-3">{homeStats?.recentMatches ?? '—'}</p>
              <p className="text-xs mt-3 text-base-content/70">Sourced from the platform API — displayed live when available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-To-Action (CTA) Section */}
      <section className="py-16 bg-base-200" aria-labelledby="home-cta2-heading">
        <div className="max-w-11/12 mx-auto px-4">
          <div className="bg-base-100 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-base-300 shadow-sm">
            <div>
              <h3 id="home-cta2-heading" className="text-3xl font-bold">Take the next step</h3>
              <p className="text-sm text-base-content/70 mt-2">Students: post a tuition to receive tutor proposals. Tutors: complete your profile and apply to matching tuitions.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/post-tuition" className="btn btn-primary btn-md">Post a Tuition</Link>
              <Link to="/register" className="btn btn-outline btn-md">Register as Tutor</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-base-100">
        <div className="max-w-11/12 mx-auto px-4">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </h3>
                <p className="text-base-content/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-base-200">
        <div className="max-w-11/12 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose eTuitionBD?
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              We provide a seamless experience for both students and tutors with
              our advanced features.
            </p>
          </div>
          <div
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="card-body items-center text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="card-title text-lg">{feature.title}</h3>
                  <p className="text-sm text-base-content/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Tuitions */}
      <section className="py-16 bg-base-100">
        <div className="max-w-11/12 mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recent Tuitions</h2>
              <p className="text-base-content/70">
                Latest tuition opportunities posted by students
              </p>
            </div>
            <Link to="/tuitions" className="btn btn-primary btn-sm">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isRecentLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="card bg-base-100 border border-base-300"
                >
                  <div className="card-body">
                    <div className="flex justify-between items-start mb-2">
                      <div className="h-6 bg-base-300 rounded w-3/4 animate-pulse"></div>
                      <div className="h-5 bg-base-300 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-base-300 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-base-300 rounded w-2/3 animate-pulse"></div>
                      <div className="h-4 bg-base-300 rounded w-1/2 animate-pulse"></div>
                      <div className="h-4 bg-base-300 rounded w-1/3 animate-pulse"></div>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <div className="h-8 bg-base-300 rounded w-24 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : recentError ? (
              // Error state
              <div className="col-span-full text-center py-12">
                <FiBook className="text-6xl text-error mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Failed to Load Tuitions
                </h3>
                <p className="text-base-content/70">Please try again later</p>
              </div>
            ) : recentTuitions.length === 0 ? (
              // Empty state
              <div className="col-span-full text-center py-12">
                <FiBook className="text-6xl text-base-content/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No Tuitions Available
                </h3>
                <p className="text-base-content/70 mb-4">
                  Be the first to post a tuition requirement!
                </p>
                <Link to="/register" className="btn btn-primary">
                  Post Your First Tuition
                </Link>
              </div>
            ) : (
              recentTuitions.map((tuition) => (
                <div
                  key={tuition._id}
                  className="card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow"
                >
                  <div className="card-body">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="card-title text-lg">{tuition.title}</h3>
                      <div className="badge badge-primary badge-sm">
                        {tuition.tuition_type}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-semibold">Subject:</span>{" "}
                        {tuition.subject}
                      </p>
                      <p>
                        <span className="font-semibold">Class:</span>{" "}
                        {tuition.class}
                      </p>
                      <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {tuition.location}
                      </p>
                      <p className="text-primary font-semibold text-base">
                        ৳{tuition.budget}/month
                      </p>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link
                        to={`/tuition/${tuition._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Top Tutors */}
      <section className="py-16 bg-base-200">
        <div className="max-w-11/12 mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Top Rated Tutors</h2>
              <p className="text-base-content/70">
                Meet our most experienced and highly rated tutors
              </p>
            </div>
            <Link to="/tutors" className="btn btn-primary btn-sm">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isTutorsLoading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-base-300 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-base-300 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-base-300 rounded w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-base-300 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-base-300 rounded w-2/3 animate-pulse"></div>
                      <div className="flex gap-2">
                        <div className="h-5 bg-base-300 rounded w-16 animate-pulse"></div>
                        <div className="h-5 bg-base-300 rounded w-20 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-10 bg-base-300 rounded mt-4 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : tutorsError ? (
              // Error state
              <div className="col-span-full text-center py-12">
                <FiUsers className="text-6xl text-error mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Failed to Load Tutors
                </h3>
                <p className="text-base-content/70">Please try again later</p>
              </div>
            ) : topTutors.length === 0 ? (
              // Empty state
              <div className="col-span-full text-center py-12">
                <FiUsers className="text-6xl text-base-content/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No Tutors Available
                </h3>
                <p className="text-base-content/70 mb-4">
                  Join as a tutor and be the first to help students!
                </p>
                <Link to="/register" className="btn btn-primary">
                  Become a Tutor
                </Link>
              </div>
            ) : (
              topTutors.map((tutor) => (
                <div
                  key={tutor._id}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="card-body">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold">
                          {tutor.photo ? (
                            <img src={tutor.photo} alt={tutor.name} />
                          ) : (
                            tutor.name?.charAt(0) || "T"
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{tutor.name}</h3>
                        <p className="text-sm text-base-content/70">
                          {tutor.subjects?.[0] || "General Tutor"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-semibold">Education:</span>{" "}
                        {tutor.education || "Not specified"}
                      </p>
                      <p>
                        <span className="font-semibold">Location:</span>{" "}
                        {tutor.address || "Not specified"}
                      </p>
                      {tutor.subjects && tutor.subjects.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tutor.subjects.slice(0, 3).map((subject, index) => (
                            <div
                              key={index}
                              className="badge badge-primary badge-xs"
                            >
                              {subject}
                            </div>
                          ))}
                          {tutor.subjects.length > 3 && (
                            <div className="badge badge-outline badge-xs">
                              +{tutor.subjects.length - 3} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link
                        to={`/tutors/${tutor._id}`}
                        className="btn btn-primary btn-sm btn-block"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-primary to-secondary text-primary-content">
        <div className="max-w-11/12 mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students and tutors already using eTuitionBD
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn btn-lg bg-white text-primary hover:bg-base-100"
            >
              Register as Student
            </Link>
            <Link
              to="/register"
              className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary"
            >
              Register as Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
