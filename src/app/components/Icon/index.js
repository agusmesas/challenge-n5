import CartIcon from "./svgs/cart";
import Delete from "./svgs/delete";
import styles from './style.module.scss';

const iconsList = {
  cart: CartIcon,
  delete: Delete,
}

export default function Icon({ name, color, className }) {
  const IconComponent = iconsList[name];

  return <IconComponent className={`${styles.icon} ${className}`} color={color} />;
}

Icon.defaultProps = {
  color: '#000000'
}