# Transly - A Real-Time Language Translation Chatbot

Transly is a real-time language translation chatbot designed to facilitate seamless multilingual communication. Users can send messages in one language and instantly receive translations in another. Whether you're traveling, studying, or collaborating across different languages, Transly helps bridge communication gaps effortlessly.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Transly revolutionizes communication by translating messages instantly between selected languages, making it ideal for individuals, businesses, and communities looking to engage with others globally. The system combines modern technologies such as Next.js, Chakra UI, and a robust translation API to deliver an intuitive chat experience that retains context and provides ongoing conversations across sessions.

## Features

- **Real-Time Language Translation**: Messages are translated instantly, breaking down language barriers.
- **Customizable Language Preferences**: Users can select and save their preferred source and target languages, ensuring a consistent and personalized experience.
- **Automatic Session Management**: Chat sessions are automatically created, stored, and restored—providing continuity between user interactions.
- **Responsive and Intuitive UI**: Built with Chakra UI, Transly offers a visually appealing interface optimized for mobile, tablet, and desktop devices.
- **IndexedDB Storage for Persistence**: User data, such as messages and language settings, are stored locally for session continuity, even after refreshing.

## Technologies Used

- **Next.js 13**: The core framework used to build the application, featuring the App Router for modern routing capabilities, server-side rendering (SSR), and static site generation (SSG).
- **TypeScript**: Enhances the development experience by providing type safety, reducing bugs, and ensuring robust code quality.
- **Chakra UI**: A modular and accessible component library for building a responsive, visually appealing, and cohesive user interface.
- **Google Cloud Translation API**: Powers the real-time translation capabilities, enabling users to communicate seamlessly across different languages.
- **Upstash Redis**: Used to cache translation results, improving performance and reducing latency for frequently translated messages. Requires an API key for authentication.
- **IndexedDB**: Stores chat sessions and messages locally, ensuring persistence even when the application is refreshed, providing offline support.
- **Jest**: Tool used for unit testing and component testing, ensuring that all components function correctly and that new changes do not introduce regressions.

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lokario/transly.git
   cd transly
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:

   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   GOOGLE_API_KEY=your_api_key
   TRANSLATION_API_URL=https://translation.googleapis.com/language/translate/v2
   UPSTASH_ENDPOINT=your_upstash_endpoint
   UPSTASH_PASSWORD=your_upstash_password
   ```

## Running the Application

To run the application locally:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to start chatting!

## Testing

1. **Run Unit and Integration Tests**:
   ```bash
   npm run test
   ```

2. **Generate Test Coverage**:
   ```bash
   npm run test -- --coverage
   ```

   The coverage report will be generated in the `coverage` directory, showcasing insights into code coverage and ensuring reliability.

## Contributing

I'd appreciate any contributions to make Transly even better!

1. **Fork the Repository**: Click on "Fork" at the top right of this page.
2. **Create Your Feature Branch**:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the Branch**:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a Pull Request**: Submit a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.