import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [buttonSelected, setButtonSelected] = useState<null | string>(null);
  const buttons = ["Fuck", "Marry", "Kill"];
  const [randomPhotoSelected, setRandomPhotoSelected] = useState<number[]>([]);
  const [bgImages, setBgImages] = useState<string[]>(["", "", ""]); // מערך רקעים לכל כרטיס
  const [resultText, setResultText] = useState<string>(""); // שמירת הטקסט

  const src = `/images/arielPhoto`;
  const resetGame = () => {
    setBgImages(["", "", ""])
    setButtonSelected(null)
    setResultText('')
    console.log(buttonSelected)
    setRandomPhotoSelected([])
  }
  const getRandomImage = (max: number) => {
    let randomNumber;
    do {
      randomNumber = Math.ceil(Math.random() * max);
    } while (randomPhotoSelected.includes(randomNumber));

    return randomNumber;
  };


  useEffect(() => {
    if (randomPhotoSelected.length === 3) {
      const translateText: Record<number, string> = {
        2: "flounder",
        3: "prince eric",
        4: "sebastian",
        5: "seagull",
        6: "ursula ",
        7: "King Triton",
      };
  
      // קבלת הערך המתאים
      const firstSelection1 = translateText[randomPhotoSelected[0] + 1] || "Unknown";
      const firstSelection2 = translateText[randomPhotoSelected[1] + 1 ]|| "Unknown";
      const firstSelection3 = translateText[randomPhotoSelected[2]+ 1] || "Unknown";
  
      const text = `You Fucked at ${firstSelection1} , Marry With ${firstSelection2} and Kill at ${firstSelection3}`;
      console.log(text); // אפשר להדפיס לקונסול לבדיקה
      setResultText(text); // עדכון state כדי להציג את התוצאה
    }
    console.log("🚀 ~ useEffect ~ randomPhotoSelected:", randomPhotoSelected)
  }, [randomPhotoSelected]);

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
                onClick={() => {
                  setButtonSelected(buttonName);
                  if (randomPhotoSelected.length < 3) {
                    const randomNumber = getRandomImage(6);
                    setRandomPhotoSelected([...randomPhotoSelected, randomNumber]);

                    // עדכון רקע של הכרטיס המתאים בלבד
                    setBgImages((prevImages) => {
                      const newImages = [...prevImages];
                      newImages[idx] = `${src}${randomNumber + 1}.png`;
                      return newImages;
                    });
                  }
                }}
              >
                {buttonName}
              </button>
              <div
                className="card-image"
                style={{
                  backgroundImage: `url("${bgImages[idx]}")`,
                }}
              ></div>
        
            </div>
            
          ))}
        </div>
        <div className="reset-game-container">
                 <h3>{resultText}</h3>
                <button 
                onClick={()=>{
                  resetGame()
                }}
                >Start Again</button>
              </div>
      </div>
    </section>
  );
}

export default App;
