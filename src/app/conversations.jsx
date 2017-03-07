import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Link } from 'react-router';

const HondaConversations = () => (
  <div>
        <Toolbar>
            <ToolbarGroup>
                <FlatButton 
                label="New Post" primary={true}
                containerElement={<Link to="/conversations/new" />}
              />
              <FlatButton label="Delete Post" secondary={true}/>
            </ToolbarGroup>
        </Toolbar>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>Subject</TableHeaderColumn>
                    <TableHeaderColumn>Author</TableHeaderColumn>
                    <TableHeaderColumn>Date</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableRowColumn>How To English?</TableRowColumn>
                    <TableRowColumn><Link to="/student/1">John Smith</Link></TableRowColumn>
                    <TableRowColumn>Feb 15, 2017</TableRowColumn>
              </TableRow>
            </TableBody>
        </Table>
  </div>
);

export default HondaConversations;
