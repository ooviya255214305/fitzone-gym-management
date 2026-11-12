# FitZone — Premium Gym Management System 🏋️‍♂️🔥

A complete, modern, and professional **FitZone Gym Management System** web application built with HTML5, CSS3, and JavaScript. Designed with a dark obsidian background, high-voltage red accent glows, dynamic analytics, and complete LocalStorage CRUD operations.

![FitZone Preview](assets/logo.svg)

---

## 🌟 Key Features

### 1. 📊 Executive Dashboard
- **Real-Time KPI Counters**: Total Members, Active Members, Expired Memberships, Monthly Revenue ($), and Today's Check-ins.
- **Dynamic Chart.js Visualizations**:
  - Trailing 6-month Revenue Trajectory line chart with gradient fill.
  - Active Membership Tiers Distribution doughnut chart.
- **Recent Registrations**: Instant feed of newly enrolled athletes with plan badges and assigned coaches.
- **Live Floor Activity Stream**: Live ticker of gym arrivals, check-in timestamps, and active floor occupancy counter.

### 2. 👥 Member Management
- **Add New Members**: Comprehensive modal form with validation (Name, Email, Phone, Gender, Age, Emergency Contact, Plan, Coach, Workout Routine, Start Date).
- **Auto-Calculated Expirations**: Membership end dates calculate automatically based on plan duration.
- **Automatic Invoice Generation**: Automatically creates a matching payment record upon new enrollment.
- **View Member Details & VIP Gym Pass**: 360° modal profile with luxury biometric barcode pass, assigned routine split, and full payment ledger.
- **Edit Member Information**: Update athlete records in real-time.
- **Delete Members**: Complete deletion with cascading cleanup.
- **Real-Time Search & Multi-Filter**: Filter by name, email, phone, member ID (`FZ-xxx`), membership plan, or active/expired status.
- **Export to CSV**: Instant one-click CSV export of the member directory.

### 3. 💳 Membership Management
- **Tier Packages**: Monthly Starter ($49), Quarterly Pro ($129), Half-Year Elite ($239), and Annual VIP Athlete ($449).
- **Active Subscriber Tracking**: Live count of active subscribers per tier.
- **Subscriptions & Expiry Monitor**: Table tracking start dates, expiry dates, remaining days countdown, and warning badges.
- **1-Click Membership Renewal**: Extends validity from current end date and logs a renewal payment.

### 4. 🏋️ Trainer Management
- **Certified Coach Profiles**: Detailed trainer cards with specializations (Hypertrophy, CrossFit, Powerlifting, Yoga/Mobility), star ratings, and experience.
- **Add / Edit / Delete Coaches**: Full CRUD management of coaching personnel.
- **Coach Trainees Allocation**: View all members assigned to each personal trainer.

### 5. ⏱️ Attendance Management
- **Daily Attendance Access Control**: Mark floor entries with member selector, timestamp, and status (Present, Late, Excused).
- **Active Floor Workout Tracker**: Displays which athletes are currently on the floor with live status indicators.
- **1-Click Check-Out**: Records workout departure time and closes the training session.
- **Date Filter**: Review attendance records for any selected date.
- **Floor Occupancy Telemetry**: Live metrics of total check-ins, currently training, and completed sessions.

### 6. 💰 Payment Management
- **Transaction Ledger**: Track invoice ID, member name, plan, payment method (Credit Card, Debit Card, UPI, Cash, Bank Transfer), amount, and status.
- **Financial Metrics**: Total revenue collected, pending payments, and transaction volume.
- **Mark as Paid**: One-click settlement of pending invoices.
- **Printable Official Receipt**: Generate and print official branded payment receipts.

### 7. 📋 Custom Workout Plans
- **Create Routine Splits**: Configure custom regimens with goal targeting, difficulty level, duration, and day-by-day routines (Monday to Saturday).
- **Assign to Athletes**: One-click assignment of workout routines to any gym member.
- **View Routine Breakdown**: Complete day-by-day breakdown with exercise lists, sets, and rep prescriptions.

---

## 📁 Project Structure

```text
FitZone/
├── index.html            # Main Single-Page Application (SPA) dashboard
├── css/
│   └── style.css         # Obsidian dark theme with red accent styling
├── js/
│   └── script.js         # Core application logic, LocalStorage state & CRUD
├── assets/
│   ├── logo.svg          # FitZone brand mark SVG
│   └── icon.svg          # FitZone shield favicon / icon
├── vercel.json           # Optional Vercel deployment configuration
└── README.md             # Project documentation
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Open
Simply open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

### Option 2: Using VS Code Live Server
1. Open the `FitZone` directory in Visual Studio Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Using Python HTTP Server
Open your terminal inside the `FitZone` folder and run:
```bash
# Python 3.x
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🌐 Deployment

### Deploy to Vercel
1. Install the Vercel CLI (or push to GitHub and import repository in Vercel):
   ```bash
   vercel
   ```
2. Accept the default settings — it is a static website and will deploy in seconds!

### Deploy to GitHub Pages
1. Push this repository to GitHub.
2. Navigate to **Settings > Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch** and set branch to `main` / `root`.
4. Click **Save**.

---

## 🛡️ Data Persistence & Reset
- All data is persisted in the browser's `localStorage` under `fitzone_gym_db_v2`.
- Initial realistic sample data is loaded automatically on first launch.
- You can reset back to pristine demo data at any time by clicking **"Reset Demo Data"** in the sidebar.
- You can export a full database backup anytime via **"Backup JSON"** in the sidebar.

---

## 🎨 Design System
- **Background**: Deep Obsidian Black (`#08080a`, `#0e0f14`, `#14151c`)
- **Accent Red**: Crimson / Neon Red (`#ff2a44`, `#b80d23`, glow `rgba(255, 42, 68, 0.35)`)
- **Typography**: `Plus Jakarta Sans`, `Montserrat`, `Teko` (Google Fonts)
- **Icons**: Font Awesome 6 Free
- **Charts**: Chart.js 4.x
