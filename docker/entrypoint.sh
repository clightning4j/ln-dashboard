#!/bin/sh
# Give time to cln to boostrap
sleep 5m
npm install
make CLN_UNIX=/.l/testnet/lightning-rpc check