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

  const BlurHandler=()=>{
    setIsTouched(false)
  }
  return {
    Value: enteredValue,
    ValueChangeHandler,
    TouchHandler,
    hasError,
    isTouched,
    BlurHandler
  };
};

export default useInput;
