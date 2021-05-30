import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let Field = Input;
  if (textarea) {
    // @ts-ignore
    Field = Textarea;
  }

  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Field {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
