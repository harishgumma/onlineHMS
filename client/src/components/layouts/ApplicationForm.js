import React, { useState } from 'react';
import axios from 'axios';
import "./ApplicationForm.css"; // Import your CSS file for styling

export default function ApplicationForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('resume', resume);

      await axios.post('/api/job-applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Application submitted successfully!');
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setResume(null);
    } catch (error) {
      console.error(error);
      setError('Error submitting application. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="application-form">
      <h2>Apply for a Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="resume">Resume:</label>
          <input
            type="file"
            id="resume"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
