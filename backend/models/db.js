const mongoose = require('mongoose');
mongoose.set("strictQuery", false);


const URL=process.env.URL_DB || "mongodb://127.0.0.1:27017/Project4"


mongoose.connect(`${URL}`
).then(() => {
    console.log("DB Ready To Use");
})
.catch((err) => {
    console.log(err);
});

