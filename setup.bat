@echo off
REM Power Studio Setup Script for Windows
REM This script sets up Power Studio for development

echo 🎵 Power Studio Setup
echo =====================

REM Check Node.js version
echo.
echo 📦 Checking Node.js version...
node -v

REM Check npm version
echo.
echo 📦 Checking npm version...
npm -v

REM Install dependencies
echo.
echo 📥 Installing dependencies...
call npm install

if errorlevel 1 (
  echo ❌ Failed to install dependencies
  exit /b 1
)

echo ✅ Dependencies installed

REM Create .env file if it doesn't exist
if not exist .env (
  echo.
  echo 📝 Creating .env file from .env.example...
  copy .env.example .env
  echo ✅ .env file created
  echo ⚠️  Please edit .env with your API keys
) else (
  echo.
  echo 📝 .env file already exists
)

REM Create uploads directory
echo.
echo 📁 Creating uploads directory...
if not exist uploads mkdir uploads
echo ✅ uploads directory created

REM Create logs directory
echo.
echo 📁 Creating logs directory...
if not exist logs mkdir logs
echo ✅ logs directory created

echo.
echo ✨ Setup complete!
echo.
echo 📌 Next steps:
echo 1. Edit .env file with your API keys
echo 2. Run 'npm run dev:all' to start development servers
echo 3. Open http://localhost:5173 in your browser
echo.
echo For more information, see QUICKSTART.md
