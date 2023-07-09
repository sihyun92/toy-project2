import client from "./client";

const getCallandar = async(month: number, userId: string) => {
  
	try{
		const response = await client.get(`/api/expenses/calendar?year=2023&month=${month}&userId=${userId}`);
    return response.data;
  }   
	catch(e){
		console.error(e, 'get callandar error');
  }
}

export { getCallandar }