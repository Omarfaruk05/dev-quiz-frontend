import { DatePicker, DatePickerProps, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

type FormDatePickerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  label?: string;
  value?: Dayjs;
  size?: "large" | "small";
};

const FormDatePicker = ({
  name,
  label,
  onChange,
  size,
}: FormDatePickerProps) => {
  const { control, setValue } = useFormContext();

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : "";
    setValue(name, dateString);
  };

  return (
    <div>
      <p className="ml-1 uppercase text-lg text-gray-500">
        {label ? label : null}
      </p>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            size={size}
            onChange={handleOnChange}
            style={{
              width: "100%",
            }}
          />
        )}
      />
    </div>
  );
};

export default FormDatePicker;
