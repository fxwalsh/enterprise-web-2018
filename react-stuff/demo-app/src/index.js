import React from 'react';
import ReactDOM from 'react-dom';
import Subjects from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

let mods = [
    {
        name: 'Data Mining',
        noLectures: 2,
        noPracticals: 2
    },
    {
        name: 'Enterprise Web Dev',
        noLectures: 2,
        noPracticals: 1
    }
] ;
let name = 'MSc Enterprise Systems' ;

ReactDOM.render(
    <Subjects course={name}  modules={mods}  />, document.getElementById('root')
);
