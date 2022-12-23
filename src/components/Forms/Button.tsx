import styles from './Button.module.scss';

export interface ButtonProps {
  children: string;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
