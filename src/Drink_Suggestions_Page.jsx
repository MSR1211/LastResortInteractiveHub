import { useState } from "react";

/*
  This file creates the Drink Sugesstion page;
  - Shows a styled page with a button
  - Picks a random drink from a list
  - Displays the drink name and image
  - Uses animation to make it lively and interactive
  - Has animated backgound for interactivity
*/


// CSS
// All styling for this page is stored in this template string
const styles = `
  /* Main page wrapper black backgound and center content */
  .suggestions-wrapper {
    background: #000;
    min-height: 100vh;
    color: #fff;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    position: relative;
    overflow: hidden;
  }

  /* Container that holds floating background drink emojis */
  .drink-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none; /* emojis don't block clicks */
    z-index: 0;
  }

  /* Individual emoji styling */
  .drink-bg span {
    position: absolute;
    font-size: clamp(2rem, 5vw, 4rem);
    opacity: 0.12; /* emojis made slightly transparent for the backgound*/
    transform: rotate(var(--rotate));
    animation: floatDrink 5s ease-in-out infinite;
  }

  /* Animation that moves the drink emojis up and down */
  @keyframes floatDrink {
    0% { transform: translateY(0) rotate(var(--rotate)); }
    50% { transform: translateY(-18px) rotate(var(--rotate)); }
    100% { transform: translateY(0) rotate(var(--rotate)); }
  }

  /* Animation used when elements appear (pop in effect) */
  @keyframes popIn {
    0% { transform: scale(0.92); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  /* Button bounce animation on click to make the button feel lively */
  @keyframes buttonPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.08); }
    100% { transform: scale(1); }
  }

  /* Main card containing all UI elements */
  .suggestions-card {
    position: relative;
    z-index: 1; /* makes sure main card is above background emojis */
    background: #151515;
    border: 1px solid #2a2a2a;
    border-radius: 14px;
    padding: 34px;
    width: 100%;
    max-width: 760px;
    box-sizing: border-box;
    animation: popIn 0.45s ease-out;
  }

  /* Header section containing title and subtitle */
  .suggestions-header {
    text-align: center;
    margin-bottom: 28px;
  }

  /* Main title text */
  .suggestions-title {
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 900;
    text-transform: uppercase;
  }

  /* Highlighted word in title */
  .suggestions-title span {
    color: #F69A2C;
  }

  /* Subtitle under title */
  .suggestions-subtitle {
    color: #aaa;
  }

  /* Layout container that splits content into left and right */
  .suggestions-content {
    display: flex;
    gap: 28px;
    align-items: center;
    justify-content: space-between;
  }

  /* Left side button and result text */
  .suggestions-left {
    flex: 1;
  }

  /* Main button styling */
  .suggestions-button {
    margin-top: 24px;
    background: #F69A2C;
    color: #000;
    border: none;
    border-radius: 10px;
    padding: 18px 28px;
    font-weight: 900;
    cursor: pointer;
    text-transform: uppercase;
    box-shadow: 0 6px 0 #c77c1d;
  }

  /* Button pressed effect */
  .suggestions-button:active {
    transform: translateY(4px) scale(0.97);
    box-shadow: 0 2px 0 #c77c1d;
  }

  /* Extra animation class applied dynamically */
  .suggestions-button.animate {
    animation: buttonPop 0.25s ease;
  }

  /* Displays selected drink name */
  .suggestions-result {
    margin-top: 28px;
    font-size: 2rem;
    font-weight: 900;
    animation: popIn 0.25s ease-out;
  }

  /* Right side container for drink image */
  .suggestions-image-wrap {
    width: 260px;
    height: 260px;
    border-radius: 14px;
    overflow: hidden;
    background: #2a2a2a;
  }

  /* Actual image styling */
  .suggestions-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Placeholder before user selects a drink */
  .suggestions-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 4rem;
  }

  /* Back link styling */
  .suggestions-back {
    display: inline-block;
    margin-top: 28px;
    color: #F69A2C;
  }

  /* Responsive layout for smaller screens such as mobile or smartwatch */
  @media (max-width: 700px) {
    .suggestions-content {
      flex-direction: column;
      text-align: center;
    }

    .suggestions-image-wrap {
      width: 100%;
      height: 220px;
    }
  }
`;

