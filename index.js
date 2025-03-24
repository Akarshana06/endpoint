const express = require('express');
const app = express();
const authRoutes = require('./authRoutes'); 

app.use(express.json());
app.use('/auth', authRoutes); 


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
