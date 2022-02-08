from flask import Flask, render_template,redirect
from datetime import datetime
from datetime import timedelta

# import calendar

# <date>

app = Flask(__name__)

# @app.route("/")
# def indexone():
#     return redirect('/lionking/')

@app.route("/")
def index():
    
    return render_template("calendar.html")


# @app.route("/lionking/<date>")
# def data (date):
#     # year = 2021
#     # month = 1
#     print(date)
    
#     [year,month] = date.split('-')
#     year = int(year)
#     month = int(month)
#     print(year)
#     print(month)
#     days = []
#     monthName = []
#     dates = []
#     data = calendar.TextCalendar(calendar.MONDAY)
#     for i in data.itermonthdays(year,month):
#         days.append(i)
#     for name in calendar.month_name:
#         monthName.append(name)
#     calData = calendar.Calendar()
#     dateName = calData.itermonthdates(year,month)
#     for d in dateName:
#         dates.append(str(d))
#     resultDate = {
#         'monthYear' :   year,
#         'monthName' :   monthName[month],
#         'month'     :   month,
#         'days'      :   days,
#         'dates'     :   dates
#     }
    
#     return resultDate





# from datetime import time
# from datetime import date
# from datetime import timedelta

@app.route("/lionking/<dateinfo>")
def datainformation (dateinfo):
    
    [year,month,day] = dateinfo.split('-')
    year = int(year)
    month = int(month)
    day = int(day)
    dates = datetime(year,month,day)
    startday = dates - timedelta(dates.weekday())
    allweeks = []
    for weeks in range(6):
        weeksquad = []
        for week in range(7):
            # dateonly = datetime.strptime(startday+timedelta(week+7*weeks), '%a %b %d %Y').strftime('%d/%m/%Y')
            # print(dateonly)
            weeksquad.append(startday+timedelta(week+7*weeks))
        allweeks.append(weeksquad)

    # for w in weeks:
        # print(w)
        # for days in w:
            # print(days)
            # daysList.append(days)

    resultDate = {
        'monthYear' : year,
        'monthName' : dates.strftime("%B"),
        'week' : allweeks
        # 'month' : month

    }
    
    return resultDate
   
    


if __name__ == '__main__':
    app.run(debug=True)
