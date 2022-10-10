
function WalletInputs({chain,setChain,wallet,setWallet}) {
    return (
        <div>
            <h1>Set Wallet and Chain</h1>
            <p>
                <span>Set a Wallet</span>
                <input
                    onChange={(e) => setWallet(e.target.value)}
                    value={wallet}
                >
                </input>
            </p>
            <span>Set a chain</span>
            <select onChange={(e) => setChain(e.target.value)} value={ chain } >
                <option value="0x1">ETH</option>
                <option value="0x89">Polygon</option>
                <option value="0x5">Goerli</option>
                <option value="0x13881">Mumbai</option>
            </select>
        </div>
    )
}

export default WalletInputs;