import React from 'react';
import { Link } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';

class HondaHome extends React.Component {

  static root_style = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyConent: 'space-around'
  }

  static list_style = {
    width: 500,
    height: 450,
    overflowY: 'auto'
  }

  constructor(props) {
    super(props);
    this.state = {
      gridData: [
        {
          img: 'images/students.png',
          title: 'Students',
          description: 'View and manage students',
          link: '/students'
        },
        {
          img: 'images/lessons.png',
          title: 'Lessons',
          description: 'View and manage lessons',
          link: '/lessons'
        },
        {
          img: 'images/about.png',
          title: 'About',
          description: 'Learn more about the AEP system',
          link: '/about'
        },
        {
          img: 'images/help.png',
          title: 'Help',
          description: 'Learn to use the system',
          link: '/help'
        }
      ]
    };
  }

  render() {
    return (
      <div
        style={HondaHome.root_style}
      >
        <GridList
          cellHeight={180}
          style={HondaHome.list_style}
        >
        {this.state.gridData.map((e) => (
          <GridTile
            containerElement={<Link to={e.link} />}
            key={e.img}
            title={e.title}
            subtitle={e.description}
          >
            <img src={e.img} />
          </GridTile>
        ))}
        </GridList>
      </div>
    );
  }
}

export default HondaHome;
