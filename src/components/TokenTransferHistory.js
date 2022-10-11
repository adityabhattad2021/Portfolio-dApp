import axios from "axios";
import { useEffect, useState } from "react";
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Tooltip,
	Spinner,
} from "@chakra-ui/react";

function TokenTransferHistory({ chain, wallet, transfers, setTransfers }) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (wallet !== "" && chain !== "") {
			getTokenTransferData();
		}
	}, [wallet, chain]);

	async function getTokenTransferData() {
		setIsLoading(true);

		const response = await axios.get(
			"http://localhost:8080/token-transfers",
			{
				params: {
					address: wallet,
					chain: chain,
				},
			}
		);

		if (response.data) {
			setTransfers(response.data);
		}

		setIsLoading(false);
	}

	return (
		<div >
			<div className="text-xl p-5 font-bold text-left">
				Token Transfer History
			</div>
			{/* <button onClick={getTokenTransferData}>Fetch Transfers</button> */}
			{isLoading ? (
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			) : (
				<TableContainer>
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>Token Name</Th>
								<Th>Token Amount</Th>
								<Th>Token To </Th>
								<Th>Token From</Th>
								<Th>Token Date</Th>
							</Tr>
						</Thead>
						<Tbody>
							{transfers.map((tokenTransfer) => {
								return (
									<Tr key={tokenTransfer.transaction_hash}>
										<Td>{tokenTransfer.name}</Td>
										<Td>
											{(
												Number(tokenTransfer.value) /
												Number(
													`1e${tokenTransfer.decimals}`
												)
											).toFixed(2)}{" "}
											{tokenTransfer.symbol}
										</Td>
										<Tooltip
											hasArrow
											label={tokenTransfer.to_address}
										>
											<Td>
												{tokenTransfer.to_address.slice(
													0,
													6
												)}
												...........
												{tokenTransfer.from_address.slice(
													37,
													tokenTransfer.to_address
														.length - 1
												)}
											</Td>
										</Tooltip>

										<Tooltip
											hasArrow
											label={tokenTransfer.from_address}
										>
											<Td>
												{tokenTransfer.from_address.slice(
													0,
													6
												)}
												...........
												{tokenTransfer.to_address.slice(
													37,
													tokenTransfer.to_address
														.length - 1
												)}
											</Td>
										</Tooltip>
										<Td>
											{tokenTransfer.block_timestamp.slice(
												0,
												10
											)}
										</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</div>
	);
}

export default TokenTransferHistory;
