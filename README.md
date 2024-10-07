# RTSP Streaming Application

This application allows users to stream RTSP video feeds and manage overlays in real time. The frontend is built with React, while the backend uses Flask to handle API requests and manage data.

## Features

- **RTSP Stream**: Input an RTSP URL to start streaming video.
- **Overlay Management**: Create, read, and manage overlays that can be displayed on the video stream.
- **HLS Output**: The RTSP stream is converted to HLS for easy playback in modern browsers.
- **MongoDB Integration**: Overlay data is stored in a MongoDB database.

## Technologies Used

- **Frontend**: React
- **Backend**: Flask
- **Database**: MongoDB
- **Video Processing**: FFmpeg for converting RTSP to HLS
- **Styles**: CSS

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (for React)
- [Python 3.x](https://www.python.org/downloads/) (for Flask)
- [MongoDB](https://www.mongodb.com/try/download/community) (for the database)
- [FFmpeg](https://ffmpeg.org/download.html) (for video processing)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/harshikagoyal14/RTSP-Streaming.git
   cd RTSP-Streaming
2. **Set up the backend**:

    Navigate to the backend directory:

   ```bash
    cd backend
  
  Install the required Python packages

  Set up your MongoDB connection string in the app.py file.

Run the Flask application:  


    ```bash
    python app.py

    
2. **Set up the frontend**:

Navigate to the frontend directory:

    ```bash
    cd frontend


Install the required Node.js packages:

     ```bash
    npm install

 Start the React application:   

      ```bash
    npm start


## Usage
- Open your browser and go to http://localhost:3000 to access the React application.
- Enter the RTSP URL in the input field and click "Start Stream" to begin streaming.
- Manage overlays using the provided form to create and display custom overlays on the video stream.


## API Documentation
- Refer to the API Documentation for detailed information about the CRUD endpoints and how to interact with the backend.
    

    








