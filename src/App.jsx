import { useEffect, useState } from 'react'
import { getVersion } from '@tauri-apps/api/app'
import { checkUpdate } from '@tauri-apps/api/updater'
import './App.css'

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function App () {
  const [version, setVersion] = useState()
  const [newVersion, setNewVersion] = useState()

  useEffect(() => {
    const version = async () => {
      const res = await getVersion()
      setVersion(res)
    }

    const update = async () => {
      try {
        console.log('start')
        await delay(1e3)
        console.log('delay')
        const { shouldUpdate, manifest } = await checkUpdate()
        console.log(shouldUpdate, JSON.stringify(manifest))
        setNewVersion(manifest.version)
        console.log('end')
      } catch (error) {
        console.log(error)
      }
    }

    update()
    version()
  }, [])

  return (<div className="App">
    <h1>current version: {version}</h1>
    <h1>new version: {newVersion}</h1>
  </div>)
}

export default App
