# Paddy form
This is a simple web app to improve a workflow when logging many tasks into zendesk (setting the correct tags and format, checking for duplicates, etc). Previous workflow was a very manual process and would require each ticket to be created individually within the zendesk workspace, and tags would have to be set correctly. 

- Link to live site: https://pformz.vercel.app/

## Description
This is a Next.JS app with a webform, which submits request to the Zendesk API to create many tickets. Previously, each ticket would have had to been created manually, and each of the tags set via a macro. This app is intended to simplify this process
It works via the [zendesk api](https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#create-many-tickets) 


## Challenges and other notes
- UI design
- Learning Next.JS

## Tech
- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
  - Why Next? Just to learn something new. In hindsight, I'm a little over my head and I do not understand in depth how the app is working. I'm aware that there are client and server components, and it does some nice routing and API calls on the server to hide .env variables and avoids CORS, but still at ill ease with it all.
- Tailwind for styling

## Getting Started

1. Clone the repo
```git clone git@github.com:CapSap/pformz.git```
2. Install node modules
```npm i```
3. Bring in your zendesk api keys in .env. Get in touch if you want to contribute
4. run the dev server
```npm run dev```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will need to add zendesk api keys to the .env file  

