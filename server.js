const express = require('express');

const app = express();

app.use(express.static('./dist/appointment-ui'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/appointment-ui/'}),
);

app.listen(process.env.PORT || 8080);
