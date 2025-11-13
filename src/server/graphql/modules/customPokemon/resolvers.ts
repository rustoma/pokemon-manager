import prisma from '@/lib/prisma';
import { customPokemonCreateSchema, customPokemonUpdateSchema } from '@/schemas/customPokemon';

const resolvers = {
  Query: {
    customPokemons: async () => {
      const items = await prisma.customPokemon.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return items;
    },
    customPokemon: async (_: unknown, { id }: { id: number }) => {
      const item = await prisma.customPokemon.findUnique({ where: { id } });
      return item;
    },
  },
  Mutation: {
    createCustomPokemon: async (
      _: unknown,
      { name, height, weight, imagePath }: { name: string; height: number; weight: number; imagePath: string },
    ) => {
      const parsed = customPokemonCreateSchema.parse({ name, height, weight, imagePath });
      const customPokemon = await prisma.customPokemon.create({
        data: parsed,
      });
      return customPokemon;
    },
    updateCustomPokemon: async (
      _: unknown,
      {
        id,
        name,
        height,
        weight,
        imagePath,
      }: { id: number; name: string; height: number; weight: number; imagePath: string },
    ) => {
      const parsed = customPokemonUpdateSchema.parse({ id, name, height, weight, imagePath });
      const customPokemon = await prisma.customPokemon.update({
        where: { id },
        data: { name: parsed.name, height: parsed.height, weight: parsed.weight, imagePath: parsed.imagePath },
      });
      return customPokemon;
    },
    deleteCustomPokemon: async (_: unknown, { id }: { id: number }) => {
      const customPokemon = await prisma.customPokemon.delete({
        where: { id },
      });
      return customPokemon;
    },
  },
};

export default resolvers;
