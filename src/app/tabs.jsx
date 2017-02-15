import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import HondaStudents from './students.jsx';

const HondaTabs = () => (
  <Tabs>
    <Tab label="Students">
      <HondaStudents/>
    </Tab>
    <Tab label="Conversations"/>
  </Tabs>
);

export default HondaTabs
