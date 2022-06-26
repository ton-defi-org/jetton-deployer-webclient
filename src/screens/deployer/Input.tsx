import { Box, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { styled } from "@mui/material";
import { useRef } from "react";
import BaseButton from "../../components/BaseButton";

interface Props {
  error: boolean;
  label: string;
  control: Control;
  name: string;
  defaultValue: string | number;
  onExamleClick: (name: string, value: string | number) => void;
  type?: any;
  required?: boolean;
  clearErrors: any;
  disabled?: boolean;
  validate?: (val: string) => boolean;
  errorMessage?: string;
  description: string;
}


const StyledDescription = styled(Typography)({
  fontSize: 14,
  marginTop: 2,
  paddingLeft: 15,
  opacity: 0.8
})


const StyledContainer = styled(Box)({
  width: "100%",
})

const StyledInputContainer = styled(Box)(({ error }: { error: boolean }) => ({
  width: "100%",
  height: 46,
  display: "flex",
  alignItems: "center",
  background: "#EDF2F7",
  borderRadius: 10,
  paddingRight: 5,
  border: error ? "1px solid #F06360" : "1px solid transparent",
  transition: "0.2s all",
  "& .base-button": {
    height: "calc(100% - 10px)",
    width: 90,
    "& button": {
      padding: "unset",
      width: "100%",
      height: "100%",
      fontSize: 12,
    },
  },
}));

const StyledInput = styled("input")({
  flex: 1,
  height: "100%",
  border: "unset",
  textIndent: 16,
  fontSize: 16,
  background: "transparent",
  outline: "none",
  color: "unset",
  "&::placeholder": {
    color: "#7A828A",
    transition: "0.2s all",
  },
  "&:focus": {
    "&::placeholder": {
      opacity: 0,
    },
  },
});

function Input({
  description,
  defaultValue,
  control,
  error,
  label,
  name,
  onExamleClick,
  type = "string",
  clearErrors,
  disabled,
  errorMessage,
}: Props) {
  const ref = useRef<any>();

  const onClick = () => {
    onExamleClick(name, defaultValue);
    clearErrors(name);
  };

  const onFocus = () => {
    clearErrors(name);
  };

  return (
    <StyledContainer>
      <Controller
        name={name}
        control={control}
        defaultValue={disabled ? defaultValue : ""}
        rules={{
          required: errorMessage,
        }}
        render={({ field: { onChange, value } }) => (
          <StyledInputContainer error={error}>
            <StyledInput
              ref={ref}
              value={value || ""}
              onFocus={onFocus}
              onChange={onChange}
              placeholder={label}
              disabled={disabled}
              style ={{
                opacity: disabled ? 0.5 : 1
              }}
            />
            <BaseButton onClick={onClick}>Example</BaseButton>
          </StyledInputContainer>
        )}
      />
      <StyledDescription>{description}</StyledDescription>
    </StyledContainer>
  );
}

export default Input;