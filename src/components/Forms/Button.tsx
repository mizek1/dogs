import styles from './Button.module.scss';

const Button = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'button'>) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
