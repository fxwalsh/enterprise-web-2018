import React from 'react';

class Subjects extends React.Component {

    render() {
        let list = this.props.modules.map((module, index) => {
            return (
                <tr >
                    <td>{module.name}</td>
                    <td>{module.noLectures}</td>
                    <td>{module.noPracticals}</td>
                </tr>
            );
        });
        return (
            <div>
                <h1>{`${this.props.course} modules table`} </h1>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>No lectures</th>
                            <th>No practicls</th>
                        </tr>
                    </thead>
                    <tbody >
                        {list}
                    </tbody >
                </table>
            </div>
        );
    }
}

export default Subjects;
