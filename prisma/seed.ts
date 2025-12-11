import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

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
        },
        {
          visitDate: new Date("2025-09-15"),
          weightKg: 64.0,
          bloodPressure: "120/78",
          fundalHeight: 31,
          fetalHeartRate: 140,
        },
        {
          visitDate: new Date("2025-10-20"),
          weightKg: 66.2,
          bloodPressure: "122/80",
          fundalHeight: 34,
          fetalHeartRate: 138,
          notes: "Good fetal movement reported",
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
        },
        {
          visitDate: new Date("2025-11-12"),
          weightKg: 56.8,
          bloodPressure: "112/72",
          fundalHeight: 20,
          fetalHeartRate: 148,
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
          notes: "High BP – suspected pre-eclampsia, referred to district hospital urgently",
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
          notes: "Twins confirmed on ultrasound – high-risk pregnancy",
        },
      ],
    },
  },
];

export async function main() {
  console.log("Seeding MaHIS Mini with realistic Malawian maternal health data...");

  // Optional: clear old data
  await prisma.visit.deleteMany();
  await prisma.patient.deleteMany();

  for (const p of patientData) {
    await prisma.patient.create({ data: p });
  }

  console.log("Seeding completed successfully!");
  console.log("Try searching: 0999, Chisomo, Tamanda, Linda, or 145");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });