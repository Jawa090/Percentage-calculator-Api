"use client";
import { useState } from "react";
import "./styles.css";
export default function PercentageIncreaseDecrease() {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState("");
  const [type, setType] = useState("increase");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "percentageChange",
          value,
          percentage,
          changeType: type
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setSteps(data.error || "An error occurred");
        setResult("");
        return;
      }

      setResult(data.result);
      setSteps(data.steps);
    } catch (error) {
      console.error("Error:", error);
      setSteps("Failed to connect to the server");
      setResult("");
    }
  };

  const clearForm = () => {
    setValue("");
    setPercentage("");
    setResult("");
    setSteps("");
  };

  return (
    <div className="calculator-container">
      <form name="calform2" onSubmit={handleSubmit}>
        <table className="panel" cellPadding="5">
          <tbody>
            <tr>
              <td className="verybigtext">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="inlong"
                  placeholder="Enter Value"
                />
                <select
                  className="bigtext"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="increase">Increase</option>
                  <option value="decrease">Decrease</option>
                </select>
                <input
                  type="text"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="inlong inpct"
                  placeholder="%Enter Percentage"
                />
                =
                <input
                  type="text"
                  value={result}
                  className="inlong"
                  readOnly
                  placeholder="Result"
                />
              </td>
            </tr>
            <tr>
              <td align="center">
                <button type="submit" className="btn-calculate">Calculate</button>
                <button type="button" className="btn-clear" onClick={clearForm}>Clear</button>
              </td>
            </tr>
            <tr>
              <td align="center" className="steps">
                <pre>{steps}</pre>
                {result && <p>Result: {result}</p>}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}