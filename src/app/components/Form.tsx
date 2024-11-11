"use client";

import { useState } from "react";
import { z } from "zod";
import formSchema from "../types/formSchema";

type FormData = z.infer<typeof formSchema>;

export default function FormPage() {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    email: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === "birthDate" ? new Date(value) : value;
    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(formData);

    if (result.success) {
      setFormErrors({});
      setSubmittedData(result.data);
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        birthDate: new Date(),
        email: "",
      });
      console.log("Form data:", result.data);
    } else {
      const errors = result.error.flatten().fieldErrors;
      const formattedErrors: Record<string, string> = {};
      for (const [key, value] of Object.entries(errors)) {
        if (value) formattedErrors[key] = value[0];
      }
      setFormErrors(formattedErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          רווקות לעת עתה
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="id">
              ID Number
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {formErrors.id && (
              <p className="mt-1 text-sm text-red-500">{formErrors.id}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {formErrors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {formErrors.firstName}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {formErrors.lastName && (
              <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="birthDate">
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate.toISOString().split("T")[0]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {formErrors.birthDate && (
              <p className="mt-1 text-sm text-red-500">
                {formErrors.birthDate}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>

        {submittedData && (
          <div className="mt-6 p-4 border-t border-gray-300">
            <h3 className="text-lg font-semibold">Submitted Data:</h3>
            <pre className="mt-2 text-sm">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
