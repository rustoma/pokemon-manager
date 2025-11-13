'use client';

import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

const IMAGE_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

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
  image: z
    .custom<File>((val) => val instanceof File, { message: 'Image file is required' })
    .refine((file) => !!file && file.size > 0, 'Image file is required')
    .refine((file) => file.size <= IMAGE_MAX_SIZE_BYTES, 'Image must be <= 5MB')
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), 'Unsupported image type'),
});

export type CustomPokemonFormValues = z.infer<typeof schema>;

interface CustomPokemonFormProps {
  defaultValues?: Partial<CustomPokemonFormValues>;
  submitLabel?: string;
}

export function CustomPokemonForm({ defaultValues, submitLabel = 'Create' }: CustomPokemonFormProps) {
  const initialValues = useMemo<CustomPokemonFormValues>(
    () => ({
      name: defaultValues?.name ?? '',
      height: defaultValues?.height ?? 1,
      weight: defaultValues?.weight ?? 1,
      image: (defaultValues?.image as File) ?? (undefined as unknown as File),
    }),
    [defaultValues],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CustomPokemonFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const internalSubmit = async (values: CustomPokemonFormValues) => {
    console.log('🚀 ~ internalSubmit ~ values:', values);
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
        <label htmlFor="image" className="mb-1 block text-sm font-medium">
          Image
        </label>
        <input
          id="image"
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue('image', file, { shouldValidate: true });
            }
          }}
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image.message as string}</p>}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60">
          {isSubmitting ? 'Submitting...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
