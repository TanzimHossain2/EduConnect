# EduConnect

EduConnect is a robust Learning Management System (LMS) designed to facilitate seamless course management and learning experiences. This platform allows students to enroll in courses while providing instructors with powerful tools to create and manage course content. Built on the Next.js framework with Tailwind CSS for styling, EduConnect leverages Next.js server actions and API routes for backend operations, with MongoDB as the underlying database.

## System Architecture

The `diagrams` directory contains the architectural diagram of EduConnect, available in `.drawio` format and exported as a `.webp` image.

![System Architecture](diagrams/img/EduConnect.webp)

## Table of Contents

- [Key Features](#key-features)
  - [Course Management](#course-management)
  - [User Authentication & Profiles](#user-authentication--profiles)
  - [Instructor Tools](#instructor-tools)
  - [Content Delivery](#content-delivery)
  - [Additional Features](#additional-features)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [Upcoming Features](#upcoming-features)

## Key Features

EduConnect offers a comprehensive set of features catering to both students and instructors:

### Course Management

- **Browse Courses:** View all available courses.
- **Category Filtering:** Explore courses by specific categories.
- **Course Details:** Access detailed information on each course, including modules and lessons.
- **Instructor Profiles:** Learn about the course instructors.

### User Authentication & Profiles

- **User Registration:** Sign up as a student or instructor.
- **User Login:** Secure login for both students and instructors.
- **Profile Management:** View, update, and manage personal profiles.
- **Profile Picture Update:** Upload and change profile pictures.

### Instructor Tools

- **Dashboard:** Access an instructor-specific dashboard for course management.
- **Course Creation:** Create new courses with ease.
- **Course Updates:** Modify existing course content.
- **Course Reviews & Ratings:** Manage course feedback and ratings.
- **Analytics:** View course analytics graphs and statistics.

### Content Delivery

- **Module Management:** Full CRUD (Create, Read, Update, Delete) operations for course modules.
- **Lesson Management:** Manage lessons with CRUD functionality.
- **Lesson Pages:** Dedicated pages for each lesson, featuring a video player.
- **Drag-and-Drop Interface:** Easily organize lessons using drag-and-drop.
- **Quiz Management:** Create and manage quizzes for courses.

### Additional Features

- **Testimonial Management:** Full CRUD operations for course testimonials.
- **Testimonial Display:** View testimonials associated with specific courses.
- **Advanced Search:** Search for courses using various filters, including category, price, rating, and more.

## Technology Stack

EduConnect is built using a modern technology stack:

- **Next.js**: Framework for both frontend and backend.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **MongoDB**: NoSQL database for storing course and user data.
- **Cloudinary**: Cloud-based image storage solution.
- **Auth.js**: Authentication library for secure login and registration.
- **hello-pangea/dnd**: Drag-and-drop functionality for lesson management.
- **react-player**: Video player component for lesson content.

## Installation & Setup

To deploy EduConnect locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/TanzimHossain2/EduConnect.git
   ```

2. Navigate into the project directory:

   ```bash
   cd EduConnect
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

EduConnect should now be up and running on your local environment.

## Upcoming Features

EduConnect is continuously evolving, with several features planned for future releases:

- **Discussion Forums:** Interactive forums for course-related discussions.
- **Live Sessions:** Integration of live video sessions for courses.
- **Assignment Submission:** Submission and grading of course assignments.
- **Blog Posts:** Platform for sharing educational blog posts.
- **Chat Integration:** Real-time chat functionality for students and instructors.
- **Admin Panel:** Dedicated admin panel for managing users and courses.
- **Documentation:** Comprehensive documentation for developers and users.
- **Testing & Deployment:** Automated testing and deployment pipelines.
