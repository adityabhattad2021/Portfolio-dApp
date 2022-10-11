import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { backendApi } from "../constants";

function NativeTokens({
	wallet,
	chain,
	nativeBalance,
	setNativeBalance,
	nativeValue,
	setNativeValue,
}) {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (wallet !== "" && chain !== "") {
			getNativeBalance();
		}
	}, [wallet, chain]);

	async function getNativeBalance() {
		setIsLoading(true);
		const response = await axios.get(`${backendApi}native-balance`, {
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

		// console.log(response);
		setIsLoading(false);
	}

	return (
		<div className="p-5">
			{isLoading ? (
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			) : (
				<div className="text-xl font-bold flex flex-row justify-between">
					<div>Native Balance: </div>
					<div>
						{nativeBalance}{" "}
						{chain === "0x89" || chain === "0x13881"
							? "MATIC"
							: "ETH"}
						, (${nativeValue})
					</div>
				</div>
			)}
		</div>
	);
}

export default NativeTokens;
