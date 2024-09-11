import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    return <div>
        <button onClick={function() {
            const seed = mnemonicToSeed(mnemonic);
            console.log('seed', seed)
            const path = `m/44'/501'/${currentIndex}'/0'`;
            console.log('path',path)
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            console.log('derivedSeed', derivedSeed)
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            console.log('secret',secret)
            const keypair = Keypair.fromSecretKey(secret);
            console.log('keypair',keypair)
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey]);
        }}>
           Create Sol Wallet
        </button>
        {publicKeys.map((p,i) => <div key={i}>
            {p.toBase58()}
        </div>)}
    </div>
}