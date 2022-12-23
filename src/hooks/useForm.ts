import React from 'react';

type ValidationType = keyof typeof validation | false;

const validation = {
  email: {
    regex:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    message: 'Preencha um e-mail válido.',
  },
};

const useForm = (type?: ValidationType) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  function validate(value: string) {
    if (type === false) return true;

    if (!value.length) {
      setError('Preencha um valor.');
      return false;
    }

    if (type && validation[type] && !validation[type].regex.test(value)) {
      setError(validation[type].message);
      return false;
    }

    setError(null);
    return true;
  }

  function onChange({ currentTarget }: React.FormEvent<HTMLInputElement>) {
    if (error) validate(currentTarget.value);
    setValue(currentTarget.value);
  }

  return {
    value,
    setValue,
    error,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
