'use client'
import { useState, useContext } from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import BackButton from "../components/BackButton";
import { ProductsDispatchContext } from '../../context/contexts';
import Button from '../components/Button';
import Input from '../components/Input';

import styles from './styles.module.scss';

const AddProduct = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { addProduct } = useContext(ProductsDispatchContext);
  const [form, setForm] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setForm(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    addProduct({
      ...form,
      id: Date.now(),
    });
    router.replace('/');
    enqueueSnackbar('Producto agregado correctamente');
  }

  const checkDisable = !form.name || !form.price || !form.amount;

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.card}>
        <h1>Agregar producto</h1>
        <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
          <Input label="Nombre" onChange={handleChange} name="name" />
          <Input label="Precio" type="number" onChange={handleChange} name="price" />
          <Input label="Cantidad" type="number" onChange={handleChange} name="amount" />
          <Button className={styles.card__button} label="Agregar producto" type="submit" disabled={checkDisable} />
        </form>
      </div>
    </div>
  );
}

export default AddProduct;