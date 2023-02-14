import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChainId,
  ThirdwebNftMedia,
  ThirdwebSDKProvider,
  useContract,
  useNFTs,
  useListings,
} from "@thirdweb-dev/react";
import { ThirdwebSDK, Marketplace } from "@thirdweb-dev/sdk";

import NavBar from "../../components/NavBar";
import siteConfig from "../../lib/siteConfig";

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
};

const Collection = () => {
  const router = useRouter();
  // const { provider } = useWeb3(); // won't work
  const { collectionId } = router.query; // destructured collectionId from the router path
  const { contract: marketplace } = useContract(
    siteConfig.deployedContract,
    "marketplace"
  );
  const activeCollectionContractAddressAsString = collectionId?.toString();
  const { contract: activeCollection } = useContract(
    activeCollectionContractAddressAsString
  );
  const { data: nfts, isLoading: isReadingNfts } = useNFTs(activeCollection);
  const {
    data: listings,
    isLoading: isLoadingListings,
    error,
  } = useListings(marketplace, {
    tokenContract: activeCollectionContractAddressAsString,
  });
  // console.log("----------");
  // console.log("typeof: " + typeof listings);
  // console.log(listings);
  // console.log("----------");

  // console.log(nfts);

  const [collection, setCollection] = useState({});
  // const [nfts, setNfts] = useState([]);

  // const [listingsState, setListingsState] = useState([]);

  return (
    <>
      <NavBar />
      <Link href="/">
        <h2 className="text-white">{router.query.collectionId}</h2>
      </Link>
      <div>
        <h2 className="text-white text-3xl p-3">NFTs in collection</h2>
        {isReadingNfts ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 p-3">
            {nfts?.map((nft) => (
              <div key={`container-${nft.metadata.id}`} className="text-white">
                <ThirdwebNftMedia
                  key={nft.metadata.id}
                  metadata={nft.metadata}
                  height={"200"}
                />
                <div key={`name-${nft.metadata.id}`} className="text-white">
                  {nft.metadata.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Collection;
