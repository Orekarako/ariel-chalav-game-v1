import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const buttons = ["Fuck", "Marry", "Kill"];

  const [selectedPairs, setSelectedPairs] = useState<{ action: string; imageIndex: number }[]>([]);
  const [randomPhotoSelected, setRandomPhotoSelected] = useState<number[]>([]);
  const [bgImages, setBgImages] = useState<string[]>(["", "", ""]);
  const [disabledButtons, setDisabledButtons] = useState<boolean[]>([false, false, false]);
  const [resultText, setResultText] = useState<string>("");

  const src = `/images/arielPhoto`;

  const resetGame = () => {
    setBgImages(["", "", ""]);
    setSelectedPairs([]);
    setRandomPhotoSelected([]);
    setDisabledButtons([false, false, false]);
    setResultText("");
  };

  const getRandomImage = (max: number) => {
    let randomNumber;
    do {
      randomNumber = Math.ceil(Math.random() * max);
    } while (randomPhotoSelected.includes(randomNumber));

    return randomNumber;
  };

  useEffect(() => {
    if (selectedPairs.length === 3) {
      const translateText: Record<number, string> = {
        2: "flounder",
        3: "prince eric",
        4: "sebastian",
        5: "seagull",
        6: "ursula",
        7: "King Triton",
      };

      // יצירת טקסט מסודר לפי סדר הלחיצות
      const resultString = selectedPairs
        .map(({ action, imageIndex }) => `${action} the ${translateText[imageIndex + 1] || "Unknown"}`)
        .join(", ");

      setResultText(`You ${resultString}`);
    }
  }, [selectedPairs]);

  return (
    <section className="main-section">
      <header>
        <div className="main-image">
          <img src="/images/arielPhoto1.png" alt="" />
        </div>
      </header>
      <div className="body-section">
        <div className="buttons-container">
          {buttons.map((buttonName: string, idx: number) => (
            <div className="card-container" key={idx}>
              <button
                disabled={disabledButtons[idx]}
                onClick={() => {
                  if (selectedPairs.length < 3) {
                    const randomNumber = getRandomImage(6);

                    setSelectedPairs([...selectedPairs, { action: buttonName, imageIndex: randomNumber }]);
                    setRandomPhotoSelected([...randomPhotoSelected, randomNumber]);

                    setBgImages((prevImages) => {
                      const newImages = [...prevImages];
                      newImages[selectedPairs.length] = `${src}${randomNumber + 1}.png`;
                      return newImages;
                    });

                    setDisabledButtons((prev) => {
                      const newDisabled = [...prev];
                      newDisabled[idx] = true;
                      return newDisabled;
                    });
                  }
                }}
              >
                {buttonName}
              </button>
              <div
                className="card-image"
                style={{
                  backgroundImage: `url("${bgImages[selectedPairs.findIndex((b) => b.action === buttonName)]}")`,
                }}
              ></div>
            </div>
          ))}
        </div>
        <div className="reset-game-container">
          <h3>{resultText}</h3>
          <button onClick={resetGame}>Start Again</button>
        </div>
      </div>
    </section>
  );
}

export default App;
