#!/bin/sh
ls -la
# Give time to cln to boostrap
sleep 5m
npm install
make CLN_UNIX=/.lightning/testnet/lightning-rpc check