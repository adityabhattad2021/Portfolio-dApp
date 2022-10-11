import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Image, Spinner, Input } from "@chakra-ui/react";
import { backendApi } from "../constants";

function NFTs({ wallet, chain, nfts, setNfts }) {
	const [nameFilter, setNameFilter] = useState("");
	const [idFilter, setIdFilter] = useState("");
	const [filteredNFTs, setFilteredNFTs] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		if (nameFilter !== "" || idFilter !== "") {
			let filtered = [];
			try {
				if (nameFilter !== "") {
					for (let i = 0; i < nfts.length; i++) {
						if (nfts[i].name.includes(nameFilter)) {
							// console.log(nfts[i].name.toLowerCase());
							// console.log(nameFilter.toLowerCase());
							filtered.push(nfts[i]);
						}
					}
				}
				if (idFilter !== "") {
					for (let i = 0; i < nfts.length; i++) {
						console.log(nfts[i].token_id);
						console.log(idFilter);
						if (nfts[i].token_id.includes(idFilter)) {
							filtered.push(nfts[i]);
						}
					}
				}
			} catch (error) {
				console.log(error);
			}
			// console.log(filtered);
			setFilteredNFTs(filtered);
		} else {
			setFilteredNFTs(nfts);
		}
	}, [nameFilter, idFilter]);

	useEffect(() => {
		if (wallet !== "" && chain !== "") {
			console.log(
				`in one ${wallet.length !== ""},${
					chain !== ""
				}   {wallet},${chain}`
			);
			console.log("! got trigged");
			getUserNFTs();
		}
	}, []);

	useEffect(() => {
		if (wallet !== "" && chain !== "") {
			console.log(
				`in two ${wallet.length !== ""},${
					chain !== ""
				},   ${wallet},${chain}`
			);
			console.log("2 got tragged");
			getUserNFTs();
		}
	}, [chain, wallet]);

	async function getUserNFTs() {
		setIsFetching(true);
		console.log("Fetch trigged");
		const response = await axios.get(`${backendApi}nft-balance`, {
			params: {
				address: wallet,
				chain: chain,
			},
		});

		if (response.data.length > 0) {
			await nftProcessing(response.data);
		} else {
			setIsFetching(false);
		}
	}

	async function nftProcessing(t) {
		for (let i = 0; i < t.length; i++) {
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
		setFilteredNFTs(t);

		console.log("NFTS set successfully");
		setIsFetching(false);
	}

	return (
		<div>
			<h1 className="text-xl p-5 font-bold text-left">Portfolio NFTs</h1>
			<div>
				<div className="flex flex-row justify-between p-5">
					<Input
						style={{ width: "32rem" }}
						type="text"
						placeholder="Filter by name"
						onChange={(e) => setNameFilter(e.target.value)}
						value={nameFilter}
					/>
					<Input
						style={{ width: "32rem" }}
						type="text"
						placeholder="Filter by ID"
						onChange={(e) => setIdFilter(e.target.value)}
						value={idFilter}
					/>
				</div>

				{isFetching ? (
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
					/>
				) : (
					<div className="grid grid-cols-3 gap-4">
						{filteredNFTs.map((nft) => {
							return (
								<Box
									key={nft.token_hash}
									maxW="300px"
									borderWidth="1px"
									borderRadius="lg"
									overflow="hidden"
									m="6"
								>
									{nft.image && (
										<Image src={nft.image} alt={nft.name} />
									)}
									<Box mt="1" fontWeight="semibold" p="6">
										<span>Name: {nft.name}, </span>
										<span>(ID: {nft.token_id})</span>
									</Box>
								</Box>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default NFTs;
