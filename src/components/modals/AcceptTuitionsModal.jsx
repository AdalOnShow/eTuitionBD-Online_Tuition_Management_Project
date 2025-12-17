import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAxiosSecure from "../../hook/useAxiosSecure";

const AcceptTuitionsModal = ({ isOpen, closeModal, applicationData }) => {
  const axiosSecure = useAxiosSecure();
  const {
    tuition_title,
    tuition_id,
    tutor_email,
    tutor_name,
    student_email,
    expected_salary,
    subject,
  } = applicationData;

  const handlePayment = async () => {
    const paymantData = {
      tuition_id,
      tuition_title,
      tutor_email,
      student_email,
      sallry: expected_salary,
      subject,
    };
    const { data } = await axiosSecure.post(
      `/create-checkout-session`,
      paymantData
    );

    window.location.href = data.url;
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 bg-black opacity-30" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-medium text-gray-900 mb-4"
              >
                Apply for Tuition: {tuition_title}
              </DialogTitle>

              <div className="flex flex-col gap-4">
                <p>
                  Tutor Name: <span className="font-bold">{tutor_name}</span>
                </p>
                <p>
                  Tutor Email: <span className="font-bold">{tutor_email}</span>
                </p>
                <p>
                  Tuition Title:{" "}
                  <span className="font-bold">{tuition_title}</span>
                </p>
                <p>
                  Expected Salary:{" "}
                  <span className="font-bold">৳{expected_salary}</span>
                </p>
              </div>

              <div className="flex mt-6 gap-4 justify-end">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePayment()}
                  className="btn btn-primary"
                >
                  Payment Tuition
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AcceptTuitionsModal;
