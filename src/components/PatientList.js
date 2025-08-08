import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import patientService from '../services/patientService';
import AddPatientModal from './AddPatientModal';
import './PatientList.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    const filtered = patientService.searchPatients(searchQuery);
    setFilteredPatients(filtered);
  }, [searchQuery, patients]);

  const loadPatients = () => {
    const allPatients = patientService.getAllPatients();
    setPatients(allPatients);
  };

  const handleAddPatient = (patientData) => {
    patientService.addPatient(patientData);
    loadPatients();
    setShowAddModal(false);
  };

  const handleRemovePatient = (patientId) => {
    if (window.confirm('Are you sure you want to remove this patient?')) {
      patientService.deletePatient(patientId);
      loadPatients();
    }
  };

  const handleExport = () => {
    patientService.exportPatients();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      patientService
        .importPatients(file)
        .then((count) => {
          alert(`Successfully imported ${count} new patients`);
          loadPatients();
        })
        .catch((error) => {
          alert(`Import failed: ${error.message}`);
        });
      event.target.value = '';
    }
  };

  return (
    <div className="container">
      <div className="patient-list-header">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search for a patient"
            className="input search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="actions-section">
          <div className="flex flex-gap">
            <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} id="import-file" />
            <label htmlFor="import-file" className="btn btn-secondary">
              Import
            </label>
            <button onClick={handleExport} className="btn btn-secondary">
              Export
            </button>
            <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
              Add Patient
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="patient-list-title">
          <h2>
            Patient List <span className="patient-count">{filteredPatients.length}</span>
          </h2>
        </div>

        <div className="patient-list">
          {filteredPatients.length === 0 ? (
            <div className="no-patients">
              {searchQuery ? 'No patients found matching your search.' : 'No patients available.'}
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div key={patient.id} className="patient-item">
                <Link to={`/patient/${patient.id}`} className="patient-link">
                  <div className="patient-info">
                    <div className="patient-name">{patient.name}</div>
                    <div className="patient-details">
                      <span className="patient-dob">DOB: {patient.dob}</span>
                      {patient.id && patient.id !== patient.mrn && <span className="patient-id"> : {patient.id}</span>}
                    </div>
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemovePatient(patient.id);
                  }}
                  className="btn btn-danger remove-btn"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {showAddModal && <AddPatientModal onAdd={handleAddPatient} onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default PatientList;
