import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    return res.status(404).json({ messages: `${req.params.id} id tidak valid` });
  }
  next();
}

export default checkId;
