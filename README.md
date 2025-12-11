# MaHIS Mini – Maternal & Child Health Information System

A **modern, mobile-first, FHIR-ready** Electronic Health Record (EHR) module built for the **Ministry of Health and Sanitation, Malawi** under the **Presidential Initiative on Maternal Health**.

Live Demo → Coming soon on Vercel (after deployment)  
GitHub → https://github.com/maulidiphilip/mahis-mini-next

## Features (Already Working)
- Search patients by phone, name, or National ID
- Register new pregnant mothers
- Real Malawian names & maternal health data
- 100% responsive (works on village phones to hospital desktops)
- Clean, trusted government-style UI (white + teal)
- Built with international standards (ready for FHIR, OpenHIE, MaHIS)
- Prisma + PostgreSQL + Next.js 16 App Router + Tailwind CSS

## Tech Stack
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL (via Prisma Data Platform)
- **Design**: Mobile-first, responsive, government-approved look
- **Standards**: Designed for FHIR & OpenHIE interoperability

## Project Structure

src/
├── components/
│   ├── layout/        → Header, Footer, MobileNav
│   ├── patient/       → SearchPatient
│   └── forms/         → RegisterForm (coming)
├── app/
│   ├── page.tsx       → Home with search
│   └── register/page.tsx
└── prisma/            → Schema + seed with real ANC data

## Quick Start
```bash
git clone https://github.com/maulidiphilip/mahis-mini-next.git
cd mahis-mini-next
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npx prisma studio
npm run dev

Open http://localhost:3000

Built By
Philip Maulidi
Full-Stack Developer | Digital Health Enthusiast
December 2025
