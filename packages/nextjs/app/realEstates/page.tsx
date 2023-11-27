'use client'
import React, {useEffect, useState} from 'react';
import Button from '~~/components/custom_components/button';
import RangeSlider from '~~/components/custom_components/rangeSlider';
import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Select } from '@chakra-ui/react';
import Property from '../../components/custom_components/Property';
import { baseUrl, fetchApi } from '../../app/utils/fetchAPI';
import {filterData,getFilterValues } from '../../app/utils/filterData';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface HomeProps {
  propertiesForSale: Array<any>;
  propertiesForRent: Array<any>;
}

const realEstates: React.FC<HomeProps> = ({ propertiesForSale: initialPropertiesForSale, propertiesForRent: initialPropertiesForRent }) => {
  
  const containerStyle:React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row', 
    minHeight: '100vh',      
  };

  const sidebarStyle:React.CSSProperties = {
    flex: 1.5,              
    backgroundColor: '#9bb0c4', 
    color: '#333',         
    paddingTop: '20px', 
    paddingLeft:'5px',     
    paddingRight:'5px',     
  };

  const btnstyle = {
    marginLeft:'10px',
    marginRight:'10px',
    gap:'10px',
  };

  const bedsnbath = {
    marginLeft:'10px',
    marginRight:'10px',
    gap:'10px',
  };

  const inputStyle = {
  padding: "10px",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "8px",
  // marginLeft: "40rem",
  marginTop: "20px",
  width:'300px',
  backgroundColor: '#c5d4e3',
  color: '#333',  
  boxShadow: "3px 0px 14px -3px rgba(110,123,179,0.73)",
  "::placeholder": {
    color: "#333",
    
  },
};

const hrStyle = {
  marginTop:'8px',
  width:'100%',
  color:'#c2c7cc'
}

const titleStyle = {
  fontSize:'12px'
}

const applyStyle = {
  marginTop: '10px'
}


  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    
    console.log('Button Clicked');
  };

  const cardContainerStyle:React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "80px",
    flex: 6,               
    padding: '20px', 
    flexWrap:'wrap',
  };

  const cardStyle = {
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    backgroundColor:"#4F709C",
    height:'150px'
  
  };
  
  const headingStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  };
  
  const textStyle = {
    fontSize: "1.25rem",
  };
  
    const [propertiesForSale, setPropertiesForSale] = useState(initialPropertiesForSale);
    const [propertiesForRent, setPropertiesForRent] = useState(initialPropertiesForRent);
    const [loading, setLoading] = useState(true);

    const [filters,setFilters] = useState(filterData);
    const router = useRouter();
    const path = usePathname();
    const searchParams = new URLSearchParams();

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { propertiesForSale, propertiesForRent } = await getData();
          setPropertiesForSale(propertiesForSale);
          setPropertiesForRent(propertiesForRent);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>; 
    }

    const searchProperties = (filterValues: any) => {

      
    const values: { name: string; value: any }[] = getFilterValues(filterValues)

    values.forEach((item) => {
      if(item.value && filterValues?.[item.name]) {
        searchParams.set(item.name, item.value);
      }
    });

    const newPath = `${path}?${searchParams.toString()}`;

    router.replace(newPath);
    console.log(newPath);

    }
   
  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
          
      {filters?.map((filter) => (
        <Box key={filter.queryName}>
          <Select onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })} placeholder={filter.placeholder} w='fit-content' p='2' >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
   


            <Button style={btnstyle} label="Buy" onClick={handleButtonClick} />
          <Button style={btnstyle} label="Rent" onClick={handleButtonClick} />
          <Button style={btnstyle} label="Sold" onClick={handleButtonClick} />
          <input type="text" placeholder="Search..." style={inputStyle} />
          <hr style={hrStyle}/>
          <p style={titleStyle}>Property Type</p>
          <Button style={btnstyle} label="House" onClick={handleButtonClick} />
          <Button style={btnstyle} label="Commercial" onClick={handleButtonClick} />
          <Button style={btnstyle} label="Apartment" onClick={handleButtonClick} />
          <Button style={btnstyle} label="Landplot" onClick={handleButtonClick} />
          <hr style={hrStyle}/>
          <p style={titleStyle}>Price Range</p>
          
          <RangeSlider/>
        
          <p style={titleStyle}>Bedrooms</p>
          <Button style={bedsnbath} label="1" onClick={handleButtonClick} />
          <Button style={bedsnbath} label="2" onClick={handleButtonClick} />
          <Button style={bedsnbath} label="3" onClick={handleButtonClick} />
          <Button style={bedsnbath} label="4" onClick={handleButtonClick} />
          <Button style={bedsnbath} label="5" onClick={handleButtonClick} />
          <p style={titleStyle}>Bathrooms</p>
          <Button style={bedsnbath} label="1" onClick={handleButtonClick} />
          <Button style={bedsnbath} label="2" onClick={handleButtonClick} />
          <Button style={bedsnbath} label="3" onClick={handleButtonClick} />
          <Button style={bedsnbath} label="4" onClick={handleButtonClick} />
          <Button style={bedsnbath} label="5" onClick={handleButtonClick} />

          <p style={titleStyle}>Amenities</p>
      
          <div>
          <input type="checkbox"  className="checkbox rounded-lg checkbox-success" />
          <span className="label-text"> Furnished</span>
          </div>

          <div>
          <input type="checkbox"  className="checkbox rounded-lg checkbox-success" />
          <span className="label-text"> Gym</span> 
          </div>  

          <div> 
          <input type="checkbox"  className="checkbox rounded-lg checkbox-success" />
          <span className="label-text"> Swimming Pool</span> 
          </div>
     
          <button style={applyStyle} className="btn btn-primary">Apply</button>



        </div>
       
      <div style={cardContainerStyle}>
        <Flex>
          <Flex flexWrap='wrap'>
      
            {propertiesForRent && propertiesForRent.map((property) => <Property property={property} key={property.id} />)}

          </Flex>


          <Flex flexWrap='wrap'>

            {propertiesForSale && propertiesForSale.map((property) => <Property property={property} key={property.id} />)}

          </Flex>

        </Flex>
      </div>
      
     </div>

  );
};


