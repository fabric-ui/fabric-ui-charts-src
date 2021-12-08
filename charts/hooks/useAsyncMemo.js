import React, {useEffect, useState} from 'react'

export default function useAsyncMemo(callback, dependencyArray=[]){
    const [state, setState] = useState()

    useEffect(() => {
        setState(callback)
    }, dependencyArray)

    return state
}