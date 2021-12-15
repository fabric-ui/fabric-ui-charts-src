export default function getDataset(axisKey, valuesLength, datasetQuantity, dataLength) {
    let datasets = [], values = []
    for (let i = 0; i < datasetQuantity; i++) {
        let currentDataset = []
        for (let k = 0; k < dataLength; k++) {
            let currentObject = {}

            currentObject[`${axisKey}`] = 'A'+k
            for (let j = 0; j < valuesLength; j++) {

                currentObject[`value-${j}`] = Math.round(Math.random() * (2500 - 2) + 2)
            }
            currentDataset.push(currentObject)
        }
        datasets.push(currentDataset)
    }
    for (let j = 0; j < valuesLength; j++) {
        values.push({field: `value-${j}`, label: `Value-${j}`})
    }
    return [datasets, values]
}