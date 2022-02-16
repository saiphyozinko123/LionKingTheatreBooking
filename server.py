from flask import Flask, render_template,redirect
from datetime import datetime 

app = Flask(__name__)


@app.route("/")
def index():
    
    curdate = datetime.now()
    tdydate = curdate.strftime('%Y-%m-%d')
    return redirect(f'/lionking/{tdydate}')


@app.route("/lionking/<dateinfo>")
def dateinformation (dateinfo):

    return render_template('calendar.html',dateData=dateinfo)


if __name__ == '__main__':
    app.run(debug=True)
