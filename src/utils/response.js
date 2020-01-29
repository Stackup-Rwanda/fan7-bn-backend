/**
 * @description Response contains user response messages
 */
class Response {
  /**
   *
   * @description constructor initializes res, code, message
   * Response constructor
   * @constructor
   *
   * @param {obj} res
   * @param {number} code
   * @param {*} message string or object
   */
  constructor(res, code, message) {
    this.res = res;
    this.code = code;
    this.message = message;
  }

  /**
   * @description Send Error Response
   * @returns {*} null
   */
  sendErrorMessage() {
    this.res.status(this.code).json({
      status: this.code,
      error: this.message,
    });
  }

  /**
   * @description Send Success Response
   * @returns {*} null
   */
  sendSuccessMessage() {
    this.res.status(this.code).json({
      status: this.code,
      message: this.message,
    });
  }

  /**
   * @description Send Success Response
   * @returns {*} null
   */
  sendSuccessResponse() {
    this.res.status(this.code).json({
      status: this.code,
      data: this.message,
    });
  }
}

export default Response;
export const onError = (res, code, error) => res.status(code).json({
  status: code,
  error,
});
export const onSuccess = (res, code, message, data) => res.status(code).json({
  status: code,
  message,
  data
});
