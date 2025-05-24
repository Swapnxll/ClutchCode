🎓 Clutch Code
A full-stack web platform to access and manage video lectures, featuring a built-in DSA sheet to enhance learning and track coding progress.

🚀 Tech Stack
Frontend: React.js

Backend: Express.js

Database: MongoDB

🔐 Key Features
JWT-based authentication with OTP verification

Role-based access with separate User and Admin dashboards

Secure video and image uploads using Multer and Cloudinary

Integrated Razorpay for seamless payment processing

Built-in DSA Sheet to practice Data Structures & Algorithms

How can we make videos more protective 
Proxying video via your backend is secure but less efficient.
It hides the real Cloudinary URL and allows tight access control, but adds latency and server load.

✅ Best for premium/private LMS content
❌ Not ideal for public/free content

🔁 Use signed URLs for general use
🔒 Use backend proxy for sensitive videos
💡 Combine both for optimal security and performance
