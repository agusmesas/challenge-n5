import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }

  return(
    <div onClick={handleBack} className={styles.back}>
      Volver
    </div>
  );
}

export default BackButton;
