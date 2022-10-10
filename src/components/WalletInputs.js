import { Input, Heading, Select, Text } from "@chakra-ui/react";

function WalletInputs({ chain, setChain, wallet, setWallet }) {
	return (
		<div>
			{/* <h1>Set Wallet and Chain</h1> */}
			<Heading>Web3-Portfolio</Heading>
			<div style={{ width: "400px" }}>
				<Text>Set a Wallet</Text>
				<Input
					placeholder="Enter your wallet address here"
					value={wallet}
					onChange={(e) => setWallet(e.target.value)}
				/>
			</div>

			<div style={{ width: "150px" }}>
				<Text>Select a chain</Text>
				<Select
					onChange={(e) => setChain(e.target.value)}
					value={chain}
					placeholder="Select a chain"
				>
					<option value="0x1">ETH</option>
					<option value="0x89">Polygon</option>
					<option value="0x5">Goerli</option>
					<option value="0x13881">Mumbai</option>
					<option value="0x4">Rinkeby</option>
				</Select>
			</div>
		</div>
	);
}

export default WalletInputs;
