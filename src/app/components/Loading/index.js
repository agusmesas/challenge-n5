'use client'
import { useContext } from 'react';
import { LayoutContext } from '../../../context/contexts';
import styles from './style.module.scss';

const Loading = () => {
  const { state: { loading } } = useContext(LayoutContext);
  
  if (loading){
    return (
      <div className={styles.loading}>
        <h1>Loading ....</h1>
      </div>
    )
  }
}

export default Loading;
