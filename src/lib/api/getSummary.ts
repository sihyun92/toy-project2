import client from "./client";

const getSummary = async(period: string, userId: string) => {
  
  try{
    const response = await client.get(`/api/expenses/summary?period=${period}&userId=${userId}`);
    console.log(response.data);
  }   
  catch(e){
    console.error(e, 'get sammary error');
  }
}

export { getSummary }

