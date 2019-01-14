import React, { useEffect, useState } from "react";

let basicDictionary = "0123456789qwertyuiopasdfghjklzxcvbnm!?></a`~+*=@#$%".split(
  ""
);

function setDictionnary(dictionary) {
  return function getLetter() {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
  };
}

export default function TextShuffler({
  text = "",
  initialLength = 20,
  dictionary = basicDictionary,
  delay = 1000
}) {
  const initialText = Array.from(new Array(initialLength))
    .map(_ => " ")
    .join("");

  const [isDelayExpired, setIsDelayExpired] = useState(false);
  const [isDone, setDone] = useState(false);
  const [t, setText] = useState(initialText);

  let timeout;
  const getLetter = setDictionnary(dictionary);

  useEffect(() => {
    if (!timeout) {
      timeout = setTimeout(() => setIsDelayExpired(true), delay);
    }
    return () => clearTimeout(timeout);
  }, []);
  useEffect(
    () => {
      if (!isDelayExpired) {
        return;
      }
      let interval;
      let shrinkedText = t;
      if (!interval) {
        interval = setInterval(() => {
          if (shrinkedText.length > text.length) {
            shrinkedText = shrinkedText.substring(0, shrinkedText.length - 1);
            setText(shrinkedText);
          }
          if (shrinkedText.length === text.length) {
            setText(text);
            setDone(true);
            clearInterval(interval);
          }
        }, 100);
      }
    },
    [isDelayExpired]
  );
  return (
    <div>
      {t.split("").map((letter, index) => (
        <Letter
          key={index}
          getLetter={getLetter}
          letter={isDone ? letter : ""}
        />
      ))}
    </div>
  );
}

const Letter = ({ getLetter, letter }) => {
  let timeout;
  const [localLetter, setLocalLetter] = useState("");

  useEffect(
    () => {
      if (letter && !timeout) {
        clearInterval(timeout);
      }
      timeout = setInterval(() => {
        setLocalLetter(getLetter());
      }, Math.random() * 16 + 100);
      return () => clearInterval(timeout);
    },
    [letter]
  );

  if (letter) {
    return <span>{letter}</span>;
  }
  return <div>{localLetter}</div>;
};
