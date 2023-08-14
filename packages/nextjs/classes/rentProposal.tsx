


    

class Rentproposal {
    rentee: string;
    noOfMonths: number;
    depositBalance: number;
    rentof1Month: number;
    
    constructor(data: any[]) {
        if (data.length !== 4) {
            throw new Error('Invalid data array length');
        }

        this.rentee = data[0];
        this.noOfMonths = parseInt(data[1]);
      
        this.depositBalance = parseInt(data[2]);
        this.rentof1Month = parseInt(data[3]);
   
    }
}

export default Rentproposal;
