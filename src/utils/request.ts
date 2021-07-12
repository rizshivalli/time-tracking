/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import Bugsnag from '@bugsnag/js';

const { NODE_ENV } = process.env;
const codeMessage = {
  200: 'The server successfully returned the requested data. ',
  201: 'New or modified data was successful. ',
  202: 'A request has entered the background queue (asynchronous task). ',
  204: 'Delete data successfully. ',
  400: 'There was an error in the request sent, and the server did not create or modify data. ',
  401: 'The user does not have permission (token, username, password is wrong). ',
  403: 'The user is authorized, but access is prohibited. ',
  404: 'The request sent was for a non-existent record, and the server did not operate. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource is permanently deleted and will no longer be obtained. ',
  422: 'When creating an object, a validation error occurred. ',
  500: 'An error occurred on the server, please check the server. ',
  502: 'Gateway error. ',
  503: 'Service is unavailable, the server is temporarily overloaded or maintained. ',
  504: 'The gateway timed out. ',
};

const errorHandler = (error: { response: Response }): Response => {
  // @ts-ignore
  const { data } = error;

  if (data && data.statusCode) {
    Bugsnag.notify(data);
    const errorText = codeMessage[data.statusCode] || data.message;
    const { message, error } = data;
    if (!NODE_ENV || NODE_ENV === 'development') {
      // dev code
      notification.error({
        message: `Development error ${error}: ${message}`,
        description: errorText,
      });
    }
    //  else {
    //   // production code
    //   notification.error({
    //     message: `Something went wrong. Please Try Again!`,
    //   });
    // }
  } else if (!data) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'network anomaly',
    });
  }

  return data;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

export default request;
