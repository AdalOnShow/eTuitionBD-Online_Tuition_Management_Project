import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-linear-to-r from-primary to-secondary text-primary-content py-12">
        <div className="max-w-11/12 mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg opacity-90">
            We'd love to hear from you! Reach out with any questions or
            feedback.
          </p>
        </div>
      </div>

      <div className="max-w-11/12 mx-auto  px-4 py-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Send Message</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                />
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Message"
                ></textarea>
                <button className="btn btn-primary">Send</button>
              </form>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <FiMapPin className="text-2xl text-primary" />
                <p>Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <FiPhone className="text-2xl text-primary" />
                <p>+880 1234-567890</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <FiMail className="text-2xl text-primary" />
                <p>info@etuitionbd.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
