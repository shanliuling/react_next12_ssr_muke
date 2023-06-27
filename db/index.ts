// 数据库
import 'reflect-metadata'
import { createConnection, getConnection, Connection } from 'typeorm'
import { User, UserAuths } from './entity/index'
let connectionReadyPromise: Promise<Connection> | null = null
const host = process.env.DATABASE_HOST
const port = Number(process.env.DATABASE_PROT)
const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD
const database = process.env.DATABASE_NAME
export const prepareConnection = async () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection()
        await staleConnection.close()
        console.log('数据库连接成功')
      } catch (error) {
        console.log('数据库连接失败')
      }

      const connection = await createConnection({
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        entities: [User, UserAuths], // 你的实体类 也就是你的数据库表 你可以在这里统一导入
        synchronize: false,
        logging: true,
      })
      return connection
    })()
  }
  return connectionReadyPromise
}
