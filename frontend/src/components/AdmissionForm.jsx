// AdmissionForm.js
"use client";
import React, { useState } from "react";
import FadeIn from "./FadeIn";
import TextInput from "./TextInput";
import Button from "./Button";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    parentsFullName: "",
    mobileNumber: "",
    message: "",
    grade: "",
    filename: "",
    previousSchool: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, file, filename: file.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("parentsFullName", formData.parentsFullName);
      formDataToSend.append("mobileNumber", formData.mobileNumber);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("grade", formData.grade);
      formDataToSend.append("previousSchool", formData.previousSchool);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("file_input", formData.file);

      const response = await fetch("http://localhost:3001/submitForm", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        alert("Form submitted successfully!");
      } else {
        console.error("Failed to submit form:", data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FadeIn>
      <form onSubmit={handleSubmit}>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Fill the required field for Admission
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput
            label="Name"
            name="name"
            autoComplete="name"
            onChange={handleChange}
          />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
          <TextInput
            label="Parent's Full Name"
            name="parentsFullName"
            autoComplete="name"
            onChange={handleChange}
          />
          <TextInput
            label="Mobile Number"
            type="tel"
            name="mobileNumber"
            autoComplete="tel"
            onChange={handleChange}
          />
          <TextInput
            label="Message (Optional)"
            name="message"
            onChange={handleChange}
          />
          <TextInput
            label="Previous School"
            name="previousSchool"
            onChange={handleChange}
          />
          <TextInput
            label="Date of Birth"
            type="date"
            name="dob"
            onChange={handleChange}
          />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <div className="relative inline-block text-left">
              <div>
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium text-gray-700"
                >
                  Grade
                </label>
                <select
                  id="grade"
                  name="grade"
                  onChange={handleChange}
                  value={formData.grade}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-800"
                >
                  <option value="" className="text-neutral-950" disabled>
                    Select Grade
                  </option>
                  <option value="One">One</option>
                  <option value="Two">Two</option>
                  <option value="Three">Three</option>
                  <option value="Four">Four</option>
                  <option value="Five">Five</option>
                  <option value="Six">Six</option>
                  <option value="Seven">Seven</option>
                  <option value="Eight">Eight</option>
                  <option value="Nine">Nine</option>
                  <option value="Ten">Ten</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="file_input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload file
              </label>
              <input
                id="file_input"
                name="filename"
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG, or GIF (MAX. 800x400px).
              </p>
            </div>
          </div>
        </div>
        <Button type="submit" className="mt-5">
          Submit
        </Button>
      </form>
    </FadeIn>
  );
};

export default AdmissionForm;
