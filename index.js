const express = require('express');
const app = express();
const port = 3000;
const todoRoutes = require('./todos');

app.use(express.json());
app.use('/api', todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
