// DisplayData.js
import React, { useState, useEffect } from "react";

const DisplayData = () => {
  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/fetchFormData");
      const data = await response.json();

      if (data.success) {
        // Format submissionTime, dob before setting it in state
        const formattedDataList = data.formDataList.map((formData) => ({
          ...formData,
          submissionTime: formatSubmissionTime(formData.submissionTime),
          dob: formatDOB(formData.dob),
        }));
        setFormDataList(formattedDataList);
      } else {
        console.error("Failed to fetch form data:", data.error);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/deleteFormData/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.success) {
        // Remove the deleted item from the state
        setFormDataList((prevList) =>
          prevList.filter((formData) => formData.id !== id)
        );
        console.log("Form data deleted successfully!");
      } else {
        console.error("Failed to delete form data:", data.error);
      }
    } catch (error) {
      console.error("Error deleting form data:", error);
    }
  };

  // Helper function to format submissionTime
  const formatSubmissionTime = (timeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    const formattedTime = new Date(timeString).toLocaleString("en-US", options);
    return formattedTime;
  };

  // Helper function to format dob
  const formatDOB = (dob) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDOB = new Date(dob).toLocaleString("en-US", options);
    return formattedDOB;
  };

  return (
    <div className="mx-auto my-6 max-w-full overflow-x-auto">
      <h2 className="font-display text-2xl font-semibold text-neutral-950 mb-4">
        Display Submitted Data
      </h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Student Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Parents Name
            </th>
            <th scope="col" className="px-6 py-3">
              Mobile Number
            </th>
            <th scope="col" className="px-6 py-3">
              Message
            </th>
            <th scope="col" className="px-6 py-3">
              Grade
            </th>
            <th scope="col" className="px-6 py-3">
              Previous School
            </th>
            <th scope="col" className="px-6 py-3">
              Date of Birth
            </th>
            <th scope="col" className="px-6 py-3">
              Submission Time
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {formDataList.map((formData) => (
            <tr
              key={formData.id}
              className="bg-white dark:bg-gray-900 border-b dark:border-gray-700"
            >
              <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                {formData.name}
              </td>
              <td className="px-6 py-4">{formData.email}</td>
              <td className="px-6 py-4">{formData.parentsFullName}</td>
              <td className="px-6 py-4">{formData.mobileNumber}</td>
              <td className="px-6 py-4">{formData.message}</td>
              <td className="px-6 py-4">{formData.grade}</td>
              <td className="px-6 py-4">{formData.previousSchool}</td>
              <td className="px-6 py-4">{formData.dob}</td>
              <td className="px-6 py-4">{formData.submissionTime}</td>
              <td className="px-6 py-4">
                {formData.filename && (
                  <img
                  src={`http://localhost:3001/uploads/${formData.filename}`}
                  alt="Uploaded"
                  className="w-16 h-16 object-cover rounded-full"
                  onError={(e) => console.error('Image load error:', e)}
                />
                
                )}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDelete(formData.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;
