"use client"
import { useState } from "react";
import "./styles.css";

export default function PercentageForm23() {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value || !percentage || isNaN(value) || isNaN(percentage)) {
      setSteps("Please enter valid numbers");
      setResult("");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "isPercentageOfWhat",
          value: parseFloat(value),
          percentage: parseFloat(percentage)
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

  return (
    <div className="calculator-container">
      <form name="calform" onSubmit={handleSubmit}>
        <table className="panel" cellPadding="5">
          <tbody>
            <tr>
              <td align="center" className="verybigtext">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="inlong"
                  placeholder="Value"
                />
                is
                <input
                  type="text"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="inlong inpct"
                  placeholder="Percentage %"
                />
                of what
                {result && <span className="result"> = {result}</span>}
              </td>
            </tr>
            <tr>
              <td align="center">
                <button type="submit" className="btn-calculate">Calculate</button>
              </td>
            </tr>
            <tr>
              <td align="center" className="steps">
                <pre>{steps}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}