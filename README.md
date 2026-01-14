# FixIt – Local Worker Booking Platform

A full-stack web application that connects customers with local service providers like plumbers, electricians, cleaners, painters, and more — for on-demand home services.

Built with React, Node.js, MongoDB, Cloudinary, and payment integration (Razorpay/Stripe).


## 🛠 Tech Stack

| Layer | Technology |
|------|-----------|
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (JSON Web Tokens) |
| **Image Upload** | Cloudinary |
| **Payments** | Razorpay & Stripe |
| **State Management** | React Context API |
| **Deployment Ready** | Vercel / Render / Railway |

## 📁 Project Structure


## 🔐 Environment Variables

### Frontend (`.env` in `frontend/`)
```env
VITE_BACKEND_URL=http://localhost:4000
```
## Backend (.env in backend/)

- PORT=4000
- MONGO_URL=your_mongodb_connection_string_here
- JWT_SECRET=your_jwt_secret_key_here
- CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
- CLOUDINARY_API_KEY=your_cloudinary_api_key
- CLOUDINARY_API_SECRET=your_cloudinary_api_secret
- STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXX
- RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXX
- RAZORPAY_KEY_SECRET=your_razorpay_secret_key
- ADMIN_EMAIL=admin@example.com
- ADMIN_PASSWORD=adminpass123

🔑 Get your free keys from:
- MongoDB Atlas
- Cloudinary
- Stripe Dashboard
- Razorpay Dashboard

## ▶️ How to Run the Project

### Step 1: Install Dependencies
In backend/ folder:
```
cd backend
npm install
```
In frontend/ folder:
```
cd frontend
npm install
```
### Step 2: Set Up .env Files
Create .env files as shown above in both folders.

### Step 3: Start the Servers
Terminal 1: Start Backend
```
cd backend
npm run server
```
Backend runs on: http://localhost:4000

Terminal 2: Start Frontend
```
cd frontend
npm run dev
```
Terminal 3: Start Frontend
```
cd admin
npm run dev
```

### Step 4: Access the App


| Role | URL |
|------|-----------|
| **Customer Home Page** | http://localhost:5173 |
| **Worker Login** | http://localhost:5173/worker-login |
| **Admin Panel** | http://localhost:5173/admin |
| **Add New Worker** | http://localhost:5173/admin/add-worker |


## 🚀 Future Scope
Add real-time chat between customer and worker
Implement reviews and ratings
Enable location-based search
Add push notifications via email/SMS
Support multi-language and dark mode

## 📄 License
This project is open source and available for educational use.


---

## ✅ How to Add This to Your Project

1. Create a new file in your main project folder (`fixit-project/`) called `README.md`
2. Paste the entire content above
3. Save it
4. Commit and push to GitHub:
```bash
git add README.md
git commit -m "Add README with setup instructions"
git push
```





  