const initialPropertiesState = {
  propertiesForSale: [],
  propertiesForRent: [],
};


export async function getData() {
  try {
    const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
    const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

    return {
      propertiesForSale: propertyForSale?.hits || [],
      propertiesForRent: propertyForRent?.hits || [],
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}

export default realEstates;






































// 'use client'
// import React, {useEffect, useState} from 'react';
// import Button from '~~/components/custom_components/button';
// import RangeSlider from '~~/components/custom_components/rangeSlider';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Flex, Box, Text } from '@chakra-ui/react';
// import Property from '../../components/custom_components/Property';
// import { baseUrl, fetchApi } from '../../app/utils/fetchAPI';
// import {filterData,getFilterValues } from '../../app/utils/filterData';

// interface HomeProps {
//   propertiesForSale: Array<any>;
//   propertiesForRent: Array<any>;
// }

// const realEstates: React.FC<HomeProps> = ({ propertiesForSale: initialPropertiesForSale, propertiesForRent: initialPropertiesForRent }) => {
//   const containerStyle:React.CSSProperties = {
//     display: 'flex',
//     flexDirection: 'row', 
//     minHeight: '100vh',      
//   };

//   const sidebarStyle:React.CSSProperties = {
//     flex: 1.5,              
//     backgroundColor: '#9bb0c4', 
//     color: '#333',         
//     paddingTop: '20px', 
//     paddingLeft:'5px',     
//     paddingRight:'5px',     
//   };

//   const btnstyle = {
//     marginLeft:'10px',
//     marginRight:'10px',
//     gap:'10px',
//   };

//   const bedsnbath = {
//     marginLeft:'10px',
//     marginRight:'10px',
//     gap:'10px',
//   };

//   const inputStyle = {
//   padding: "10px",
//   fontSize: "1rem",
//   border: "1px solid #ccc",
//   borderRadius: "8px",
//   // marginLeft: "40rem",
//   marginTop: "20px",
//   width:'300px',
//   backgroundColor: '#c5d4e3',
//   color: '#333',  
//   boxShadow: "3px 0px 14px -3px rgba(110,123,179,0.73)",
//   "::placeholder": {
//     color: "#333",
    
//   },
// };

// const hrStyle = {
//   marginTop:'8px',
//   width:'100%',
//   color:'#c2c7cc'
// }

// const titleStyle = {
//   fontSize:'12px'
// }

// const applyStyle = {
//   marginTop: '10px'
// }


//   const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    
//     console.log('Button Clicked');
//   };

//   const cardContainerStyle:React.CSSProperties = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "80px",
//     flex: 6,               
//     padding: '20px', 
//     flexWrap:'wrap',
//   };

//   const cardStyle = {
//     border: "1px solid #ccc",
//     padding: "16px",
//     borderRadius: "8px",
//     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//     cursor: "pointer",
//     backgroundColor:"#4F709C",
//     height:'150px'
  
//   };
  
//   const headingStyle = {
//     fontSize: "1.5rem",
//     fontWeight: "bold",
//     marginBottom: "0.5rem",
//   };
  
//   const textStyle = {
//     fontSize: "1.25rem",
//   };
  
//     const [propertiesForSale, setPropertiesForSale] = useState(initialPropertiesForSale);
//     const [propertiesForRent, setPropertiesForRent] = useState(initialPropertiesForRent);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const { propertiesForSale, propertiesForRent } = await getData();
//           setPropertiesForSale(propertiesForSale);
//           setPropertiesForRent(propertiesForRent);
//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//           setLoading(false);
//         }
//       };
  
//       fetchData();
//     }, []);
  
//     if (loading) {
//       return <div>Loading...</div>; 
//     }
   
//   return (
//     <div style={containerStyle}>
//       <div style={sidebarStyle}>
          
          

//           <Button style={btnstyle} label="Buy" onClick={handleButtonClick} />
//           <Button style={btnstyle} label="Rent" onClick={handleButtonClick} />
//           <Button style={btnstyle} label="Sold" onClick={handleButtonClick} />
//           <input type="text" placeholder="Search..." style={inputStyle} />
//           <hr style={hrStyle}/>
//           <p style={titleStyle}>Property Type</p>
//           <Button style={btnstyle} label="House" onClick={handleButtonClick} />
//           <Button style={btnstyle} label="Commercial" onClick={handleButtonClick} />
//           <Button style={btnstyle} label="Apartment" onClick={handleButtonClick} />
//           <Button style={btnstyle} label="Landplot" onClick={handleButtonClick} />
//           <hr style={hrStyle}/>
//           <p style={titleStyle}>Price Range</p>
          
//           <RangeSlider/>
        
//           <p style={titleStyle}>Bedrooms</p>
//           <Button style={bedsnbath} label="1" onClick={handleButtonClick} />
//           <Button style={bedsnbath} label="2" onClick={handleButtonClick} />
//           <Button style={bedsnbath} label="3" onClick={handleButtonClick} />
//           <Button style={bedsnbath} label="4" onClick={handleButtonClick} />
//           <Button style={bedsnbath} label="5" onClick={handleButtonClick} />
//           <p style={titleStyle}>Bathrooms</p>
//           <Button style={bedsnbath} label="1" onClick={handleButtonClick} />
//           <Button style={bedsnbath} label="2" onClick={handleButtonClick} />
//           <Button style={bedsnbath} label="3" onClick={handleButtonClick} />
//           <Button style={bedsnbath} label="4" onClick={handleButtonClick} />
//           <Button style={bedsnbath} label="5" onClick={handleButtonClick} />

//           <p style={titleStyle}>Amenities</p>
      
//           <div>
//           <input type="checkbox"  className="checkbox rounded-lg checkbox-success" />
//           <span className="label-text"> Furnished</span>
//           </div>

//           <div>
//           <input type="checkbox"  className="checkbox rounded-lg checkbox-success" />
//           <span className="label-text"> Gym</span> 
//           </div>  

//           <div> 
//           <input type="checkbox"  className="checkbox rounded-lg checkbox-success" />
//           <span className="label-text"> Swimming Pool</span> 
//           </div>
     
//           <button style={applyStyle} className="btn btn-primary">Apply</button>

//         </div>
       
//       <div style={cardContainerStyle}>
//         <Flex>
//           <Flex flexWrap='wrap'>
      
//             {propertiesForRent && propertiesForRent.map((property) => <Property property={property} key={property.id} />)}

//           </Flex>


//           <Flex flexWrap='wrap'>

//             {propertiesForSale && propertiesForSale.map((property) => <Property property={property} key={property.id} />)}

//           </Flex>

//         </Flex>
//       </div>
      
//      </div>

//   );
// };


// const initialPropertiesState = {
//   propertiesForSale: [],
//   propertiesForRent: [],
// };


// export async function getData() {
//   try {
//     const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
//     const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

//     return {
//       propertiesForSale: propertyForSale?.hits || [],
//       propertiesForRent: propertyForRent?.hits || [],
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error; 
//   }
// }

// export default realEstates;


