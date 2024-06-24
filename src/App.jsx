import { useReducer } from "react";

export default function App() {
  const intiState = {
    balance: 0,
    loan: 0,
    isActive: false,
    err: "",
    deposit: "",
    withdraw: "",
    request_loan: "",
    pay_loan: "",
  };

  const [state, dispatch] = useReducer(reducer, intiState);

  function handleChange(e) {
    dispatch({
      type: "textChange",
      field: e.target.name,
      payload: e.target.value,
    });
  }

  function reducer(state, action) {
    let err = "";
    switch (action.type) {
      case "open":
        return { ...state, isActive: true };
      case "closed":
        Number(state.balance) > 0 &&
          (err = "Cannot close account with positive bank balance");
        Number(state.loan) > 0 &&
          (err = "Cannot close account with positive loan balance");
        return { ...state, isActive: err === "" ? false : true, err: err };
      case "textChange":
        return { ...state, [action.field]: action.payload };
      case "deposit":
        isNaN(state.deposit) && (err = "Only numeric values please");
        return {
          ...state,
          balance:
            err === ""
              ? Number(state.balance) + Number(state.deposit)
              : state.balance,
          deposit: "",
          err: err,
        };
      case "withdraw":
        isNaN(state.withdraw) && (err = "Only numeric values please");
        Number(state.withdraw) > Number(state.balance) &&
          (err = "Withdrawal cannot be more than balance");
        return {
          ...state,
          balance:
            err === ""
              ? Number(state.balance) - Number(state.withdraw)
              : state.balance,
          withdraw: "",
          err: err,
        };
      case "request_loan":
        isNaN(state.request_loan) && (err = "Only numeric values please");
        return {
          ...state,
          loan:
            err === ""
              ? Number(state.loan) + Number(state.request_loan)
              : state.loan,
          request_loan: "",
          err: err,
        };
      case "pay_loan":
        isNaN(state.pay_loan) && (err = "Only numeric values please");
        Number(state.pay_loan) > Number(state.loan) &&
          (err = "Loan payment cannot be more than loan outstanding");
        return {
          ...state,
          loan:
            err === ""
              ? Number(state.loan) - Number(state.pay_loan)
              : state.loan,
          pay_loan: "",
          err: err,
        };
      case "closeError":
        return { ...state, err: "" };
      default:
        throw new Error("Unknown action");
    }
  }

  return (
    <div className="container">
      <div className="panel">
        <div className="title">🐷 Piggy Bank Account 🪙</div>
        <div className="status">
          <div className="balance">
            Balance
            <br />
            <div className="amt">₹{state.balance}</div>
          </div>
          <div className="loan">
            Loan <br />
            <div className="amt">₹{state.loan}</div>
          </div>
        </div>
        <div className="transactions">
          <div className="deposit">
            Deposit
            <br />
            <input
              type="text"
              name="deposit"
              placeholder="₹"
              disabled={!state.isActive}
              value={state.deposit}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <button
              disabled={!state.isActive}
              onClick={() => dispatch({ type: "deposit" })}
            >
              Deposit
            </button>
          </div>

          <div className="withdraw">
            Withdraw
            <br />
            <input
              type="text"
              name="withdraw"
              placeholder="₹"
              disabled={!state.isActive}
              value={state.withdraw}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <button
              disabled={!state.isActive}
              onClick={(e) => dispatch({ type: "withdraw" })}
            >
              Withdraw
            </button>
          </div>

          <div className="request_loan">
            Request Loan
            <br />
            <input
              type="text"
              name="request_loan"
              placeholder="₹"
              disabled={!state.isActive}
              value={state.request_loan}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <button
              disabled={!state.isActive}
              onClick={(e) => dispatch({ type: "request_loan" })}
            >
              Request
            </button>
          </div>

          <div className="pay_loan">
            Pay Loan
            <br />
            <input
              type="text"
              name="pay_loan"
              placeholder="₹"
              disabled={!state.isActive}
              value={state.pay_loan}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <button
              disabled={!state.isActive}
              onClick={(e) => dispatch({ type: "pay_loan" })}
            >
              Pay
            </button>
          </div>
        </div>
        <div className="operations">
          <button
            disabled={state.isActive}
            onClick={() => dispatch({ type: "open" })}
          >
            Open Account
          </button>
          <button
            disabled={!state.isActive}
            onClick={() => dispatch({ type: "closed" })}
          >
            Close Account
          </button>
        </div>
        {state.err && (
          <span
            className="error"
            onClick={() => dispatch({ type: "closeError" })}
          >
            ❌ ERROR : {state.err}
          </span>
        )}
      </div>
    </div>
  );
}
