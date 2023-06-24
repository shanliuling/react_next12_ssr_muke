import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from 'config/index'
//  withIronSessionApiRoute 会自动帮你处理好session 你只需要req.session就可以拿到session
//  ironOptions 是加密的配置 你可以在config/index.ts里面配置
export default withIronSessionApiRoute(Login, ironOptions)

// 告诉我res和req是做什么的

async function Login(req: NextApiRequest, res: NextApiResponse) {
  const { phone = '', verify = '' } = req.body
  console.log(phone, verify)
  res.status(200).json({ code: 0, msg: '登录成功' })
}
