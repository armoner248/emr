# Patient Management System

A modern React-based patient management application that allows healthcare professionals to manage patient records efficiently.

## Features

- **Patient List Management**: View and search through patient records
- **Patient Details**: Comprehensive patient information displayed in organized cards
- **Add New Patients**: Easy-to-use form for adding new patient records
- **Import/Export**: Import and export patient data in JSON format
- **Search Functionality**: Search patients by name, DOB, Patient ID, or MRN
- **Local Storage**: All data is stored locally in the browser
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Demo Data

The application comes pre-loaded with sample patient data including:

- Laura Hickle (03/29/1946)
- Chaya Lockman (02/27/1944)
- Test Ab (12/31/2020)

## Technologies Used

- React 18.2.0
- React Router DOM 6.3.0
- CSS3 with modern layout techniques
- Local Storage for data persistence

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download the project files
2. Navigate to the project directory:

   ```bash
   cd patient-management-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

## Deployment on Vercel

### Option 1: Deploy from GitHub

1. Push your code to a GitHub repository
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect it's a React app and configure build settings
5. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. In the project directory, run:

   ```bash
   vercel
   ```

3. Follow the prompts to deploy

### Option 3: Manual Upload

1. Build the project:

   ```bash
   npm run build
   ```

2. Upload the contents of the `build` folder to Vercel via their web interface

## Usage

### Managing Patients

1. **View Patient List**: The home page displays all patients with search functionality
2. **Search Patients**: Use the search bar to find patients by name, DOB, ID, or MRN
3. **Add New Patient**: Click "Add Patient" button and fill out the form
4. **View Patient Details**: Click on any patient from the list to view detailed information
5. **Remove Patient**: Click the "Remove" button next to any patient (confirmation required)

### Import/Export Data

- **Export**: Click "Export" to download current patient data as JSON
- **Import**: Click "Import" and select a JSON file to add patients to the system

### Data Format

Patient data is stored in the following format:

```json
{
  "id": "P-12346789",
  "mrn": "5751511204",
  "firstName": "Laura",
  "lastName": "Hickle",
  "fullName": "Hickle, Laura I.",
  "dob": "03/29/1946",
  "gender": "Female",
  "phone": "(555) 123-4567-1234",
  "email": "jane.doe@example.com",
  "address": "1234 Wellness Blvd, Healthytown, CA 90210",
  "allergies": ["Penicillin - Drug - Severity: Severe"],
  "medicalHistory": ["Asthma", "Hypertension"],
  "currentMedications": ["Lisinopril - 10mg - Once daily"],
  "surgicalHistory": ["Appendectomy - 2015-03-20 - Outcome: Successful"],
  "hospitalAdmissions": ["St. Health Hospital - 2023-06-25"],
  "labResults": ["Complete Blood Count: Normal (Date: 2024-12-01)"],
  "referralInformation": "Dr. Alex Karev - Referral for Chest X-Ray"
}
```

## File Structure

```
patient-management-app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── PatientList.js
│   │   ├── PatientList.css
│   │   ├── PatientDetail.js
│   │   ├── PatientDetail.css
│   │   └── AddPatientModal.js
│   ├── services/
│   │   └── patientService.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── vercel.json
└── README.md
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Local Storage

All patient data is stored in the browser's local storage. Data will persist between sessions but is specific to each browser/device. To backup data, use the export functionality.

## Security Note

This application is designed for demonstration purposes. In a production healthcare environment, ensure proper data encryption, user authentication, and HIPAA compliance measures are implemented.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
