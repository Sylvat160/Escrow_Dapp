import React, { useContext, createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal, { local } from "web3modal";
import { GetParams } from "../utils";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [showTable, setShowTable] = useState(false);

  const providers = new ethers.providers.Web3Provider(window.ethereum);

  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "info",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const updateCurrentWalletAddress = async () => {
    const accounts = await providers.send("eth_requestAccounts", []);
    // const signer = providers.getSigner();
    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    if (walletAddress != "") setShowTable(true)
  }, [walletAddress]);

  // useEffect(() => {
  //   updateCurrentWalletAddress();

  //   window?.ethereum?.on("accountsChanged", updateCurrentWalletAddress);
  // }, []);

  //* Reset web3 on boarding modal params
  // useEffect(() => {
  //   const resetParams = async () => {
  //     const currentStep = await GetParams();

  //     setStep(currentStep.step);
  //   };

  //   resetParams();

  //   window?.ethereum?.on("chainChanged", () => resetParams());
  //   window?.ethereum?.on("accountChange", () => resetParams());
  // }, []);

  // useEffect(() => {
  //   updateCurrentWalletAddress();

  //   window?.ethereum?.on("accountsChanged", updateCurrentWalletAddress);
  // }, []);

  //* Set the smart contract and provider to the state
  // useEffect(() => {
  //   const setSmartContractAndProvider = async () => {
  //     const web3Modal = new Web3Modal();
  //     const connection = await web3Modal.connect();
  //     const newProvider = new ethers.providers.Web3Provider(connection);
  //     const signer = newProvider.getSigner();
  //     const newContract = new ethers.Contract(ADDRESS, ABI, signer);

  //     setProvider(newProvider);
  //     setContract(newContract);
  //   };

  //   setSmartContractAndProvider();
  // }, []);

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: "info", message: "" });
      }, [5000]);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <GlobalContext.Provider
      value={{
        contract,
        walletAddress,
        setWalletAddress,
        showAlert,
        setShowAlert,
        errorMessage,
        setErrorMessage,
        updateCurrentWalletAddress,
        provider,
        modalIsOpen,
        setIsOpen,
        showTable,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
