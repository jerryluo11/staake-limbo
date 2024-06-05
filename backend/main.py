from flask import jsonify, request
from config import app, db
import numpy as np

balance = 0


@app.route("/set_balance", methods=["POST"])
def set_balance():
    global balance
    balance = float(request.json.get("desiredBalance"))
    if balance and balance <= 0:
        return(jsonify({"message" : "Starting balance must be greater than $0"}), 400)
    return(jsonify({"message" : "Balance set successfully."}), 200)


@app.route("/play", methods=["POST"])
def play():
    global balance
    print("Old balance:", balance)
    bet_sizing = float(request.json.get("betSizing"))
    user_multiplier = float(request.json.get("userMultiplier"))

    payout = -bet_sizing
    stake_multiplier = 1.00

    casino_odds = np.random.randint(100)
    if casino_odds != 0:
        u = np.random.uniform(0, 1)
        stake_multiplier = round(1 / (1 - u), 2)

    print("User multiplier", user_multiplier)
    print("Stake multiplier", stake_multiplier)
    if user_multiplier <= stake_multiplier:
        payout += bet_sizing * user_multiplier
    
    balance += payout

    print("New balance:", balance)
    response = jsonify({"balance" : balance, "stakeMultiplier": stake_multiplier})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return(response)



    


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)