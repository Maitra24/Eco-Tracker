# 🌿 Eco-Tracker: Sustainable Digital Footprint Monitor

![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Eco-Tracker** is a premium, data-driven SaaS dashboard designed to help users monitor, understand, and neutralize their digital carbon footprint. Built with a sleek modern aesthetic, it transforms abstract environmental data into actionable insights.

---

## ✨ Key Features

### 📊 Advanced Analytics Dashboard
*   **Real-time Carbon Calculation**: Instantly see your CO2e footprint based on emails, streaming, and cloud storage.
*   **Carbon Breakdown**: Interactive donut charts and category-specific metrics.
*   **Sparkline Visuals**: Track trends over time with animated metric cards.

### 🏆 Gamified Goals & Challenges
*   **Personalized Eco-Goals**: Challenges like "Digital Minimalism" and "Streaming Diet" to reduce impact.
*   **Interactive Progress Tracking**: Real-time progress bars synced with user activity.
*   **Leaderboard**: Compare your ranking with the global community (Top 12% status).

### 👥 Global Community
*   **Social Feed**: Share achievements and sustainability tips with other "Eco Guardians."
*   **Reputation System**: Earn reputation points and "Master Neutralizer" status.
*   **Live Metrics**: Tracking community-wide impact (e.g., 5.2t carbon saved).

### 🌓 Premium UI/UX
*   **Dynamic Theme Engine**: Seamlessly switch between a deep "Carbon" Dark Mode and a high-contrast Light Mode.
*   **Glassmorphism Design**: Modern, transparent UI elements with high-end blurred backgrounds.
*   **Responsive Layout**: Optimized for high-resolution deskop monitoring.

---

## 🚀 Tech Stack

- **Frontend**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Persistence**: Custom LocalStorage-based Database Service

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Eco-Tracker.git
   cd Eco-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
├── components/     # UI Components (Dashboard, Navbar, Goals, Community)
├── hooks/          # Custom hooks (Carbon Calculator logic)
├── services/       # Mock Database & Persistence layer
├── utils/          # Style utilities & Helpers
├── types/          # TypeScript interfaces
└── App.tsx         # Main entry point & Routing
```

---

## 🌍 Impact Calculation Logic

Our calculator uses standardized environmental coefficients:
- **Emails**: Approx. 4g CO2e per email.
- **Streaming**: Scaled from 20g (SD) to 70g (4K/Ultra) per hour.
- **Cloud Storage**: Approx. 200g CO2e per GB year.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with 🌱 for a greener internet.**
