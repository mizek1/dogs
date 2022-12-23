import React from 'react';
import styles from './Input.module.scss';

export interface InputProps {
  label: string;
  type: string;
  name: string;
}

const Input = ({ label, type, name }: InputProps) => {
  const id = React.useId();

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} name={name} className={styles.input} type={type} />
      <p className={styles.error}>Error</p>
    </div>
  );
};

export default Input;
