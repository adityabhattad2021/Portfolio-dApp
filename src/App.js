import "./App.css";
import { useState } from "react";
import WalletInputs from "./components/WalletInputs";
import NativeTokens from "./components/NativeTokens";
import Tokens from "./components/Tokens";
import PortfolioValue from "./components/PortfolioValue";
import TokenTransferHistory from "./components/TokenTransferHistory";
import NFTs from "./components/NFTs";
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Spinner,
} from "@chakra-ui/react";

function App() {
	const [wallet, setWallet] = useState("");
	const [chain, setChain] = useState("");
	const [nativeBalance, setNativeBalance] = useState(0);
	const [nativeValue, setNativeValue] = useState(0);
	const [tokens, setTokens] = useState([]);
	const [tokenTransfers, setTokenTransfers] = useState([]);
	const [nfts, setNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  

  console.log(chain);


	return (
		<div className="App">
			<WalletInputs
				chain={chain}
				setChain={setChain}
				wallet={wallet}
				setWallet={setWallet}
			/>
			<Tabs variant="soft-rounded" colorScheme="green">
				<TabList>
					<Tab>Tokens</Tab>
					<Tab>NFTs</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
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
					</TabPanel>
					<TabPanel>
						<NFTs
							wallet={wallet}
							chain={chain}
							nfts={nfts}
							setNfts={setNFTs}
							filteredNFTs={filteredNFTs}
							setFilteredNFTs={setFilteredNFTs}
						/>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
}

export default App;
