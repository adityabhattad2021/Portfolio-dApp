import axios from "axios";
import { useEffect, useState } from "react";
import {Spinner} from "@chakra-ui/react"

function NativeTokens({
	wallet,
	chain,
	nativeBalance,
	setNativeBalance,
	nativeValue,
	setNativeValue
}) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (wallet !== "" && chain !== "") {
			getNativeBalance();
		}
	}, [wallet, chain]);

	async function getNativeBalance() {
		setIsLoading(true);
		const response = await axios.get(
			"http://localhost:8080/native-balance",
			{
				params: {
					address: wallet,
					chain: chain,
				},
			}
		);

		if (response.data.balance && response.data.usd) {
			setNativeBalance((Number(response.data.balance) / 1e18).toFixed(3));
			setNativeValue(
				(
					(Number(response.data.balance) / 1e18) *
					Number(response.data.usd)
				).toFixed(2)
			);
		}

		// console.log(response);
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
				<div>
					Native Balance: {nativeBalance}, (${nativeValue})
				</div>
			)}
		</div>
	);
}

export default NativeTokens;
