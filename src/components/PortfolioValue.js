import { useState, useEffect } from "react";

function PortfolioValue({ nativeValue, tokens }) {
	const [totalValue, setTotalValue] = useState(0);

	useEffect(() => {
		let val = 0;
		for (let i = 0; i < tokens.length; i++) {
			val += Number(tokens[i].val);
		}
		val += Number(nativeValue);
		setTotalValue(val.toFixed(2));
	}, [nativeValue, tokens]);

	return (
		<div className="p-5 py-16  flex justify-between text-2xl font-bold">
			{/* <h1>Portfolio Total value</h1>
            <p>
                <span>Total Balance: ${ totalValue }</span>
            </p> */}
			<div>Total Portfolio Balance</div>
			<div>${totalValue}</div>
		</div>
	);
}

export default PortfolioValue;
