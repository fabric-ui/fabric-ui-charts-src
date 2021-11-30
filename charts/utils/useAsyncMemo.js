import React, {useState, useEffect} from 'react'

export default function useAsyncMemo(callback, dependencyArray=[]){
    const [state, setState] = useState()

    useEffect(() => {
        setState(callback)
    }, dependencyArray)

    return state
}