import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react'
import DashboardContext from "./DashboardContext";
import Visual from "./Visual";
import styles from './styles/Charts.module.css'
import Button from "../../core/inputs/button/Button";

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