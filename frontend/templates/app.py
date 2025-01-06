from flask import Flask, render_template, url_for, request, flash, redirect, session
import requests

app = Flask(__name__)
app.secret_key = 'my_secrete_key'


API_URL = 'http://127.0.0.1:3000'

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('index.html')

@app.route('/generalknowledge', methods=['GET', 'POST'])
def generalknowledge():
    return render_template('generalknowledge.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username_email = request.form.get('username_email')
        password = request.form.get('password')

        form_data = {
            "username": username_email,
            "password": password
        }

        response = requests.post(API_URL+'/login', form_data)

        if response.status_code == 200:
            # get the session from the backend
            session_response = requests.get(f"{API_URL}/get_session", cookies=response.cookies)
            
            if session_response.status_code == 200:
                session_response_json = session_response.json()
                user_id = session_response_json.get("session")
                print(user_id)
                session['user_id'] = user_id # use the session in the backend to create your session here
                return redirect(url_for('dashboard'))
            else:
                flash("No active session found. Please log in.")
                return redirect(url_for('login'))
        else:
            flash('Incorrect Login Details')
            return redirect(url_for('login'))
    return render_template('login.html')