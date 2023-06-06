import { Modal } from 'antd'
import React from 'react'

interface IProps {
  isShow: boolean
  onClose: () => void
  onOk: () => void
}
const Login = (props: IProps) => {
  const [form, setForm] = React.useState({
    phone: '',
    verify: '',
  })
  const handleGetVerifyCode = () => {}
  return (
    <Modal
      title="登录弹框"
      open={props.isShow}
      onOk={props.onOk}
      onCancel={props.onClose}>
      <input
        value={form.phone}
        name="phone"
        type="text"
        placeholder="请输入手机号"
      />
      <div className={styles.verifyCodeArea}>
        <input
          value={form.verify}
          name="verify"
          type="text"
          placeholder="请输入验证码"
        />
        <span onClick={handleGetVerifyCode} className={styles.verifyCode}>
          点击获取验证码
        </span>
      </div>
    </Modal>
  )
}

export default Login
