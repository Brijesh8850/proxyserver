const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 3000; // You can change this as needed

// Allow CORS so your frontend can access the proxy
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace * with your frontend origin for security
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Proxy requests to the insecure backend
app.use('/api', createProxyMiddleware({
  target: 'http://103.76.214.46/AutoMate/SmartBranch/API',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix
  },
}));

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
