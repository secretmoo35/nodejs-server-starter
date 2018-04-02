'use strict';

const app = require('./src/config/app');

app.listen(3100, function () {
    console.log('Start server');
    console.log('Server is running');
});