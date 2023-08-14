import axios from "axios"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import Button from "~~/components/custom_components/button";
import Card from "~~/components/custom_components/card";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Proposal } from "~~/types/proposal";
import { ProposalType } from "~~/utils/enums";



export default function ViewRentProposals() {
    const router = useRouter();
    const { tokenId } = router.query;
    const [proposals, setProposals] = useState<Proposal[] | null>(null);

    const { writeAsync: voteFunc } = useScaffoldContractWrite({
        contractName: 'RealEstateERC1155',
        functionName: 'vote',
        args: [BigInt(1), true]
    })
    const { writeAsync: executeFunc } = useScaffoldContractWrite({
        contractName: 'RealEstateERC1155',
        functionName: 'executeProposal',
        args: [BigInt(1),BigInt(Number(tokenId?tokenId:0))]
    })
  

    useEffect(() => {

        async function getProposals() {
            if (!tokenId) {
                return;
            }
            try {
                console.log(tokenId);
                const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getProposals`, {query:{ tokenId:Number(tokenId),proposalType:ProposalType.setRentee }});
                console.log(result.data);
                setProposals(result?.data?.data)

            }
            catch (error) {
                console.log(error);
            }

        }
        getProposals()
    }, [tokenId])

    return (
        <div>
            {
                proposals && proposals?.map((data: Proposal) => {
                    let deadlineDate = new Date(data.deadline * 1000);
                    const date = deadlineDate.toDateString()
                    console.log(data?.deadline*1000,Date.now(),data?.deadline*1000>Date.now());
                    return (
                        <div key={data.proposalId}>
                            <Card>
                                <div>Proposal Id : {data?.proposalId}</div>
                                <div>proposal Type : {ProposalType[data?.proposalType]}</div>
                                <div>Positive Votes : {data.positiveVotes}</div>
                                <div>Negative Votes : {data.negativeVotes}</div>
                                <div>proposal Creator : {data.proposalCreator}</div>
                                {
                                    data.proposalType === 3 ?
                                        <div>
                                            RentInfo :
                                            <div>Deposit Amount: {data.Rentinfo.depositAmount}</div>
                                            <div>rent of one month :{data.Rentinfo.rentof1Month}</div>
                                            <div>feesForLateInstallments : {data.Rentinfo.feesForLateInstallments}</div>


                                        </div>
                                        :
                                        null
                                }
                                <div>deadline : {date} </div>
                                {
                                    // get current timestamp and compare with deadline
                                    


                                    // data.deadline*1000 > Date.now()?

                                //     <div className="vote flex w-full justify-around">
                                //     <Button label="Upvote" onClick={() => voteFunc({args: [BigInt(data.proposalId),true]})} />
                                //     <Button label="DownVote" onClick={() => voteFunc({args: [BigInt(data.proposalId),false]})} />
                                // </div>
                                //         :
                                        <div>

                                            <div>Proposal is InActive</div>
                                            <Button label={'Execute'} onClick={()=>{executeFunc({args:[BigInt(data.proposalId),BigInt(Number(tokenId))]})}} />
                                        </div>
                                }
                               

                            </Card>

                        </div>
                    )
                })
            }
        </div>
    )
}