# Patients Frontend

This project is the frontend for the Patients application. Follow the instructions below to set up and run the project.
For the backend part of this project, please refer to the [Patients Backend repository](https://github.com/rafaschol/patients-backend).

## Implementation Notes

- **IMPORTANT - about the usage of Docker:** I didn't include Dockerfile and docker-compose.yml files. The reason is, I configured the Docker files correctly with all three containers (DB, backend, and frontend) running. However, I had an error with the backend's connection to the DB. After debugging it for a while without success, and given the limited time I had, I decided to discard using Docker and instead wrote detailed instructions on how to set up the required projects manually.
- The project uses React and TypeScript, and it was created using Vite.
- Context API is used for managing the state.
- The project is styled using Tailwind CSS.
- React Router is used for client-side routing.
- Cloudinary is used to upload the images.
- Errors are handled appropriately displaying some UI feedback or toasts depending the case.

## Setup Instructions

Follow these steps to set up the project on your local machine:

### Prerequisites

- Setting up the backend by following the instructions in the [Patients Backend repository](https://github.com/rafaschol/patients-backend).
- Having a Cloudinary account, and a Cloud Name and an Upload Preset for uploading images.
For testing purposes, a Cloud Name and an Upload Preset are already included in the `.env.example` file.

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/rafaschol/patients-frontend.git
    cd patients-frontend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Create a `.env` file:**
    Create a `.env` file in the root directory and add the necessary environment variables. Refer to `.env.example` for the required variables.

4. **Run the development server:**
    ```sh
    npm start
    ```
