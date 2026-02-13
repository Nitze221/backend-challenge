import { Prisma } from "@prisma/client";
import prisma from "./db.js";

import type { CreateSeashellDto } from "./seashell.schema.js";

// SERVICE LAYER: Handles logic and database interaction

const listSeashells = async () => {
  return await prisma.seashell.findMany();
};

const getSeashell = async (id: number) => {
  const shell = await prisma.seashell.findUnique({
    where: { id },
  });

  if (!shell) {
    throw new Error(`Seashell with ID ${id} not found`);
  }

  return shell;
};

const addSeashell = async (data: CreateSeashellDto) => {
  return await prisma.seashell.create({
    data: {
      name: data.name,
      species: data.species,
      description: data.description || "", // Handle optional description
      rarity: data.rarity || "common",     // Handle optional rarity
    }
  });
};

// Use Partial<CreateSeashellDto> for updates
const updateSeashell = async (id: number, data: Partial<CreateSeashellDto>) => {
  return await prisma.seashell.update({
    where: { id },
    data,
  });
};

const deleteSeashell = async (id: number) => {
  try {
    return await prisma.seashell.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new Error(`Seashell with ID ${id} not found`);
    }
    throw error;
  }
};

export { 
  listSeashells, 
  getSeashell, 
  addSeashell, 
  updateSeashell, 
  deleteSeashell 
};