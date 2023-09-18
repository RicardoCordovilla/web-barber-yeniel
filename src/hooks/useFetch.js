import { useEffect, useState } from "react"
import { config } from "../utils/config"
import axios from "axios"


export default function useFetch() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [fetch, setFetch] = useState()

    console.log('fetch', fetch)

    useEffect(() => {

        const fetchData = async () => {
            setError(false)
            setLoading(true)
            try {
                const response = await axios.request(
                    {
                        url: fetch.url,
                        method: fetch.method,
                        data: fetch.body,
                        // maxBodyLength: Infinity,
                        headers: {
                            'Accept':'*/*',
                            'Accept': fetch.accept,
                            'Authorization': config.db.token,
                            // "Content-Type": fetch.contentType,
                        }

                    })

                console.log(response)
                setData(response.data)
            } catch (error) {
                console.log(error)
                setError(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [fetch])

    return [data, loading, error, setFetch]

}


