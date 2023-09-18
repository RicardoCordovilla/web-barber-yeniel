import axios from 'axios';
import { useEffect, useState } from 'react';
import { config } from '../utils/config';

function useApiFetcher(api,setData) {
    // const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log('api', api);
            axios.request({
                url: api.url,
                method: api.method,
                maxBodyLength: Infinity,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': config.db.token,
                }
            }).then(response => {
                console.log('response', response.data);
                setData(response);
                setLoading(false);
                setError(null);
            }).catch(error => {
                console.log('error', error);
                setError(error);
                setLoading(false);
                setData(null);
            });
        }

        fetchData();
    }, [api]);

    return { loading, error };
}

export default useApiFetcher;
