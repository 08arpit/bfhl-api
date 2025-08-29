const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const FULL_NAME = "arpit_garg";
const DOB = "08082004";
const EMAIL = "8arpitgarg@gmail.com";
const ROLL_NUMBER = "22BCE0973";

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item)) {
        let num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    const allAlphabets = data.filter(item => /^[a-zA-Z]+$/.test(item)).join("");
    let concat_string = "";
    let toggle = true;
    for (let i = allAlphabets.length - 1; i >= 0; i--) {
      concat_string += toggle
        ? allAlphabets[i].toUpperCase()
        : allAlphabets[i].toLowerCase();
      toggle = !toggle;
    }

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });

  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("BFHL API is running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
