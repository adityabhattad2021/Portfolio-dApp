import axios from "axios";

function TokenTransferHistory({ chain, wallet, transfers, setTransfers }) {
	async function getTokenTransferData() {
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
	}

	

	return (
		<div>
			<h1>Token transfer history</h1>
			<div>
				<button onClick={getTokenTransferData}>Fetch Transfers</button>

				<table>
					<tbody>
						<tr>
							<th>Token Name</th>
							{/* <th>Token Symbol</th> */}
							<th>Token Amount</th>
							<th>Token From </th>
							<th>Token To</th>
							<th>Token Date</th>
						</tr>
						{transfers.map((tokenTransfer) => {
							return (
								<tr key={tokenTransfer.block_timestamp}>
									<td>{tokenTransfer.name}</td>
									{/* <td>{ tokenTransfer.symbol }</td> */}
									<td>
										{(
											Number(tokenTransfer.value) /
											Number(
												`1e${tokenTransfer.decimals}`
											)
										).toFixed(2)}{" "}
										{tokenTransfer.symbol}
									</td>
									<td>{tokenTransfer.from_address}</td>
									<td>{tokenTransfer.to_address}</td>
									<td>{tokenTransfer.block_timestamp}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default TokenTransferHistory;
