import Head from 'next/head'
import { GetStaticProps } from 'next'
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe'

import styles from './home.module.scss';

interface IHomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: IHomeProps) {
  return (
    <>
      <Head>
        <title>Inico | Ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, Welcome</span>
          <h1>News about the <span>React</span>world.</h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KBjKQIskyRsMZKq2qAE7b5e', {
    expand: ['product']
  })
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),


  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24,
  }
}
