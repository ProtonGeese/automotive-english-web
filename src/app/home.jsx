import React from 'react';
import { Link } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';

import ActionFace from 'material-ui/svg-icons/action/face';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionBook from 'material-ui/svg-icons/action/book';
import SocialPerson from 'material-ui/svg-icons/social/person';

class TraVerseHome extends React.Component {

  static root_style = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyConent: 'space-around'
  }

  static list_style = {
    width: 500,
    height: 400,
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
              style={TraVerseHome.icon_style}
            />
          ),
          title: 'Students',
          description: 'View and manage students',
          link: '/students'
        },
        {
          icon: (
            <ActionAssignment
              style={TraVerseHome.icon_style}
            />
          ),
          title: 'Lessons',
          description: 'View and manage lessons',
          link: '/lessons'
        },
        {
          icon: (
            <SocialPerson 
              style={TraVerseHome.icon_style}
            />
          ),
          title: 'Instructors',
          description: 'View and manage instructors',
          link: '/instructors'
        },
        {
          icon: (
            <ActionBook
              style={TraVerseHome.icon_style}
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
        style={TraVerseHome.root_style}
      >
        <GridList
          cellHeight={180}
          style={TraVerseHome.list_style}
        >
        {this.state.gridData.map((e) => (
          <GridTile
            containerElement={<Link to={e.link} />}
            key={e.title}
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

export default TraVerseHome;
