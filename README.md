# Try with Mirra Coding Challenge

## Running this project

This project leverages the Bun runtime which is designed as a drop-in replacement for node.
[You can read further about Bun here](https://bun.sh/docs).

##### Requirements

* Node v18.15.0
* Bun

#### Installing Bun

#### **macOS and Linux**

**`curl -fsSL https://bun.sh/install | bash`**

**Windows
`powershell -x "irm bun.sh/install.ps1|iex"`**

Note: you man have to restart your terminal to ensure bun is available for use.

#### Setup

```
# Install dependencies
bun install

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference, thn add your Tickermaster API key.
cp .env.example .env

# To start the client, from the root directory run command
bun dev:client

# To start the server (in a new terminal window), from the root directory run command
bun dev:server

# To run tests
bun test

```

## Introduction

This challenge is designed to test your creativity, coding skills, and ability to integrate third-party APIs into a functional application. Your completed project will be used to discuss your approach to solving problems and your technical skills.

## Challenge Overview

Your task is simple but open-ended: **Create an application that utilizes the Ticketmaster API to display events to the user.** You're free to choose any programming language and framework; the goal is to see how you approach problem-solving and API integration.

### Requirements

- Your application must integrate with the Ticketmaster API. You can find the Ticketmaster API Explorer [here](https://developer.ticketmaster.com/api-explorer/v2/) and obtain an API key [here](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/).
- The core functionality of your application should be to display events fetched from the Ticketmaster API. How you choose to display these events and what information you include is up to you.
- We understand the importance of your time. Therefore, we ask you to spend no more than **3 hours** on this task. This constraint means we are looking for limited functionality that demonstrates your ability to integrate with APIs and code effectively within a short period.

### Submission Guidelines

- Fork this repository.
- Complete your project within your forked repository. Ensure your project is public so our team can review it.
- Once you're done, submit your project by creating a pull request to the original repository with a brief description of your application, how to run it, and any other information you find relevant.
- Ensure to include a simple `README.md` in your project, detailing setup instructions and dependencies.

### Setup Instructions

1. **Fork and Clone**: Fork this repository and clone it to your local machine for development.
2. **API Key**: Obtain your API key from [Ticketmaster API Docs]([https://developer.ticketmaster.com/api-explorer/v2/](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/)). Follow the instructions for signing up and creating an API key.
3. **Development**: Start developing your application according to the challenge requirements. Remember to commit your changes and push them to your forked repository.
4. **Documentation**: Update the `README.md` in your project to include setup instructions and any necessary information to run your application.

### Resources

- [Ticketmaster API Explorer](https://developer.ticketmaster.com/api-explorer/v2/)
- [Obtain an API key here](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/)

## Alternative Submission

If you have a public repository that showcases your skills through a project you've independently worked on, and it is either deployed online or can be easily built and run locally, we encourage you to submit that instead. When submitting an existing project, please ensure:

- The repository is accessible to the public.
- You provide a clear `README.md` with setup instructions and an overview of the project's functionality.
- The project is primarily your work and reflects your abilities.

Please submit your project following the same [Submission Guidelines](#submission-guidelines) mentioned above, including a note in your pull request indicating this is an alternative submission.
