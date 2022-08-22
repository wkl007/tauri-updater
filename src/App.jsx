import { useEffect, useState } from 'react'
import { getVersion } from '@tauri-apps/api/app'
import { checkUpdate } from '@tauri-apps/api/updater'
import { getMatches } from '@tauri-apps/api/cli'
import useWindowEvent from './useWindowEvent.js'
import './App.css'

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function App () {
  const [args, setArgs] = useState([])

  useWindowEvent('single-instance', (e) => {
    console.log(222, e)
  })

  useEffect(() => {
    const match = async () => {
      const matches = await getMatches()
      console.log(111, matches)
      if (matches.subcommand?.name === 'run') {
        // `./your-app run $ARGS` was executed
        const args = matches.subcommand?.matches.args
        if ('debug' in args) {
          // `./your-app run --debug` was executed
        }
      } else {
        const args = matches.args
        // `./your-app $ARGS` was executed
      }
    }
    match()
  }, [])

  return (<div className="App">
    <ul>
      参数列表
      {args.map((i, index) => <li key={index}>{i}</li>)}
    </ul>
  </div>)
}

export default App
