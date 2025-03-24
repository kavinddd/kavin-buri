import InputEnum, { type InputEnumProps } from "./InputEnum";

const booleanEnums = ["NONE", "TRUE", "FALSE"] as const;

function enumToBooleanOptional(enumVal?: string) {
  if (!enumVal) return undefined;
  if (enumVal === "NONE") return undefined;
  if (enumVal === "TRUE") return true;
  if (enumVal === "FALSE") return false;
}
function booleanToEnum(bool?: boolean): string {
  if (bool === undefined) return "NONE";
  if (bool === true) return "TRUE";
  if (bool === false) return "FALSE";
  return "";
}

type InputEnumBooleanProps = {
  value?: boolean;
  onChange: (value?: boolean) => void;
} & Omit<InputEnumProps, "enums" | "onChange" | "value">;

export function InputEnumBoolean(props: InputEnumBooleanProps) {
  function handleValueChange(value: string | undefined) {
    const bool = enumToBooleanOptional(value);
    props.onChange(bool);
  }

  return (
    <InputEnum
      {...props}
      value={booleanToEnum(props.value)}
      enums={booleanEnums}
      onChange={handleValueChange}
    />
  );
}
