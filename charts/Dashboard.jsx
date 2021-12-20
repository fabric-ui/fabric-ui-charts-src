import PropTypes from "prop-types";
import React from 'react'
import DashboardContext from "./hooks/DataContext";
import styles from './styles/Charts.module.css'

export default function Dashboard(props) {


    return (
        <DashboardContext.Provider value={props.datasets}>
            <div className={styles.page}>
                {props.children}
            </div>
        </DashboardContext.Provider>
    )
}

Dashboard.propTypes = {
    children: PropTypes.node,
    datasets: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    styles: PropTypes.object,
    className: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.string)
}
