import { format } from 'date-fns'
import md5 from 'md5'
import { NextApiRequest, NextApiResponse } from 'next'
import { encode } from 'js-base64'
import request from 'service/fetch'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from 'config/index'
import { ISession } from 'pages/api/index.d'

//  withIronSessionApiRoute 会自动帮你处理好session 你只需要req.session就可以拿到session
//  ironOptions 是加密的配置 你可以在config/index.ts里面配置
export default withIronSessionApiRoute(sendVerifyCode, ironOptions)
async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session // 这里的session就是你withIronSessionApiRoute包裹后能取到的session

  const { to = '', templateId = '1' } = req.body
  const AccountId = '2c94811c8853194e0188b523e0262144'
  const AuthToken = '50340f9fc2204058a983074536dba1d9'
  const appId = '2c94811c8853194e0188b523e17f214b'
  const NowDate = format(new Date(), 'yyyyMMddHHmmss')
  const SigParameter = md5(AccountId + AuthToken + NowDate)
  const Authorization = encode(`${AccountId}:${NowDate}`)
  const verifyCode = Math.floor(Math.random() * (9999 - 1000) + 1000) //4位数验证码
  const expireMiunte = 5 //过期时间
  // 业务url
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`

  // 给第三方发送请求 具体看文档 http://doc.yuntongxun.com/pe/5a533de33b8496dd00dce07c
  const response = await request.post(
    url,
    {
      to,
      templateId,
      appId,
      datas: [verifyCode, expireMiunte],
    },
    {
      headers: {
        Authorization,
      },
    }
  )
  // console.log(response)

  const { statusCode, statusMsg, templateSMS } = response as any
  if (statusCode === '000000') {
    session.verifyCode = verifyCode // 将验证码存入session
    await session.save() // 保存session
    res.status(200).json({
      code: 0,
      msg: statusMsg,
      data: {
        templateSMS,
      },
    })
  } else {
    res.status(200).json({
      code: statusCode,
      msg: statusMsg,
    })
  }
}
