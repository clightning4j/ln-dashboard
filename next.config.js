/*
    OpenSSL 3 does not support md4 from node version 16, but webpack hardcodes it all over the place in this way.
    The crypto.createHash() method in Node.js is used to create a Hash object that can be used to create hash digests by using the stated algorithm.
    Link to issue(with solution): https://github.com/webpack/webpack/issues/13572#issuecomment-923736472
    We have created next.js.config file for the custom configuration of Next.js as it can be used as Node.js module
*/
const crypto = require("crypto");
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = () => crypto_orig_createHash("sha256");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};
