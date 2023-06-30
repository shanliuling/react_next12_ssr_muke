import React, { ReactElement, createContext } from 'react'
// 5.x 版本后，不再需要使用 Provider 来包裹组件，而是使用 useLocalObservable 来创建 store 实例
// 然后在组件中使用 useLocalStore 来获取 store 实例 。
// enableStaticRendering 用于服务端渲染，如果是服务端渲染，那么就不需要使用 mobx-react-lite 来渲染组件
import { useLocalObservable, enableStaticRendering } from 'mobx-react-lite'
import createStore, { IStore } from './rootStore'

interface IProps {
  children: ReactElement
  initialValue: Record<any, any>
}
enableStaticRendering(!process.browser) // 如果是服务端渲染，那么就不需要使用 mobx-react-lite 来渲染组件

const StoreContext = createContext({})

export const StoreProvider = ({ initialValue, children }: IProps) => {
  const store: IStore = useLocalObservable(createStore(initialValue))
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const store: IStore = React.useContext(StoreContext) as IStore
  if (!store) {
    throw new Error('数据不存在')
  }
  return store
}
