import styles from './style.module.scss';

const Button = ({
  label,
  onClick,
  disabled,
  theme = 'primary',
  type,
  children,
  className = '',
}) => {
  const handleOnClick = event => {
    if(onClick){
    event.preventDefault();
    event.stopPropagation();
      onClick();
    }
  }

  return (
    <button
      className={`${styles.button} ${styles[`button--${theme}`]} ${className}`}
      onClick={handleOnClick}
      disabled={disabled}
      type={type}
    >
      {label || children}
    </button>
  );
};

export default Button;