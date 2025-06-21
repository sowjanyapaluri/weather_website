# Weather App - Replit Configuration

## Overview

This is a Flask-based weather application that provides real-time weather information for cities worldwide using the OpenWeatherMap API. The application features a clean, modern web interface with responsive design and real-time weather data retrieval.

## System Architecture

The application follows a simple Model-View-Controller (MVC) pattern with Flask as the web framework:

- **Frontend**: HTML templates with CSS styling and JavaScript for interactivity
- **Backend**: Flask web server handling HTTP requests and API integration
- **External API**: OpenWeatherMap API for weather data
- **Deployment**: Gunicorn WSGI server with autoscale deployment target

## Key Components

### Backend Components
- **Flask Application** (`app.py`): Main application logic with weather API integration
- **Entry Point** (`main.py`): Application entry point for deployment
- **Dependencies** (`pyproject.toml`): Python package management with Flask, SQLAlchemy, and requests

### Frontend Components
- **Templates** (`templates/index.html`): Main HTML template with search form
- **Static Assets** (`static/`):
  - CSS styling with modern gradient backgrounds and responsive design
  - JavaScript for form handling, loading states, and user interactions

### Configuration
- **Replit Config** (`.replit`): Development and deployment configuration
- **Environment**: Python 3.11 with PostgreSQL support (though not currently utilized)

## Data Flow

1. User enters city name in the web form
2. Form submission triggers POST request to `/weather` endpoint
3. Flask backend makes API call to OpenWeatherMap with city parameter
4. Weather data is processed and formatted
5. Response is rendered back to the user interface

Note: The current implementation appears to have incomplete weather data processing in `app.py` (file cuts off mid-function).

## External Dependencies

### APIs
- **OpenWeatherMap API**: Primary weather data source requiring API key configuration
- **API Key**: Configured via `OPENWEATHER_API_KEY` environment variable

### Python Packages
- **Flask**: Web framework and templating
- **Requests**: HTTP client for API calls
- **Gunicorn**: WSGI server for production deployment
- **Flask-SQLAlchemy**: Database ORM (prepared but not actively used)
- **psycopg2-binary**: PostgreSQL adapter (prepared but not actively used)

### Frontend Dependencies
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter font family for typography

## Deployment Strategy

- **Platform**: Replit with autoscale deployment target
- **Server**: Gunicorn WSGI server bound to `0.0.0.0:5000`
- **Process Management**: Configured for automatic scaling based on demand
- **Development**: Hot reload enabled for development workflow

The application is configured for both development (with reload) and production deployment using the same Gunicorn server setup.

## Changelog

```
Changelog:
- June 19, 2025. Initial setup with OpenWeatherMap API integration
- June 19, 2025. Modified to use sample weather data instead of API calls
- June 19, 2025. Created downloadable zip package with all project files
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```