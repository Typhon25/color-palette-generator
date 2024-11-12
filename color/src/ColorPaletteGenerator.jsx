// import React, { useState } from 'react';
// import './ColorPaletteGenerator.css';

// function ColorPaletteGenerator() {
//   const [baseColor, setBaseColor] = useState("#3498db");
//   const [palette, setPalette] = useState([]);

//   const generatePalette = (color) => {
//     let colors = [];
//     for (let i = 1; i <= 5; i++) {
//       colors.push(shadeColor(color, i * 20));  
//     }
//     setPalette(colors);
//   };


//   const shadeColor = (color, percent) => {
//     let R = parseInt(color.substring(1, 3), 16);
//     let G = parseInt(color.substring(3, 5), 16);
//     let B = parseInt(color.substring(5, 7), 16);

//     R = parseInt((R * (100 + percent)) / 100);
//     G = parseInt((G * (100 + percent)) / 100);
//     B = parseInt((B * (100 + percent)) / 100);

//     R = R < 255 ? R : 255;
//     G = G < 255 ? G : 255;
//     B = B < 255 ? B : 255;

//     const newColor = `#${(
//       (1 << 24) +
//       (R << 16) +
//       (G << 8) +
//       B
//     )
//       .toString(16)
//       .slice(1)
//       .toUpperCase()}`;
//     return newColor;
//   };

 
//   const handleBaseColorChange = (e) => {
//     setBaseColor(e.target.value);
//   };

 
//   const copyToClipboard = (color) => {
//     navigator.clipboard.writeText(color);
//     alert(`Copied ${color} to clipboard!`);
//   };

//   return (
//     <div className="container">
//       <h1>Color Palette Generator</h1>

    
//       <div className="input-section">
//         <label>Base Color:</label>
//         <input
//           type="color"
//           value={baseColor}
//           onChange={handleBaseColorChange}
//         />
//         <input
//           type="text"
//           value={baseColor}
//           onChange={(e) => setBaseColor(e.target.value)}
//           placeholder="Enter hex code"
//         />
//         <button onClick={() => generatePalette(baseColor)}>
//           Generate Palette
//         </button>
//       </div>

//       <div className="palette">
//         {palette.map((color, index) => (
//           <div
//             key={index}
//             className="color-block"
//             style={{ backgroundColor: color }}
//             onClick={() => copyToClipboard(color)}
//           >
//             {color}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ColorPaletteGenerator;




import React, { useState } from 'react';
import axios from 'axios';
import './ColorPaletteGenerator.css';

function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#3498db");
  const [palette, setPalette] = useState([]);


  const generatePalette = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate-palette', {
        baseColor
      });
      setPalette(response.data.palette);
    } catch (error) {
      console.error("Error generating palette:", error);
    }
  };


  const handleBaseColorChange = (e) => {
    setBaseColor(e.target.value);
  };


  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  return (
    <div className="container">
      <h1>Color Palette Generator</h1>

     
      <div className="input-section">
        <label>Base Color:</label>
        <input
          type="color"
          value={baseColor}
          onChange={handleBaseColorChange}
        />
        <input
          type="text"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          placeholder="Enter hex code"
        />
        <button onClick={generatePalette}>
          Generate Palette
        </button>
      </div>


      <div className="palette">
        {palette.map((color, index) => (
          <div
            key={index}
            className="color-block"
            style={{ backgroundColor: color }}
            onClick={() => copyToClipboard(color)}
          >
            {color}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorPaletteGenerator;
