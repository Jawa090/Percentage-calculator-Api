"use client";
import { useState } from "react";
import "./styles.css";

export default function PercentageDifference() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [differenceResult, setDifferenceResult] = useState("");
  const [increaseResult, setIncreaseResult] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value1 || !value2 || isNaN(value1) || isNaN(value2)) {
      setSteps("Please enter valid numbers");
      setDifferenceResult("");
      setIncreaseResult("");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "percentageDifference",
          value1: parseFloat(value1),
          value2: parseFloat(value2)
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setSteps(data.error || "An error occurred");
        setDifferenceResult("");
        setIncreaseResult("");
        return;
      }

      setDifferenceResult(data.differenceResult);
      setIncreaseResult(data.increaseResult);
      setSteps(data.steps);
    } catch (error) {
      console.error("Error:", error);
      setSteps("Failed to connect to the server");
      setDifferenceResult("");
      setIncreaseResult("");
    }
  };

  const clearForm = () => {
    setValue1("");
    setValue2("");
    setDifferenceResult("");
    setIncreaseResult("");
    setSteps("");
  };

  return (
    <div className="calculator-container">
      <form name="calform3" onSubmit={handleSubmit}>
        <table className="panel" cellPadding="5">
          <tbody>
            <tr>
              <td>Value 1</td>
              <td>
                <input
                  type="text"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  className="inlongest"
                  placeholder="Enter Value 1"
                />
              </td>
            </tr>
            <tr>
              <td>Value 2</td>
              <td>
                <input
                  type="text"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  className="inlongest"
                  placeholder="Enter Value 2"
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center">
                <button type="submit" className="btn-calculate">Calculate</button>
                <button type="button" className="btn-clear" onClick={clearForm}>Clear</button>
              </td>
            </tr>
            <tr>
              <td colSpan="2" align="center" className="steps">
                <pre>{steps}</pre>
                {differenceResult && <p>Difference: {differenceResult}%</p>}
                {increaseResult && <p>Increase: {increaseResult}%</p>}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}