import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel, FieldTitle } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubjectEnum } from '@bac/contracts/types/enums/enums';
import { useEffect } from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { schemasType } from '../../core/services';

const FormUI = ({ form }: { form: UseFormReturn<schemasType['create']> }) => {

  const isTeacher = form.watch('isTeacher');

  useEffect(() => {
    if (!isTeacher) {
      form.setValue('subject', null);
    }
  }, [isTeacher]);

  console.log('subject value = ', form.getValues('subject'))
  return (
    <>
      <Controller
        name='firstName'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`firstName-input`}>First Name</FieldLabel>
            <Input {...field} id={`firstName-input`} aria-invalid={fieldState.invalid} placeholder='First Name' />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name='lastName'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`lastName-input`}>Last Name</FieldLabel>
            <Input {...field} id={`lastName-input`} aria-invalid={fieldState.invalid} placeholder='Last Name' />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name='publicId'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`publicId-input`}>Public Id</FieldLabel>
            <Input {...field} id={`publicId-input`} aria-invalid={fieldState.invalid} placeholder='Public Id' />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name='isTeacher'
        control={form.control}
        render={({ field, fieldState }) => (
          <FieldLabel>
            <Field orientation="horizontal">
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              <FieldContent>
                <FieldTitle>Is Teacher</FieldTitle>
                <FieldDescription>
                  Check this box if the user is a teacher.
                </FieldDescription>
              </FieldContent>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          </FieldLabel>

        )}
      />

      <Controller
        name="subject"
        control={form.control}
        disabled={!isTeacher}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`subject-input`}>Subject</FieldLabel>

            <Select {...field} value={field.value ?? ''} aria-invalid={fieldState.invalid} onValueChange={field.onChange}  >
              <SelectTrigger  >
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    Object.values(SubjectEnum).map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

    </>
  );
};

export default FormUI;
