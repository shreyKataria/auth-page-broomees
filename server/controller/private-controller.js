exports.getPrivateRoute = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "This is a private route",
  });
};
