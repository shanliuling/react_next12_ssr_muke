//为什么这里不能用return
//因为这里是一个异步函数，return只能返回一个promise对象，而不是一个对象
//如果要返回一个对象，需要用到await
//如果不用async，那么就需要用到promise

export default async function name(req, res) {
  const { to = '', templateId = '1' } = req.body
  console.log('to', to)
  console.log('templateId', templateId)
  res.status(200).json({
    code: 0,
    data: 123,
  })
}
