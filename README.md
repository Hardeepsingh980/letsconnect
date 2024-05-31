
# Lets Connect
[![MIT License](https://img.shields.io/github/license/Hardeepsingh980/letsconnect)](https://github.com/Hardeepsingh980/letsconnect/blob/master/LICENSE)
![coverage](https://img.shields.io/badge/coverage-80%25-yellowgreen)
![version](https://img.shields.io/badge/version-0.1.5-blue)
[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
![commits](https://img.shields.io/github/commit-activity/m/Hardeepsingh980/letsconnect)

## Introduction

Lets Connect is designed to help professionals and businesses display their availability to clients, facilitating better day management and reducing the need to field frequent calls. With Lets Connect, you can create a schedule calendar and display it directly on your website. This service is not just about scheduling— it enhances communication and management efficiency, allowing you to schedule fast, manage smartly, and communicate quickly.

## Demo Video
[![Demo](https://img.youtube.com/vi/zOSNSLVyzbU/0.jpg)](https://youtu.be/zOSNSLVyzbU)

## Features

- **Calendar Views**: Offers day and month calendar views to manage your schedule.
- **Availability Slots**: Add multiple availability slots at once.
- **Slot Visibility**: Easily view all your available and booked slots.
- **Calendar Sharing**: Share your calendar link or get a QR code for easy access.
- **Website Integration**: Embed your schedule directly into your website.
- **Enhanced Communication**: Integration with Google Meet and Google Calendar for seamless communication with customers.
- **Guided Tours**: A complete guided tour for instructions on how to use application using Shepherd for an interactive user experience.

## Technology Stack

- **Backend**: Django
- **Frontend**: React
- **Guided Tours**: Implemented using Shepherd for an interactive user experience.
- **Containerization**: Dockerized for easy deployment and scaling.

## Running the Application

Ensure you have Docker and Docker Compose installed on your system. Follow these steps to run Lets Connect using Docker:

1. **Clone the repository**
   ```bash
   git clone [Repository URL]
   cd [Project Folder]
   ```

2. **Start the Application**
   ```bash
   docker-compose up --build
   ```
   This command builds the Docker images if they haven't been built already and starts the containers. The React application will be accessible at `http://localhost:3000`, and the Django backend at `http://localhost:8000`.

## How to Contribute

We welcome contributions that improve the functionality and usability of Lets Connect. If you're interested in contributing, please follow these steps:

1. Fork the repository.
2. Create a new branch for each feature or improvement.
3. Submit a pull request with a clear description of the changes.

## License

Lets Connect is made available under the MIT License.

