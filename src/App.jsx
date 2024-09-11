import { useState } from 'react'
import { generateMnemonic } from "bip39";
import './App.css'
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EtherWallet';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <div>
      <input type="text" value={mnemonic}></input>
      <button onClick={async function() {
        const mn = await generateMnemonic();
        setMnemonic(mn)
      }}>
        Create Seed Phrase
      </button>
      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} />
    </div>
  )
}

export default App