export default function SuggestionsPage() {

  // STATE
  // Stores the currently selected drink (null = none yet)
  const [suggestion, setSuggestion] = useState(null);
  // Controls whether button animation is active
  const [animateBtn, setAnimateBtn] = useState(false);


  // DATA (LIST)
  // List of drinks with names and images, drinks can be added or removed by owner editor
  const drinks = [
    { name: "London Thunder 🍺", img: "https://pintplease.s3.eu-west-1.amazonaws.com/post/original/post_7092510-218887532.jpg" },
    { name: "High Tide 🍺", img: "https://images.untp.beer/crop?width=640&height=640&stripmeta=true&url=https://untappd.s3.amazonaws.com/photos/2025_07_29/cefabe6c1ffb3161bff3d85fd12c0547_c_1500567857_raw.jpeg" },
    { name: "Yorkshire Bitter 🍺", img: "https://images.untp.beer/crop?width=640&height=640&stripmeta=true&url=https://untappd.s3.amazonaws.com/photos/2026_04_05/c8b9b78bd9797d0627837bef3a3fe04f_c_1560894340_raw.jpg" },
    { name: "Mango Wave 🍺", img: "https://images.untp.beer/crop?width=640&height=640&stripmeta=true&url=https://untappd.s3.amazonaws.com/photos/2026_02_26/4c08f6f70ce3038fe1d622f9ba30c8c1_c_1551928999_raw.jpg" },
    { name: "Raspberry Ripple 🍺", img: "https://d31mezlzn8sqwg.cloudfront.net/media/products/17564/20190423094746704/450x450.jpg" },
    { name: "Keller Pils 🍺", img: "https://images.squarespace-cdn.com/content/v1/5bf178d1697a98763203fc8c/1583174880697-U24IMPT6T3LBITTWFGEK/KellerPills-4+crop.jpg" },
    { name: "Cruzcampo 🍺", img: "https://dramscotland.co.uk/wp-content/uploads/2023/04/FB5D4B16-A1CF-4C40-8CEB-9A7DF84149FD.jpeg" },
    { name: "Crafty Apple 🍺", img: "https://www.docteurgabs.ch/media/1230/jaq_1974-bis.jpg?width=1920&height=640&crop=auto&scale=both&quality=80" },
    { name: "Iron Brew 🍺", img: "https://vaultcity.co.uk/cdn/shop/files/IRONBREW202412-2-24web-res-3.jpg?v=1743116422" },
    { name: "Paulaner Weiss 🍺", img: "https://www.cavedirect.com/media/catalog/product/cache/00658a5c18d5a0a6f08038a53ab1286c/w/e/weissbier_btl_3_1.jpg" },
    { name: "Guinness 🍺", img: "https://api.freelogodesign.org/assets/blog/thumb/20200309091037750guinness-glass-with-logo_1176x840.jpg?t=638355680730000000" },
    { name: "Belta Blonde 🍺", img: "https://northeastbeerreview.com/wp-content/uploads/2025/12/img_6272.jpg" },
    { name: "Tight Rope 🍺", img: "https://pbs.twimg.com/media/FqjYAu-WYAI76fJ.jpg" },
    { name: "Wanderer 🍺", img: "https://pintplease.s3.eu-west-1.amazonaws.com/post/original/post_4306165-108195920.jpeg" },
    { name: "Hazy Faced Assassin 🍺", img: "https://images.squarespace-cdn.com/content/v1/628b71937f9fde6ff6d80096/5767ff33-a489-496b-9f1d-0b5c675e21b2/9dbc4af4-d0d1-bc3e-32eb-761c23cb25c8.jpg" },
    { name: "Catch The Pigeon 🍺", img: "https://images.untp.beer/crop?width=640&height=640&stripmeta=true&url=https://untappd.s3.amazonaws.com/photos/2025_07_11/ad3e71c0c8ba3e8674662ffa75a32b38_c_1495205526_raw.jpg" }
  ];


  // FUNCTION: PICK RANDOM DRINK
  const getSuggestion = () => {
    setAnimateBtn(true); // trigger button animation

    // Generate random index
    const randomIndex = Math.floor(Math.random() * drinks.length);

    // Set selected drink
    setSuggestion(drinks[randomIndex]);

    // Reset animation after short delay
    setTimeout(() => setAnimateBtn(false), 250);
  };


  // RENDER UI
  return (
    <>
      {/* Inject CSS into page */}
      <style>{styles}</style>

      <div className="suggestions-wrapper">

        {/* Background drink emojis */}
        <div className="drink-bg">
          <span style={{ top: "8%", left: "8%", "--rotate": "-18deg" }}>🍺</span>
          <span style={{ top: "18%", right: "12%", "--rotate": "22deg" }}>🍷</span>
          <span style={{ top: "42%", left: "14%", "--rotate": "12deg" }}>🍹</span>
          <span style={{ bottom: "18%", right: "10%", "--rotate": "-14deg" }}>🥂</span>
        </div>

        {/* Main card */}
        <div className="suggestions-card">

          {/* Header section */}
          <div className="suggestions-header">
            <h1 className="suggestions-title">
              Drink <span>Selector</span>
            </h1>
            <p className="suggestions-subtitle">
              Can’t decide? Let The Last Resort pick your drink.
            </p>
          </div>

          {/* Content layout */}
          <div className="suggestions-content">

            {/* LEFT SIDE */}
            <div className="suggestions-left">

              {/* Button to generate drink */}
              <button
                className={`suggestions-button ${animateBtn ? "animate" : ""}`}
                onClick={getSuggestion}
              >
                Pick a drink
              </button>

              {/* Display selected drink */}
              {suggestion && (
                <div className="suggestions-result">
                  {suggestion.name}
                </div>
              )}

              {/* Navigation back to homepage */}
              <a className="suggestions-back" href="#home">
                ← Back home
              </a>
            </div>

            {/* Right side image  */}
            <div className="suggestions-image-wrap">
              {suggestion ? (
                <img
                  src={suggestion.img}
                  alt={suggestion.name}
                  className="suggestions-img"
                />
              ) : (
                <div className="suggestions-placeholder">🍺</div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}