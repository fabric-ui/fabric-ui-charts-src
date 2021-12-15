import Visual from "../charts/Visual";
import Dashboard from "../charts/Dashboard";
import getDataset from "./getDataset";


export default function test() {
    const [data, values] = getDataset('axis', 3, 3, 10)


    return (
        <div style={{padding: '32px 10%'}}>
            <Dashboard datasets={data}>
                <Visual
                    variant={'radar'} values={values} page={0}
                    axis={{label: 'Axis', field: 'axis'}}
                    styles={{width: '600px', height: '600px', backgroundColor: 'white'}} title={'Title'}
                />
                <Visual
                    variant={'line'} values={values} page={0}
                    axis={{label: 'Axis', field: 'axis'}}
                    styles={{width: '600px', height: '600px', backgroundColor: 'white'}} title={'Title'}
                />
                <Visual
                    variant={'horizontal-bar'} values={values} page={0}
                    axis={{label: 'Axis', field: 'axis'}}
                    styles={{width: '600px', height: '600px', backgroundColor: 'white'}} title={'Title'}
                />
            </Dashboard>
        </div>
    )
}