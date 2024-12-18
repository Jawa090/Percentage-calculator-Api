const express = require("express");
const router = express.Router();

// Middleware to parse numbers and validate inputs
const validateNumbers = (req, res, next) => {
  console.log("Incoming request body:", req.body);

  const { type, value, percentage, value1, value2, total, changeType } = req.body;

  // Fields to validate as numeric
  const numericFields = { value, percentage, value1, value2, total };

  // Iterate through fields and log validation results
  for (const [key, val] of Object.entries(numericFields)) {
    if (val !== undefined && val !== null && val !== "") {
      const parsedValue = parseFloat(val);
      console.log(`Validating field: ${key}, value: ${val}, parsedValue: ${parsedValue}`);
      if (isNaN(parsedValue)) {
        console.error(`Validation failed for field: ${key}, value: ${val}`);
        return res.status(400).json({ error: `Field '${key}' contains an invalid number.` });
      }
    }
  }

  // Validate "type" and "changeType"
  if (typeof type !== "string" || (changeType && typeof changeType !== "string")) {
    console.error("Validation failed for 'type' or 'changeType':", req.body);
    return res.status(400).json({ error: "Invalid 'type' or 'changeType' value." });
  }

  next();
};


// Routes for different calculations
router.post("/calculate", validateNumbers, (req, res) => {
  console.log("Request received at /calculate:", req.body);
  const { type } = req.body;

  try {
    console.log(`Processing calculation type: ${type}`);

    switch (type) {
      case "isPercentageOfWhat":
        return handleIsPercentageOfWhat(req, res);
      case "percentageOf":
        return handlePercentageOf(req, res);
      case "percentageChange":
        return handlePercentageChange(req, res);
      case "percentageDifference":
        return handlePercentageDifference(req, res);
      default:
        console.error("Unsupported calculation type:", type);
        return res.status(400).json({ error: `'${type}' is not a valid calculation type.` });
    }
  } catch (error) {
    console.error("Error in /calculate route:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Handler for "percentageOf"
function handlePercentageOf(req, res) {
  const { percentage, total } = req.body;
  const result = (parseFloat(percentage) / 100) * parseFloat(total);
  
  res.json({
    result: result.toFixed(2),
    steps: `Step 1: Multiply ${percentage}% by ${total} ÷ 100 = ${result.toFixed(2)}`,
  });
}

// Handler for "isPercentageOfWhat"
function handleIsPercentageOfWhat(req, res) {
  const { value, percentage } = req.body;
  const parsedValue = parseFloat(value);
  const parsedPercentage = parseFloat(percentage);
  
  const result = (parsedValue * 100) / parsedPercentage;
  
  res.json({
    result: result.toFixed(2),
    steps: `Step 1: ${value} × 100 ÷ ${percentage} = ${result.toFixed(2)}`,
  });
}

// Handler for "percentageChange"
function handlePercentageChange(req, res) {
  const { value, percentage, changeType } = req.body;
  const parsedValue = parseFloat(value);
  const parsedPercentage = parseFloat(percentage);
  
  let result;
  if (changeType === "increase") {
    result = parsedValue * (1 + parsedPercentage / 100);
  } else {
    result = parsedValue * (1 - parsedPercentage / 100);
  }
  
  res.json({
    result: result.toFixed(2),
    steps: `Step 1: ${changeType === "increase" ? "Add" : "Subtract"} ${percentage}% to/from ${value}\nStep 2: Result = ${result.toFixed(2)}`,
  });
}

// Handler for "percentageDifference"
function handlePercentageDifference(req, res) {
  const { value1, value2 } = req.body;
  const num1 = parseFloat(value1);
  const num2 = parseFloat(value2);
  
  const difference = Math.abs(num1 - num2);
  const average = (num1 + num2) / 2;
  const differenceResult = (difference / average) * 100;
  const increaseResult = ((num2 - num1) / num1) * 100;
  
  res.json({
    differenceResult: differenceResult.toFixed(2),
    increaseResult: increaseResult.toFixed(2),
    steps: `Step 1: Absolute difference = |${num1} - ${num2}| = ${difference}\nStep 2: Average = (${num1} + ${num2}) ÷ 2 = ${average}\nStep 3: Percentage difference = ${differenceResult.toFixed(2)}%\nStep 4: Percentage increase/decrease = ${increaseResult.toFixed(2)}%`,
  });
}

module.exports = router;