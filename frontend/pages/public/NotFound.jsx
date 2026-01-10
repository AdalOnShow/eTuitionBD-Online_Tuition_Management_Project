import { FiArrowLeft, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-6xl md:text-9xl font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-base-content/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary btn-lg">
            <FiHome className="mr-2" /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline btn-lg"
          >
            <FiArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
