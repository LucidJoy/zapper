import React, { useState } from "react";
import axios from "axios";

import WalletInputs from "./components/WalletInputs";
import NativeTokens from "./components/NativeTokens";
import "./App.css";

function App() {
  const [wallet, setWallet] = useState("");
  const [chain, setChain] = useState("0x1");
  const [nativeBalance, setNativeBalance] = useState(0);
  const [nativeValue, setNativeValue] = useState(0);

  return (
    <div className='App'>
      <WalletInputs
        wallet={wallet}
        setWallet={setWallet}
        chain={chain}
        setChain={setChain}
      />
      <NativeTokens
        wallet={wallet}
        chain={chain}
        nativeBalance={nativeBalance}
        setNativeBalance={setNativeBalance}
        nativeValue={nativeValue}
        setNativeValue={setNativeValue}
      />
    </div>
  );
}

export default App;
