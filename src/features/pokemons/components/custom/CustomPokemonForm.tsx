'use client';

import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { error } from 'console';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  height: z
    .number({ error: 'Height must be a number' })
    .int('Height must be an integer')
    .positive('Height must be positive'),
  weight: z
    .number({ error: 'Weight must be a number' })
    .int('Weight must be an integer')
    .positive('Weight must be positive'),
  imagePath: z.string().url('Image must be a valid URL'),
});

export type CustomPokemonFormValues = z.infer<typeof schema>;

interface CustomPokemonFormProps {
  defaultValues?: Partial<CustomPokemonFormValues>;
  submitLabel?: string;
  onSubmit?: (values: CustomPokemonFormValues) => Promise<void> | void;
  error?: string | null;
}

export function CustomPokemonForm({ defaultValues, submitLabel = 'Create', onSubmit, error }: CustomPokemonFormProps) {
  const initialValues = useMemo<CustomPokemonFormValues>(
    () => ({
      name: defaultValues?.name ?? '',
      height: defaultValues?.height ?? 1,
      weight: defaultValues?.weight ?? 1,
      imagePath: defaultValues?.imagePath ?? '',
    }),
    [defaultValues],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomPokemonFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const internalSubmit = async (values: CustomPokemonFormValues) => {
    if (onSubmit) {
      await onSubmit(values);
      return;
    }
    // fallback
    // eslint-disable-next-line no-console
    console.log('Custom Pokemon (UI only):', values);
    alert('Submitted! (UI-only fallback)');
  };

  return (
    <form className="mx-auto max-w-xl space-y-4" onSubmit={handleSubmit(internalSubmit)}>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Pika-My-Own"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="height" className="mb-1 block text-sm font-medium">
            Height
          </label>
          <input
            id="height"
            type="number"
            step="1"
            min={1}
            {...register('height', { valueAsNumber: true })}
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height.message}</p>}
        </div>
        <div>
          <label htmlFor="weight" className="mb-1 block text-sm font-medium">
            Weight
          </label>
          <input
            id="weight"
            type="number"
            step="1"
            min={1}
            {...register('weight', { valueAsNumber: true })}
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
          {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="imagePath" className="mb-1 block text-sm font-medium">
          Image URL
        </label>
        <input
          id="imagePath"
          type="url"
          placeholder="https://example.com/my-pokemon.png"
          {...register('imagePath')}
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
        {errors.imagePath && <p className="mt-1 text-sm text-red-600">{errors.imagePath.message}</p>}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60">
          {isSubmitting ? 'Submitting...' : submitLabel}
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
