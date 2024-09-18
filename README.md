# Car Dealer Website

This project is a simple website for small car dealerships. The goal is to offer a clean design with minimal functionality, allowing anyone looking for a car to view pictures and contact the dealer if they're interested.

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
  - [Preparing Your Environment](#preparing-your-environment)
  - [Running the Project](#running-the-project)

## Project Overview

As the main focus is simplicity, no database is used. Instead, all the data is stored in a JSON file located at `/data.json`. Similarly, all the images are located in `/public/images`. When setting up the project, new images should be downloaded, and the paths in the JSON file should be updated accordingly. The website supports multiple languages, currently Portuguese and English, with the ability to easily add more.

The website is built using Next.js 14 and incorporates the next-intl library for localization. The layout and design are primarily created with Vercel's v0, a generative user interface system powered by AI, which generates React code based on shadcn/ui and Tailwind CSS.

## Getting Started

### Preparing Your Environment

Starting the project in development mode is straightforward, but pay attention to the image setup. In `/data.json`, there are two properties with image paths: `cover` and `images`. The `cover` is the image used for the list items on the vehicles page, while the `images` array contains the images for the carousel on the vehicle details page.

To update the image paths:

1. Create an `images` folder in the `public` directory.
2. Add new images to this folder.
3. Once you have all the necessary images, update the `/data.json` file by replacing the values of `cover` and `images` with the paths to your images.

**_NOTE:_** The project can be started without images, as there is a custom image component that displays a fallback image if the ones set in a vehicle record are missing or invalid.

### Running the Project

To start the project, first install all the dependencies with the following command:

```bash
npm i
```

Then, run the following command to start the development server:

```bash
npm run dev
```
