import { format } from 'date-fns'
import md5 from 'md5'
import { NextApiRequest, NextApiResponse } from 'next'
import { encode } from 'js-base64'
import request from 'service/fetch'
export default async function sendVerifyCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  console.log(NowDate)
  console.log(SigParameter)
  console.log(Authorization)
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
  console.log(response)

  res.status(200).json({
    code: 0,
    data: 123,
  })
}
