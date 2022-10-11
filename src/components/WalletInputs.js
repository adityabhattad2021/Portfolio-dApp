import { Input, Heading, Select, Text } from "@chakra-ui/react";

function WalletInputs({ chain, setChain, wallet, setWallet }) {
	return (
		<div className="p-5 flex flex-row justify-between">
			{/* <h1>Set Wallet and Chain</h1> */}
			<Heading>Web3-Portfolio</Heading>
			<div className="flex flex-row">
				<div style={{ width: "400px" }}>
					<Text>Set a Wallet</Text>
					<Input
						placeholder="Enter your wallet address here"
						value={wallet}
						onChange={(e) => setWallet(e.target.value)}
					/>
				</div>

				<div className="pl-2" style={{ width: "200px" }}>
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
		</div>
	);
}

export default WalletInputs;
