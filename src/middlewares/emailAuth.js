class EmailAuthentication {
  /**
   * @description This helps a new User to create credentials
   * @param  {object} err - The error object
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @param  {object} next - Invoke next middleware
  * @returns  {object} The response object
  */
  googleTokenChecker(err, req, res, next) {
    if (err.name === 'TokenError') {
      res.redirect('/api/auth/google');
    }
    next();
  }

  /**
   * @description This helps a new User to create credentials
   * @param  {object} err - The error object
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @param  {object} next - Invoke next middleware
  * @returns  {object} The response object
  */
  facebookTokenChecker(err, req, res, next) {
    if (err) {
      res.redirect('/api/auth/facebook');
    }
    next();
  }
}
export default new EmailAuthentication();
