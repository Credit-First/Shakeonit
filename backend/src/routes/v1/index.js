const nftRoutes = require('./nft-routes');

module.exports = (app) => {
  app.use('/api/v1', nftRoutes);
};
