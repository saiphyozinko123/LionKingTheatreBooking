from flask import Flask, render_template
import calendar

# <date>

app = Flask(__name__)

@app.route("/")
def index():
    # return render_template("calendar.html")
    return render_template("calendar.html")


@app.route("/lionking/<date>")
def data (date):
    # year = 2021
    # month = 1
    print(date)
    
    [year,month] = date.split('-')
    year = int(year)
    month = int(month)
    print(year)
    print(month)
    days = []
    monthName = []
    dates = []
    data = calendar.TextCalendar(calendar.MONDAY)
    for i in data.itermonthdays(year,month):
        days.append(i)
    for name in calendar.month_name:
        monthName.append(name)
    calData = calendar.Calendar()
    dateName = calData.itermonthdates(year,month)
    for d in dateName:
        dates.append(str(d))
    resultDate = {
        'monthYear' :   year,
        'monthName' :   monthName[month],
        'month'     :   month,
        'days'      :   days,
        'dates'     :   dates
    }
    
    return resultDate

if __name__ == '__main__':
    app.run(debug=True)
