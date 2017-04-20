import { DynamoDB, S3 } from 'aws-sdk';
import uuid from 'uuid';

var state = {
  tableName: 'Feedback',
  bucket: 'traverse-student-videos'
};

export function listFeedbacks(userId, callback) {
  var opts = {
    TableName: state.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    }
  };

  var d = new DynamoDB.DocumentClient();
  d.query(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}

export function getFeedback(userId, segmentId, callback) {
  var opts = {
    TableName: state.tableName,
    Key: {
      'userId': userId,
      'segmentId': segmentId
    }
  };

  var d = new DynamoDB.DocumentClient();
  d.get(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}

export function createNewFeedback(userId, segmentId, params, callback) {
  var opts = {
    TableName: state.tableName,
    Item: {
      userId: userId,
      segmentId: segmentId,
      segmentTitle: params.segmentTitle,
      segmentDescription: params.segmentDescription,
      segmentVideo: params.segmentVideo,
      studentVideo: params.studentVideo
    }
  };

  var d = new DynamoDB.DocumentClient();
  d.put(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}

export function deleteFeedback(userId, segmentId, callback) {
  var opts = {
    TableName: state.tableName,
    Key: {
      userId: userId,
      segmentId: segmentId
    }
  };

  var d = new DynamoDB.DocumentClient();
  d.delete(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}

export function updateFeedback(userId, segmentId, params, callback) {
  var opts = {
    TableName: state.tableName,
    Item: {
      userId: userId,
      segmentId: segmentId,
      segmentTitle: params.segmentTitle,
      segmentDescription: params.segmentDescription,
      segmentVideo: params.segmentVideo,
      instructorVideo: params.instructorVideo,
      studentVideo: params.studentVideo,
      publicNotes: params.publicNotes,
      privateNotes: params.privateNotes
    }
  };

  var d = new DynamoDB.DocumentClient();
  d.put(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}

export function uploadFeedbackVideo(video, callback) {
  var opts = {
    Key: uuid.v4(),
    Bucket: state.bucket,
    Body: video
  };

  var s3 = new S3();
  s3.upload(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}

export function getSignedFeedbackVideoUrl(link, callback) {
  if (!link) {
    callback.onSuccess('');
    return;
  }

  var opts = {
    Key: link.substring(link.lastIndexOf('/') + 1),
    Bucket: state.bucket,
  };

  var s3 = new S3();
  s3.getSignedUrl('getObject', opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}
