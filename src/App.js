import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phoneNumber: '',
    errors: {}
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, dob, email, phoneNumber } = formData;
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!dob) {
      errors.dob = 'Date of birth is required';
    } else {
      const dobDate = new Date(dob);
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      if (dobDate >= eighteenYearsAgo) {
        errors.dob = 'You must be at least 18 years old';
      }
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }

    if (Object.keys(errors).length === 0) {
      // Backend phone number validation
      try {
        await axios.post('http://localhost:5000/api/form',  formData );
        alert('Form submitted successfully');
      } catch (error) {
        console.log({error})
        // errors.phoneNumber = 'Invalid phone number';
        // setFormData({ ...formData, errors });
      }
    } 
  };

  return (
    <div className='container'>
    <form className="needs-validation" onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name:</label>
      <input
        type="text"
        className={`form-control ${formData.errors.name ? 'is-invalid' : ''}`}
        id="name"
        name="name"
        placeholder='Enter Your Name'
        value={formData.name}
        onChange={handleChange}
        required
      />
      {formData.errors.name && <div className="invalid-feedback">{formData.errors.name}</div>}
    </div>
    <div className="mb-3">
      <label htmlFor="dob" className="form-label">Date of Birth:</label>
      <input
        type="date"
        className={`form-control ${formData.errors.dob ? 'is-invalid' : ''}`}
        id="dob"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
      />
      {formData.errors.dob && <div className="invalid-feedback">{formData.errors.dob}</div>}
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email:</label>
      <input
        type="email"
        className={`form-control ${formData.errors.email ? 'is-invalid' : ''}`}
        id="email"
        placeholder='Enter Your Email'
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {formData.errors.email && <div className="invalid-feedback">{formData.errors.email}</div>}
    </div>
    <div className="mb-3">
      <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
      <input
        type="tel"
        className={`form-control ${formData.errors.phoneNumber ? 'is-invalid' : ''}`}
        id="phoneNumber"
        name="phoneNumber"
        placeholder='Enter Your Phone Number'
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      {formData.errors.phoneNumber && <div className="invalid-feedback">{formData.errors.phoneNumber}</div>}
    </div>
    <button type="submit" style={{width:"100px"}} className="btn btn-secondary">Submit</button>
  </form>
  </div>
  
  );
};

export default App;
