import axios from "axios";
import { useEffect,useState } from "react";

function NFTs({ wallet, chain, nfts, setNfts }) {

    const [nameFilter, setNameFilter] = useState("");
    const [idFilter, setIdFilter] = useState("");
    const [filteredNFTs, setFilteredNFTs] = useState([]);

    useEffect(() => {
        if (nameFilter!=="" || idFilter!=="") {
            
            let filtered = []
            if (nameFilter !== "") {
                for (let i = 0; i < nfts.length; i++) {
                    if (nfts[i].name.toLowerCase().includes(nameFilter.toLowerCase()) ) {
                        // console.log(nfts[i].name.toLowerCase());
                        // console.log(nameFilter.toLowerCase());
                        filtered.push(nfts[i])
                    }
                }
            }
            if (idFilter !=="") {
                for (let i = 0; i < nfts.length; i++) {
                    console.log(nfts[i].token_id);
                    console.log(idFilter);
                    if (nfts[i].token_id.includes(idFilter) ) {
                        filtered.push(nfts[i])
                    }
                }
            }
            // console.log(filtered);
            setFilteredNFTs(filtered);
        } else {
            setFilteredNFTs(nfts);
        }
    },[nameFilter, idFilter])


    async function getUserNFTs() {

        console.log("Fetch trigged");
        const response = await axios.get("http://localhost:8080/nft-balance", {
            params: {
                address: wallet,
                chain:chain
            }
        })



        if (response.data) {
            await nftProcessing(response.data)
        }

    }

    async function nftProcessing(t) {
        for (let i = 0; i < t.length; i++){
            let metadata = JSON.parse(t[i].metadata);



            if (metadata && metadata.image) {

                if (metadata.image.includes(".")) {
                    t[i].image = metadata.image;
                } else {
                    t[i].image = "https://ipfs.io/ipfs/" + metadata.image;
                }

            }
        }

        setNfts(t);
        setFilteredNFTs(t)

        console.log("NFTS set successfully");
    }

   

    return (
        <div>
            <h1>Portfolio NFTs</h1>
            <div>

                <button onClick={getUserNFTs}>Fetch NFTs</button>
                <br />
                <input type="text" placeholder="Filter by name" onChange={(e) => setNameFilter(e.target.value)} value={nameFilter} />
                <input type="text" placeholder="Filter by ID" onChange={(e) => setIdFilter(e.target.value)} value={idFilter} />
                <br />
                {filteredNFTs.map((nft) => {
                    return (
                        <div key={nft.token_id}>
                            {nft.image && <img src={nft.image} width={200} />}
                            <span>Name: { nft.name }, </span>
                            <span>(ID: { nft.token_id })</span>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default NFTs;