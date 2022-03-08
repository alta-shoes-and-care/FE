import Head from 'next/head';
import React from 'react'

function HeadApp(props) {
  return (
    <Head>
      <title>{props.title ? props.title : 'Shoes Service Station'}</title>
      <link
        rel="icon"
        href={
              props.icon
                ? props.icon
                : '/favicon.ico'
            }
      />
    </Head>
  )
}

export default HeadApp