import Layout from 'components/layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StoreProvider } from 'store/index'
import { NextPage } from 'next'

interface IProps {
  initialValue: Record<any, any>
  Component: NextPage
  pageProps: any
}
function MyApp({ initialValue, Component, pageProps }: IProps) {
  return (
    <StoreProvider initialValue={initialValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  )
}

// 刷新页面时获取到cookie传给StoreProvider 保证刷新后的store数据和之前一致
MyApp.getInitialProps = async ({ ctx }: any) => {
  const { userId, nickname, avatar } = ctx?.req.cookies || {}
  return {
    initialValue: {
      user: {
        userInfo: {
          userId,
          nickname,
          avatar,
        },
      },
    },
  }
}
export default MyApp
