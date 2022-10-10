import axios from "axios";
import { useEffect } from "react";

function Tokens({ wallet, chain, tokens, setTokens }) {
	useEffect(() => {
		if (wallet !== "" && chain !== "") {
			getTokenBalancesAndPrice();
		}
	}, [wallet, chain]);

	async function getTokenBalancesAndPrice() {
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
	}

	return (
		<div>
			{/* <button onClick={getTokenBalancesAndPrice}> Get tokens</button> */}
			<br />
			{tokens.length > 0 &&
				tokens.map((ele) => {
					return (
						<div key={ele.token_address}>
							<span>
								{ele.symbol} {ele.bal} (${ele.val})
							</span>
							<br />
						</div>
					);
				})}
		</div>
	);
}

export default Tokens;
