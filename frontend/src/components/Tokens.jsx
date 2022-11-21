import React from "react";
import axios from "axios";

const Tokens = ({ wallet, chain, tokens, setTokens }) => {
  const getTokenBalances = async () => {
    const response = await axios.get(`http://localhost:8000/token-balances`, {
      params: {
        address: wallet,
        chain: chain,
      },
    });

    if (response.data) {
      let t = response.data;

      for (let i = 0; i < t.length; i++) {
        t[i].bal = (
          Number(t[i].balance) / Number(`1E${t[i].decimals}`)
        ).toFixed(3);
        t[i].val = (
          (Number(t[i].balance) / Number(`1E${t[i].decimals}`)) *
          Number(t[i].usd)
        ).toFixed(3);
      }

      setTokens(t);
    }
  };

  return (
    <>
      <p>
        <button onClick={getTokenBalances}>Get Tokens</button>
        <br />
        {tokens.length > 0 &&
          tokens.map((token) => (
            <>
              <span>
                {token.symbol} {token.bal}, (${token.val})
              </span>
              <br />
            </>
          ))}
      </p>
    </>
  );
};

export default Tokens;
