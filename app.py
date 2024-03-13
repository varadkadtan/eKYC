from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def welcome():
    return render_template('welcome.html')

@app.route('/smile')
def smile_capture():
    return render_template('smile_capture.html')

@app.route('/personal_details')
def personal_details():
    return render_template('personal_details.html')

@app.route('/card_capture')
def card_capture():
    return render_template('card_capture.html')

@app.route('/thank_you')
def thank_you():
    return render_template('thank_you.html')

if __name__ == '__main__':
    app.run(debug=True)
