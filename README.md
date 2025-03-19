# Task Management Application

## Links
- **Client:** [Task Management Client](https://client-task-management.vercel.app/)
- **Server:** [Task Management API](https://api-task-management.vercel.app/)
- **GitHub Repo:** [GitHub Repository](https://github.com/sarojbist/task-management)

## Overview
In this assignment, I have created a complete Task Management application using the MERN Stack. This application enables users to add tasks, update tasks, and delete tasks.

---
## Backend Stack
The backend is built with:
- **Node.js** as the runtime environment
- **Express.js** for creating RESTful APIs
- **MongoDB** for data storage
- **Mongoose** for schema modeling and database interaction

### Authentication & Authorization
- The server generates a **JWT token** when a user logs in for authentication.
- Middleware is implemented to protect routes from unauthorized access of the protected routes.

### API Routes

The list of routes I have created is as follows:

- **/register** - Allows users to register with email, name, and password.
- **/login** - Allows users to log in with email and password. When a user logs in, they receive a token and user information, which can be stored in a global state to access other routes or display user-specific details anywhere in the application.
- **/add-task** - Lets users add a new task.
- **/get-tasks** - Shows tasks based on the user query. Users can specify how many tasks they want to see and the page number.
  - This route also supports filtering based on status (**Pending, InProgress, Completed**).
  - Example: **/get-tasks?page=1&limit=5&status=Pending**
- **/get-task/:id** - Retrieves a single task based on its ID.
- **/update-task/:id** - Lets users update a task based on the provided ID.
- **/delete-task/:id** - Deletes a task based on the provided ID.

---
## Frontend Stack
The frontend is built using:
- **Vite** for project setup
- **React Router DOM** for routing
- **Tailwind CSS** for styling
- **React Hook Form** for form handling
- **Zod** for form validation
- **Zustand** for global state management

### Features
- **Authentication:** Login and Register pages
- **Task Management:** Users can add, edit, and delete tasks
- **Pagination & Filtering:** Users can paginate tasks and filter them by status (**Pending, InProgress, Completed**)
- **Drag & Drop:** 
Users can drag the cards on frontend, I have used ello-pangea/dnd library for it. It is substitute of react-beautiful-dnd as it is no longer supported in React 19. However, dropping functionality is not working for now. I will figure out the issue later.


---
## Deployment
Both the frontend and backend are deployed on **Vercel**:
- **Client:** [Task Management Client](https://client-task-management.vercel.app/)
- **Server:** [Task Management API](https://api-task-management.vercel.app/)
- **GitHub Repo:** [GitHub Repository](https://github.com/sarojbist/task-management)

---
