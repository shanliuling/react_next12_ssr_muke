export const ironOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME as string, //
  password: process.env.SESSION_PASSWORD as string, // 加密密码
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 1000, // 1 days 有效期
    secure: process.env.NODE_ENV === 'production',
  },
}
