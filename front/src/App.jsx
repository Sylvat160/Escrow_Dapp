import { useState } from "react";
import { Navbar, InputField, CustomButton, Datatable, Alert, OnBoardModal } from "./components";
import { useGlobalContext } from "./context";

function App() {

  const { showAlert, showTable } = useGlobalContext();

  return (
    <div className="overflow-hidden flex flex-col justify-center items-center md:px-20 px-1">
      <OnBoardModal />
      {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
      <Navbar />

      <div className="flex md:flex-row flex-col w-full justify-center items-center mt-4">
        <div className="bg-[#111111] md:w-[45%]  drop-shadow-2xl border-[0.01px] border-gray-500 rounded-md">
          <h1 className="text-[24px] m-3 border-b-[0.01px] border-gray-600">
            Deploy contract
          </h1>

          <div className="h-[340px] md:w-[95%] w-[26rem] flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              You need to deploy your own escrow contract before initiate it !!!
            </div>
            <div className="m-2">
              <CustomButton type="button" title="Deploy" restStyles="" />
            </div>
          </div>
        </div>
        <div className="w-5 h-5" />
        <div className="bg-[#111111] md:w-[45%] drop-shadow-2xl border-[0.01px] border-gray-500 rounded-md">
          <h1 className="text-[24px] m-3 border-b-[0.01px] border-gray-600">
            {" "}
            Initialise Escrow{" "}
          </h1>
          <form className="w-full flex flex-col m-2">
            <InputField
              label="Arbiter"
              placeHolder="0x452A12ad65C41D9A88f2515Af6c6F364060D4CE8"
            />
            <InputField
              label="Beneficiary"
              placeHolder="0x452A12ad65C41D9A88f2515Af6c6F364060D4CE8"
            />
            <InputField label="Amount" placeHolder="0.01 Eth" />
            <div className="flex justify-center items-center m-2">
              <CustomButton type="submit" title="Initiate" restStyles="" />
            </div>
          </form>
        </div>
      </div>

      {showTable && <Datatable /> }
    </div>
  );
}

export default App;
