// dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const db = require('./seeders');