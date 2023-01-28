// import logo from './logo.svg';
import './App.css';
import Button from './components/AllButtons';
import ButtonBox from './components/ButtonBox';
import Container from './components/Container';
import MyScreen from './components/MyScreen'
import ConcatScreen from './components/ConcatedStrings';
import React, { useState, useEffect } from "react";

const ArrOfButtons = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];
let value = ''
function App() {
  const operatorsArray = ["%", "/", "X", "-", "+"];
  let [calc, setCalc] = useState({
    last_input: '',
    last_value: '',
    last_sign: '',
    second_val: '',
    sign: "",
    num: '',
    res: 0,
    str:''
  });
  

  // METHODS 
  const solveComputation = (a, b, sign) =>
    sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;
  
  const resetValuePerClick = () => {
    setCalc((prev)=>({
      ...prev,
      sign: "",
      num: 0,
      res: 0,
      str: '',
    }));
  };

  const InvertValue = () => {
    setCalc((prev)=>({
      ...prev,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    }));
  };

  const getPercentageValue = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
    setCalc((prev)=>({
      ...prev,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    })
    );
  };

  const InputEqualValues = () => {
    if (calc.sign && calc.num) {
      setCalc((prev)=>({
        ...prev,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
              solveComputation(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)),
                calc.sign
              )
            ),
        sign: "",
        num: 0,
        str: toLocaleString(
          solveComputation(
            Number(removeSpaces(calc.res)),
            Number(removeSpaces(calc.num)),
            calc.sign
          )
        ).slice(toLocaleString(
          solveComputation(
            Number(removeSpaces(calc.res)),
            Number(removeSpaces(calc.num)),
            calc.sign
          )
        ).length-1 , toLocaleString(
          solveComputation(
            Number(removeSpaces(calc.res)),
            Number(removeSpaces(calc.num)),
            calc.sign
          )
        ).length )
      }));
    }
  };

  const getOperators = (e) => {
    setCalc((prev)=>({
      ...prev,
      sign: e.target.innerHTML,
      res: !calc.num
        ? calc.res
        : !calc.res
          ? calc.num
          : toLocaleString(
            solveComputation(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    }));
  };
  const getPointValue = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc((prev)=>({
      ...prev,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    }));
  };
  const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 "); // adds comma
  
const removeSpaces = (num) => num.toString().replace(/\s/g, ""); // remove execess spacess 
  // GET IF THE CLICK BUTTON IS NOT A OPERATOR (0-9)
  const clickNumber = (e) => { //
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16) {
      setCalc((prev)=>({
        ...prev,
        num:
          removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
        // last_input: `${prev.last_input}${value}`
      }));
    }
  };

  const onClickOperators = (e) => {
    e.preventDefault();
    value = e.target.innerHTML;
    console.log(operatorsArray.includes(value))
    if (operatorsArray.includes(value)&&!calc.last_value) {
      setCalc((prev => ({
        ...prev,
        last_sign: value,
        last_value: prev.last_input,
        str: `${prev.str}${value}`,
        last_input: '',
        sign: value,
      })))
    }
    else if (operatorsArray.includes(value) && calc.last_value) {
      setCalc((prev => ({
        ...prev,
        last_sign: value,
        second_val: prev.last_input,
        str: `${prev.str}${value}`,
        last_input: '',
        sign: value
      })))
    }
    else if (value === 'C') {
      setCalc((({
        last_input: '',
        last_value: '',
        last_sign: '',
        second_val: '',
        sign: "",
        num: '',
        res: 0,
        str: ''
      })))
    }
    else { 
      setCalc((prev => ({
        ...prev,
        last_input: `${prev.last_input}${value}`,
        str: `${prev.str}${value}`
      })))
    }
    
  }

  return (
    <div className="App">
      <Container>
        <MyScreen value={calc.num ? calc.num : calc.res} />
        {/* string concateniation */}
        <ConcatScreen value={calc.str} />
        <ButtonBox>
          {
            ArrOfButtons.flat().map((btn, x) => {
              return <Button
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  (e) => {
                    (
                      btn === 'C' ? resetValuePerClick(e) :
                        btn === '+-' ? InvertValue(e) :
                          btn === "%" ? getPercentageValue(e) :
                            btn === "=" ? InputEqualValues(e) :
                              btn === "/" || btn === "X" || btn === "-" || btn === "+" ? getOperators(e) :
                                btn === "." ? getPointValue(e) :  
                                  clickNumber(e)
                    )
                      onClickOperators(e)
                  }
                }
              >
                
                </Button>
            })
          
          }
        </ButtonBox>
      </Container>
    </div>
  );

  
}

export default App;
