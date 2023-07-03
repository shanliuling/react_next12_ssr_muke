import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { Cookie } from 'next-cookie' // 用于服务端获取cookie
import { ironOptions } from 'config/index'
import { ISession } from 'pages/api/index.d'
import { prepareConnection } from 'db/index' // 连接数据库
import { User, UserAuths } from 'db/entity/index'
import requestInstance from 'service/fetch'
import { setCookie } from 'utils'
export default withIronSessionApiRoute(redirect, ironOptions)

async function redirect(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session

  const { code } = req.query
  const githubClientID = '55f016ec57581f96e090'
  const githubSecrect = '99b5c3eabe7d9dca7ab4ebb2b795c45eef2622cd'

  const githubRedirectUri = `https://github.com/login/oauth/access_token?client_id=${githubClientID}&client_secret=${githubSecrect}&code=${code}`
  const result = await requestInstance.post(
    githubRedirectUri,
    {},
    {
      headers: {
        accept: 'application/json', // github要求必须要有这个头 不然返回的是text/html 会报错
      },
    }
  )
  console.log(requestInstance)
  const { access_token } = result as any
  console.log(access_token)

  const githubUserInfo = await requestInstance.get(
    `https://api.github.com/user`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `token ${access_token}`,
      },
    }
  )
  console.log(githubUserInfo)
  const cookies = Cookie.fromApiRoute(req, res) // 用于服务端获取cookie
  const db = await prepareConnection() // 连接数据库
  const userAuth = await db.getRepository(UserAuths).findOne({
    where: {
      identity_type: 'github',
      identifier: githubClientID,
    },
    relations: ['user'],
  }) //findOne()方法是TypeORM中的一个方法，用于查找数据库中的一条记录 where：一个对象，表示要查找的记录的条件 relations：一个数组，表示要查找的记录与其他表之间的关系。
  if (userAuth) {
    // 已存在的用户 直接登录 更新credential
    const user = userAuth.user
    const { id, nickname, avatar } = user

    userAuth.credential = access_token //

    session.userId = id
    session.nickname = nickname
    session.avatar = avatar

    await session.save()
    setCookie(cookies, { userId: id, nickname, avatar }) // 设置cookie
    res.writeHead(302, {
      Location: '/',
    })
  } else {
    //  创建新用户
    const { login = '', avatar_url = '' } = githubUserInfo as any
    const user = new User()
    user.nickname = login
    user.avatar = avatar_url

    const userAuth = new UserAuths()
    userAuth.identity_type = 'github'
    userAuth.identifier = githubClientID
    userAuth.credential = access_token
    userAuth.user = user

    const userAuthRepo = db.getRepository(UserAuths)
    const resUserAuth = await userAuthRepo.save(userAuth)
  }
}
