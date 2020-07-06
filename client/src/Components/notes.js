 return(
        <div>
 {
                    reports.map(report =>{
                        return <div key={report._id}>
                            <table>
                                <tr>
                                    <th>Lesson date/Time</th>
                                    <th>Teacher</th>
                                    <th>Student name</th>
                                    <th>Lesson number</th>
                                    <th>Current Stage</th>
                                    <th>Description of lesson</th>
                                    <th>Homework</th>
                                </tr>
                                <tr>
                                    <td>6 pm {report.date}</td>
                                    <td>{report.teacher}</td>
                                    <td>{report.name}</td>
                                    <td>{report.lessonnumber}</td>
                                    <td>{report.currentstage}</td>
                                    <td>Khadeejah did well in today's lesson</td>
                                    <td>{report.homework}</td> 
                                </tr>
                            </table>

                            </div> 
                    })
                }
        </div>
    );