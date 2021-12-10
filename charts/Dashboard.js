import PropTypes from "prop-types";
import React, {useMemo, useState} from 'react'
import DashboardContext from "./DashboardContext";
import Visual from "./Visual";
import styles from './styles/Charts.module.css'
import Button from "../../core/inputs/button/Button";

export default function Dashboard(props) {
    const pages = useMemo(() => {
        const arr = React.Children.toArray(props.children).filter(e => e.type === Visual)
        return arr.reduce((r, v, i, a) => {
            if (v.props.page === a[i - 1]?.props.page)
                r[r.length - 1].push(v)
            else
                r.push([v])

            return r
        }, [])
    }, [])

    const [openPage, setOpenPage] = useState(0)

    return (
        <DashboardContext.Provider value={props.data}>
            <div className={styles.pageWrapper} style={props.styles}>
                <div className={styles.page}>
                    {pages[openPage].map((visual, index) => (
                        <React.Fragment key={`${index}-visual-${openPage}`}>
                            {visual}
                        </React.Fragment>
                    ))}
                </div>
                <div className={styles.selectorsWrapper}>
                    {props.pages?.map((page, index) => (
                        <Button
                            highlight={openPage === index}
                            onClick={() => setOpenPage(index)}
                            className={styles.button}
                            variant={'minimal-horizontal'}>
                            {page}
                        </Button>
                    ))}
                </div>
            </div>
        </DashboardContext.Provider>
    )
}

Dashboard.propTypes = {
    children: PropTypes.node,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    styles: PropTypes.object,
    className: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.string)
}