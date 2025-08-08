import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import patientService from '../services/patientService';
import './PatientDetail.css';

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentMrn, setCurrentMrn] = useState('');

  const generateNewMrn = () => {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000; // Generate 6-digit number
    setCurrentMrn(randomNumber.toString());
  };

  useEffect(() => {
    const patientData = patientService.getPatientById(id);
    setPatient(patientData);
    if (patientData) {
      setCurrentMrn(patientData.mrn);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="patient-detail-container">
        <div className="loading">Loading patient information...</div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="patient-detail-container">
        <div className="not-found">
          <h2>Patient Not Found</h2>
          <p>The patient you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Back to Patient List
          </Link>
        </div>
      </div>
    );
  }

  const InfoCard = ({ title, children, className = '' }) => (
    <div className={`card info-card ${className}`}>
      <h3 className="card-title">{title}</h3>
      <div className="card-content">{children}</div>
    </div>
  );

  const InfoList = ({ items, emptyMessage = 'No information available' }) => (
    <div className="info-list">
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <div key={index} className="info-item">
            {item}
          </div>
        ))
      ) : (
        <div className="empty-message">{emptyMessage}</div>
      )}
    </div>
  );

  return (
    <div className="patient-detail-container">
      <Link to="/" className="close-button">
        ✕
      </Link>

      <div className="patient-detail-content">
        <div className="patient-detail-header">
          <div className="patient-header-info">
            <h1 className="patient-name">{patient.fullName}</h1>
            <div className="patient-meta">
              <span className="patient-dob">DOB: {patient.dob}</span>
              <span className="patient-gender">Gender: {patient.gender}</span>
              <div className="patient-ids">
                <span className="badge patient-id-badge">PATIENT ID: {patient.id}</span>
                <span className="badge mrn-badge">MRN: {currentMrn}</span>
                <button 
                  className="btn btn-secondary change-mrn-btn" 
                  onClick={generateNewMrn}
                  title="Generate new MRN"
                >
                  Change MRN
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="patient-details-grid">
          <InfoCard title="Contact Information">
            <div className="contact-info">
              <div className="contact-item">
                <strong>Phone:</strong> {patient.phone || 'Not provided'}
              </div>
              <div className="contact-item">
                <strong>Email:</strong> {patient.email || 'Not provided'}
              </div>
              <div className="contact-item">
                <strong>Address:</strong> {patient.address || 'Not provided'}
              </div>
            </div>
          </InfoCard>

          <InfoCard title="Allergies">
            <InfoList items={patient.allergies} emptyMessage="No known allergies" />
          </InfoCard>

          <InfoCard title="Medical History">
            <InfoList items={patient.medicalHistory} emptyMessage="No medical history recorded" />
          </InfoCard>

          <InfoCard title="Current Medications">
            <InfoList items={patient.currentMedications} emptyMessage="No current medications" />
          </InfoCard>

          <InfoCard title="Surgical History">
            <InfoList items={patient.surgicalHistory} emptyMessage="No surgical history" />
          </InfoCard>

          <InfoCard title="Hospital Admissions">
            <InfoList items={patient.hospitalAdmissions} emptyMessage="No hospital admissions" />
          </InfoCard>

          <InfoCard title="Lab Results">
            <InfoList items={patient.labResults} emptyMessage="No lab results available" />
          </InfoCard>

          <InfoCard title="Referral Information">
            <div className="referral-info">{patient.referralInformation || 'No referral information'}</div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
