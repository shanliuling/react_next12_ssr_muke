import { NextPage } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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
