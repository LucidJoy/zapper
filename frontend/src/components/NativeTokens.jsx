import React from "react";
import axios from "axios";

const NativeTokens = ({
  wallet,
  chain,
  nativeBalance,
  setNativeBalance,
  nativeValue,
  setNativeValue,
}) => {
  const getNativeBalance = async () => {
    const response = await axios.get(`http://localhost:8000/native-balance`, {
      params: {
        address: wallet,
        chain: chain,
      },
    });

    if (response.data.balance && response.data.usd) {
      setNativeBalance((Number(response.data.balance) / 1e18).toFixed(3));
      setNativeValue(
        (
          (Number(response.data.balance) / 1e18) *
          Number(response.data.usd)
        ).toFixed(2)
      );
    }
  };

  return (
    <>
      <h1>Fetch tokens</h1>
      <p>
        <button onClick={getNativeBalance}>Fetch balance</button>
        <br />
        <span>
          Native Balance: {nativeBalance}, (${nativeValue})
        </span>
      </p>
    </>
  );
};

export default NativeTokens;
