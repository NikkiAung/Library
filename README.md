Sure! Here’s the plain text version of the generated README file for easy copy and paste:

---

# Library Project

This is a library management system built using React and Firebase. The application allows users to upload and retrieve book covers from Firebase Storage while storing metadata in Firestore. It also enables users to manage and track library items efficiently. The project emphasizes authentication, Firebase integration, and a smooth user interface.

## Features

- **Book Cover Upload**: Upload and store book covers in Firebase Storage.
- **Library Management**: Add, view, and delete books from the library.
- **Firebase Authentication**: Secure authentication for user management.
- **Firestore Integration**: Book metadata such as title, author, and description are stored and managed in Firestore.
- **Responsive Design**: Mobile-friendly design for better user experience.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Other Tools**: Git, GitHub, VS Code

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/NikkiAung/Library.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Library
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your Firebase credentials:

   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## Firebase Configuration

Ensure that your Firebase project is properly set up:

1. **Firebase Authentication**: Enable authentication providers such as Email/Password or Google.
2. **Firestore Database**: Set up a Firestore database to store book data.
3. **Firebase Storage**: Ensure you have sufficient permissions for storing book covers. If you encounter permission issues, review your Firebase Storage rules.

## Issues and Debugging

### Firebase Storage Permission Error

If you encounter the error `FirebaseError: User does not have permission to access`, please check your Firebase Storage rules and ensure that the currently authenticated user has the appropriate access rights.

Example of permissive storage rules:

```javascript
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Contribution

Contributions are welcome! To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, feel free to reach out via [GitHub Issues](https://github.com/NikkiAung/Library/issues).
