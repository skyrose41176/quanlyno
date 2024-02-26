import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
export default function Home() {
  const [numPeople, setNumPeople] = useState(0);
  const [amounts, setAmounts] = useState({});
  const [discountAmount, setDiscountAmount] = useState(0);
  const [ship, setShip] = useState(0);
  const [payments, setPayments] = useState({});

  const handleNumPeopleChange = (e) => {
    setNumPeople(parseInt(e.target.value ?? 0));
  };

  const handleAmountChange = (e, name) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [name]: parseFloat(e.target.value ?? 0),
    }));
  };

  const handleDiscountAmountChange = (e) => {
    setDiscountAmount(parseFloat(e.target.value ?? 0));
  };

  const handleShipChange = (e) => {
    setShip(parseFloat(e.target.value ?? 0));
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
  // return (
  //   <div>
  //     <h1>Payment Calculator</h1>
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         Number of People:
  //         <input
  //           type="number"
  //           required
  //           value={numPeople}
  //           onChange={handleNumPeopleChange}
  //         />
  //       </label>
  //       <br />
  //       <br />
  //       {Array.from({ length: numPeople }).map((_, index) => (
  //         <div key={index}>
  //           <label>
  //             Person {index + 1}:
  //             <input
  //               type="number"
  //               required
  //               onChange={(e) => handleAmountChange(e, `Person ${index + 1}`)}
  //             />
  //           </label>
  //           <br />
  //         </div>
  //       ))}
  //       <br />
  //       <label>
  //         Discount Amount:
  //         <input
  //           type="number"
  //           required
  //           value={discountAmount}
  //           onChange={handleDiscountAmountChange}
  //         />
  //       </label>
  //       <br />
  //       <br />
  //       <label>
  //         Ship:
  //         <input
  //           type="number"
  //           value={ship}
  //           onChange={handleShipChange}
  //           required
  //         />
  //       </label>
  //       <br />
  //       <br />
  //       <button type="submit">Calculate Payments</button>
  //     </form>
  //     <br />
  //     <h2>Payments:</h2>
  //     {Object.entries(payments).map(([name, payment]) => (
  //       <p key={name}>
  //         <strong>{name}:</strong> {payment.toLocaleString("en-US")}
  //       </p>
  //     ))}
  //     <h2>
  //       Total Payment:{" "}
  //       {Object.values(payments)
  //         .reduce((acc, curr) => acc + curr, 0)
  //         .toLocaleString("en-US")}
  //     </h2>
  //   </div>
  // );
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Payment Calculator
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Number of People"
              required
              value={numPeople}
              onChange={handleNumPeopleChange}
              fullWidth
            />
          </Grid>
          {Array.from({ length: numPeople }).map((_, index) => (
            <Grid item xs={12} key={index}>
              <TextField
                type="number"
                label={`Person ${index + 1}`}
                required
                onChange={(e) => handleAmountChange(e, `Person ${index + 1}`)}
                fullWidth
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Discount Amount"
              required
              value={discountAmount}
              onChange={handleDiscountAmountChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Ship"
              value={ship}
              onChange={handleShipChange}
              required
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" type="submit">
            Calculate Payments
          </Button>
        </Grid>
      </form>
      <Typography variant="h5" sx={{ mt: 4 }}>
        Payments:
      </Typography>
      {Object.entries(payments).map(([name, payment]) => (
        <Typography key={name} sx={{ mt: 1 }}>
          <strong>{name}:</strong> {payment.toLocaleString("en-US")}
        </Typography>
      ))}
      <Typography variant="h5" sx={{ mt: 2 }}>
        Total Payment:{" "}
        {Object.values(payments)
          .reduce((acc, curr) => acc + curr, 0)
          .toLocaleString("en-US")}
      </Typography>
    </Container>
  );
}
