import React, {FC, useEffect, useRef, useState} from 'react';
import './CalendarDay.css';
import {DataItem} from "../../calendarData";

interface Props {
    data: DataItem
    openDay: (id: string) => void
}

export const CalendarDay: FC<Props> = ({data, openDay}) => {
    const [isBiggerPicture, setBiggerPicture] = useState<boolean>(false)
    const [isShowOou, setShowOou] = useState<boolean>(false)
    const [alertClass, setAlertClass] = useState<string>('fadein')


    const timerRef = useRef<NodeJS.Timer | null>(null);

    const clearTimeoutData = () => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            clearTimeoutData()
        };
    }, [])

    useEffect(() => {
        if (isShowOou === true) {
            clearTimeoutData()
            timerRef.current = setTimeout(() => {
                setShowOou(false)
            }, 1000);
        }
        return () => {
            clearTimeoutData()
        };
    }, [isShowOou])

    const onClick = () => {
        if (data.open) {
            setBiggerPicture(true)
        } else {
            if (isTodayOrBefore(data.date)) {
                // TODO play snow animation
                openDay(data.id)
            } else {
                setShowOou(true)
            }
        }
    }

    return (
        <div className={`calendar-day`} onClick={onClick}>
            {isShowOou && <div className={`oou-text`}>HoHou wait for it</div>}
            {data.open &&
                <div className="opened-day">
                    <img
                        onMouseLeave={() => setBiggerPicture(false)}
                        onMouseEnter={() => setBiggerPicture(true)}
                        className={isBiggerPicture ? "opened-day-central" : "opened-day-no-central"}
                        src={data.img}/>
                </div>
            }
            {!data.open && <p>{data.nr}</p>}
        </div>
    );
}

const formatDate = (date: Date) => {
    return `${date.getDate()}.${date.getMonth() + 1}. ${date.getFullYear()}`
}

const isTodayOrBefore = (date: number) => {
    const dateToCheck = new Date(date)
    dateToCheck.setHours(0, 0, 0, 0)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateToCheck <= today;
}