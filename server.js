const app = require("./app.js");


app.listen(process.env.PORT, () => {
    console.log(`server listen at http://localhost:${process.env.PORT}`);
  });
