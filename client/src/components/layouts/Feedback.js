import React, { useState } from 'react';
import axios from 'axios';
import "./Feedback.css"
export default function Feedback() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // State for handling submission errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error state on submission

    try {
      const feedbackData = { name, email, message };
      await axios.post('/feedback', feedbackData);

      alert('Feedback submitted successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
      setError('Error submitting feedback. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feedback-form">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>

        {/* Name input */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email input */}
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

        {/* Message input */}
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {/* Submit button with loading state */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>

        {/* Display error message if there's an error */}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
