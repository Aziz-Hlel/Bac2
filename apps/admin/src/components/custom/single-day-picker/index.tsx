import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import dayjs from '@/utils/dayjsConfig';
import { toCalendarDate } from '@bac/contracts/utils/date';
import { LucideCalendar } from 'lucide-react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import type { ControllerRenderProps, FieldPathByValue, FieldValues } from 'react-hook-form';

type DateString = string | undefined | null;

const SingleDatePicker = <TFieldValues extends FieldValues, TName extends FieldPathByValue<TFieldValues, DateString>>({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  fieldProps,
  placeholder,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
  fieldProps: ControllerRenderProps<TFieldValues, TName>;
  placeholder?: string;
}) => {
  const value = fieldProps.value as DateString;
  const selected = value ? new Date(value) : undefined;

  const [openDatePopover, setOpenDatePopover] = useState(false);

  return (
    <Popover open={openDatePopover} onOpenChange={setOpenDatePopover}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          className={cn('flex w-full justify-start font-normal', !fieldProps.value && 'text-muted-foreground')}
        >
          <LucideCalendar className='text-slate-400' />
          {value ? dayjs(value).format('LL') : placeholder ? placeholder : '-- / -- / ----'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          {...props}
          captionLayout='dropdown'
          mode='single'
          selected={selected}
          onSelect={(date) => {
            if (!date) {
              fieldProps.onChange(null);
              return;
            }
            fieldProps.onChange(toCalendarDate(date));
            setOpenDatePopover(false);
          }}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          yearRange={{
            from: new Date().getFullYear() - 1,
            to: new Date().getFullYear() + 1,
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SingleDatePicker;
