import { useEffect } from 'react'
import { listen } from '@tauri-apps/api/event'

const useWindowEvent = (name, callback) => {
  return useEffect(() => {
    let removeListener
    const setupListener = async () => {
      removeListener = await listen(name, (event) => callback(event))
    }
    setupListener().catch((error) => {
      console.error(`Could not set up window event listener. ${error}`)
    })

    return () => {
      removeListener?.()
    }
  }, [name, callback])
}

export default useWindowEvent
