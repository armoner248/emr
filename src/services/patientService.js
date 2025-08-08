const STORAGE_KEY = 'patients';

// Sample patient data to initialize localStorage
const samplePatients = [
  {
    id: 'P-12346789',
    mrn: '5751511204',
    firstName: 'Laura',
    lastName: 'Hickle',
    fullName: 'Hickle, Laura I.',
    dob: '03/29/1946',
    gender: 'Female',
    phone: '(555) 123-4567-1234',
    email: 'jane.doe@example.com',
    address: '1234 Wellness Blvd, Healthytown, CA 90210',
    allergies: [
      'Penicillin - Drug - Severity: Severe',
      'Peanuts - Food - Severity: Moderate',
      'Dust - Environmental - Severity: Mild'
    ],
    medicalHistory: ['Asthma', 'Hypertension', 'Migraines'],
    currentMedications: ['Lisinopril - 10mg - Once daily', 'Albuterol - Inhaler - As needed'],
    surgicalHistory: [
      'Appendectomy - 2015-03-20 - Outcome: Successful',
      'Gallbladder Removal - 2019-11-05 - Outcome: Successful'
    ],
    hospitalAdmissions: ['St. Health Hospital - 2023-06-25 - Reason: Asthma Exacerbation'],
    labResults: [
      'Complete Blood Count: Normal (Date: 2024-12-01)',
      'Cholesterol: 200 mg/dL (Date: 2024-12-01)',
      'Blood Glucose: 95 mg/dL (Date: 2024-12-01)'
    ],
    referralInformation: 'Dr. Alex Karev - Referral for Chest X-Ray'
  },
  {
    id: 'M7806778761',
    mrn: '7806778761',
    firstName: 'Chaya',
    lastName: 'Lockman',
    fullName: 'Lockman, Chaya M.',
    dob: '02/27/1944',
    gender: 'Female',
    phone: '(555) 987-6543',
    email: 'chaya.lockman@example.com',
    address: '5678 Medical Ave, Wellness City, NY 10001',
    allergies: ['Sulfa drugs - Drug - Severity: Moderate'],
    medicalHistory: ['Diabetes Type 2', 'Osteoarthritis'],
    currentMedications: ['Metformin - 500mg - Twice daily', 'Ibuprofen - 200mg - As needed'],
    surgicalHistory: ['Knee Replacement - 2018-08-15 - Outcome: Successful'],
    hospitalAdmissions: [],
    labResults: ['HbA1c: 7.2% (Date: 2024-11-15)', 'Lipid Panel: Normal (Date: 2024-11-15)'],
    referralInformation: 'Dr. Miranda Bailey - Orthopedic consultation'
  },
  {
    id: 'P19174435',
    mrn: '19174435',
    firstName: 'Test',
    lastName: 'Ab',
    fullName: 'Ab, Test',
    dob: '12/31/2020',
    gender: 'Male',
    phone: '(555) 111-2222',
    email: 'test.ab@example.com',
    address: '999 Test Street, Demo City, CA 90210',
    allergies: ['No known allergies'],
    medicalHistory: ['Routine pediatric care'],
    currentMedications: ['Vitamin D supplements'],
    surgicalHistory: [],
    hospitalAdmissions: [],
    labResults: ['Routine blood work: Normal (Date: 2024-10-01)'],
    referralInformation: 'Dr. Arizona Robbins - Pediatric follow-up'
  }
];

class PatientService {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    const existingPatients = localStorage.getItem(STORAGE_KEY);
    if (!existingPatients) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePatients));
    }
  }

  getAllPatients() {
    const patients = localStorage.getItem(STORAGE_KEY);
    return patients ? JSON.parse(patients) : [];
  }

  getPatientById(id) {
    const patients = this.getAllPatients();
    return patients.find((patient) => patient.id === id);
  }

  addPatient(patient) {
    const patients = this.getAllPatients();
    const newPatient = {
      ...patient,
      id: this.generatePatientId(),
      mrn: this.generateMRN()
    };
    patients.push(newPatient);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    return newPatient;
  }

  updatePatient(id, updatedPatient) {
    const patients = this.getAllPatients();
    const index = patients.findIndex((patient) => patient.id === id);
    if (index !== -1) {
      patients[index] = { ...patients[index], ...updatedPatient };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
      return patients[index];
    }
    return null;
  }

  deletePatient(id) {
    const patients = this.getAllPatients();
    const filteredPatients = patients.filter((patient) => patient.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPatients));
    return true;
  }

  searchPatients(query) {
    const patients = this.getAllPatients();
    if (!query) return patients;

    const lowerQuery = query.toLowerCase();
    return patients.filter(
      (patient) =>
        patient.fullName.toLowerCase().includes(lowerQuery) ||
        patient.firstName.toLowerCase().includes(lowerQuery) ||
        patient.lastName.toLowerCase().includes(lowerQuery) ||
        patient.id.toLowerCase().includes(lowerQuery) ||
        patient.mrn.toLowerCase().includes(lowerQuery) ||
        patient.dob.includes(query)
    );
  }

  exportPatients() {
    const patients = this.getAllPatients();
    const dataStr = JSON.stringify(patients, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `patients_export_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  importPatients(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedPatients = JSON.parse(e.target.result);
          if (Array.isArray(importedPatients)) {
            // Merge with existing patients, avoiding duplicates
            const existingPatients = this.getAllPatients();
            const existingIds = new Set(existingPatients.map((p) => p.id));

            const newPatients = importedPatients.filter((p) => !existingIds.has(p.id));
            const allPatients = [...existingPatients, ...newPatients];

            localStorage.setItem(STORAGE_KEY, JSON.stringify(allPatients));
            resolve(newPatients.length);
          } else {
            reject(new Error('Invalid file format'));
          }
        } catch (error) {
          reject(new Error('Failed to parse JSON file'));
        }
      };
      reader.readAsText(file);
    });
  }

  generatePatientId() {
    return `P${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }

  generateMRN() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
  }
}

export default new PatientService();
