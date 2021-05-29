import React from 'react';

function ListTasks(props) {
    const projectCode = props.location.state.project;
    console.log(projectCode);
    return (
        <div className="listEntities">
            <h3 id="headerListOfUsers" className="header">All Tasks</h3>
        </div>
    );
};

export default ListTasks
