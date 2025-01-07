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


@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if 'user_id' not in session:
        flash("You need to login before accessing the page")
        return redirect(url_for('login'))
    return render_template('dashboard.html', user_id=session.get('user_id'))

@app.route('/signup', methods=['GET', 'POST'])
def signup():

    if request.method == "POST":
        #Get the information from the html templates
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        if password != confirm_password:
            flash("Confirm Password does not match with the password")
            return redirect(url_for('signup'))
        
        # create a dictionary of the information
        form_data = {
            "username": username,
            "email": email,
            "password": password
        }

        response = requests.post(API_URL+'/signup', form_data)
        
        if response.status_code == 200:
            return redirect(url_for('login'))
        
    return render_template('signup.html')





@app.route('/startquiz', methods=['GET', 'POST'])
def startquiz():
    return render_template('startquiz.html')


@app.route('/general_knowledge')
def general_knowledge():
    return render_template('general_knowledge.html')


@app.route('/logout')
def logout():
    logout_response = requests.get(API_URL+'/logout')
    if logout_response.status_code == 200:
        flash("Logged Out Successfully")
        return redirect(url_for('login'))
    return ('Error Occurred while Logging Out')

app.route('/startquiz')
def startquiz():
    return render_template('startquiz.html')

if __name__ == '__main__':
    app.run(port=5000, debug=True)

