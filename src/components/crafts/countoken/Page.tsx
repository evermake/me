import type { InMessageData, OutMessageData } from './worker'
import { useMemo, useRef, useState } from 'react'

function Page() {
  const idRef = useRef(1)
  const [count, setCount] = useState(-1)
  const send = useMemo(() => {
    const worker = new Worker(
      new URL('./worker.js', import.meta.url),
      { type: 'module' },
    )
    worker.onmessage = (e: MessageEvent<OutMessageData>) => {
      console.info('Incoming message from worker', e.data) // eslint-disable-line no-console
      switch (e.data.event) {
        case 'count-result':
          setCount(e.data.count)
          break
        case 'error':
          console.error('Error from worker', e.data.detail)
          break
        default:
          console.error('Unknown event from worker', e.data satisfies never)
      }
    }
    const sendFn = (data: InMessageData) => {
      worker.postMessage(data)
    }
    sendFn({ action: 'init' })
    return sendFn
  }, [])
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <textarea
          onChange={(e) => {
            send({
              action: 'count',
              reqId: `${idRef.current++}`,
              text: e.target.value,
            })
          }}
          className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          placeholder="Enter your text here to count tokens..."
        />

        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-700">
            Tokens:
            {' '}
            <span className="text-blue-600">{count >= 0 ? count : '—'}</span>
          </div>

          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue="cl100k_base"
          >
            <option value="cl100k_base">cl100k_base (GPT-4, GPT-3.5)</option>
          </select>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Better alternative:
          {' '}
          <a
            href="https://tiktokenizer.vercel.app/"
            className="text-blue-600 hover:text-blue-800 underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            tiktokenizer.vercel.app
          </a>
        </p>
      </div>
    </div>
  )
}

export default Page
