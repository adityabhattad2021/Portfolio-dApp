import './App.css';
import {  useState } from 'react';
import WalletInputs from './components/WalletInputs';
import NativeTokens from './components/NativeTokens';
import Tokens from './components/Tokens';
import PortfolioValue from './components/PortfolioValue';
import TokenTransferHistory from './components/TokenTransferHistory';
import NFTs from './components/NFTs';

function App() {

  const [wallet, setWallet] = useState("");
  const [chain, setChain] = useState("0x1");
  const [nativeBalance, setNativeBalance] = useState(0);
  const [nativeValue, setNativeValue] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [tokenTransfers, setTokenTransfers] = useState([]);
  const [nfts, setNFTs] = useState([])
  const [filteredNFTs, setFilteredNFTs] = useState([]);

  return (
    <div className="App">
      <WalletInputs
        chain={chain}
        setChain={setChain}
        wallet={wallet}
        setWallet={setWallet}
      />
      <NativeTokens
        wallet={wallet}
        chain={chain}
        nativeBalance={nativeBalance}
        setNativeBalance={setNativeBalance}
        nativeValue={nativeValue}
        setNativeValue={setNativeValue}
      />
      <Tokens
        wallet={wallet}
        chain={chain}
        tokens={tokens}
        setTokens={setTokens}
      />
      <PortfolioValue
        nativeValue={nativeValue}
        tokens={tokens}
      />
      <TokenTransferHistory
        chain={chain}
        wallet={wallet}
        transfers={tokenTransfers}
        setTransfers={setTokenTransfers}
      />
      <NFTs
        wallet={wallet}
        chain={chain}
        nfts={nfts}
        setNfts={setNFTs}
        filteredNFTs={filteredNFTs}
        setFilteredNFTs={setFilteredNFTs}
      />
    </div>
  );
}

export default App;
