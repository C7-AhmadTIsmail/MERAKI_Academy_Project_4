const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const URL=process.env.URL_DB

mongoose.connect(`${URL}`
).then(() => {
    console.log("DB Ready To Use");
})
.catch((err) => {
    console.log(err);
});

