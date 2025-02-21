import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [magicWord, setMagicWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const correctMagicWord = "Ariel"; // המילה הנכונה

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

      const resultString = selectedPairs
        .map(({ action, imageIndex }) => `${action} the ${translateText[imageIndex + 1] || "Unknown"}`)
        .join(", ");

      setResultText(`You ${resultString}`);
    }
  }, [selectedPairs]);

  const handleStartGame = () => {
    if (magicWord.trim().toLowerCase() === correctMagicWord.toLowerCase()) {
      setIsGameStarted(true);
      setErrorMessage("");
    } else {
      setErrorMessage("טפיי עליך, זאת לא אריאל!");
    }
  };

  return (
    <section className="main-section">
      {!isGameStarted ? (
        <div className="start-screen">
          <h2>מהי מילת הקסם?</h2>
          <input
            type="text"
            value={magicWord}
            onChange={(e) => setMagicWord(e.target.value)}
            placeholder="הקלד את מילת הקסם..."
          />
          <button onClick={handleStartGame}>התחל משחק</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}

export default App;
