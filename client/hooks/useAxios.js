import axios from 'axios'
import { useEffect, useState } from 'react'

const useAxios = ({ method = 'get', url, body, params }) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)
  const [initialLoad, setInitialLoad] = useState(true)

  const axiosRequest = () => {
    return axios({
      method: method,
      url: url,
      data: body,
      params: params,
    })
      .then((response) => {
        if (response?.data) setData(response.data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsPending(false)
        setInitialLoad(false)
      })
  }

  useEffect(() => {
    axiosRequest()
  }, [url])

  const request = ({ method = 'get', url, body, params }) => {
    return axiosRequest()
  }

  return { data, setData, isPending, error, initialLoad }
}

export default useAxios
