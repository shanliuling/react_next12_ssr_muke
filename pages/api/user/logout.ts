import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { Cookie } from 'next-cookie' // 用于服务端获取cookie
import { ISession } from 'pages/api/index.d'
import { ironOptions } from 'config'
export default withIronSessionApiRoute(logout, ironOptions)

async function logout(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session
  const cookies = Cookie.fromApiRoute(req, res)

  await session.destroy() // 销毁session
  cookies.remove('userId') // 删除cookie
  cookies.remove('nickname')
  cookies.remove('avatar')

  res.status(200).json({
    code: 0,
    msg: '退出成功',
  })
}
