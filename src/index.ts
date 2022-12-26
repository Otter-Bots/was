import express from "express";
import "dotenv/config";
import cors from "cors";
import fetch from "node-fetch";
const app = express()
app.use(cors())
app.get('/', (_req, res) => {
  res.send('The website authentication service (WAS) for Otter Bots.')
})
// Discord BS
app.get('/discord/', (_req, res) => {
  res.sendFile('discord-callback.html', { root: `${process.cwd()}/html/` })
})
app.get('/discord/finishAuth', (req, res) => {
  const { access_token, token_type} = req.query;
  // res.send(`Access Token: ${access_token} Token Type: ${token_type}`)
  fetch('https://discord.com/api/users/@me', {
			headers: {
				authorization: `${token_type} ${access_token}`,
			},
		})
			.then(result => result.json())
			.then(response => {
				const { username, discriminator } = response;
        console.log(`Authenticated as ${username}#${discriminator}`)
        res.send(`Authenticated as ${username}#${discriminator}`)
			})
			.catch(console.error);
})
app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}!`)
}
