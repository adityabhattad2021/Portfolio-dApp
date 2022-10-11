import axios from "axios";
import { useEffect, useState } from "react";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Spinner,
} from "@chakra-ui/react";

function Tokens({ wallet, chain, tokens, setTokens }) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (wallet !== "" && chain !== "") {
			getTokenBalancesAndPrice();
		}
	}, [wallet, chain]);

	async function getTokenBalancesAndPrice() {
		setIsLoading(true);
		const response = await axios.get(
			"http://localhost:8080/token-balances",
			{
				params: {
					address: wallet,
					chain: chain,
				},
			}
		);
		if (response.data) {
			let t = response.data;
			for (let i = 0; i < t.length; i++) {
				t[i].bal = (
					Number(t[i].balance) / Number(`1e${t[i].decimals}`)
				).toFixed(3);
				if (chain === "0x1" || chain === "0x89") {
					t[i].val = (Number(t[i].bal) * Number(t[i].usd)).toFixed(2);
				} else {
					t[i].val = 0;
				}
			}
			setTokens(t);
		}
		setIsLoading(false);
	}

	return (
		<div>
			{isLoading ? (
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			) : (
				<div className="flex flex-col">
					<div className="text-xl font-bold p-5 text-left">
						ERC-20 Tokens
					</div>
					{/* <button onClick={getTokenBalancesAndPrice}> Get tokens</button> */}
					<TableContainer>
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th>Token Symbol</Th>
									<Th>Token Balance</Th>
									<Th>Token Token Value </Th>
								</Tr>
							</Thead>
							<Tbody>
								{tokens.length > 0 &&
									tokens.map((token) => {
										return (
											<Tr key={token.token_address}>
												<Td>{token.symbol}</Td>
												<Td>{token.bal}</Td>
												<Td>${token.val}</Td>
											</Tr>
										);
									})}
							</Tbody>
						</Table>
					</TableContainer>
				</div>
			)}
		</div>
	);
}

export default Tokens;
