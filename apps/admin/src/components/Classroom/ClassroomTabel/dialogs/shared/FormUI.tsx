import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { schemasType } from '../../core/services';

const FormUI = ({ form }: { form: UseFormReturn<schemasType['create']> }) => {
  return (
    <>
      <Controller
        name='name'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`name-input`}>Name</FieldLabel>
            <Input {...field} id={`name-input`} aria-invalid={fieldState.invalid} placeholder='Name' />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
};

export default FormUI;
