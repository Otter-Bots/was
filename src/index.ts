import express from "express";
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (_req, res) => {
  res.send('Authentication Service for Otter Bots')
})