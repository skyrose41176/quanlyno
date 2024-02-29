import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Home() {
  const [numPeople, setNumPeople] = useState(0);
  const [amounts, setAmounts] = useState({});
  const [discountAmount, setDiscountAmount] = useState(0);
  const [ship, setShip] = useState(0);
  const [payments, setPayments] = useState({});
  const [names, setNames] = useState({});

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

  const handleNameChange = (e, index) => {
    setNames((prevNames) => ({
      ...prevNames,
      [index]: e.target.value,
    }));
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
              minRows={0}
              value={numPeople}
              onChange={handleNumPeopleChange}
              fullWidth
            />
          </Grid>
          {Array.from({ length: numPeople }).map((_, index) => (
            <Grid item xs={12} key={index} spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Name"
                  required
                  value={names[index]}
                  onChange={(e) => handleNameChange(e, index)}
                  fullWidth
                />
                <TextField
                  sx={{ mt: 2 }}
                  type="number"
                  label={names[index]}
                  required
                  onChange={(e) => handleAmountChange(e, names[index])}
                  fullWidth
                />
              </Stack>
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
