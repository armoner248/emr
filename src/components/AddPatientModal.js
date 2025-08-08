import React, { useState } from 'react';

const AddPatientModal = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    patientId: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Patient name is required';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      // Validate MM/DD/YYYY format
      const dobPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
      if (!dobPattern.test(formData.dob)) {
        newErrors.dob = 'Date must be in MM/DD/YYYY format';
      } else {
        // Additional validation to check if it's a valid date
        const [month, day, year] = formData.dob.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
          newErrors.dob = 'Please enter a valid date';
        }
      }
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.patientId.trim()) {
      newErrors.patientId = 'Patient ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Format the data
    const patientData = {
      ...formData,
      id: formData.patientId,
      dob: formData.dob, // Already in MM/DD/YYYY format
      // Set default empty values for other fields
      phone: '',
      email: '',
      address: '',
      allergies: [],
      medicalHistory: [],
      currentMedications: [],
      surgicalHistory: [],
      hospitalAdmissions: [],
      labResults: [],
      referralInformation: '',
      mrn: (Math.floor(Math.random() * 900000) + 100000).toString()
    };

    onAdd(patientData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add New Patient</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Patient Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`input ${errors.fullName ? 'error' : ''}`}
              placeholder="Enter full patient name"
            />
            {errors.fullName && <div className="error-text">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth *</label>
            <input
              type="text"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`input ${errors.dob ? 'error' : ''}`}
              placeholder="MM/DD/YYYY"
              pattern="^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$"
              title="Please enter date in MM/DD/YYYY format"
            />
            {errors.dob && <div className="error-text">{errors.dob}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">EMPI *</label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className={`input ${errors.patientId ? 'error' : ''}`}
              placeholder="Enter patient ID"
            />
            {errors.patientId && <div className="error-text">{errors.patientId}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`input ${errors.gender ? 'error' : ''}`}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <div className="error-text">{errors.gender}</div>}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
