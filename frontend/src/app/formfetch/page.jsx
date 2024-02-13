"use client";
import { useState, useEffect } from "react";
import Container from "@/components/Container";
import DisplayData from "@/components/DisplayData";

// AuthenticationForm component for entering username and password
const AuthenticationForm = ({ authenticateUser, storedCredentials }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  // Check for stored credentials when component mounts
  useEffect(() => {
    if (storedCredentials) {
      setCredentials(storedCredentials);
    }
  }, [storedCredentials]);

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser(credentials.username, credentials.password);

    // Save credentials to local storage if "Remember Me" is checked
    if (credentials.rememberMe) {
      localStorage.setItem("savedCredentials", JSON.stringify(credentials));
    } else {
      localStorage.removeItem("savedCredentials");
    }
  };
  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* <img className="w-8 h-8 mr-2" src="" alt="logo" /> */}
          Prashanti Academy
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in Prashanti Admin Panel
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required=""
                  value={credentials.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ContactPage component
const ContactPage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const storedCredentials = JSON.parse(
    localStorage.getItem("savedCredentials")
  );

  // Function to authenticate user
  const authenticateUser = (username, password) => {
    // Replace this with your actual authentication logic
    // Check if username is "admin" and password is "123"
    if (username === "admin" && password === "123") {
      setAuthenticated(true);
    } else {
      alert("Authentication failed");
      // You might want to show an error message to the user
    }
  };

  // JSX for the ContactPage
  return (
    <>
      {authenticated ? (
        <Container className="mt-24 sm:mt-32">
          <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
            <DisplayData />
          </div>
        </Container>
      ) : (
        <Container className="mt-24 sm:mt-32">
          <AuthenticationForm
            authenticateUser={authenticateUser}
            storedCredentials={storedCredentials}
          />
        </Container>
      )}
    </>
  );
};

// Export the ContactPage component
export default ContactPage;
