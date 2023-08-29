# Paddy form
This is a simple form to improve a workflow when logging many tasks into zendesk (setting the correct tags and format, etc). Previous workflow would require each ticket to be created individually within the zendesk workspace, and tags would have to be set correctly. 

## Description
This is a Next.JS app with a webform, which submits request to the Zendesk API to create many tickets. Previously, each ticket would have had to been created manually, and each of the tags set via a macro. This app is intended to simplify this process
It works via the [zendesk api](https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/#create-many-tickets) 


## Challenges and other notes
- UI design
- Learning Next.JS

## Tech
- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- Tailwind for styling

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will need to add zendesk api keys to the .env file  

