# messenger #

This project is a private, 1-on-1 real-time messaging web application. It uses a decoupled architecture, featuring a RESTful API built with Django on the backend and a Single Page Application (SPA) built with React on the frontend.

## Requirements: ##

### Backend: ###
- Python 3.14.0
- Django

### Frontend: ###
- Node.js
- npm
- React (Vite)
- react-bootstrap
- axios
- react-router-dom

## Functionality: ##

### Authentication: ###
You must register an account and log in to use the application. The system uses session cookies for secure authentication. Only authenticated users can access the chat interface and API endpoints.

### Chatting: ###
Once logged in, you will see a list of all registered users on the left sidebar. Selecting a user opens a private chat window. The application automatically polls the server every 5 seconds to fetch and display incoming messages in real time, without refreshing the page.

### Message History: ###
To optimize performance, the database history is paginated. The chat window fetches messages in chunks of 10. You can click the "Load more" button at the top of the chat to dynamically retrieve older messages from the database.

## How to run: ##

### Server (Backend): ###
1. Navigate to the `backend` folder.
2. Install dependencies: `pip install -r requirements.txt`
3. Create migrations: `python manage.py makemigrations`
4. Apply migrations: `python manage.py migrate`
5. Run server: `python manage.py runserver`

### Client (Frontend): ###
1. Open a new terminal and navigate to the `frontend` folder.
2. Install dependencies: `npm install`
3. Run the app: `npm run dev`