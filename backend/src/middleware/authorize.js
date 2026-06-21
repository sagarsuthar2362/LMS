import ApiError from '../utils/ApiError.js'

export const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      throw new ApiError(403, "unauthorized request");
    }

    next();
  };
};
