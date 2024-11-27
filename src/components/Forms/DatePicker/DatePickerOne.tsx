import flatpickr from 'flatpickr';
import { useEffect, useRef } from 'react';

const DatePickerOne = ({ value, onChange, placeholder = "mm/dd/yyyy" }) => {
  const datepickerRef = useRef(null);

  useEffect(() => {
    if (datepickerRef.current) {
      flatpickr(datepickerRef.current, {
        defaultDate: value,
        onChange: (selectedDates) => {
          onChange(selectedDates[0]); // Only pass the selected date
        },
        dateFormat: 'Y-m-d',
        prevArrow: '<svg width="7" height="11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow: '<svg width="7" height="11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
      });
    }
  }, [value]);

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Start Date
      </label>
      <input
        ref={datepickerRef}
        className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none dark:border-form-strokedark dark:bg-form-input"
        placeholder={placeholder}
        readOnly
      />
    </div>
  );
};

export default DatePickerOne;

