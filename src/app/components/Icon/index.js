import CartIcon from "./svgs/cart";
import Delete from "./svgs/delete";
import styles from './style.module.scss';

const iconsList = {
  cart: CartIcon,
  delete: Delete,
}

export default function Icon({ name, color = '#000000', className }) {
  const IconComponent = iconsList[name];

  return <IconComponent className={`${styles.icon} ${className}`} color={color} />;
}
