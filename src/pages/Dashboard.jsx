import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";

// Example API fetch function
const fetchUserData = async () => {
  // Replace with your actual API endpoint
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Dashboard = () => {
  const { user } = useAuth();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error: {error.message}</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">User Information</h2>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>UID:</strong> {user?.uid}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Fetched Data (TanStack Query)</h2>
            <p><strong>Name:</strong> {data?.name}</p>
            <p><strong>Username:</strong> {data?.username}</p>
            <p><strong>Email:</strong> {data?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
