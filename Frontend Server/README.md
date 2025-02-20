# **Excel Upload API & UI**

## **Project Overview**

This project consists of a **Next.js frontend** for uploading Excel files and an **Express.js backend** for processing and storing the data. The backend uses **Multer** for file uploads and **ExcelJS** for parsing Excel files. The processed data is logged to the console and returned to the frontend for display.

## **Tech Stack**

### **Frontend (Next.js)**

- **React.js & Next.js** – UI framework for building the frontend.
- **TypeScript** – Ensures type safety and better development experience.
- **Tailwind CSS** – Used for styling the UI components.

### **Backend (Express.js)**

- **Express.js** – Lightweight web framework for handling API requests.
- **TypeScript** – Used for static typing and maintainability.
- **Multer** – Middleware for handling file uploads.
- **ExcelJS** – Library used for reading and parsing Excel files.
- **MongoDB** – Stores processed Excel data in a structured format.
- **Mongoose** – ODM for defining schema and interacting with MongoDB.

---

## **Features**

### **Frontend Features (Next.js)**

- **File Upload UI** – Allows users to upload Excel files.
- **Data Display** – Shows parsed data from the uploaded file.
- **Error Handling** – Provides feedback for invalid file types or upload failures.

### **Backend Features (Express.js)**

- **File Upload API** – Accepts Excel files and processes them.
- **Excel Parsing** – Extracts data from the file using ExcelJS.
- **Database Storage** – Saves processed data in MongoDB.
- **Logging** – Displays extracted data in backend logs.
- **Data Retrieval** – Sends parsed data back to the frontend.

---

## **Installation & Setup**

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-repository.git
cd your-repository
```

### **2️⃣ Install Dependencies**

#### **Frontend (Next.js)**

```bash
cd frontend
npm install
```

#### **Backend (Express.js)**

```bash
cd backend
npm install
```

---

## **Usage**

### **Start the Backend (Express.js)**

```bash
cd backend
npm run dev  # Runs Express API in development mode
```

### **Start the Frontend (Next.js)**

```bash
cd frontend
npm run dev  # Runs Next.js frontend in development mode
```

### **Access the Application**

- **Frontend URL:** `http://localhost:3000`
- **Backend API URL:** `http://localhost:5000`

---

## **API Endpoints**

### **1️⃣ Hello World API**

- **Endpoint:** `GET /api/hello`
- **Description:** Simple API to verify the backend is working.
- **Response:**
  ```json
  {
    "message": "Hello, World! Backend is working!"
  }
  ```

### **2️⃣ Upload Excel File**

- **Endpoint:** `POST /api/upload`
- **Description:** Uploads and processes an Excel file.
- **Request (FormData):**
  ```json
  {
    "file": "your_excel_file.xlsx"
  }
  ```
- **Response:**
  ```json
  {
    "message": "File processed successfully",
    "result": {
      "data": [...parsedData],
      "uploadedAt": "2025-02-20T05:44:52.667Z"
    }
  }
  ```

---

## **Troubleshooting**

### ❌ **CORS Issues**

If the frontend fails to connect to the backend, enable CORS in `server.ts`:

```ts
import cors from 'cors';
app.use(cors());
```

### ❌ **File Upload Issues**

Ensure that `Multer` is properly set up in `uploads.routes.ts`:

```ts
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadExcelFile);
```

### ❌ **MongoDB Not Connecting**

Check your `.env` file for the correct MongoDB URI:

```
MONGO_URI=mongodb://localhost:27017/excel_upload
```

---

## **Future Enhancements**

- **Add Authentication** – Secure API endpoints.
- **Optimize Large File Handling** – Improve performance for bigger Excel files.
- **Implement Pagination** – Efficiently display large datasets.
- **Add Excel Validation** – Ensure valid formats before processing.

---

## **Contributing**

Contributions are welcome! Fork the repository, create a new branch, and submit a pull request.

---
