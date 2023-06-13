import { NextPage } from 'next'
import { navs } from './config'
import styles from './index.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'antd'
import { useState } from 'react'
import Login from 'components/Login'
const Navbar: NextPage = () => {
  const { pathname } = useRouter()
  const [isShowLogin, setIsShowLogin] = useState(false) // 是否显示登录弹窗
  const handleGotoEditorPage = () => {}
  const handleLogin = () => {
    setIsShowLogin(true)
  }

  return (
    <div className={styles.navbar}>
      <section className={styles.LogArea}>BLOG - 医广</section>
      <section className={styles.LinkArea}>
        {navs?.map((item) => {
          return (
            <Link
              href={item.path}
              style={{ textDecoration: 'none' }}
              key={item.name}>
              <span className={pathname === item.path ? styles.active : ''}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>写文章</Button>
        <Button type="primary" onClick={handleLogin}>
          登录
        </Button>
      </section>
      <Login isShow={isShowLogin} onSetIsShowLogin={setIsShowLogin} />
    </div>
  )
}

export default Navbar
