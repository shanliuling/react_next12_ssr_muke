import { Button } from 'antd'
import { useEffect, useState } from 'react'

interface IProps {
  time: number
  onEnd: Function
}

const CountDown = (props: IProps) => {
  const { time, onEnd } = props
  const [count, setCount] = useState(time)
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          clearInterval(timer) //清除定时器
          onEnd && onEnd()
          return count
        }
        return count - 1
      })
      return () => {
        clearInterval(timer) //清除定时器
      }
    }, 1000)
  }, [time, onEnd])
  return (
    <Button disabled style={{ marginLeft: 20, width: 150 }}>
      {count}
    </Button>
  )
}
export default CountDown
