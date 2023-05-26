import { NextPage } from 'next'
import Navbar from '../Navbar'
import Footer from '../Footer'
import React from 'react'
type LayoutProps = {
  children: React.ReactNode
}
const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
