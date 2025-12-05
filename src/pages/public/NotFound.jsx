import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-base-content/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          <FiHome className="mr-2" /> Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
