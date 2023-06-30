interface ICookieInfo {
  userId: number
  nickname: string
  avatar: string
}

export const setCookie = (
  cookies: any,
  { userId, nickname, avatar }: ICookieInfo
) => {
  // 登录时效 24h
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const path = '/' // cookie生效的路径 默认是'/' 表示整个网站都可以访问 如果设置为'/user' 则只有/user下的页面可以访问
  cookies.set('userId', userId, { expires, path })
  cookies.set('nickname', nickname, { expires, path })
  cookies.set('avatar', avatar, { expires, path })
}
