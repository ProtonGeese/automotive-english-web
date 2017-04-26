import React from 'react';
import { hashHistory, Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';

import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import ContentAdd from 'material-ui/svg-icons/content/add';


class TraVerseHelp extends React.Component {
  render() {
    return (
      <div>
        <h1>Help</h1>
        <h2>Video Encoding</h2>
        <p>The preferred format for encoding videos for playback in the browser
        is an MPEG-4 container with H.264 video and ACC audio. We recommend
        the <a href="https://handbrake.fr/downloads.php">HandBrake</a> application
        to help you convert your video format.</p>
        <h2>Video Settings</h2>
        <p>The optimal quality of your video is up to you, but for an
        application which is focused on audio you might wish to reduce the video
        quality for size and increase the audio quality. For video we recommend
        480p with 30fps since any more is likely to be unnecessary. For audio we
        recommend 320 kbps bitrate.</p>
      </div>
    );
  }
}

export default TraVerseHelp;
