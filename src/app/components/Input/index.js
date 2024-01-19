import styles from './styles.module.scss';

const Input = ({ name, onChange, placeholder, type }) => (
  <input
    className={styles.input}
    onChange={onChange}
    name={name}
    placeholder={placeholder}
    type={type}
  />
);

export default Input;
