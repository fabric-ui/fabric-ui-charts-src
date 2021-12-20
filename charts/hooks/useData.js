import React from 'react'

import {useMemo} from "react";

export default function useData(datasets, axis) {

    return useMemo(() => {
        let validDatasets = []
        let data,  response = []
        datasets.forEach(d => {

            const filtered = d.filter(obj => obj[axis] !== undefined && obj[axis] !== null)
            console.log(d)
            if (filtered.length > 0)
                validDatasets.push(filtered)
        })

        data = validDatasets.flat(1)
        const n = data.reduce((r, v, i, a) => {
            if (!r[v[axis]]) { r[v[axis]] = []; }
            r[v[axis]].push(v);
            return r;
        }, [])
        console.log(validDatasets)
        Object.keys(n).forEach(key => {
            let newObj = {}
            const values = n[key]
            values.forEach(value => {
                Object.keys(value).forEach(v => {
                    if(typeof value[v] === 'number')
                    newObj[v] = (newObj[v] ? newObj[v] : 0) + value[v]
                    else
                        newObj[v] = value[v]
                })
            })

            response.push(newObj)
        })
        return response
    }, [datasets])


}
