import styles from './styles.module.scss'

const Quantity = ({ value, limit, onChange, withAmount = false }) => {
  const disabled = limit > value;

  const increment = () => {
    if(limit > value) {
      onChange(++value);
    }
  }

  const decrement = () => {
    onChange(value > 1 ? --value : 1);
  }

  return (
    <div >
      <div className={styles.quantity}>
        <button
          className={`${styles.quantity__button} ${styles['quantity__button--decrement']}`}
          onClick={decrement}
        >
          &mdash;
        </button>
        <input
          className={styles.quantity__input}
          type="text"
          value={value}
          readOnly
        />
        <button
          className={`${styles.quantity__button} ${styles['quantity__button--increment']}`}
          onClick={increment}
          disabled={!disabled}
        >
          +
        </button>
      </div>
      {withAmount && <p className={styles.quantity__amount}>{limit} unidades disponibles</p>}
    </div>
  );
}

export default Quantity;