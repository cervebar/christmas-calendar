import React, {useEffect, useState} from 'react';
import './Calendar.css';
import {CalendarDay} from "../CalendarDay/CalendarDay";
import {calendarData, DataItem} from "../../calendarData";

export const Calendar = () => {
    const [doors, setDoors] = useState<DataItem[]>([]);

    useEffect(() => {
        const calendar = localStorage.calendar
            ? JSON.parse(localStorage.calendar)
            : calendarData;
        setDoors(calendar);
    }, []);

    // Store calendar in localStorage
    useEffect(() => {
        doors.length && localStorage.setItem("calendar", JSON.stringify(doors));
    }, [doors]);

    const handleFlipDoor = (id:string) => {
        const updatedDoors = doors.map((door: DataItem) =>
            door.id === id ? { ...door, open: true } : door
        );
        setDoors(updatedDoors);
    };

  return (
      <div className="calendar-container">
        {doors.map(door => (
            <CalendarDay
                key={door.id}
                data={door}
                openDay={handleFlipDoor}
            />
        ))}
    </div>
  );
}
