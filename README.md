# 🐍 Occamy - Field Force Tracking & Sales Management Platform

<div align="center">

![Occamy Banner](https://img.shields.io/badge/Occamy-Field%20Tracker-10b981?style=for-the-badge)

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A comprehensive field force management solution for agricultural nutraceutical companies to track field officers, monitor sales activities, and gain actionable insights across rural India.**

[🚀 Live Demo](#demo) • [📖 Documentation](#features) • [🛠️ Installation](#installation) • [📊 Screenshots](#screenshots)

</div>

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [User Roles & Permissions](#-user-roles--permissions)
- [Detailed Feature Breakdown](#-detailed-feature-breakdown)
- [Technical Architecture](#-technical-architecture)
- [Technology Stack](#-technology-stack)
- [Installation & Setup](#-installation--setup)
- [Demo Credentials](#-demo-credentials)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)

---

## 🎯 Problem Statement

### The Challenge

Agricultural nutraceutical companies operating in rural India face significant operational challenges:

1. **Lack of Visibility**: No real-time visibility into field officer activities across vast geographical areas
2. **Manual Tracking**: Paper-based or fragmented tracking of meetings, sales, and sample distributions
3. **Scattered Data**: Farmer interactions, sales data, and attendance records stored in multiple disconnected systems
4. **No Geo-Verification**: Inability to verify if field officers actually visited claimed locations
5. **Delayed Reporting**: Sales and activity reports taking days to reach management
6. **Inventory Blindspots**: No tracking of sample distributions leading to inventory leakage
7. **Performance Opacity**: Difficult to measure individual field officer performance objectively
8. **Travel Expense Disputes**: No accurate method to track and verify travel distances for reimbursement

### Impact of These Problems

- 📉 **Revenue Loss**: Missed sales opportunities due to poor farmer engagement tracking
- ⏱️ **Wasted Time**: Hours spent on manual report compilation
- 💰 **Cost Overruns**: Unverified travel claims and sample wastage
- 📊 **Poor Decisions**: Lack of data-driven insights for territory planning
- 😤 **Low Morale**: Field officers frustrated with manual paperwork

---

## 💡 Our Solution

**Occamy** is a comprehensive field force tracking and sales management platform specifically designed for agricultural nutraceutical companies operating in rural India. Named after the mythical serpent that can grow or shrink as needed, Occamy adapts to organizations of any size while maintaining complete visibility into field operations.

### How Occamy Solves These Problems

| Problem | Occamy Solution |
|---------|-----------------|
| Lack of Visibility | Real-time GPS-enabled activity tracking dashboard |
| Manual Tracking | Digital logging of all meetings, sales, and samples with auto-timestamps |
| Scattered Data | Unified platform consolidating all field data |
| No Geo-Verification | Automatic GPS coordinate capture for every activity |
| Delayed Reporting | Instant data sync with live analytics dashboards |
| Inventory Blindspots | Complete sample distribution tracking with purpose classification |
| Performance Opacity | Individual performance metrics with comparative analytics |
| Travel Disputes | Odometer-based distance tracking with GPS verification |

### Key Value Propositions

- ✅ **100% Digital** - Zero paperwork for field officers
- ✅ **Real-Time Sync** - Instant visibility for management
- ✅ **GPS Verified** - All activities geo-tagged automatically
- ✅ **Mobile-First** - Designed for field use on any device
- ✅ **Offline Capable** - Works even in low-connectivity rural areas
- ✅ **Role-Based Access** - Secure, permission-based data access

---

## 🌟 Key Features

### 📱 For Field Officers & Distributors

| Feature | Description |
|---------|-------------|
| **Smart Check-In/Out** | GPS + Odometer based attendance with one tap |
| **Meeting Logger** | Quick logging of farmer/seller/influencer interactions |
| **Sample Tracker** | Record sample distributions with purpose tagging |
| **Sales Capture** | B2B and B2C order recording with product catalog |
| **Personal Dashboard** | View own statistics, recent activities, and targets |
| **Quick Actions** | One-tap access to log new meetings, samples, or sales |

### 👨‍💼 For Administrators

| Feature | Description |
|---------|-------------|
| **Executive Dashboard** | Bird's eye view of all field operations |
| **Team Performance** | Comparative analytics across all field officers |
| **Geographic Analytics** | State-wise and village-wise activity breakdown |
| **Sales Analytics** | B2B vs B2C distribution, revenue trends, product performance |
| **Meeting Analytics** | Farmer/Seller/Influencer engagement metrics |
| **Export Capabilities** | Download reports for offline analysis |
| **Date Range Filters** | Analyze data across custom time periods |
| **State Filters** | Drill down into specific geographic regions |

---

## 👥 User Roles & Permissions

Occamy implements a robust Role-Based Access Control (RBAC) system with three distinct user types:

### 1. 👨‍💼 Administrator (Admin)

**Purpose**: Strategic oversight and decision-making

**Capabilities**:
- View comprehensive dashboard with organization-wide metrics
- Access all team member activities and performance data
- Generate and export reports
- View geographic distribution of activities (state-wise, village-wise)
- Analyze sales trends (B2B vs B2C, product-wise, time-based)
- Monitor meeting categories (Farmers, Sellers, Influencers)
- Track sample distribution across the organization
- View team performance comparisons
- Access historical data and trends

**Dashboard Elements**:
- Total Meetings (with growth percentage)
- Farmers Contacted (with conversion rate)
- Total Sales Revenue (with growth trend)
- Total Distance Traveled by team
- Daily Activity Trend (Area Chart)
- Sales Distribution (Pie Chart - B2B vs B2C)
- Team Performance (Horizontal Bar Chart)
- Meeting Categories (Pie Chart)
- State-wise Activity Breakdown
- Village-wise Farmer Engagement

### 2. 🚜 Field Officer

**Purpose**: On-ground farmer/seller engagement and sales

**Capabilities**:
- Check-in/Check-out for daily attendance with GPS
- Log meetings with farmers, sellers, and influencers
- Record sample distributions with purpose tracking
- Capture sales orders (B2B and B2C)
- View personal dashboard with own statistics
- Track personal distance traveled
- View recent activities

**Dashboard Elements**:
- Welcome message with current date
- Check-in/Check-out button with live status
- Personal Stats (Meetings, Samples, Sales, Distance)
- Quick Action Cards (Log Meeting, Add Sample, Record Sale, View Attendance)
- Recent Meetings list
- Recent Sales list

### 3. 🏪 Distributor

**Purpose**: B2B sales and regional distribution management

**Capabilities**:
- All Field Officer capabilities
- Focus on B2B order management
- Regional distribution tracking
- Retailer relationship management

---

## 📋 Detailed Feature Breakdown

### 1. 🔐 Authentication System

A secure, role-based authentication system that manages user access across the platform.

**Features**:
- Email/Password based authentication
- Secure session management with localStorage
- Role-based redirection after login
- Persistent sessions across browser restarts
- Automatic logout functionality
- Protected route handling

**Demo Accounts**:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@occamy.com | admin123 |
| Field Officer | rajesh@occamy.com | field123 |
| Field Officer | priya@occamy.com | field123 |
| Distributor | suresh@occamy.com | dist123 |

### 2. 📍 GPS-Enabled Attendance System

A comprehensive attendance tracking system that captures location and travel data.

**Check-In Features**:
- One-tap check-in with GPS auto-capture
- Latitude/Longitude coordinates stored
- Odometer reading input (optional)
- Timestamp automatically recorded
- Visual confirmation of check-in status
- Live "Active" indicator during work hours

**Check-Out Features**:
- One-tap check-out with GPS capture
- Automatic distance calculation (from odometer difference)
- Duration calculation
- Status changed to "Completed"

**Attendance History**:
- Complete daily attendance log
- Date, check-in/out times displayed
- Distance traveled per day
- Odometer readings shown
- Status indicators (Active/Completed)
- Monthly statistics (Days logged, Total distance, Average distance/day)

**Admin View**:
- Organization-wide attendance overview
- Team travel distance aggregation
- Individual attendance drill-down

### 3. 👥 Meeting Management System

A flexible meeting logging system supporting different interaction types.

**Meeting Types**:

| Type | Description | Use Case |
|------|-------------|----------|
| **One-on-One** | Individual interaction | Personal farmer visits, key account meetings |
| **Group** | Multiple attendees | Village gatherings, farmer awareness camps |

**Meeting Categories**:

| Category | Icon | Description |
|----------|------|-------------|
| **Farmer** | 🌾 | Direct farmer interactions |
| **Seller** | 🏪 | Retail shop owners, distributors |
| **Influencer** | 📢 | Village heads, agricultural officers, veterinarians |

**Data Captured**:
- Meeting type (One-on-One / Group)
- Category (Farmer / Seller / Influencer)
- Person Name (for One-on-One)
- Contact Details (phone number)
- Village / Location
- GPS Coordinates (auto-captured)
- Attendee Count (for Group meetings)
- Business Potential Estimate (e.g., "10-50 kg")
- Notes / Follow-up items
- Photos (optional)
- Timestamp

**Meeting List View**:
- All meetings with visual category indicators
- Filter by category
- Color-coded category badges
- Quick access to meeting details
- Pagination for large datasets

### 4. 📦 Sample Distribution Tracking

Track every product sample given to farmers, sellers, or influencers.

**Why This Matters**:
- Samples represent significant inventory value
- Tracking helps measure ROI on sampling programs
- Enables follow-up for conversion tracking
- Prevents sample wastage and misuse

**Data Captured**:

| Field | Description |
|-------|-------------|
| Recipient Name | Who received the sample |
| Recipient Type | Farmer / Seller / Influencer |
| Product | Selected from product catalog |
| Quantity | Amount given |
| Unit | kg, g, packets, units |
| Purpose | Trial / Demo / Follow-up |
| Village | Location of distribution |
| GPS | Auto-captured coordinates |
| Notes | Additional context |

**Sample Purposes**:
- **Trial**: First-time sample for product testing
- **Demo**: Demonstration sample at events/camps
- **Follow-up**: Repeat sample for interested prospects

**Sample List View**:
- All distributions with product details
- Quantity and purpose badges
- Recipient information
- Timestamp and location

### 5. 💰 Sales Order Management

Comprehensive B2B and B2C order capture system with product catalog integration.

**Sale Modes**:

| Mode | Icon | Customer Types | Use Case |
|------|------|----------------|----------|
| **B2C** | 👨‍🌾 | Farmer, Small Dairy, Individual | Direct farmer sales |
| **B2B** | 🏪 | Distributor, Reseller, Retailer, Cooperative | Bulk/wholesale orders |

**Product Catalog**:

The system includes a built-in product catalog with:

| SKU | Product Name | Category | Pack Sizes | Unit Price |
|-----|--------------|----------|------------|------------|
| OCC-NUT-001 | Dairy Boost Plus | Nutraceuticals | 1kg, 5kg, 10kg, 25kg | ₹250 |
| OCC-NUT-002 | Cattle Care Pro | Nutraceuticals | 500g, 1kg, 5kg | ₹180 |
| OCC-NUT-003 | Milk Enhancer Gold | Nutraceuticals | 1kg, 5kg, 10kg | ₹320 |
| OCC-SUP-001 | Vitamin Mix Complete | Supplements | 250g, 500g, 1kg | ₹150 |
| OCC-SUP-002 | Mineral Block Premium | Supplements | 2kg, 5kg | ₹200 |

**Data Captured**:

| Field | Description |
|-------|-------------|
| Sale Mode | B2B or B2C |
| Customer Name | Farmer/Business name |
| Customer Type | Based on mode selection |
| Product | From product catalog |
| Pack Size | Available sizes for selected product |
| Quantity | Number of units |
| Unit Price | Auto-filled from catalog |
| Total Amount | Auto-calculated |
| Repeat Order | Flag for returning customers |
| Village | Location |
| GPS | Auto-captured |
| Notes | Order-specific notes |

**Sales List View**:
- All orders with product details
- Mode badges (B2C green, B2B orange)
- Customer information
- Total amount display
- Quantity information

**Sales Analytics (Admin)**:
- B2B vs B2C revenue split (Pie Chart)
- Daily/weekly/monthly trends (Area Chart)
- Product-wise sales breakdown
- Team member sales comparison
- Top performing territories

### 6. 📊 Admin Analytics Dashboard

A powerful analytics dashboard providing 360° visibility into field operations.

**Key Metrics Cards**:

| Metric | Description | Icon |
|--------|-------------|------|
| Total Meetings | All logged interactions | 👥 |
| Farmers Contacted | Unique farmer touchpoints | 📈 |
| Total Sales | Revenue in ₹ | 🛒 |
| Total Distance | Team travel in km | 📍 |

**Charts & Visualizations**:

1. **Daily Activity Trend (Area Chart)**
   - 7-day rolling view
   - Stacked areas for Meetings, Sales, Samples
   - Trend identification

2. **Sales Distribution (Donut Chart)**
   - B2C vs B2B revenue split
   - Percentage breakdown
   - Actual values displayed

3. **Team Performance (Horizontal Bar Chart)**
   - Individual field officer comparison
   - Metrics: Meetings count, Sales value (K)
   - Performance ranking

4. **Meetings by Category (Pie Chart)**
   - Farmer / Seller / Influencer distribution
   - Engagement pattern analysis

5. **State-wise Breakdown (Table)**
   - Meetings, Sales, Samples per state
   - Regional performance comparison

6. **Village Activity (Table)**
   - Top villages by engagement
   - Farmer count per village

**Filters**:
- Date Range: Last 7 Days, Last 30 Days, Last 90 Days, This Month
- State: All States, Karnataka, Gujarat, Maharashtra

**Export**:
- Export button for downloading reports

### 7. 📱 Responsive Navigation & Layout

A mobile-first responsive design ensuring usability across all devices.

**Sidebar Features**:
- Collapsible on mobile
- Role-based menu items
- User profile section with role badge
- Active route highlighting
- Quick logout access

**Mobile Header**:
- Hamburger menu for navigation
- Brand logo center-aligned
- User avatar with dropdown
- Clean, minimal design

**Responsive Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🏗️ Technical Architecture

### Frontend Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐   │
│  │   Pages     │ │  Layouts    │ │   Components    │   │
│  │  (Routes)   │ │  (Nested)   │ │   (Reusable)    │   │
│  └─────────────┘ └─────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │              Context Providers                   │   │
│  │  ┌─────────────────┐  ┌─────────────────────┐   │   │
│  │  │  AuthContext    │  │    DataContext      │   │   │
│  │  │  - User state   │  │    - Meetings       │   │   │
│  │  │  - Login/Logout │  │    - Sales          │   │   │
│  │  │  - Role check   │  │    - Samples        │   │   │
│  │  └─────────────────┘  │    - Attendance     │   │   │
│  │                       │    - Products       │   │   │
│  │                       └─────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐   │
│  │  Tailwind   │ │   Lucide    │ │   Recharts      │   │
│  │    CSS      │ │   Icons     │ │   (Charts)      │   │
│  └─────────────┘ └─────────────┘ └─────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → Component → Context Hook → State Update → LocalStorage → Re-render
```

### State Management

The application uses React Context API for state management with two primary contexts:

1. **AuthContext**
   - User authentication state
   - Login/Logout functions
   - Loading states
   - Session persistence

2. **DataContext**
   - Meetings CRUD operations
   - Sales CRUD operations
   - Samples CRUD operations
   - Attendance management
   - Product catalog
   - Statistics calculations

---

## 🛠️ Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 16.1.6 | React framework with App Router |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **UI Library** | React | 19.2.3 | Component-based UI |
| **Styling** | Tailwind CSS | 4.0 | Utility-first CSS |
| **Icons** | Lucide React | 0.563.0 | Beautiful icon library |
| **Charts** | Recharts | 3.7.0 | Composable chart library |
| **Dates** | date-fns | 4.1.0 | Date manipulation |
| **Linting** | ESLint | 9.x | Code quality |

### Why These Technologies?

- **Next.js 16**: Latest App Router for better performance, nested layouts, and server components capability
- **TypeScript**: Catch errors at compile time, better IDE support, self-documenting code
- **Tailwind CSS 4**: Rapid UI development, consistent design system, minimal bundle size
- **Recharts**: React-native charts, composable, and customizable
- **Lucide**: Modern, consistent icons that match our design language

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or yarn 1.22.x
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Likhith623/Occamy---haxplore.git

# Navigate to project directory
cd Occamy---haxplore/occamy-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Docker Deployment

```bash
# Build Docker image
docker build -t occamy-tracker .

# Run container
docker run -p 3000:3000 occamy-tracker
```

### Environment Variables

The application works out of the box without any environment variables. For production deployment:

```env
# Optional: Set for production
NEXT_PUBLIC_API_URL=https://api.occamy.com
```

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Admin** | admin@occamy.com | admin123 | Full dashboard, all team data, reports |
| **Field Officer** | rajesh@occamy.com | field123 | Personal dashboard, log activities |
| **Field Officer** | priya@occamy.com | field123 | Personal dashboard, log activities |
| **Distributor** | suresh@occamy.com | dist123 | Personal dashboard, B2B focus |

---

## 📸 Screenshots

### Login Page
Clean, minimal login with role-based redirection.

### Field Officer Dashboard
- Welcome banner with check-in/out
- Quick stats cards
- Quick action buttons
- Recent activities

### Admin Dashboard
- Key metrics overview
- Activity trend charts
- Sales distribution pie chart
- Team performance comparison
- Geographic breakdown

### Meeting Form
- Step-by-step meeting logging
- Type and category selection
- GPS auto-capture
- Business potential estimation

### Sales Form
- B2B/B2C mode toggle
- Product catalog integration
- Auto-calculated totals
- Customer type selection

### Attendance View
- Today's status with check-in/out
- Monthly statistics
- Complete history log
- Distance tracking

---

## 📁 Project Structure

```
occamy-tracker/
├── 📄 package.json              # Dependencies & scripts
├── 📄 next.config.ts            # Next.js configuration
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 tailwind.config.js        # Tailwind CSS configuration
├── 📄 Dockerfile                # Docker deployment config
├── 📄 cloudbuild.yaml           # Google Cloud Build config
│
├── 📁 public/                   # Static assets
│
└── 📁 src/
    ├── 📁 app/                  # Next.js App Router
    │   ├── 📄 layout.tsx        # Root layout
    │   ├── 📄 page.tsx          # Login page
    │   ├── 📄 globals.css       # Global styles
    │   │
    │   └── 📁 dashboard/        # Protected dashboard routes
    │       ├── 📄 layout.tsx    # Dashboard layout with sidebar
    │       ├── 📄 page.tsx      # Main dashboard (role-based)
    │       │
    │       ├── 📁 attendance/   # Attendance feature
    │       │   └── 📄 page.tsx
    │       │
    │       ├── 📁 meetings/     # Meetings feature
    │       │   ├── 📄 page.tsx  # Meetings list
    │       │   └── 📁 new/
    │       │       └── 📄 page.tsx  # New meeting form
    │       │
    │       ├── 📁 samples/      # Sample distribution feature
    │       │   ├── 📄 page.tsx  # Samples list
    │       │   └── 📁 new/
    │       │       └── 📄 page.tsx  # New sample form
    │       │
    │       ├── 📁 sales/        # Sales feature
    │       │   ├── 📄 page.tsx  # Sales list
    │       │   └── 📁 new/
    │       │       └── 📄 page.tsx  # New sale form
    │       │
    │       └── 📁 admin/        # Admin-only routes
    │           ├── 📁 activities/
    │           ├── 📁 team/
    │           └── 📁 reports/
    │
    ├── 📁 components/           # Reusable React components
    │   ├── 📁 attendance/
    │   │   └── 📄 AttendanceView.tsx
    │   │
    │   ├── 📁 auth/
    │   │   └── 📄 LoginForm.tsx
    │   │
    │   ├── 📁 dashboard/
    │   │   ├── 📄 AdminDashboard.tsx
    │   │   └── 📄 FieldOfficerDashboard.tsx
    │   │
    │   ├── 📁 layout/
    │   │   └── 📄 Sidebar.tsx
    │   │
    │   ├── 📁 meetings/
    │   │   ├── 📄 MeetingForm.tsx
    │   │   └── 📄 MeetingsList.tsx
    │   │
    │   ├── 📁 sales/
    │   │   ├── 📄 SalesForm.tsx
    │   │   └── 📄 SalesList.tsx
    │   │
    │   └── 📁 samples/
    │       ├── 📄 SampleForm.tsx
    │       └── 📄 SamplesList.tsx
    │
    ├── 📁 context/              # React Context providers
    │   ├── 📄 AuthContext.tsx   # Authentication state
    │   └── 📄 DataContext.tsx   # Application data state
    │
    └── 📁 types/                # TypeScript type definitions
        └── 📄 index.ts          # All type exports
```

---

## 📚 API Reference

### Data Types

#### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'distributor' | 'field_officer';
  phone: string;
  state: string;
  district: string;
  avatar?: string;
  createdAt: string;
}
```

#### Meeting

```typescript
interface Meeting {
  id: string;
  userId: string;
  type: 'one_on_one' | 'group';
  category: 'farmer' | 'seller' | 'influencer';
  personName?: string;
  contactDetails?: string;
  village: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  attendeeCount?: number;
  businessPotential?: string;
  notes?: string;
  photos: string[];
  createdAt: string;
}
```

#### Sale

```typescript
interface Sale {
  id: string;
  userId: string;
  mode: 'B2C' | 'B2B';
  customerName: string;
  customerType: string;
  productSKU: string;
  productName: string;
  packSize: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  isRepeatOrder: boolean;
  village: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  notes?: string;
  createdAt: string;
}
```

#### SampleDistribution

```typescript
interface SampleDistribution {
  id: string;
  userId: string;
  recipientName: string;
  recipientType: 'farmer' | 'seller' | 'influencer';
  productName: string;
  quantity: number;
  unit: string;
  purpose: 'trial' | 'demo' | 'follow_up';
  village: string;
  state: string;
  district: string;
  latitude: number;
  longitude: number;
  notes?: string;
  createdAt: string;
}
```

#### Attendance

```typescript
interface Attendance {
  id: string;
  userId: string;
  date: string;
  checkInTime: string;
  checkInLocation: { lat: number; lng: number };
  checkInOdometer?: number;
  checkOutTime?: string;
  checkOutLocation?: { lat: number; lng: number };
  checkOutOdometer?: number;
  totalDistance?: number;
  status: 'active' | 'completed';
}
```

#### Product

```typescript
interface Product {
  id: string;
  sku: string;
  name: string;
  packSizes: string[];
  unitPrice: number;
  category: string;
}
```

### Context Hooks

#### useAuth()

```typescript
const {
  user,           // Current user object or null
  isLoading,      // Loading state
  isAuthenticated,// Boolean auth status
  login,          // (email, password) => Promise
  logout,         // () => void
} = useAuth();
```

#### useData()

```typescript
const {
  meetings,           // Meeting[]
  addMeeting,         // (meeting) => void
  samples,            // SampleDistribution[]
  addSample,          // (sample) => void
  sales,              // Sale[]
  addSale,            // (sale) => void
  attendance,         // Attendance[]
  currentAttendance,  // Attendance | null
  checkIn,            // (location, odometer?) => void
  checkOut,           // (location, odometer?) => void
  products,           // Product[]
  getStats,           // (userId?) => DashboardStats
  getAllUsers,        // () => User[]
} = useData();
```

---

## 🗺️ Future Roadmap

### Phase 1: Enhanced Features (Q1 2026)
- [ ] Real GPS integration with browser Geolocation API
- [ ] Photo upload for meetings with compression
- [ ] Push notifications for reminders
- [ ] Offline mode with background sync
- [ ] PDF report generation

### Phase 2: Backend Integration (Q2 2026)
- [ ] RESTful API backend (Node.js/Express or Python/FastAPI)
- [ ] PostgreSQL database
- [ ] JWT authentication
- [ ] Real-time WebSocket updates
- [ ] File storage (AWS S3 / Google Cloud Storage)

### Phase 3: Advanced Analytics (Q3 2026)
- [ ] Predictive analytics for sales forecasting
- [ ] Territory optimization suggestions
- [ ] Customer lifetime value tracking
- [ ] Sample-to-sale conversion tracking
- [ ] Heat maps for geographic activity

### Phase 4: Mobile App (Q4 2026)
- [ ] React Native mobile application
- [ ] Native GPS integration
- [ ] Camera integration for photos
- [ ] Biometric authentication
- [ ] Background location tracking

### Phase 5: Enterprise Features (2027)
- [ ] Multi-tenant architecture
- [ ] Custom branding per organization
- [ ] Advanced user permissions
- [ ] API access for third-party integrations
- [ ] WhatsApp Business API integration

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Write meaningful commit messages
- Ensure responsive design

---

## 👨‍💻 Team

**Occamy** was built with ❤️ by Team Occamy for HaXplore Hackathon.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Recharts](https://recharts.org/) - React charting library
- [date-fns](https://date-fns.org/) - Date utility library

---

<div align="center">

**Built for HaXplore Hackathon 2026**

⭐ If you found this project helpful, please give it a star!

[🔝 Back to Top](#-occamy---field-force-tracking--sales-management-platform)

</div>
