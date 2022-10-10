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
        <div>
            <h1>Portfolio Total value</h1>
            <p>
                <span>Total Balance: ${ totalValue }</span>
            </p>
        </div>
    );
}

export default PortfolioValue;
