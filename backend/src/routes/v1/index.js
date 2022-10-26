const nftRoutes = require('./nft-routes');
const toeknRoutes = require('./token-routes');
const chatRoutes = require('./chat-routes');

module.exports = (app) => {
  app.use('/api/v1', nftRoutes);
  app.use('/api/v1', toeknRoutes);
  app.use('/api/v1', chatRoutes);
};
