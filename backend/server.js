const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


function generateComplementaryColors(baseColor) {
  const shadeColor = (color, percent) => {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    return `#${((1 << 24) + (R << 16) + (G << 8) + B)
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  };

  let colors = [];
  for (let i = 1; i <= 5; i++) {
    colors.push(shadeColor(baseColor, i * 20));
  }
  return colors;
}


app.post('/api/generate-palette', (req, res) => {
  const { baseColor } = req.body;
  const palette = generateComplementaryColors(baseColor);
  res.json({ palette });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
