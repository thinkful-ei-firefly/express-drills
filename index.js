const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));

app.get('/sum', (req, res) => {
  const { a, b } = req.query;
  if (!a || !b) {
    return res.status(404).send('must provide both values');
  }
  const c = parseFloat(a) + parseFloat(b);
  res.send(`The sum of ${a} and ${b} is ${c}`);
});

app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;
  if (!text || !shift) {
    return res.status(404).send('Must provide both queries.');
  }
  const shiftInt = parseInt(shift);
  const charArr = text.split('');
  const final = charArr.map(char => {
    const charNum = char.toUpperCase().charCodeAt(0);
    if (charNum + shiftInt > 90) {
      const diff = charNum + shiftInt - 90;
      return String.fromCharCode(65 + diff - 1);
    } else {
      return String.fromCharCode(charNum + shiftInt);
    }
  });
  res.send(`The shifted text is: ${final.join('')}.`);
});

app.get('/lotto', (req, res) => {
  const { arr } = req.query;
  if (!arr || arr.length !== 6) {
    return res
      .status(404)
      .send('arr is required and must contain exactly 6 values');
  }
  let counter = 0;
  const intArr = arr.map(num => parseInt(num));
  console.log(intArr);
  let compareArr = [];
  for (let i = 1; i <= 6; i++) {
    compareArr.push(Math.floor(Math.random() * 20));
  }

  for (let num of compareArr) {
    console.log(num);
    if (intArr.includes(num)) {
      counter++;
      console.log(counter);
    }
  }

  if (counter < 4) {
    res.send('Sorry, you lose');
  } else if (counter === 4) {
    res.send('Congratulations, you win a free ticket');
  } else if (counter === 5) {
    res.send('Congratulations! You win $100!');
  } else if (counter === 6) {
    res.send('Wow! Unbelievable! You could have won the mega millions!');
  }
});

app.listen(3000, () => console.log('connected on port 3000'));
