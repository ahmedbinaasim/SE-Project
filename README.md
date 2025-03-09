# 📚 AI-Powered Study Notes Organizer

**A web application that allows students to upload, categorize, search, and summarize their notes using AI.**

---

## 📝 Project Overview

The **AI-Powered Study Notes Organizer** is designed to help students and researchers manage their study materials more effectively. With features like note uploading (PDF, DOCX, TXT), AI-driven summarization, OCR for scanned documents, and collaboration tools, this platform aims to streamline the learning process.

---

## 🚀 Tech Stack

- **Frontend**:  
  - [Next.js](https://nextjs.org/) (React framework)  
  - [TypeScript](https://www.typescriptlang.org/)  
  - [TailwindCSS](https://tailwindcss.com/)  

- **Backend**:  
  - [Node.js](https://nodejs.org/)  
  - [Express.js](https://expressjs.com/)  
  - [CORS](https://www.npmjs.com/package/cors)  
  - [MongoDB](https://www.mongodb.com/)  
  - [Mongoose](https://mongoosejs.com/)  

- **Deployment**:  
  - **Frontend** on [Vercel](https://vercel.com/)  
  - **Backend** on Localhost (or any chosen hosting service)

---

## 📂 Project Structure

```
SE-PROJECT/
├── frontend/                  # Next.js with TypeScript & TailwindCSS
│   ├── .eslintrc.json         # Created by Next.js setup
│   ├── .gitignore             # Created by Next.js setup
│   ├── next.config.js         # Created by Next.js setup
│   ├── package.json           # Created by Next.js setup
│   ├── tsconfig.json          # Created by Next.js setup
│   ├── tailwind.config.ts     # Created by Next.js setup
│   ├── postcss.config.js      # Created by Next.js setup
│   ├── public/                # Created by Next.js setup
│   │   └── ...
│   └── src/                   # Created by Next.js setup (or "app" depending on your choice)
│       ├── app/               # Next.js 13+ App Router
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── globals.css
│       └── ...
│
├── backend/                   # Node.js with Express & MongoDB
│   ├── package.json           # Created by npm init
│   ├── tsconfig.json          # Created by tsc --init
│   └── src/                   # Main source directory
│       ├── models/            # Mongoose models
│       ├── controllers/       # Request handlers
│       ├── routes/            # API routes
│       ├── middleware/        # Custom middleware
│       ├── config/            # Configuration files
│       ├── utils/             # Utility functions
│       ├── services/          # Business logic
│       └── index.ts           # Will be the entry point (to be created)
│
└── README.md                  # Project documentation (to be created)
```

---

## ⚡ Core Features

1. **User Authentication**: Secure signup, login, and password reset.  
2. **Note Upload & Organization**: Upload notes (PDF, DOCX, TXT), categorize by subjects, tag for quick search.  
3. **AI Summarization**: Generate concise summaries of lengthy notes.  
4. **OCR**: Extract text from scanned documents or images.  
5. **Search & Filtering**: Quickly find notes by keywords, tags, or date.  
6. **Collaboration & Sharing**: Share notes, set permissions, receive notifications.  
7. **UI Customization**: Dark mode, dashboard layout, etc.  
8. **Security & Performance**: Encrypt notes, regular backups, role-based access.  

---

## ⚙️ Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/YourUsername/ai-notes-organizer.git
   cd ai-notes-organizer
   ```

2. **Install dependencies**  
   - **Client**  
     ```bash
     cd client
     npm install
     ```
   - **Server**  
     ```bash
     cd server
     npm install
     ```

3. **Environment Variables**  
   - Create a `.env` file in the **server** folder with your MongoDB URI, JWT secret, etc.

4. **Run the development servers**  
   - **Client**  
     ```bash
     cd client
     npm run dev
     ```
   - **Server**  
     ```bash
     cd server
     npm run start
     ```

5. **Open the app**  
   - Frontend should be running on `http://localhost:3000` (if using Next.js default port).  
   - Backend should be running on `http://localhost:5000` (or whichever port you configure).

---

## 📅 Sprints & Task Checklists

We’re following **Agile Scrum** with multiple sprints. Check off tasks as you complete them.

### **Sprint 1: Core Setup & Basic Functionality**

- [ ] **Project Setup & Repository**  
  - [ ] Initialize the repo with README and `.gitignore`  
  - [ ] Create basic directory structure (client/server)

- [ ] **User Authentication**  
  - [ ] Sign Up (Email, Password)  
  - [ ] Login & Session Management (JWT)  
  - [ ] Password Reset Functionality

- [ ] **Basic Note Upload**  
  - [ ] Set up file upload endpoint  
  - [ ] Integrate file upload on frontend (Next.js)  
  - [ ] Store file metadata in MongoDB

- [ ] **Database & Models**  
  - [ ] Create Mongoose models for Users and Notes  
  - [ ] Validate data (e.g., required fields)

- [ ] **Deployment**  
  - [ ] Deploy frontend to Vercel (initial test)  
  - [ ] Run backend locally for now

---

### **Sprint 2: Enhanced Features & Search**

- [ ] **Note Organization**  
  - [ ] Categorization by subject  
  - [ ] Tags and metadata storage  
  - [ ] Filtering options for retrieval

- [ ] **AI-Powered Summarization**  
  - [ ] Integrate OpenAI or another NLP model  
  - [ ] Generate summaries for uploaded notes  
  - [ ] Display summaries alongside full text

- [ ] **Search & Filtering**  
  - [ ] Implement keyword-based search  
  - [ ] Advanced filtering (date, subject, tags)

- [ ] **OCR for Scanned Notes**  
  - [ ] Integrate Tesseract.js for text extraction  
  - [ ] Process images & extract text into notes

---

### **Sprint 3: Collaboration & UI Enhancements**

- [ ] **User Collaboration Features**  
  - [ ] Share notes with other users  
  - [ ] Set permissions (read-only, edit)  
  - [ ] Notification system for updates

- [ ] **Dark Mode & UI Improvements**  
  - [ ] Add dark mode toggle  
  - [ ] Improve UI/UX for dashboard  
  - [ ] Implement drag-and-drop note management

- [ ] **Security & Performance**  
  - [ ] Implement encryption for stored notes  
  - [ ] Set up automatic database backups  
  - [ ] Optimize API performance

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch (`feature-xyz`)
3. Commit changes with clear messages
4. Submit a pull request

---

## 📜 License

This project is licensed under the MIT License.

---

## 📬 Contact

For any inquiries, reach out to us at: **i220949@nu.edu.pk**

---

Happy coding! 🚀
