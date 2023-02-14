import type { NextPage } from "next";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import toast, { Toaster } from "react-hot-toast";

import HomePage from "../components/HomePage";
import NavBar from "../components/NavBar";
import { useEffect } from "react";

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

const Home: NextPage = () => {
  const address = useAddress();

  const welcomeUser = (userName: string, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== "Unnamed" ? ` ${userName}` : ""}`,
      {
        style: {
          background: "#04111d",
          color: "#fff",
        },
      }
    );
  };

  useEffect(() => {
    if (!address) return;
    (async () => {
      // can probably move more of this logic to server
      const userDoc = {
        _type: "users",
        _id: address,
        userName: "Unnamed",
        walletAddress: address,
      };

      const result = await fetch("http://localhost:3000/api/sanity", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userDoc),
      });

      if (result) {
        const jsonData = await result.json();
        const data = JSON.parse(jsonData.data);
        console.log(data);
        console.log(data.userName);
        welcomeUser(data.userName);
        // toast.success(`Welcome ${data.userName}`);
      }
      // .then((data) => {
      //   console.log(data);
      //   welcomeUser(data.userName);
      // })
      // .catch((err) => {
      //   console.log(err.message);
      // });
    })();
  }, [address]);

  return (
    <div className={style.wrapper}>
      <Toaster position="bottom-right" reverseOrder={false} />
      {address ? (
        <>
          <NavBar />
          <HomePage />
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <ConnectWallet />
          <div className={style.details}>
            You need a modern browser with a <br />
            Web3 wallet to run this app.
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
