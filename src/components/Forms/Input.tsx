import React from 'react';
import styles from './Input.module.scss';

export interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  error: string | null;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  onBlur,
}: InputProps) => {
  const id = React.useId();

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
