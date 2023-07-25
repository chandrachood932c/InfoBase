import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";
import meetSciNFT from "./MeetSciNFT.json";
import meetSci from "./MeetSci.json";
import acl from "./ACL.json";
import tokenDeployer from "./TokenDeployer.json";
import pool from "./Pool.json";
import token from "./Token.json";
import { ethers, utils } from "ethers";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import lighthouse, { upload } from "@lighthouse-web3/sdk";
// import { Web3Storage } from "web3.storage";

const CreateMeetContext = createContext({});

const meetSciContractAddress = "0x4e122EB60284E8D93d78E1b07A25860E1bf1109E";
const nftContractAddress = "0xDF6E9c4d51BD389a9bde27e1c1F2773fFFEEBe3E";
const accessListContractAddress = "0xd33D5E2155288d8aDB7492d8cEd3161998D1EA2b";
const tokenDeployerAddress = "0xE8068C23B6604B650aA5EE6e229a0A85855C7A6E";
const poolAddress = "0x4e122EB60284E8D93d78E1b07A25860E1bf1109E";

const meetSciAbi = meetSci.abi;
const nftAbi = meetSciNFT.abi;
const accessListAbi = acl.abi;
const tokenAbi = token.abi;
const tokenDeployerAbi = tokenDeployer.abi;
const poolAbi = pool.abi;

// function makeStorageClient() {
//   return new Web3Storage({
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ5RTNjMTkxMThiODkzY2RGNTU1MzI3QTREODBCYTZFOEE3NGMwMzgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODI2ODMyMDY0MDAsIm5hbWUiOiJJbmZvQmFzZSJ9.ZEVAErCprVgw0mehsGzxZb6GlEP1pW_fwj-tRTUl2_I",
//   });
// }

