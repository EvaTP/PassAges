"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cities } from "@prisma/client";
import MomentType from "../components/MomentType";
import { error } from "console";
import { activities } from "@prisma/client";

export async function getEldersPicture() {
  try {
    const elders = await prisma.elders.findMany({
      select: {
        id: true,
        picture: true,
      },
    });
    //console.log("elders", elders);
    return elders;
  } catch (error: any) {
    console.error("Erreur lors de la récupération des images :", error.message);
    throw new Error("Erreur de récupération des images");
  }
}


export async function searchVisitElders(formData: FormData) {
  
  const moments = formData.get("moment") as string;

  if (moments == "-- Choisissez un moment --") {
    throw new Error("Sélectionnez un moment");
  }

  const activity = await prisma.activities.findMany({
    where: { activity_type: moments },
    include: { elders: true },
  });

  console.log(activity); 

  return activity;

  const city = formData.get("city")

  const activities = await prisma.activities.findMany({
    where: { activity_type: moments },
    include: { elders: true },
  });

  if(city=="" )
  {
    throw new Error("Veuillez taper la ville recherchée");
  }

  if (city && moments )
  {
    redirect(`/activities?moment=${moments}&city=${city}`);   
    }
  };

  


/**
 * select id from activities
 * where elders.activity_id = activities.id
 * 
 */