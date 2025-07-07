"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Récupérer tous les seniors
export async function getElders() {
  const elders = await prisma.elders.findMany({
    include: {
      cities: true,
      activities: true,
    },
  });
  return elders;
}

// Créer un nouveau senior
export async function createElder(formData: FormData) {
  const elder = await prisma.elders.create({
    data: {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      password: formData.get("password") as string,
      email: formData.get("email") as string,
      age: formData.get("age") ? parseInt(formData.get("age") as string) : null,
      job: formData.get("job") as string,
      city_id: formData.get("city_id")
        ? parseInt(formData.get("city_id") as string)
        : null,
      activity_id: formData.get("activity_id")
        ? parseInt(formData.get("activity_id") as string)
        : null,
      description: formData.get("description") as string,
    },
  });

  revalidatePath("/elders");
  return elder;
}

// Récupérer les villes
export async function getCities() {
  const cities = await prisma.cities.findMany();
  return cities;
}

// Récupérer les activités
export async function getActivities() {
  const activities = await prisma.activities.findMany();
  return activities;
}
