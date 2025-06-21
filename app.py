import os
import requests
import logging
from flask import Flask, render_template, request, jsonify, flash, redirect, url_for

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# OpenWeatherMap API configuration
OPENWEATHER_API_KEY = os.environ.get("OPENWEATHER_API_KEY", "42f93d3580c7788def76a5b7c10539ec")
OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@app.route('/')
def index():
    """Render the main weather page"""
    return render_template('index.html')

@app.route('/weather', methods=['POST'])
def get_weather():
    """Fetch real-time weather data for a given city"""
    city = request.form.get('city', '').strip()
    
    if not city:
        flash('Please enter a city name', 'error')
        return redirect(url_for('index'))
    
    try:
        # Make API request to OpenWeatherMap for real-time data
        params = {
            'q': city,
            'appid': OPENWEATHER_API_KEY,
            'units': 'metric'  # Use Celsius
        }
        
        response = requests.get(OPENWEATHER_BASE_URL, params=params, timeout=10)
        
        if response.status_code == 200:
            weather_data = response.json()
            
            # Extract real weather information
            weather_info = {
                'city': weather_data['name'],
                'country': weather_data['sys']['country'],
                'temperature': round(weather_data['main']['temp']),
                'description': weather_data['weather'][0]['description'].title(),
                'humidity': weather_data['main']['humidity'],
                'wind_speed': round(weather_data['wind']['speed'] * 3.6, 1),  # Convert m/s to km/h
                'icon': weather_data['weather'][0]['icon'],
                'feels_like': round(weather_data['main']['feels_like']),
                'pressure': weather_data['main']['pressure']
            }
            
            return render_template('index.html', weather=weather_info)
            
        elif response.status_code == 404:
            flash(f'City "{city}" not found. Please check the spelling and try again.', 'error')
        elif response.status_code == 401:
            flash('API key is required for real-time weather data. Please contact support.', 'error')
        else:
            flash('Unable to fetch weather data. Please try again later.', 'error')
            
    except requests.exceptions.Timeout:
        flash('Request timed out. Please check your internet connection and try again.', 'error')
    except requests.exceptions.ConnectionError:
        flash('Connection error. Please check your internet connection.', 'error')
    except Exception as e:
        app.logger.error(f"Error fetching weather data: {str(e)}")
        flash('An unexpected error occurred. Please try again.', 'error')
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
