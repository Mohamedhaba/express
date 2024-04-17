const express = require("express");
const path = require("path");

const app = express();
const verifyWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();
  console.log(dayOfWeek);

  if (dayOfWeek >= 4 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next();
  } else {
    res.status(403).json({ error: 'Sorry, the web application is only available during working hours (Monday to Friday, from 9 AM to 5 PM).' });

    // res.send({ error: 'Sorry, the web application is only available during working hours (Monday to Friday, from 9 AM to 5 PM).' });
  }
};

app.use(verifyWorkingHours);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
