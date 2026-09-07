# Contributing to Power Studio

Thank you for your interest in contributing to Power Studio! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs
- Check existing issues first
- Create a detailed bug report with:
  - Steps to reproduce
  - Expected behavior
  - Actual behavior
  - Environment details (OS, Node version, browser)

### Suggesting Enhancements
- Use GitHub issues to suggest features
- Provide clear description of the enhancement
- Explain the use case
- Include any relevant examples

### Pull Requests
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Write or update tests
5. Update documentation
6. Commit with clear messages: `git commit -am 'Add feature: description'`
7. Push to your fork: `git push origin feature/your-feature`
8. Open a Pull Request with detailed description

## Development Setup

```bash
git clone https://github.com/amoncarver666/power-studio.git
cd power-studio
npm install
cp .env.example .env
npm run dev:all
```

## Code Style
- Use ESLint for code quality
- Use Prettier for formatting
- Follow existing code patterns
- Add comments for complex logic
- Use meaningful variable names

## Testing
- Write tests for new features
- Ensure all tests pass: `npm test`
- Maintain or improve code coverage

## Documentation
- Update README.md for feature additions
- Add JSDoc comments to functions
- Include examples for new APIs
- Update CHANGELOG.md

## Commit Messages
- Use clear, descriptive messages
- Start with a verb (Add, Fix, Update, etc.)
- Keep first line under 72 characters
- Reference issues when relevant: `Fixes #123`

## License
By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?
Open an issue or reach out to the maintainers.
