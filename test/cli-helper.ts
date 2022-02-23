import { fork, ChildProcess } from 'child_process'
import { resolve } from 'path'
import { stat } from 'fs/promises'
import { EOL } from 'os'

const modulePath = resolve(__dirname, '..', 'dist', 'index.js')
let isBuiltCheck: Promise<void> = stat(modulePath)
    .then(() => {})
    .catch(e => {
      if (e?.code === 'ENOENT') {
        throw new Error('Code not built. Be sure to run the `npm run build` command prior to running tests.')
      } else {
        throw e
      }
    })

export async function cli (input: string): Promise<string> {
  await isBuiltCheck
  return await new Promise((resolve, reject) => {
    let firstPrompt = true

    // start a child process for the command line interface
    const child = fork(modulePath, [], {
      stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    })

    child?.stdin?.setDefaultEncoding('utf8')
    child?.stdout?.setEncoding('utf8')

    // if there is a problem starting the child process then exit
    child?.on('error', e => {
      child?.kill()
      reject(e)
    })

    child?.stdout?.on('data', data => {
      if (data === '> ' && firstPrompt) {
        firstPrompt = false
        setTimeout(() => {
          child?.stdin?.write(input + EOL)
        })
      } else if (data.startsWith('Result: ')) {
        resolve(data.substring(8).replace(/(?:\r\n|\r|\n)+$/, ''))
        child?.kill()
      }
    })
  })
}
