// pages/index.js
import PercentageCalculator from "./components/PercentageCalculator";
import PercentageForm from "./components/PercentageForm";
import PercentageFormPanel from "./components/PercentageFormPanel";
import Percentage from './components/Percentage.js';
import PercentageDifferenceCalculator from './components/PercentageDifferenceCalculator';
import PercentChange from './components/PercentChange';  


export default function Home() {
  return (
    <div>
    
      <PercentageCalculator />

      <h1 className="header-title">Percentage Calculator In Common Phrases</h1>

      <PercentageForm /> 
      <PercentageFormPanel />
      <Percentage />
      <h1 className="header-title">Percentage Difference Calculator</h1>
      <PercentageDifferenceCalculator />

      <h1 className="header-title">Percentage Change Calculator</h1>
      <p className="header-description">Please provide any two values below and click the "Calculate" button to get the third value.</p>
      <PercentChange/>

     
      <h3>What is a percentage?</h3>
     <p>home / math / percentage calculator
Percentage Calculator
Please provide any two values below and click the "Calculate" button to get the third value.

 of 
   =   
 

Percentage Calculator in Common Phrases
what is 
 of 
  
 is what % of 
  
 is 
 of what	  

Percentage Difference Calculator
Value 1	
Value 2	
 

Percentage Change Calculator
Please provide any two values below and click the "Calculate" button to get the third value.

Result: 113.22
111 increase 2% = 113.22


Steps:
111 increase 2% =
111 × (1 + 2%) = 111 × (1 + 0.02) = 113.22

111
 
Increase
 
2
 = 
 



What is a percentage?
In mathematics, a percentage is a number or ratio that represents a fraction of 100. It is one of the ways to represent a dimensionless relationship between two numbers; other methods include ratios, fractions, and decimals. Percentages are often denoted by the symbol "%" written after the number. They can also be denoted by writing "percent" or "pct" after the number. For example, 35% is equivalent to the decimal 0.35, or the fractions .

Percentages are computed by multiplying the value of a ratio by 100. For example, if 25 out of 50 students in a classroom are male, . The value of the ratio is therefore 0.5, and multiplying this by 100 yields:

0.5 × 100 = 50

In other words, the ratio of 25 males to students in the classroom is equivalent to 50% of students in the classroom being male.</p>
<h2>Percentage formula</h2>

<p>Although the percentage formula can be written in different forms, it is essentially an algebraic equation involving three values.

P × V1 = V2

P is the percentage, V1 is the first value that the percentage will modify, and V2 is the result of the percentage operating on V1. The calculator provided automatically converts the input percentage into a decimal to compute the solution. However, if solving for the percentage, the value returned will be the actual percentage, not its decimal representation.

EX: P × 30 = 1.5

P =	
1.5
30
= 0.05 × 100 = 5%
If solving manually, the formula requires the percentage in decimal form, so the solution for P needs to be multiplied by 100 in order to convert it to a percent. This is essentially what the calculator above does, except that it accepts inputs in percent rather than decimal form.</p>
<h2>Percentage Change Formula</h2>
<p>Percentage increase and decrease are calculated by computing the difference between two values and comparing that difference to the initial value. Mathematically, this involves using the absolute value of the difference between two values then dividing the result by the initial value, essentially calculating how much the initial value has changed.

The percentage increase calculator above computes an increase or decrease of a specific percentage of the input number. It basically involves converting a percent into its decimal equivalent, and either subtracting (decrease) or adding (increase) the decimal equivalent from and to 1, respectively. Multiplying the original number by this value will result in either an increase or decrease of the number by the given percent. Refer to the example below for clarification.

EX: 500 increased by 10% (0.1)
500 × (1 + 0.1) = 550

500 decreased by 10%
500 × (1 – 0.1) = 450</p>
    </div>
  );
}
