import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Send Message</h2>
              <form className="space-y-4">
                <input type="text" placeholder="Name" className="input input-bordered w-full" />
                <input type="email" placeholder="Email" className="input input-bordered w-full" />
                <textarea className="textarea textarea-bordered w-full" placeholder="Message"></textarea>
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
