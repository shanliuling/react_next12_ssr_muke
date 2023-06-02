import { NextPage } from 'next'
import { navs } from './config'
import styles from './index.module.scss'
import Link from 'next/link'
const Navbar: NextPage = () => {
  return (
    <div className={styles.navbar}>
      <section className={styles.LogArea}>BLOG - 江承泰</section>
      <section className={styles.LinkArea}>
        {navs?.map((item) => {
          return (
            <Link href={item.path} key={item.name}>
              <span>{item.name}</span>
            </Link>
          )
        })}
      </section>
    </div>
  )
}

export default Navbar
