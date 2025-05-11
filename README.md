# 🍜 Street Food Discovery Website

## 🌐 Live Backend Link

[🔗 Visit Live](https://street-food-website-ten.vercel.app/)

## 🌐 Live Frontend Link

[🔗 Visit Live](https://street-food-one.vercel.app/)

## Description

This project is a web application designed to allow users to discover, post, review, and interact with street food spots. The website caters to multiple user roles, including Normal Users, Premium Users, and Admins, each with varying levels of access and functionality.

![Street Food Discovery ](https://i.ibb.co.com/gLMztPDV/Website-Mockup.png)

## Technology Used

### Frontend:

- **NextJs ):** For building UI components.
- **React :** For building UI components.
- **TypeScript:** For type safety and better developer experience.
- **TailwindCSS:** For styling and responsive design.
- **Redux Toolkit:** For state management.
- **Recharts:** For data visualization in dashboards.
- **SanCdn :** For styling and responsive design.
- **Sonner:** For toast notifications.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **MongoDB instance** (local or cloud-based)

## Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd <repository-folder>
```

2. **Install dependencies:**

```bash
npm install
```

## Scripts

- **Start Development Server:**

```bash
npm run dev
```

- **Build for Production:**

```bash
npm run build
```

## Folder Structure

```bash
Street_Food_Discovery_Website/
│── .next/
│── .vercel/
│── node_modules/
│── public/
│── src/
│ ├── app/
| | │── (withCommonlayout)
│ | | ├── (home)
│ | | ├── addTaste
│ | | ├── postDetails
│ | | ├── providers
│ | | ├── register
│ | | ├── subcription
| | │── (withDashboardlayout)
│ | | ├── dashboard
| | | |     ├── admin
| | | |     ├── customer
│ | | ├── layout.tsx
| | │── layout.tsx
| | │── global.css
| | │── register
│ │ ├── error.tsx
│ │ ├── favicon.png
│ │ ├── layout.tsx
│ │ ├── loading.tsx
│ │ ├── not-found.tsx
│ ├── assets/
│ ├── components/
│ ├── hooks/
│ ├── services/
│ │ ├── Redux
│ │ ├── store.ts
│ │ ├── storage.ts
│ ├── lib/
│ │ ├── utils.ts
│ ├── utils/
│── .env
│── .gitignore
│── eslint.config.mjs
│── next-env.d.ts
│── next.config.ts
```

## Happy Coding
