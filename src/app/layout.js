'use client'
import { Inter } from 'next/font/google'
import Context from '../context';
import Header from './components/Header';
import Loading from './components/Loading';
import SnackbarProvider from 'react-simple-snackbar'

import styles from './layout.module.scss';
import './global.css';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Context>
          <SnackbarProvider>
            <Header />
            <main className={styles.container}>
              {children}
            </main>
            <Loading />
          </SnackbarProvider>
        </Context>
      </body>
    </html>
  )
}
