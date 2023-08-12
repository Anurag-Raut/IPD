import axios from "axios";
import { useEffect, useState } from "react";
import Card from "~~/components/custom_components/card";
import { RealEstate } from "~~/types/realEstate";
import { RealEstateStatus } from "~~/utils/enums";


export default function AvailableForRent(){
    const [RentRealEstates,setRentRealEstates]=useState<RealEstate[]|null>(null)
    useEffect(() => {
        async function fetchFromDb() {
            try {
                const res = await axios.post('http://localhost:3000/api/getAllRealEstatesWithAddress', {
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
                        </Card>
                    </div>
                    );
                })
            }

        </div>
    )
}