import { useState } from "react";
import Input from "./input";
import Button from "./button";
import { useAccount } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function SubmitRentproposal({ tokenId }: { tokenId: number }) {
  const { address } = useAccount();

  const [rentProposal, setRentProposal] = useState({
    rentee: address,
    tokenId: tokenId,
    noOfMonths: 0,
    deadline: Math.floor(Date.now() / 1000),
  });

  const { writeAsync } = useScaffoldContractWrite({
    contractName: 'RealEstateERC1155',
    functionName: 'createRenteeProposal',
    value: '2',
    args: [
      BigInt(rentProposal.tokenId),
      rentProposal.rentee,
      BigInt(rentProposal.noOfMonths),
      BigInt(rentProposal.deadline),
    ],
  });

  return (
    <div>
      <Input
        label={'Enter No of months'}
        type="number"
        value={rentProposal.noOfMonths}
        onChange={(newValue: any) => {
          setRentProposal({ ...rentProposal, noOfMonths: Number(newValue) });
        }}
      />
      <Input
        label={'Enter deadline'}
        type='date'
        value={new Date(rentProposal.deadline * 1000).toISOString().substring(0,10)}
        onChange={(newValue: any) => {
          const timestamp = Date.parse(newValue) / 1000; // Convert to seconds
          setRentProposal({ ...rentProposal, deadline: timestamp });
        }}
      />
      <Button label="Submit" onClick={() => { writeAsync(); }} />
    </div>
  );
}