export const CreateMeetProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleAddworkModal, setToggleAddworkModal] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [authentication, setAuthentication] = useState(false);
  const [exploreResearchers, setExploreResearchers] = useState([]);
  const [exploreResearchPapers, setExploreResearchPapers] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [form, setForm] = useState({
    alias: "",
    department: "",
    tokenSymbol: "",
    maxSupply: "",
  });
  const [workForm, setWorkForm] = useState({
    title: "",
    description: "",
    department: "",
    uploadFile: "",
    uploadThumbnail: "",
  });
  const [fundingAmount, setFundingAmount] = useState(0);
  const [isFund, setIsFund] = useState(false);
  const [leaderboardFund, setLeaderboardFund] = useState(false);
  const [matchingValue, setMatchingValue] = useState(0);
  const [thumbnail, setThumbnail] = useState(null);
  const [date, setDate] = useState("");

  // HUDDLE
  const [researchCardAddr, setResearchCardAddr] = useState("");
  const [roomId, setRoomId] = useState("");
  const [currentProfile, setCurrentProfile] = useState({
    researcherId: "",
    researcherAddress: "",
    tokenAddress: "",
  });

  const [currResearcherId, setCurrResearcherId] = useState(0);
  const [currPaper, setCurrPaper] = useState({});
  const [currentSuggestionsIds, setCurrentSuggestionsIds] = useState([]);
  const [currentSuggestionsSim, setCurrentSuggestionsSim] = useState([]);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const [language, setLanguage] = useState("e");

  const router = useRouter();

  const storeFiles = async (files) => {
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
  };

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (e) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    try {
      e.persist();
      console.log("Lighthouse object: ", lighthouse);

      // const output = await lighthouse.upload(e,"0b3c3932.48efe20e0ff742b9971d2d2c40947539",progressCallback);
      const output = await upload(
        e,
        "0b3c3932.48efe20e0ff742b9971d2d2c40947539",
        progressCallback
      );
      console.log("File Status:", output);
      /*
        output:
          data: {
            Name: "filename.txt",
            Size: 88000,
            Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
          }
        Note: Hash in response is CID.
      */

      console.log(
        "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
      );
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setAddress(accounts[0]);
      } else {
        console.log("No accounts found.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     await checkIfWalletIsConnected();
  //   })();
  // }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    handleSwitchNetwork();

    setAddress(accounts[0]);
    return accounts[0];
  };

  const handleAddToken = async (tokenAddress, tokenSymbol) => {
    const tokenDecimals = 18;
    const tokenImage = "http://placekitten.com/200/300";

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitchNetwork = async () => {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "80001" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "80001",
                chainName: "Mumbai Testnet",
                rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"] /* ... */,
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
          alert("Some error occured! Please try again or contact the owner.");
        }
      }
      // handle other "switch" errors
    }
  };

  // check nft balance
  const checkNftBalance = async () => {
    let _currentUser;
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      if (ethereum.isConnected()) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts[0]);
        _currentUser = accounts[0];
      }

      const contract = new ethers.Contract(
        nftContractAddress,
        nftAbi,
        provider
      );

      console.log(address);
      const txRes = await contract.balanceOf(_currentUser);

      if (Number(txRes._hex) > 0) {
        return true;
      }

      console.log(txRes);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      if (ethereum.isConnected()) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        // console.log(accounts[0]);
        const res = await checkNftBalance(accounts[0]);
        setAuthentication(true);
      }
    })();
  }, []);

  // useEffect(() => {
  //   if (authentication == true) {
  //     router.push("explore")
  //   }
  //   console.log("Authenticated: ", authentication);
  // }, [])

  // check nft balance
  const checkIfSubscribed = async (_tokenAddress) => {
    let _currentUser;
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      if (ethereum.isConnected()) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts[0]);
        _currentUser = accounts[0];
      }

      const contract = new ethers.Contract(_tokenAddress, tokenAbi, provider);

      console.log(address);
      const txRes = await contract.balanceOf(_currentUser);

      if (Number(txRes._hex) > 0) {
        return true;
      }

      console.log(txRes);
      return false;
    }
  };

  const mintNFT = async () => {
    let receiver;
    try {
      if (window.ethereum) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          nftContractAddress,
          nftAbi,
          signer
        );

        if (ethereum.isConnected()) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          console.log(accounts[0]);
          receiver = accounts[0];
        }

        // let mintingPrice = utils.parseEther("1.0");

        const txRes = await contract.safeMint(receiver, {
          gasLimit: 3000000,
        });

        await txRes.wait();

        console.log(txRes);
        return true;
      }
    } catch (error) {
      alert("Error while minting NFT!");
    }
  };

  // Deploy token contract
  const deployToken = async ({ alias, department, maxSupply, tokenSymbol }) => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        tokenDeployerAddress,
        tokenDeployerAbi,
        signer
      );

      maxSupply = utils.parseEther(maxSupply);
      console.log(maxSupply);

      const txRes = await contract.createToken(alias, tokenSymbol, maxSupply, {
        gasLimit: 3000000,
      });

      await txRes.wait(1);

      const addressArr = await contract.getAllTokenAddresses();

      let recentToken = addressArr[addressArr.length - 1];
      console.log(recentToken);
      return recentToken;
    }
  };

  // 1. Add profile and NFT mint
  const addResearcher = async (
    { alias, department, maxSupply, tokenSymbol },
    tokenAddress
  ) => {
    let researcherAddress;
    if (window.ethereum) {
      if (ethereum.isConnected()) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts[0]);
        researcherAddress = accounts[0];
      }

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        meetSciContractAddress,
        meetSciAbi,
        signer
      );

      const txRes = await contract.addProfile(
        researcherAddress,
        alias,
        tokenSymbol,
        department,
        tokenAddress,
        maxSupply,
        {
          gasLimit: 3000000,
        }
      );

      await txRes.wait(1);

      console.log(txRes);
      return true;
    }
  };

  // 2. Get explore profiles
  const getExploreResearchers = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        meetSciContractAddress,
        meetSciAbi,
        provider
      );

      const txRes = await contract.getExploreProfiles();

      console.log(txRes);
      return txRes;
    }
  };

  useEffect(() => {
    (async () => {
      const res = await getExploreResearchers();
      console.log(res);
      setExploreResearchers(res);
    })();
  }, []);

  // 4. Vote to ID
  const vote = async (researchPaperId) => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        meetSciContractAddress,
        meetSciAbi,
        signer
      );

      const txRes = await contract.voteToProfileId(researchPaperId, {
        gasLimit: 3000000,
      });

      await txRes.wait(1);
      console.log(txRes);

      return true;
    }
  };

  /*
    const [workForm, setWorkForm] = useState({
    title: "",
    description: "",
    department: "",
    uploadFile: "",
  });
  */

  const getCurrentProfile = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      let txRes;

      const contract = new ethers.Contract(
        meetSciContractAddress,
        meetSciAbi,
        provider
      );

      if (ethereum.isConnected()) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts[0]);
        txRes = await contract.getResearcherProfile(accounts[0]);
      }

      if (txRes.name.length == 0) {
        return;
      }

      let currentProfile = {
        researcherId: Number(txRes.id._hex),
        researcherAddress: txRes.researcher,
        tokenAddress: txRes.tokenAddress,
      };

      setCurrentProfile(currentProfile);

      console.log("Current Profile: ", currentProfile);
    }
  };

  useEffect(() => {
    (async () => {
      await getCurrentProfile();
    })();
  }, []);

  // Upload to filecoin to get token URI

  // 7. Add work to profile
  const addWork = async (
    { title, description, department, uploadFile },
    profileId,
    researcherAddress

    // fileUri
  ) => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        meetSciContractAddress,
        meetSciAbi,
        signer
      );

      const txRes = await contract.addWorkToId(
        profileId,
        researcherAddress,
        title,
        description,
        department,
        uploadFile,
        {
          gasLimit: 3000000,
        }
      );

      await txRes.wait(1);

      console.log(txRes);
      return true;
    }
  };

  // 5. Get all research papers
  const getAllResearcherPapers = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        meetSciContractAddress,
        meetSciAbi,
        provider
      );

      const txRes = await contract.getAllPapers();

      console.log(txRes);
      return txRes;
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getAllResearcherPapers();
      console.log("Response to all papers: ", response);
      console.log("Response to paper image: ", response.coverImage);
      setExploreResearchPapers(response);
    })();
  }, []);

  // const convertNumToEther = () => {
  //   const output = utils.parseEther("1");
  //   console.log("Parse Ether: ", output);
  //   console.log("Actual number: ", Number(output._hex));
  // }

  // useEffect(()=> {
  //   convertNumToEther();
  // }, [])

  // Mint subscribe tokens
  const mintTokens = async (tokenAddress) => {
    let scholar;
    if (window.ethereum) {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        if (ethereum.isConnected()) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          scholar = accounts[0];
        }

        const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

        const tokenAmt = utils.parseEther("1.0");

        const txRes = await contract.mint(scholar, tokenAmt);

        await txRes.wait(1);

        console.log(txRes);
        return true;
      } catch (error) {
        alert("All tokens of the researcher are minted!");
      }
    }
  };

  // 3. Join to ID
  const join = async (researcher) => {
    let scholar;

    if (window.ethereum) {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        if (ethereum.isConnected()) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          scholar = accounts[0];
        }

        const meetSciContract = new ethers.Contract(
          meetSciContractAddress,
          meetSciAbi,
          signer
        );

        const txRes = await meetSciContract.subscribe(scholar, researcher, {
          gasLimit: 3000000,
        });

        await txRes.wait(1);

        console.log(txRes);
        return true;
      } catch (error) {
        alert("Join error");
      }
    }
  };

  // getResearcherById
  const getProfileById = async (profileId) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        meetSciContractAddress,
        meetSciAbi,
        signer
      );

      const txRes = await contract.getResearcherProfileById(profileId);

      console.log(txRes);
      return txRes;
    } catch (error) {
      alert("Some error");
      console.log(error);
    }
  };

  // getResearcherById
  const getResearchPaperById = async (paperId) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        meetSciContractAddress,
        meetSciAbi,
        signer
      );

      const txRes = await contract.getPaperById(paperId);

      console.log(txRes);
      return txRes;
    } catch (error) {
      alert("Some error");
      console.log(error);
    }
  };

  // Pool
  const depositToMainPool = async (amount) => {
    let user;

    if (window.ethereum) {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        if (ethereum.isConnected()) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          user = accounts[0];
        }

        amount = utils.parseEther(amount);

        const poolContract = new ethers.Contract(poolAddress, poolAbi, signer);

        const txRes = await poolContract.depositMoneyToPool({
          value: amount,
          gasLimit: 3000000,
        });

        await txRes.wait(1);

        console.log(txRes);
        return true;
      } catch (error) {
        alert("Funding error");
      }
    }
  };

  const fundProfile = async (researcher, amount) => {
    let user;

    if (window.ethereum) {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        if (ethereum.isConnected()) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          user = accounts[0];
        }

        const poolContract = new ethers.Contract(poolAddress, poolAbi, signer);

        amount = utils.parseEther(amount.toString());

        const txRes = await poolContract.fundResearcher(researcher, user, {
          value: amount,
          gasLimit: 3000000,
        });

        await txRes.wait(1);

        console.log(txRes);
        return true;
      } catch (error) {
        alert("Funding error");
        console.log(error);
      }
    }
  };

  const completeFunding = async (researchers, amounts) => {
    let user;

    if (window.ethereum) {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        if (ethereum.isConnected()) {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          user = accounts[0];
        }

        const poolContract = new ethers.Contract(poolAddress, poolAbi, signer);

        const txRes = await poolContract.disperseFunds(researchers, amounts, {
          gasLimit: 3000000,
        });

        await txRes.wait(1);

        console.log(txRes);
        return true;
      } catch (error) {
        alert("Funding error");
      }
    }
  };

  const getTotalNumberOfDonors = async (researcher) => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const poolContract = new ethers.Contract(poolAddress, poolAbi, provider);

      const txRes = await poolContract.getNumberOfDonors(researcher);

      console.log("Number of Donors: ", txRes);
      return txRes;
    }
  };

  const getDonationPerResearcher = async (researcher) => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const poolContract = new ethers.Contract(poolAddress, poolAbi, provider);

      const txRes = await poolContract.amountPerResearcher(researcher);

      console.log("Amount researcher raised: ", txRes);

      return txRes;
    }
  };

  const getMatchingBalance = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const poolContract = new ethers.Contract(poolAddress, poolAbi, signer);

      const txRes = await poolContract.getPoolBalance();

      console.log("Matching Pool balance: ", txRes);
      return txRes;
    }
  };

  const setDeadline = async (deadline) => {
    if (window.ethereum) {
      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const poolContract = new ethers.Contract(poolAddress, poolAbi, signer);

        const txRes = await poolContract.setDeadline(deadline, {
          gasLimit: 3000000,
        });

        txRes.wait(1);

        console.log("Set deadline balance: ", txRes);

        return txRes;
      } catch (error) {
        alert("Deadline not set", error);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      let amt = await getMatchingBalance();
      amt = utils.formatUnits(Number(amt._hex).toString());
      console.log("Formatted Amt: ", amt);

      setMatchingValue(amt);
    })();
  }, []);

  const getTotalPoolBalance = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const poolContract = new ethers.Contract(poolAddress, poolAbi, signer);

      const txRes = await poolContract.getContractbalance();

      console.log("Total Pool balance: ", txRes);
      return txRes;
    }
  };

  return (
    <CreateMeetContext.Provider
      value={{
        authentication,
        mintNFT,
        address,
        setAddress,
        toggleModal,
        setToggleModal,
        connectWallet,
        form,
        setForm,
        addResearcher,
        deployToken,
        exploreResearchers,
        vote,
        toggleAddworkModal,
        setToggleAddworkModal,
        workForm,
        setWorkForm,
        roomId,
        setRoomId,
        researchCardAddr,
        setResearchCardAddr,
        fundingAmount,
        setFundingAmount,
        isFund,
        setIsFund,
        addWork,
        currentProfile,
        exploreResearchPapers,
        join,
        mintTokens,
        leaderboardFund,
        setLeaderboardFund,
        getTotalPoolBalance,
        getMatchingBalance,
        getTotalNumberOfDonors,
        completeFunding,
        fundProfile,
        depositToMainPool,
        matchingValue,
        getDonationPerResearcher,
        uploadFile,
        storeFiles,
        getProfileById,
        getResearchPaperById,
        currResearcherId,
        setCurrResearcherId,
        currPaper,
        setCurrPaper,
        currentSuggestionsIds,
        setCurrentSuggestionsIds,
        currentSuggestionsSim,
        setCurrentSuggestionsSim,
        currentSuggestions,
        setCurrentSuggestions,
        checkNftBalance,
        checkIfSubscribed,
        thumbnail,
        setThumbnail,
        language,
        setLanguage,
        isLoading,
        setIsLoading,
        date,
        setDate,
        file1,
        setFile1,
        file2,
        setFile2,
        setDeadline,
      }}
    >
      {children}
    </CreateMeetContext.Provider>
  );
};

export default CreateMeetContext;
