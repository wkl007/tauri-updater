import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { getVersion } from '@tauri-apps/api/app'
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

function App () {
  const [count, setCount] = useState(0)
  const [version, setVersion] = useState()
  const [tip, setTip] = useState()

  useEffect(() => {
    const version = async () => {
      const res = await getVersion()
      setVersion(res)
    }
    const update = async () => {
      try {
        const { shouldUpdate, manifest } = await checkUpdate()
        if (shouldUpdate) {
          setTip(`Installing update ${manifest?.version}, ${manifest?.date}, ${manifest.body}`)
          // display dialog
          await installUpdate()
          // install complete, restart app
          await relaunch()
        }
      } catch (error) {
        setTip(JSON.stringify(error))
      }
    }

    update()
    version()
  }, [])

  return (<div className="App">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" className="logo" alt="Vite logo"/>
      </a>
      <a href="https://reactjs.org" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo"/>
      </a>
    </div>
    <h1>当前版本：{version}</h1>
    <h2>{tip}</h2>
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </div>
    <p className="read-the-docs">
      Click on the Vite and React logos to learn more
    </p>
  </div>)
}

export default App
