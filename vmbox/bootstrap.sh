#!/usr/bin/env bash

# install tools
echo "Installing wget, build-essential, g++ and git..."
apt-get install -y -qq wget build-essential g++ git

echo "Updating packages..."
apt-get -y -qq update

echo "Installing node..."
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
apt-get install -y python-software-properties python make nodejs