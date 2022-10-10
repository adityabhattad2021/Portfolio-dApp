import axios from "axios";

function NativeTokens({
	wallet,
	chain,
	nativeBalance,
	setNativeBalance,
	nativeValue,
	setNativeValue
}) {
	async function getNativeBalance() {
		const response = await axios
			.get("http://localhost:8080/native-balance", {
				params: {
					address: wallet,
					chain: chain,
				},
			})
			
            if (response.data.balance && response.data.usd) {
                setNativeBalance((Number(response.data.balance)/1e18).toFixed(3));
                setNativeValue(((Number(response.data.balance)/1e18)*(Number(response.data.usd))).toFixed(2));
            }

		console.log(response);
	}

	return (
        <div>
			<h1>Fetch Tokens</h1>
            <p>
                <button onClick={getNativeBalance} >Fetch Balance</button>
                <br />
                <span>
                    Native Balance: {nativeBalance}, (${nativeValue})
                </span>
            </p>
		</div>
	);
}

export default NativeTokens;
