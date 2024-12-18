"use client";
import { useState } from "react";
import "./styles.css";

export default function PercentageForm() {
  const [cpar1, setCpar1] = useState("");
  const [cpar2, setCpar2] = useState("");
  const [cpar3, setCpar3] = useState("");
  const [steps, setSteps] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cpar1 || !cpar2 || isNaN(cpar1) || isNaN(cpar2)) {
      setSteps("Please enter valid numbers");
      setCpar3("");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "percentageOf",
          percentage: parseFloat(cpar1),
          total: parseFloat(cpar2)
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setSteps(data.error || "An error occurred");
        setCpar3("");
        return;
      }

      setCpar3(data.result);
      setSteps(data.steps);
    } catch (error) {
      console.error("Error:", error);
      setSteps("Failed to connect to the server");
      setCpar3("");
    }
  };

  return (
    <div className="calculator-container">
      <form name="calform" onSubmit={handleSubmit}>
        <table className="panel" cellPadding="5">
          <tbody>
            <tr>
              <td align="center" className="verybigtext">
                What is
                <input
                  type="text"
                  value={cpar1}
                  onChange={(e) => setCpar1(e.target.value)}
                  className="inlong inpct"
                  placeholder="Value %"
                />
                of
                <input
                  type="text"
                  value={cpar2}
                  onChange={(e) => setCpar2(e.target.value)}
                  className="inlong"
                  placeholder="Total"
                />
                &nbsp; = &nbsp;
                <input
                  type="text"
                  value={cpar3}
                  readOnly
                  className="inlong"
                  placeholder="Result"
                />
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