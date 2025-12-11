"use client";

import { useAuth } from "@/components/auth/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewVisitForm({ patientId }: { patientId: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const data = {
      patientId,
      visitDate: formData.get("visitDate"),
      weightKg: parseFloat(formData.get("weightKg") as string) || null,
      heightCm: parseFloat(formData.get("heightCm") as string) || null,
      bloodPressure: formData.get("bloodPressure") as string,
      fundalHeight: parseFloat(formData.get("fundalHeight") as string) || null,
      fetalHeartRate:
        parseInt(formData.get("fetalHeartRate") as string) || null,
      notes: formData.get("notes") as string,
      recordedBy: user?.id,
    };

    await fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    router.refresh();
    setLoading(false);
    alert("ANC Visit recorded successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
    >
      <h3 className="text-2xl font-bold text-teal-800">Record New ANC Visit</h3>

      <div className="grid grid-cols-2 gap-6">
        <input
          name="visitDate"
          type="date"
          required
          className="px-4 py-3 border rounded-xl"
        />
        <input
          name="weightKg"
          type="number"
          step="0.1"
          placeholder="Weight (kg)"
          className="px-4 py-3 border rounded-xl"
        />
        <input
          name="heightCm"
          type="number"
          placeholder="Height (cm)"
          className="px-4 py-3 border rounded-xl"
        />
        <input
          name="bloodPressure"
          placeholder="BP (e.g. 120/80)"
          className="px-4 py-3 border rounded-xl"
        />
        <input
          name="fundalHeight"
          type="number"
          step="0.1"
          placeholder="Fundal Height (cm)"
          className="px-4 py-3 border rounded-xl"
        />
        <input
          name="fetalHeartRate"
          type="number"
          placeholder="Fetal Heart Rate"
          className="px-4 py-3 border rounded-xl"
        />
      </div>

      <textarea
        name="notes"
        placeholder="Notes"
        rows={4}
        className="w-full px-4 py-3 border rounded-xl"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl"
      >
        {loading ? "Saving..." : "Record Visit"}
      </button>
    </form>
  );
}
