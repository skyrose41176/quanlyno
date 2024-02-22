import { useState } from "react";

export default function Home() {
  const [numPeople, setNumPeople] = useState(0);
  const [amounts, setAmounts] = useState({});
  const [discountAmount, setDiscountAmount] = useState(0);
  const [ship, setShip] = useState(0);
  const [payments, setPayments] = useState({});

  const handleNumPeopleChange = (e) => {
    setNumPeople(parseInt(e.target.value));
  };

  const handleAmountChange = (e, name) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [name]: parseFloat(e.target.value),
    }));
  };

  const handleDiscountAmountChange = (e) => {
    setDiscountAmount(parseFloat(e.target.value));
  };

  const handleShipChange = (e) => {
    setShip(parseFloat(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalAmount =
      Object.values(amounts).reduce((acc, curr) => acc + curr, 0) + ship;
    const avgShip = ship / Object.keys(amounts).length;

    const totalAmountShips = {};
    for (const name in amounts) {
      totalAmountShips[name] = amounts[name] + avgShip;
    }

    const percentages = {};
    for (const name in totalAmountShips) {
      percentages[name] = (totalAmountShips[name] / totalAmount) * 100;
    }

    const percentagesDiscount = {};
    for (const name in percentages) {
      percentagesDiscount[name] = (discountAmount * percentages[name]) / 100;
    }

    const calculatedPayments = {};
    for (const name in totalAmountShips) {
      calculatedPayments[name] =
        totalAmountShips[name] - percentagesDiscount[name];
    }

    setPayments(calculatedPayments);
  };
  return (
    <div>
      <h1>Payment Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Number of People:
          <input
            type="number"
            value={numPeople}
            onChange={handleNumPeopleChange}
          />
        </label>
        <br />
        <br />
        {Array.from({ length: numPeople }).map((_, index) => (
          <div key={index}>
            <label>
              Person {index + 1}:
              <input
                type="number"
                onChange={(e) => handleAmountChange(e, `Person ${index + 1}`)}
              />
            </label>
            <br />
          </div>
        ))}
        <br />
        <label>
          Discount Amount:
          <input
            type="number"
            value={discountAmount}
            onChange={handleDiscountAmountChange}
          />
        </label>
        <br />
        <br />
        <label>
          Ship:
          <input type="number" value={ship} onChange={handleShipChange} />
        </label>
        <br />
        <br />
        <button type="submit">Calculate Payments</button>
      </form>
      <br />
      <h2>Payments:</h2>
      {Object.entries(payments).map(([name, payment]) => (
        <p key={name}>
          <strong>{name}:</strong> {payment}
        </p>
      ))}
      <h2>
        Total Payment:{" "}
        {Object.values(payments).reduce((acc, curr) => acc + curr, 0)}
      </h2>
    </div>
  );
}
