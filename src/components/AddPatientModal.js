import React, { useState } from 'react';

const AddPatientModal = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    allergies: '',
    medicalHistory: '',
    currentMedications: '',
    surgicalHistory: '',
    hospitalAdmissions: '',
    labResults: '',
    referralInformation: ''
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
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
      fullName: `${formData.lastName}, ${formData.firstName}`,
      dob: new Date(formData.dob).toLocaleDateString('en-US'),
      allergies: formData.allergies ? formData.allergies.split('\n').filter((a) => a.trim()) : [],
      medicalHistory: formData.medicalHistory ? formData.medicalHistory.split('\n').filter((h) => h.trim()) : [],
      currentMedications: formData.currentMedications
        ? formData.currentMedications.split('\n').filter((m) => m.trim())
        : [],
      surgicalHistory: formData.surgicalHistory ? formData.surgicalHistory.split('\n').filter((s) => s.trim()) : [],
      hospitalAdmissions: formData.hospitalAdmissions
        ? formData.hospitalAdmissions.split('\n').filter((h) => h.trim())
        : [],
      labResults: formData.labResults ? formData.labResults.split('\n').filter((l) => l.trim()) : []
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
            <label className="form-label">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`input ${errors.firstName ? 'error' : ''}`}
              placeholder="Enter first name"
            />
            {errors.firstName && <div className="error-text">{errors.firstName}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`input ${errors.lastName ? 'error' : ''}`}
              placeholder="Enter last name"
            />
            {errors.lastName && <div className="error-text">{errors.lastName}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`input ${errors.dob ? 'error' : ''}`}
            />
            {errors.dob && <div className="error-text">{errors.dob}</div>}
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

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input"
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="patient@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input"
              placeholder="123 Main St, City, State 12345"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Allergies (one per line)</label>
            <textarea
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="input"
              rows="3"
              placeholder="Penicillin - Drug - Severity: Severe"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Medical History (one per line)</label>
            <textarea
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleChange}
              className="input"
              rows="3"
              placeholder="Asthma"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Current Medications (one per line)</label>
            <textarea
              name="currentMedications"
              value={formData.currentMedications}
              onChange={handleChange}
              className="input"
              rows="3"
              placeholder="Lisinopril - 10mg - Once daily"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Referral Information</label>
            <input
              type="text"
              name="referralInformation"
              value={formData.referralInformation}
              onChange={handleChange}
              className="input"
              placeholder="Dr. Smith - Cardiology consultation"
            />
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
