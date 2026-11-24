# Contributing

Thanks for helping to improve Halden! Bug reports, fixes and small improvements are welcome.

## Report a Bug

Open an issue with:

- what you expected and what happened
- the page and screen width (for example `/pricing` at 390px)
- your browser and operating system

## Make a Change

1. Fork the repository and create a branch from `main`.
2. Install and run it:

   ```bash
   npm install
   npm run dev
   ```

3. Keep the conventions in [AGENTS.md](AGENTS.md): text in `src/config/`, Server Components by default, Tailwind tokens from `src/app/globals.css`, accessible markup and reduced-motion support.
4. Before you open a pull request, make sure these pass:

   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```

5. Describe the change in the pull request and add a screenshot for visual changes.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
