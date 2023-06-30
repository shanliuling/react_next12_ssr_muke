import { NextPage } from 'next'
import { navs } from './config'
import styles from './index.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Avatar, Button, Dropdown, Menu } from 'antd'
import { useState } from 'react'
import Login from 'components/Login'
import { useStore } from 'store/index'
import request from 'service/fetch'
import { observer } from 'mobx-react-lite'
const Navbar: NextPage = () => {
  const store = useStore()
  const { userId, avatar } = store.user.userInfo

  const { pathname } = useRouter()
  const [isShowLogin, setIsShowLogin] = useState(false) // 是否显示登录弹窗
  const handleGotoEditorPage = () => {}
  const handleLogin = () => {
    setIsShowLogin(true)
  }
  const handleGotoPage = () => {}
  const handleLogout = () => {
    request.post('/api/user/logout').then((res: any) => {
      if (res?.code === 0) {
        store.user.setUserInfo({})
      }
    })
  }
  const renderDropDownMenu = () => {
    return (
      <Menu>
        <Menu.Item onClick={handleGotoPage}> 个人主页 </Menu.Item>
        <Menu.Item onClick={handleLogout}> 退出 </Menu.Item>
      </Menu>
    )
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
        {userId ? (
          <>
            <Dropdown overlay={renderDropDownMenu()} placement="bottomLeft">
              <Avatar src={avatar} size={32} />
            </Dropdown>
          </>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
      </section>
      <Login isShow={isShowLogin} onSetIsShowLogin={setIsShowLogin} />
    </div>
  )
}

export default observer(Navbar)
