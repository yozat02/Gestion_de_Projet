import React from "react";
import TimeLine from "react-gantt-timeline";
import "./style.css";

export const Gant = ({data=[]}) => {
    let list = []
    data.map(e => {
        list.push({
            id : e._id ,
            name : e.name,
            start: e.dateDebut,
            end :e.dateFin
        })
    })
        // let data = [
        // {
        //     id: 1,
        //     start: "02/02/2020",
        //     end: "03/03/2020",
        //     name: "Demo Task 1"
        // },
        // {
        //     id: 2,
        //     start: "06/02/2020",
        //     end: "07/09/2020",
        //     name: "Demo Task 2",
        //     color: "orange"
        // }
        // ];
    return (
      <div className="app-container">
        <div className="time-line-container">
          <TimeLine data={list} mode={"year"} onUpdateTask={null} />
        </div>
      </div>
    );
  }


