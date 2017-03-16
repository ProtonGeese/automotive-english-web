import { DynamoDB } from 'aws-sdk';
import uuid from 'uuid';

var state = {
  tableName: 'Lessons'
};

export function listLessons(callback) {
  var opts = {
    TableName: state.tableName
  };

  var d = new DynamoDB.DocumentClient();
  d.scan(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      callback.onFailure(err);
    }
  });
}

export function getLesson(params, callback) {
  var opts = {
    TableName: state.tableName,
    Key: {
      'lessonId': params.lessonId
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

export function createNewLesson(params, callback) {
  var opts = {
    TableName: state.tableName,
    Item: {
      lessonId: uuid.v4(),
      title: params.title,
      description: params.description
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

export function deleteLesson(params, callback) {
  var opts = {
    TableName: state.tableName,
    Key: {
      lessonId: params.lessonId
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

export function updateLesson(params, callback) {
  var opts = {
    TableName: state.tableName,
    Item: {
      lessonId: params.lessonId,
      title: params.title,
      description: params.description
    }
  };

  var d = new DynamoDB.DocumentClient();
  d.put(opts, (err, data) => {
    if (!err) {
      callback.onSuccess(data);
    } else {
      console.log(err);
      callback.onFailure(err);
    }
  });
}
