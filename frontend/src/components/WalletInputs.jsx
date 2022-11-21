import React from "react";

const WalletInputs = ({ wallet, setWallet, chain, setChain }) => {
  return (
    <>
      <h1>Input a Wallet and Chain</h1>
      <p>
        <span>Set Wallet</span>
        <input onChange={(e) => setWallet(e.target.value)} value={wallet} />
      </p>

      <span>Set Chain</span>
      <select onChange={(e) => setChain(e.target.value)} value={chain}>
        <option value='0x1'>ETH</option>
        <option value='0x89'>Polygon</option>
      </select>
    </>
  );
};

export default WalletInputs;
