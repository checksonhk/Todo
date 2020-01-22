const forceSession = (req, res, next) => {
  if (req.session.isNew) req.session.forceSession = true;
  next();
};

module.export = forceSession;
