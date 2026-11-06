# 🌍 Dynamic Travel Storyboard

**Plan your trips, organize your travel activities, and capture your travel memories in one place!**

Dynamic Travel Storyboard is a MERN Stack web application designed to make travel planning easier and more organized. Users can create trips, manage bookings, schedule activities, maintain travel journals, upload photos, and share their travel experiences.

## ✨ Features

- **User Authentication** – Register and log in securely.
- **Trip Management** – Create, view, update, and manage trips.
- **Booking Management** – Add and manage flight, train, bus, and hotel bookings.
- **Activity Planner** – Schedule and organize travel activities.
- **Travel Journal** – Save personal travel notes and memories.
- **Photo Gallery** – Upload and view trip photos.
- **Weather Forecast** – Check weather forecasts for travel destinations.
- **Travel Timeline** – View trip activities and events in chronological order.
- **Trip Sharing** – Generate public links to share trips with others.

## 🛠️ Technologies Used

**Frontend**
- React.js
- JavaScript
- HTML
- CSS
- Vite

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Other Tools & APIs**
- Axios
- Open-Meteo Weather API
- Multer
- JWT Authentication
- Git & GitHub

## 📁 Project Structure

```text
Dynamic-Travel-Storyboard/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
└── .gitignore
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/aaashuzzz73-glitch/Dynamic-Travel-Storyboard.git
```

### 2. Setup the Backend

```bash
cd Dynamic-Travel-Storyboard/server
npm install
```

Configure the backend environment variables, including your MongoDB connection and authentication secret, according to the server configuration.

Start the backend using the development script in `package.json`.

### 3. Setup the Frontend

Open another terminal:

```bash
cd Dynamic-Travel-Storyboard/client
npm install
```

Create a `.env` file inside the client folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

### 4. Open the Application

Visit:

```text
http://localhost:5173
```

## 🌦️ Weather API

Weather information is provided using the Open-Meteo API.

## 🎯 Project Objective

The main objective of this project is to provide a simple and organized platform for managing travel plans, bookings, activities, and memories in one application.

## 👩‍💻 Developer

**Ashtami S. Anil**

B.Sc. Computer Science | MERN Stack Developer

---

⭐ If you find this project interesting, feel free to explore the repository!
