import React from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {FormControl} from 'react-bootstrap'
import moment from "moment"

export default class DateTime extends React.Component {

    constructor(props){
        super(props);
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        this.state = {
            start : start,
            end : end
        }

        this.applyCallback = this.applyCallback.bind(this);
    }

    applyCallback(startDate, endDate){
        this.setState({
                start: startDate,
                end : endDate
            }
        )

        this.props.setDateInterval({
            startTime: startDate.toDate(),
            endTime: endDate.toDate(),
        })
    }

    render(){
            let now = new Date();
            let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
            let end = moment(start).add(1, "days").subtract(1, "seconds");
            let ranges = {
                "Today Only": [moment(start), moment(end)],
                "3 Days": [moment(start).subtract(3, "days"), moment(end)]
            }
            let local = {
                "format":"DD-MM-YYYY HH:mm",
                "sundayFirst" : false
            }
            let maxDate = moment(start).add(1, "year")
            return(
                <div> 
                    <p>Event's Date and Time Period</p>
                    <DateTimeRangeContainer 
                        ranges={ranges}
                        start={this.state.start}
                        end={this.state.end}
                        local={local}
                        maxDate={maxDate}
                        applyCallback={this.applyCallback}
                    >    
                        <FormControl
                        id="formControlsTextB"
                        type="text"
                        label="Text"
                        placeholder="Enter date and time period"
                        /> 
                    </DateTimeRangeContainer>
                </div>
            );
        }
}