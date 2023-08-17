import { useState, useCallback } from "react";
import { nameRegex, passwordRegex } from "../utils/constants";
import validator from "validator";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setIsValid(false);
    if (name === "name") {
      if (!value){
        setErrors({ ...errors, [name]: "Введите имя" });
      } else  if (!nameRegex.test(value)){
        setErrors({
          ...errors, [name]: "Имя должно быть от 2 до 40 символов и включать в себя: буквы, пробел, дефис",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
    if (name === "email") {
      if (!value) {
        setErrors({ ...errors, [name]: "Введите адрес электронной почты" });
      } else if (!validator.isEmail(value)) {
        setErrors({
          ...errors,
          [name]: "Введите правильный адрес электронной почты",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
    if (name === "password") {
      if (!passwordRegex.test(value)) {
        setErrors({
          ...errors,
          [name]:
            "Пароль должен быть от 6 до 40 символов",
        });
    
      } else if (!value) {
        setErrors({ ...errors, [name]: "Введите пароль" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }
    setIsValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    setErrors,
  };
}
