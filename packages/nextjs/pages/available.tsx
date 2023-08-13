import axios from "axios";
import { useEffect, useState } from "react";
import Button from "~~/components/custom_components/button";
import Card from "~~/components/custom_components/card";
import SubmitRentproposal from "~~/components/custom_components/submitRentProposal";
import { RealEstate } from "~~/types/realEstate";
import { RealEstateStatus } from "~~/utils/enums";


export default function AvailableForRent(){
    const [RentRealEstates,setRentRealEstates]=useState<RealEstate[]|null>(null)
    useEffect(() => {
        async function fetchFromDb() {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllRealEstatesWithAddress`, {
                  query:{status:RealEstateStatus.Renting}
                });
                console.log(res.data.data);
                setRentRealEstates(res?.data?.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFromDb();
    }, []);

    return(
        <div>
            {
                RentRealEstates?.map((data:RealEstate)=>{
                    return (
                    <div>
                        <Card>
                            <div>RealEstate Id : {data.tokenId}</div>
                            <div>expected Rent : {data.rentInfo.rentof1Month}</div>
                            <div> Fees for late installment : {data.rentInfo.feesForLateInstallments}</div>
                            <SubmitRentproposal tokenId={data.tokenId}/>

                        </Card>
                    </div>
                    );
                })
            }

        </div>
    )
}