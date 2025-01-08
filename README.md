# Interactive Profile Chatbot

A web-based chatbot that collects user information through an interactive conversation and generates a PDF profile summary.

## Features

- Interactive chat interface
- Collects user information step by step
- Generates downloadable PDF profile
- Responsive design
- Real-time chat-like experience

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- PDF Generation: PDFKit

## Installation

1. Clone the repository:
```bash
git clone <repository-url>

2. Install dependencies:
```bash
npm install

3. Start the server:
```bash
node src/server.js

The application will be available at `http://localhost:3000`

## Project Structure

├── public/ │ ├── index.html │ ├── styles.css │ └── script.js ├── src/ │ └── server.js ├── package.json └── README.md


## Usage

1. Open the application in your web browser
2. Answer the chatbot's questions:
   - Name
   - Date of Birth
   - Email Address
   - Phone Number
   - Occupation
3. A PDF profile will be automatically generated and downloaded

## Development

- The frontend code is in the `public` directory
- The backend server code is in `src/server.js`
- Static files are served from the `public` directory

## API Endpoints

- `POST /generate-pdf`: Generates a PDF from submitted user data

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

