import React, { useState, useEffect, Fragment } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dateFnsFormat from 'date-fns/format';

const DatePicker = (props) => {
    const [selectedDay, setDate] = useState(new Date('1999-01-01'));
    const Format = "yyyy-MM-dd";

    const handleDate = (e, newValue) => {
        setDate(newValue);
    }

    useEffect(() => setDate(props.value))


    return (
        <Fragment>
            <DayPickerInput onChange={handleDate} format={Format}  placeholder={`${dateFnsFormat(new Date(), Format)}`}/>
        </Fragment>
    )
}

export default DatePicker;