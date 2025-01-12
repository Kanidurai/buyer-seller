# Seller Rating Application - Web Application README

## Overview
This is the frontend application for the Seller Rating System. The application allows users to log in, view and submit reviews for sellers. Users can filter the data by searching the seller's name and navigate between pages like Home, About, and Contact Us using a navbar. The app also features a login page, a table displaying ratings and reviews, and a modal for submitting new reviews.

## Technologies Used
- **React.js**: Frontend framework.
- **TypeScript**: Type-safe JavaScript for better maintainability.
- **Yarn**: Dependency management and task runner.
- **Material-UI (MUI)**: Component library for styling and UI components.
- **CSS**: For styling.
  
## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [Yarn](https://yarnpkg.com/) (version 1.22 or higher)

## Installation

### 1. Clone the repository
Clone the repository to your local machine:

```bash
git clone <repository_url>
cd seller-rating-web
```

### 2. Install dependencies
Run the following command to install all dependencies:

```bash
yarn install
```

### 3. Configure environment variables
Ensure you have the necessary `.env` variables set in the project the file under the src folder:

```bash
BE_PORT=4000
MONGODB_URI=mongodb://localhost:27017/seller
DB_NAME=seller
DB_USER=
DB_PASS=
```

This will be used to configure the API URL for the backend server.

### 4. Start the application
Once the dependencies are installed, you can start the application:

```bash
yarn start
```

This will start the development server and open the application in your browser at `http://localhost:3000`.

## Application Flow

### 1. **Login Page**
- The login page contains fields for username and password.
- The username field accepts email format (validation is applied).
- The password must have a minimum of 8 characters to enable the login button.
- After successful login, users are redirected to the Home page.

### 2. **Navbar**
The Navbar provides navigation to the following pages:
- **Home**: The main page where the list of reviews is displayed.
- **About**: Placeholder page for information about the application.
- **Contact Us**: Placeholder page for contact information.
- **Logout**: Logs the user out and redirects to the login page (`/`).

### 3. **Home Page**
- Displays a table containing the following columns: Name, Rating, and Review Comments.
- Users can search by the seller's name to filter reviews.

### 4. **Add Review Modal**
- The "Add Review" button opens a modal where users can input a new review.
  - Fields:
    - **Name**: Seller name.
    - **Rating**: Rating (numeric input).
    - **Review Comments**: Text input for the review.
- Upon submitting, the data is added to the table and saved in the backend.

### 5. **Footer**
- The footer contains the logo and the following links:
  - **Home**
  - **About**
  - **Contact Us**
  - Social Media links (to be updated)
  - Copyright information.

## File Structure
The project follows a structured and modular approach:

```
/src
├── /components          # React components (Navbar, Footer, ReviewForm, etc.)
├── /pages               # Page components (Home, About, Contact)
├── /services            # API interaction logic
├── /types               # TypeScript types and interfaces
├── App.tsx              # Main app component
├── index.tsx            # React entry point
└── /assets              # Static assets (images, logos, etc.)
```

## API Integration
The app interacts with the backend using API requests to fetch and post reviews. The `api` object is defined as:

```ts
export var api = {
    "baseUrl": "http://localhost:4000"
}
```

Make sure the backend server is running at `http://localhost:4000` before you start the frontend.

## Development

### Running in Development Mode
To start the app in development mode:

```bash
yarn start
```

This will start the development server and automatically open the application in your browser.

### Running Tests
You can run the tests for the application using:

```bash
yarn test
```

### Building for Production
To create an optimized production build of the app:

```bash
yarn build
```

This will generate the build files in the `build` directory, ready for deployment.

## Troubleshooting

- **CORS issues**: If the backend API is not configured to handle requests from `http://localhost:3000`, you might run into CORS issues. Make sure to adjust the CORS settings in your backend to allow requests from the frontend.
  
- **API Errors**: If you're encountering API errors, ensure that the backend is running correctly and the API base URL is correctly set in your `.env` file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.