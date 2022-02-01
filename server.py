from flask import Flask, render_template

app = Flask(__name__)

@app.route("/lionking/<date>")
def calendar(date):
    return render_template("calendar.html")

app.run(debug=True)
