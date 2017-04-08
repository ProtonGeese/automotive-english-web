import { DynamoDB } from 'aws-sdk';
import uuid from 'uuid';
import { getLesson, updateLesson } from './lesson.jsx';

var state = {
  lessonTableName: 'Lessons',
  segmentTableName: 'Segments'
};

export function listSegments(lessonId, callback) {
  /*
   * See doc/promises.md for an explanation of this method.
   */

  var lesson = new Promise((resolve, reject) => {
    getLesson({
      lessonId: lessonId
    }, {
      onSuccess: resolve,
      onFailure: reject
    });
  });

  var segments = lesson.then((response) => {
    // Check for the trivial case.
    if (response.Item.segments.length === 0) {
      return new Promise((resolve) => {
        resolve([]);
      });
    }

    var keys = response.Item.segments.map((segmentId) => {
      return {
        'segmentId': segmentId
      };
    });

    return new Promise((resolve, reject) => {
      var opts = {
        RequestItems: {
          [state.segmentTableName]: {
            Keys: keys
          }
        }
      };

      var d = new DynamoDB.DocumentClient();
      d.batchGet(opts, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  });

  segments.then((response) => {
    callback.onSuccess(response.Responses.Segments);
  }, callback.onFailure);
}

export function getSegment(lessonId, segmentId, callback) {
  var opts = {
    TableName: state.segmentTableName,
    Key: {
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

export function createNewSegment(lessonId, params, callback) {
  /*
   * We're going to do this stupidly first. I'm not familiar with the syntax
   * to do complex updates so we're just going to do it client side.
   */

  // Generate a UUID for the new segment.
  var segmentId = uuid.v4();

  var opts = {
    TableName: state.segmentTableName,
    Item: {
      segmentId: segmentId,
      title: params.title,
      description: params.description
    }
  };

  // Create a new segment entry.
  var d = new DynamoDB.DocumentClient();

  var segment = new Promise((resolve, reject) => {
    d.put(opts, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });

  var lesson = segment.then(() => {
    return new Promise((resolve, reject) => {
      getLesson({
        lessonId: lessonId
      }, {
        onSuccess: resolve,
        onFailure: reject
      });
    });
  });

  var result = lesson.then((response) => {
    var segments = response.Item.segments;
    segments.push(segmentId);

    return new Promise((resolve, reject) => {
      updateLesson({
        lessonId: lessonId,
        title: response.Item.title,
        description: response.Item.description,
        level: response.Item.level,
        segments: segments
      }, {
        onSuccess: resolve,
        onFailure: reject
      });
    });
  });

  result.then(callback.onSuccess, callback.onFailure);
}

export function deleteSegment(lessonId, segmentId, callback) {
  var opts = {
    TableName: state.segmentTableName,
    Key: {
      segmentId: segmentId,
    }
  };

  var d = new DynamoDB.DocumentClient();
  var segment = new Promise((resolve, reject) => {
    d.delete(opts, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });

  var lesson = new Promise((resolve, reject) => {
    getLesson({
      lessonId: lessonId
    }, {
      onSuccess: resolve,
      onFailure: reject
    });
  });

  var result = lesson.then((response) => {
    var segments = response.Item.segments.filter((e) => {
      return e !== segmentId;
    });

    return new Promise((resolve, reject) => {
      updateLesson({
        lessonId: lessonId,
        title: response.Item.title,
        description: response.Item.description,
        level: response.Item.level,
        segments: segments
      }, {
        onSuccess: resolve,
        onFailure: reject
      });
    });
  });

  Promise.all(segment, result).then(callback.onSuccess, callback.onFailure);
}

export function updateSegment(lessonId, segmentId, params, callback) {
   var opts = {
    TableName: state.segmentTableName,
    Item: {
      segmentId: segmentId,
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
