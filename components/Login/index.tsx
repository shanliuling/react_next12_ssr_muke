import { Button, Input, Modal, message } from 'antd'
import { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'
import CountDown from 'components/CountDown'
import { UserOutlined, CopyOutlined } from '@ant-design/icons'
import requestInstance from 'service/fetch'
interface IProps {
  isShow: boolean
  onSetIsShowLogin: any
}
const Login = (props: IProps) => {
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  })
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form, //保留原来的值
      [name]: value, //覆盖原来的值
    })
  }
  //验证码
  const handleGetVerifyCode = () => {
    // setisShowVerifyCode(true)
    if (!form.phone) {
      message.error('请输入手机号')
      return
    }

    requestInstance
      .post('/api/user/sendVerifyCode', {
        to: form.phone,
        templateId: 1,
      })
      .then((res: any) => {
        if (res.code === 0) {
          message.success('验证码发送成功')
          setisShowVerifyCode(true)
        } else {
          message.error(res.msg || '未知错误:验证码发送失败')
        }
      })
  }
  const [isShowVerifyCode, setisShowVerifyCode] = useState(false)
  const handleCountDownEnd = () => {
    setisShowVerifyCode(false)
  }

  //
  const onOk = () => {
    props.onSetIsShowLogin(false)
  }

  const onClose = () => {
    props.onSetIsShowLogin(false)
  }

  const handleOAuthGithub = () => {}
  return (
    <Modal
      maskClosable={false}
      title="手机号登录"
      okText="登录"
      cancelText="取消"
      open={props.isShow}
      onOk={onOk}
      onCancel={onClose}>
      <Input
        size="large"
        placeholder="请输入手机号"
        prefix={<UserOutlined />}
        value={form.phone}
        onChange={handleFormChange}
        name="phone"
      />
      <Input
        style={{ marginTop: 10, marginBottom: 10, width: 200 }}
        size="large"
        placeholder="请输入验证码"
        prefix={<CopyOutlined />}
        value={form.verify}
        onChange={handleFormChange}
        name="verify"
      />
      {isShowVerifyCode ? (
        <CountDown time={10} onEnd={handleCountDownEnd} />
      ) : (
        <Button
          onClick={handleGetVerifyCode}
          style={{ marginLeft: 20, width: 150 }}>
          点击获取验证码
        </Button>
      )}

      <Button
        type="link"
        className={styles.otherLogin}
        danger
        onClick={handleOAuthGithub}>
        使用 GitHub 登录
      </Button>
      <div className={styles.loginPrivacy}>
        登录即代表您已同意
        <a href="https://moco.imooc.com/privacy.html" target="_blank">
          《用户隐私协议》
        </a>
      </div>
    </Modal>
  )
}

export default Login
