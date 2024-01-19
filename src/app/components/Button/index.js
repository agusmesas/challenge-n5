import styles from './style.module.scss';

const Button = ({ label, onClick, disabled, type = 'primary', children, className }) => {
  const handleOnClick = event => {
    event.preventDefault();
    event.stopPropagation();
    onClick();
  }

  return (
    <button
      className={`${styles.button} ${styles[`button--${type}`]} ${className}`}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {label || children}
    </button>
  );
};

export default Button;