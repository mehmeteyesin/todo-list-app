#!/bin/bash

# Function to install Node.js and npm on macOS
install_node_macos() {
    if ! command -v brew &> /dev/null
    then
        echo "Homebrew is not installed. Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    echo "Installing Node.js and npm using Homebrew..."
    brew install node
}

# Function to install Node.js and npm on Ubuntu/Debian
install_node_ubuntu() {
    echo "Updating package list..."
    sudo apt update
    echo "Installing Node.js and npm..."
    sudo apt install -y nodejs npm
}

# Check the OS and install Node.js and npm if not installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Installing Node.js and npm..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        install_node_macos
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        install_node_ubuntu
    else
        echo "Unsupported OS. Please install Node.js and npm manually."
        exit 1
    fi
fi

# Check if npm is installed (in case it was installed separately)
if ! command -v npm &> /dev/null
then
    echo "npm is not installed. Installing npm..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        install_node_macos
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        install_node_ubuntu
    else
        echo "Unsupported OS. Please install npm manually."
        exit 1
    fi
fi

# Navigate to the project directory
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm install

# Run the app
echo "Running the app..."
npm start
