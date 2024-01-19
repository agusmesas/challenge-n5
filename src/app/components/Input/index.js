import styles from './styles.module.scss';

const Input = ({ name, onChange, placeholder, type, label }) => (
  <div className={styles.container}>
    <label for={name}>{label}</label>
    <input
      className={styles.input}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      type={type}
    />
  </div>
);

export default Input;
