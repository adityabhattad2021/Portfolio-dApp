import axios from "axios";
import { useEffect } from "react";

function NativeTokens({
	wallet,
	chain,
	nativeBalance,
	setNativeBalance,
	nativeValue,
	setNativeValue,
}) {

	useEffect(() => {
		if (wallet !== "" && chain !== "") {
			getNativeBalance();
		}
	}, [wallet, chain]);

	async function getNativeBalance() {
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
		
	}

	return (
		<div>
			Native Balance: {nativeBalance}, (${nativeValue})
		</div>
	);
}

export default NativeTokens;
