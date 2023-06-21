import { toast } from "react-toastify";

export const status401 = () => {
  window.location.reload();
  localStorage.removeItem("token");
};

// Function to handle errors
export const handleErrors = (error) => {
  const toastOptions = {
    position: "top-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  if (error.response) {
    const { status } = error.response;

    if (status === 401) {
      toast.error("Your session has expired,please log in again", toastOptions);
      // status401();
      // Handle 401 Unauthorized error, e.g., redirect to login page
      setTimeout(() => {
        // window.location.pathname = "/login";
      }, 3000);
    }

    if (status === 500) {
      toast.error("Internal server error occured", toastOptions);
    }

    // Add more conditions for other status codes if needed

    // Return a rejected promise with the error
    return Promise.reject(error);
  }

  // For non-response errors, you can handle them here as well
  // Return a rejected promise with the error
  return Promise.reject(error);
};
