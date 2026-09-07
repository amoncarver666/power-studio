#!/bin/bash

# Power Studio Setup Script
# This script sets up Power Studio for development

echo "🎵 Power Studio Setup"
echo "====================="

# Check Node.js version
echo "\n📦 Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "Node.js version: $NODE_VERSION"

# Check npm version
echo "\n📦 Checking npm version..."
NPM_VERSION=$(npm -v)
echo "npm version: $NPM_VERSION"

# Install dependencies
echo "\n📥 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
  echo "❌ Failed to install dependencies"
  exit 1
fi

echo "✅ Dependencies installed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "\n📝 Creating .env file from .env.example..."
  cp .env.example .env
  echo "✅ .env file created"
  echo "⚠️  Please edit .env with your API keys"
else
  echo "\n📝 .env file already exists"
fi

# Create uploads directory
echo "\n📁 Creating uploads directory..."
mkdir -p uploads
echo "✅ uploads directory created"

# Create logs directory
echo "\n📁 Creating logs directory..."
mkdir -p logs
echo "✅ logs directory created"

echo "\n✨ Setup complete!"
echo "\n📌 Next steps:"
echo "1. Edit .env file with your API keys"
echo "2. Run 'npm run dev:all' to start development servers"
echo "3. Open http://localhost:5173 in your browser"
echo ""
echo "For more information, see QUICKSTART.md"
