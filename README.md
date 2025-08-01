# DashStack Dashboard

Modern dashboard interface built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📊 Interactive dashboard with statistics cards
- 📈 Sales chart with Recharts
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🚀 Built with Next.js 14 and TypeScript

## Getting Started

### Prerequisites

Make sure you have Node.js 18+ installed on your machine.

### Installation

1. Clone or create the project directory:
```bash
mkdir dashstack-dashboard
cd dashstack-dashboard
```

2. Create all the files as provided in the artifact

3. Install dependencies:
```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
dashstack-dashboard/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── StatCard.tsx
│   └── SalesChart.tsx
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── tsconfig.json
└── README.md
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart library for React
- **Lucide React** - Beautiful & consistent icon library

## Features Included

### Dashboard Components
- **Sidebar Navigation** - Fully functional sidebar with menu items
- **Header** - Search bar, notifications, and user profile
- **Statistics Cards** - Key metrics with trend indicators
- **Sales Chart** - Interactive line chart showing sales data

### Design Features
- Clean and modern interface
- Responsive layout
- Hover effects and transitions
- Professional color scheme
- Icon integration with Lucide React

## Customization

You can customize the dashboard by:

1. **Modifying colors** in `tailwind.config.js`
2. **Adding new menu items** in `components/Sidebar.tsx`
3. **Updating chart data** in `components/SalesChart.tsx`
4. **Adding new stat cards** in `app/page.tsx`

## License

This project is for educational and demonstration purposes.