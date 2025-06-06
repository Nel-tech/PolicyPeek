import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


interface TextSummary {
  text: string;
}

async function getTextSummary({ text }: TextSummary) {
  try {
    const response = await axios.post(`${API_URL}/analyze`, { text }, {
        headers:{
             "Content-Type": "application/json"
        }
    });
    console.log(response)
    return response.data;  
  } catch (error: any) {
    
    console.error("Error fetching text summary:", error);
    throw error;
  }
}

export { getTextSummary };



