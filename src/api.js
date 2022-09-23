import axios from "axios"

export default async function getData () {
    const response = await axios.get('https://632df84f2cfd5ccc2afa2771.mockapi.io/posts')
    
    return response.data
}