import { ListItemText } from '@material-ui/core';
import { AttachMoney, Assignment, } from '@material-ui/icons';
import React from 'react';
import scriptCSS from './FeaturedInfoStyles';
import EventIcon from '@material-ui/icons/Event';

export default function Featuredinfo(props) {
    const classes = scriptCSS();
    // const [item1, setItem1] =useState(0)

    // function updateSetItem(val) {
    //     const item = item1
    //     setItem1(item+val);
    // }
    var leaves = 0;
    var cost = 0;

    function renderedList(index, text) {
        if (index === 0) {
            return (
                <div className={classes.featuredItem}>
                    <ListItemText primary={text} className={classes.featuredTitle} />
                    <div className={classes.featuredMoneyContainer}>
                        <span className={classes.featuredMoney}>
                            {/* {
                                // props.rows.forEach((row) => {
                                //     updateSetItem(row.timeoffLeaves)
                                // })
                                console.log(props.rows[0].timeoffLeaves)
                            } */}


                            {props.rows.length}
                        </span>
                        <span className={classes.featuredMoneyRate}>
                            {(props.count > 0) ? (
                                <EventIcon className={classes.featuredIconPositive} />

                            ) : (
                                <EventIcon className={classes.featuredIconNegative} />
                            )}
                        </span>
                    </div>
                </div>
            )
        } else if (index === 1) {
            return (
                <div className={classes.featuredItem}>
                    <ListItemText primary={text} className={classes.featuredTitle} />
                    <div className={classes.featuredMoneyContainer}>
                        <span className={classes.featuredMoney}>{props.rows.forEach((row, index) => (
                            leaves += row.timeoffLeaves ? row.timeoffLeaves : row.quantity
                        ))}
                            {leaves}
                        </span>
                        <span className={classes.featuredMoneyRate}>
                            {(props.amount > 0) ? (
                                <Assignment className={classes.featuredIconPositive} />
                            ) : (
                                <Assignment className={classes.featuredIconPositive} />
                            )}
                        </span>
                    </div>
                </div>
            )
        } else if (index === 2) {
            return (
                <div className={classes.featuredItem}>
                    <ListItemText primary={text} className={classes.featuredTitle} />
                    <div className={classes.featuredMoneyContainer}>
                        <span className={classes.featuredMoney}>
                            {props.rows.forEach((row, index) => (
                                cost += row.cost && row.cost * row.quantity
                            ))}
                            {cost > 0 ? cost : props.rows.length * 500 * leaves}
                        </span>
                        <span className={classes.featuredMoneyRate}>
                            {(props.amount > 0) ? (
                                <AttachMoney className={classes.featuredIconPositive} />
                            ) : (
                                <AttachMoney className={classes.featuredIconNegative} />
                            )}
                        </span>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={classes.centerDiv}>
            <div className={classes.featured}>
                {[props.metaData[0], props.metaData[1], props.metaData[2]].map((text, index) => (
                    <div key={text}>
                        {renderedList(index, text)}
                    </div>
                ))}
            </div>
        </div>
    )
}
