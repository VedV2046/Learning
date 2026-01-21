import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const today = new Date();
    const day = today.getDay();

    //console.log(day);
    let type = "a Weekday"
    let adv = "Work Hard"

    if(day === 0 || day ===6) {
        type = "the Weekend";
        adv = "Relax";
    }

    res.render("index.ejs", {
        dayType: type, 
        advice: adv
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}.`);
});

