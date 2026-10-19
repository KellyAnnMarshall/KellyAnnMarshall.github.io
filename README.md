# Kelly Ann Marshall — portfolio site

This repository contains a Jekyll portfolio and several separately built static
project demos. The main site is built with the Ruby/Jekyll toolchain; the demo
directories are published as existing static files.

## Requirements

- Ruby 3.4.1 (see `.ruby-version`)
- Bundler 2.6 or newer
- Python 3 for generated-site validation

The Jekyll build uses Jekyll 4.4.1 and `jekyll-sass-converter` 3.1.0. Keep
`Gemfile.lock` committed so local development and CI resolve the same gems.

GitHub Pages currently offers Jekyll 3.10.0 in its managed dependency stack,
which is incompatible with this project's Jekyll 4 build. The site therefore
uses the existing GitHub Actions deployment strategy: Bundler builds the
static site, then the Pages artifact actions publish `_site`.

## Local development

```sh
bundle install
bundle exec jekyll serve
```

The local server is available at `http://127.0.0.1:4000`. For a production
build and validation:

```sh
JEKYLL_ENV=production bundle exec jekyll build
python3 scripts/validate_site.py
```

The validation script parses source JSON and generated JSON-LD, then checks
generated HTML titles, languages, image alternatives and accessible link names.
It also verifies homepage landmarks, canonical metadata, and local asset/link
targets.

## Deployment

The `.github/workflows/jekyll.yml` workflow builds on pushes to `master` and
manual dispatches. Configure the repository's Pages source as **GitHub Actions**.
The build job must pass dependency installation, the production build and site
validation before the artifact can be deployed. Deployment permissions are
limited to the deployment job.

## Review notes

The generated-site checks are not a substitute for a complete accessibility
audit. Before release, manually test keyboard-only navigation (including
opening/closing the menu with Escape), reduced-motion behavior, the contact
form, and representative viewport widths from 320px through desktop. Run an
axe or Lighthouse audit in a browser and investigate its findings. The site
currently has no JSON-LD block to validate against Schema.org.
