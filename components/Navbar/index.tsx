import { NextPage } from 'next'
import { navs } from './config'
import styles from './index.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'antd'
const Navbar: NextPage = () => {
  const { pathname } = useRouter()

  return (
    <div className={styles.navbar}>
      <section className={styles.LogArea}>BLOG - 江承泰</section>
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
        <Button>写文章</Button>
        <Button>登录</Button>
      </section>
    </div>
  )
}

export default Navbar
