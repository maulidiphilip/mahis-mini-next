import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import bcrypt from "bcryptjs";

// Database adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Prisma instance
const prisma = new PrismaClient({ adapter });

// Typed visit input (removes any warnings)
type VisitInput = Prisma.VisitCreateWithoutPatientInput;

// Seed Data
const patientData: Prisma.PatientCreateInput[] = [
  {
    nationalId: "MW199805120001",
    firstName: "Chisomo",
    lastName: "Banda",
    phone: "0999123456",
    dateOfBirth: new Date("1998-05-12"),
    gender: "female",
    visits: {
      create: [
        {
          visitDate: new Date("2025-08-10"),
          weightKg: 62.5,
          heightCm: 160,
          bloodPressure: "118/76",
          fundalHeight: 28,
          fetalHeartRate: 142,
          notes: "Normal progress, taking iron supplements",
          recordedBy: "will-be-set-later",
        },
        {
          visitDate: new Date("2025-09-15"),
          weightKg: 64.0,
          bloodPressure: "120/78",
          fundalHeight: 31,
          fetalHeartRate: 140,
          recordedBy: "will-be-set-later",
        },
        {
          visitDate: new Date("2025-10-20"),
          weightKg: 66.2,
          bloodPressure: "122/80",
          fundalHeight: 34,
          fetalHeartRate: 138,
          notes: "Good fetal movement reported",
          recordedBy: "will-be-set-later",
        },
      ],
    },
  },
  {
    nationalId: "MW200010150002",
    firstName: "Tamanda",
    lastName: "Phiri",
    phone: "0888234567",
    dateOfBirth: new Date("2000-10-15"),
    gender: "female",
    visits: {
      create: [
        {
          visitDate: new Date("2025-10-05"),
          weightKg: 55.0,
          heightCm: 158,
          bloodPressure: "110/70",
          fundalHeight: 16,
          fetalHeartRate: 150,
          notes: "First ANC visit – HIV test done (negative)",
          recordedBy: "will-be-set-later",
        },
        {
          visitDate: new Date("2025-11-12"),
          weightKg: 56.8,
          bloodPressure: "112/72",
          fundalHeight: 20,
          fetalHeartRate: 148,
          recordedBy: "will-be-set-later",
        },
      ],
    },
  },
  {
    nationalId: "MW199711220003",
    firstName: "Mwayi",
    lastName: "Kachingwe",
    phone: "0999567890",
    dateOfBirth: new Date("1997-11-22"),
    gender: "female",
    visits: {
      create: [
        {
          visitDate: new Date("2025-11-28"),
          weightKg: 70.5,
          heightCm: 162,
          bloodPressure: "128/82",
          fundalHeight: 36,
          fetalHeartRate: 135,
          notes: "Head engaged – prepare for delivery soon",
          recordedBy: "will-be-set-later",
        },
      ],
    },
  },
  {
    nationalId: "MW200203180004",
    firstName: "Linda",
    lastName: "Gama",
    phone: "0977123123",
    dateOfBirth: new Date("2002-03-18"),
    gender: "female",
    visits: {
      create: [
        {
          visitDate: new Date("2025-11-01"),
          weightKg: 68.0,
          heightCm: 165,
          bloodPressure: "145/95",
          fundalHeight: 30,
          fetalHeartRate: 140,
          notes: "High BP – suspected pre-eclampsia, referred urgently",
          recordedBy: "will-be-set-later",
        },
      ],
    },
  },
  {
    nationalId: "MW199909050005",
    firstName: "Esther",
    lastName: "Mbewe",
    phone: "0888456789",
    dateOfBirth: new Date("1999-09-05"),
    gender: "female",
    visits: {
      create: [
        {
          visitDate: new Date("2025-10-18"),
          weightKg: 72.0,
          heightCm: 155,
          bloodPressure: "120/78",
          fundalHeight: 32,
          fetalHeartRate: 145,
          notes: "Twins confirmed – high-risk pregnancy",
          recordedBy: "will-be-set-later",
        },
      ],
    },
  },
];

// MAIN SEED FUNCTION
export async function main() {
  console.log("Seeding MaHIS Mini v2...");

  await prisma.visit.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const admin = await prisma.user.create({
    data: {
      email: "admin@mahis.mw",
      password: bcrypt.hashSync("admin123", 10),
      name: "System Administrator",
      role: "ADMIN",
    },
  });

  const clinician = await prisma.user.create({
    data: {
      email: "clinician@mahis.mw",
      password: bcrypt.hashSync("clinician123", 10),
      name: "Dr. Mphatso Chikaonda",
      role: "CLINICIAN",
    },
  });

  const clerk = await prisma.user.create({
    data: {
      email: "clerk@mahis.mw",
      password: bcrypt.hashSync("clerk123", 10),
      name: "Grace Phiri",
      role: "DATA_CLERK",
    },
  });

  console.log("Users created.");

  // Create patients + visits
  for (const p of patientData) {
    const visitsToCreate: VisitInput[] = Array.isArray(p.visits?.create)
      ? p.visits.create.map((v) => ({
          ...v,
          recordedBy: clinician.id,
        }))
      : [];

    await prisma.patient.create({
      data: {
        nationalId: p.nationalId,
        firstName: p.firstName,
        lastName: p.lastName,
        phone: p.phone,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        visits: {
          create: visitsToCreate,
        },
      },
    });
  }

  console.log("Seeded 5 patients with clinician visits.");
  console.log("MaHIS Mini v2 is ready.");
}

// EXECUTE
main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
