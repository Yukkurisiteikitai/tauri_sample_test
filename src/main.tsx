import React, { useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import './App.css'

function App() {
  const [greetMsg, setGreetMsg] = useState('')
  const [name, setName] = useState('')
  const [count, setCount] = useState(0)

  async function greet() {
    const msg = await invoke<string>('greet', { name })
    setGreetMsg(msg)
  }

  async function handleAdd() {
    const result = await invoke<number>('add', { a: count, b: 1 })
    setCount(result)
  }

  return (
    <main className="container">
      <h1>🚀 Tauri + React</h1>
      
      <div className="row">
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="名前を入力"
          value={name}
        />
        <button onClick={greet}>挨拶</button>
      </div>

      <p>{greetMsg}</p>

      <div className="counter-section">
        <h2>カウンター: {count}</h2>
        <button onClick={handleAdd}>+1</button>
      </div>

      <p className="info">
        Tauri + Reactのサンプルプロジェクトです
      </p>
    </main>
  )
}

export default App
