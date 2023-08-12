import { useEffect, useState } from "react"
import axios from 'axios';
import { useAccount } from "wagmi";
import Card from "~~/components/custom_components/card";
import Link from "next/link";
export default function MyRealEstates() {
    const { address } = useAccount();
    const [realEstates, setRealEstates] = useState([]);


    useEffect(() => {
        async function fetchFromDb() {
            try {
                const res = await axios.post('http://localhost:3000/api/getAllRealEstatesWithAddress', {
                    query: {
                        owners: {
                            $elemMatch: {
                                $eq: address
                            }
                        }
                    }
                });
                console.log(res.data.data);
                setRealEstates(res?.data?.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFromDb();
    }, []);
    
    return (

        <div className="w-full flex justify-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
            {
                realEstates?.map((data: any, index) => {
                    return (
                        <div>
                            <Link href={`/realEstate/${data._id}`}>
                                <Card >
                                    <div className="card-body">
                                        <h2 className="card-title">Token Id -{data.tokenId}</h2>
                                        <p>Price Of one token {data.priceOf1Token}</p>
                                        <div className="card-actions justify-end">
                                            <button className="btn">View</button>
                                        </div>
                                    </div>
                                </Card>
                            </Link>

                        </div>
                    )
                })
            }

        </div>
    )

}