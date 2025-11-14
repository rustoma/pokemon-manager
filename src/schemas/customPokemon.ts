import { z } from 'zod';

export const customPokemonCreateSchema = z.object({
  name: z.string().min(2),
  height: z.number().int().positive(),
  weight: z.number().int().positive(),
  imagePath: z.url(),
});

export const customPokemonUpdateSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2),
  height: z.number().int().positive(),
  weight: z.number().int().positive(),
  imagePath: z.url(),
});

export type CustomPokemonCreateInput = z.infer<typeof customPokemonCreateSchema>;
export type CustomPokemonUpdateInput = z.infer<typeof customPokemonUpdateSchema>;
