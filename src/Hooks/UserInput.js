import { useState } from "react";

const useInput = (Validate) => {
  const [enteredValue, SetEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const ValueIsValid = Validate(enteredValue);
  const hasError = !ValueIsValid && isTouched;

  const TouchHandler = () => {
    setIsTouched(true);
  };

  const ValueChangeHandler = (e) => {
    SetEnteredValue(e.target.value);
  };

  return {
    Value: enteredValue,
    ValueChangeHandler,
    TouchHandler,
    hasError,
    isTouched
  };
};

export default useInput;
