import { useState } from 'react';
import { submitStudentData } from '../services/api';

export default function StudentForm() {
  const initialFormState = {
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    college: '',
    course: '',
    parentName: '',
    parentPhone: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset validation messages when user starts correcting the numbers
    if (name === 'phone' || name === 'parentPhone') {
      const phoneInput = document.getElementById('phone');
      const parentPhoneInput = document.getElementById('parentPhone');
      if (phoneInput) phoneInput.setCustomValidity('');
      if (parentPhoneInput) parentPhoneInput.setCustomValidity('');
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check that parent mobile number and candidate mobile number are different
    if (formData.phone.trim() === formData.parentPhone.trim()) {
      const parentPhoneInput = document.getElementById('parentPhone');
      if (parentPhoneInput) {
        parentPhoneInput.setCustomValidity("Parent's phone number cannot be the same as candidate's phone number.");
        parentPhoneInput.reportValidity();
      }
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitStudentData(formData);
      // After successful submission, clear the form as requested
      setFormData(initialFormState);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      {/* Spacer for future College Logo/Image */}
      <div className="logo-placeholder"></div>
      
      <div className="form-header">
        <h1>Student Registration Form</h1>
        <p className="form-description">Please fill out all the details to register for the academic year.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="middleName">Middle Name</label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Course</label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="parentName">Parent's Full Name</label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="parentPhone">Parent's Phone Number</label>
          <input
            type="tel"
            id="parentPhone"
            name="parentPhone"
            value={formData.parentPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-submit">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
