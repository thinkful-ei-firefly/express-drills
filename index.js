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

app.listen(3000, () => console.log('connected on port 3000'));
