const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect(`${process.env.URL_DB}`
).then(() => {
    console.log("DB Ready To Use");
})
.catch((err) => {
    console.log(err);
});

