import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from 'config/index'
import { ISession } from 'pages/api/index.d'
import { prepareConnection } from 'db/index' // 连接数据库
import { User, UserAuths } from 'db/entity/index'
//  withIronSessionApiRoute 会自动帮你处理好session 你只需要req.session就可以拿到session
//  ironOptions 是加密的配置 你可以在config/index.ts里面配置
export default withIronSessionApiRoute(Login, ironOptions)

//
async function Login(req: NextApiRequest, res: NextApiResponse) {
  const { phone = '', verify = '', identity_type = 'phone' } = req.body
  const db = await prepareConnection() // 连接数据库
  const userRepo = db.getRepository(User) // 获取User表
  const userAuthRepo = db.getRepository(UserAuths)
  const users = await userRepo.find() // 查找所有用户
  const session: ISession = req.session // 这里的session就是你withIronSessionApiRoute包裹后能取到的session

  if (String(session.verifyCode) === String(verify)) {
    // 验证码正确 在表中查找
    const userAuth = await userAuthRepo.findOne({
      where: {
        identity_type,
        identifier: phone,
      },
      relations: ['user'],
    })

    if (userAuth) {
      // 已存在的用户
      const user = userAuth.user
      const { id, nickname, avatar } = user
      session.userId = id
      session.nickname = nickname
      session.avatar = avatar
      console.log(session)

      await session.save()
      res.status(200).json({
        phone,
        verify,
        code: 0,
        msg: '登录成功',
        data: {
          userId: id,
          nickname,
          avatar,
        },
      })
    } else {
      // 新用户,自动注册
      const user = new User()
      user.nickname = `用户_${phone}`
      user.avatar = '/images/111.png'
      user.job = '暂无'
      user.introduce = '暂无'

      const userAuth = new UserAuths()
      userAuth.identity_type = identity_type
      userAuth.identifier = phone
      userAuth.credential = session.verifyCode
      userAuth.user = user // 关联user

      const resUserAuth = await userAuthRepo.save(userAuth) // 保存userAuth
      const {
        user: { id, nickname, avatar },
      } = resUserAuth

      session.userId = id
      session.nickname = nickname
      session.avatar = avatar
      console.log(session)

      await session.save() // 保存session
      console.log('resUserAuth', resUserAuth)
      res.status(200).json({
        phone,
        verify,
        code: 0,
        msg: '登录成功',
        data: {
          userId: id,
          nickname,
          avatar,
        },
      })
    }
  } else {
    res.status(200).json({
      code: -1,
      msg: '验证码错误',
    })
  }
}
