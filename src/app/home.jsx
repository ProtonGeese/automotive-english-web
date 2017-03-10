import React from 'react';
import { Link } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';

import ActionFace from 'material-ui/svg-icons/action/face';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionHelp from 'material-ui/svg-icons/action/help';
import ActionBook from 'material-ui/svg-icons/action/book';

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

  static icon_style = {
    width: '100%',
    height: '100%'
  }

  constructor(props) {
    super(props);
    this.state = {
      gridData: [
        {
          icon: (
            <ActionFace
              style={HondaHome.icon_style}
            />
          ),
          title: 'Students',
          description: 'View and manage students',
          link: '/students'
        },
        {
          icon: (
            <ActionAssignment
              style={HondaHome.icon_style}
            />
          ),
          title: 'Lessons',
          description: 'View and manage lessons',
          link: '/lessons'
        },
        {
          icon: (
            <ActionFavorite
              style={HondaHome.icon_style}
            />
          ),
          title: 'About',
          description: 'Learn more about the AEP system',
          link: '/about'
        },
        {
          icon: (
            <ActionBook
              style={HondaHome.icon_style}
            />
          ),
          title: 'Documentation',
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
            titleBackground='rgba(36, 36, 36, 1)'
          >
            {e.icon}
          </GridTile>
        ))}
        </GridList>
      </div>
    );
  }
}

export default HondaHome;
