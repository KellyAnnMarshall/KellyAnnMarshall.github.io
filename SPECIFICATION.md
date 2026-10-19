Absolutely! The key to this upgrade is to treat it as a modernisation and quality-improvement project, not a redesign. An autonomous coding agent should first understand how the existing Jekyll site works, then upgrade the Ruby/Jekyll toolchain on macOS, preserve GitHub Pages deployment compatibility, improve structured JSON and CSS, and conduct a comprehensive accessibility audit.

One particularly important consideration is that the latest version of Jekyll supported by RubyGems is not necessarily the version supported by GitHub Pages' standard build environment. The specification should require the agent to verify the current compatibility constraints and choose an appropriate deployment strategy rather than blindly upgrading dependencies and breaking publishing.

# AI App Specification: Jekyll Modernisation, CSS Refactoring & Accessibility

Implementation-ready specification · Autonomous coding agent · macOS · GitHub Pages

## 1. Role and objectives

Act as a senior Ruby/Jekyll engineer, front-end architect, CSS specialist, web accessibility auditor and software quality engineer.

Your task is to inspect, modernise, test and document an existing Jekyll website that is maintained on macOS and deployed to GitHub Pages.

The primary objective is to upgrade the application to the latest stable, compatible Jekyll toolchain while preserving all existing functionality, visual identity, content, URLs and deployment behaviour.

The project must also include a thorough review and improvement of:

- Jekyll, Ruby, Bundler and dependency management.
- HTML, Liquid templates, Markdown and structured JSON embedded in markup.
- CSS architecture, organisation, readability and maintainability.
- Accessibility across templates, components and interactive elements.
- Build reliability, regression testing, security and performance.
- GitHub Pages deployment and local macOS development workflows.

Guiding principle: Prefer evidence-based, incremental refactoring over wholesale rewrites. Every change must have a clear purpose, and existing functionality must not be removed merely to simplify the codebase.

## 2. Operating constraints

Development environment

macOS, using the repository's existing shell, Git tooling, Ruby environment and package managers where appropriate.

Technology stack

Jekyll, Ruby, Liquid, HTML, Markdown, CSS, JSON and GitHub Pages. Retain any existing JavaScript, Sass/SCSS, plugins and front-end libraries unless a change is justified.

Compatibility and preservation

Preserve content, features, page structure, design intent, navigation, metadata, canonical URLs, feeds, sitemaps, redirects and existing interactive behaviour.

Quality standard

Comprehensive regression testing, automated accessibility checks, structured-data validation, CSS quality checks and reproducible production builds.

## 3. Critical architectural decision: Jekyll and GitHub Pages compatibility

Before modifying dependencies, investigate the existing deployment model and select the correct upgrade path.

GitHub Pages' standard dependency stack constrains which Jekyll version and plugins can be used. A GitHub Actions workflow can instead build the site with a separately managed Jekyll version while still publishing the generated static website to GitHub Pages.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub

+1



The agent must explicitly evaluate these two approaches.

Option A — GitHub Pages-managed build

Use the `github-pages` gem and its supported dependency versions. Choose this approach if retaining GitHub Pages' standard Jekyll build is the priority.

Trade-off: Jekyll and plugin versions are constrained by GitHub Pages compatibility.

Option B — GitHub Actions-managed build (preferred when latest Jekyll is required)

Install and run the selected Jekyll version through Bundler in a controlled CI environment. Build the site, then deploy the generated `_site` output using GitHub Pages deployment actions.

Trade-off: Requires a maintained workflow and explicit management of Ruby, gems, plugins and build settings.

Selection rule: If the latest stable Jekyll release is incompatible with the standard GitHub Pages dependency stack, choose Option B unless the existing repository has a documented constraint preventing it. Do not claim the site uses the latest Jekyll if its actual build uses an older pinned version.

Relevant references:

- [Official Jekyll documentation](https://jekyllrb.com/docs/?utm_source=chatgpt.com)
- [GitHub Pages dependency versions](https://pages.github.com/versions.json?utm_source=chatgpt.com)
- [GitHub Pages and Jekyll documentation](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll?utm_source=chatgpt.com)

## 4. Phase 1 — Repository discovery and baseline audit

Before making changes, inspect the complete repository and understand how the site is built and deployed.

### 4.1 Inventory

Identify and examine:

- `Gemfile`, `Gemfile.lock` and `.ruby-version`, if present.
- `_config.yml` and any environment-specific configuration files.
- `_layouts/`, `_includes/`, `_sass/`, `assets/`, `_data/` and `_posts/`.
- HTML, Markdown, Liquid templates and front matter.
- JSON files, inline JSON objects, JSON-LD structured data and embedded configuration.
- CSS, SCSS, Sass imports and stylesheets generated during the build.
- JavaScript files and interactive components.
- Image, font, video, audio and other static assets.
- `.github/workflows/` and other build/deployment configuration.
- `.gitignore`, documentation, scripts and existing tests.
- Redirects, custom domains, repository subpaths and URL configuration.

Do not assume every directory exists. Adapt the audit to the actual repository.

### 4.2 Establish the baseline

Record:

1. Current Jekyll, Ruby, Bundler and dependency versions.
2. Current installation and build commands.
3. Existing build warnings, errors and deprecations.
4. Current production output and generated URL structure.
5. Existing page types, navigation paths and content collections.
6. Existing accessibility, HTML, CSS and structured-data issues.
7. Current GitHub Pages deployment configuration.
8. Screenshots or other visual baselines for representative pages, where feasible.

Run the existing build and tests before making changes. If the baseline fails, document the failure and determine whether it is pre-existing.

Deliverable: A baseline report listing discovered issues, risks, dependencies and the proposed migration plan.

## 5. Phase 2 — Upgrade Jekyll and the macOS toolchain

### 5.1 Determine the correct versions

Research the latest stable Jekyll release available at implementation time using official release information and package metadata.

Verify compatibility between:

- Jekyll and Ruby.
- Ruby and Bundler.
- Jekyll plugins and the selected Jekyll version.
- Sass converters and the existing stylesheet pipeline.
- Markdown parsers, Liquid and syntax highlighters.
- macOS architecture, including Apple Silicon or Intel where relevant.
- GitHub Actions runners and deployment actions.

Do not rely on version numbers remembered by the agent. Record the versions actually selected and the evidence for their compatibility.

### 5.2 Ruby environment management

Inspect the current Ruby installation before changing it.

Requirements:

- Avoid modifying macOS system Ruby or installing project gems globally without justification.
- Prefer a reproducible, project-compatible Ruby environment managed by an established version manager or existing toolchain.
- Reuse the repository's current Ruby management approach when it remains suitable.
- Document any required Homebrew system dependencies.
- Pin or constrain Ruby and gem dependencies appropriately.
- Ensure that another developer can reproduce the environment from repository documentation.

Where supported, use a project-level Ruby version file and Bundler.

Typical verification commands include:

```
ruby --version
gem --version
bundle --version
bundle exec jekyll --version
bundle check
```

Commands must be adapted to the project's actual configuration.

### 5.3 Dependency migration

Review every dependency rather than blindly upgrading all gems to their latest releases.

- Update Jekyll and compatible dependencies.
- Remove obsolete or unused gems when safe.
- Replace deprecated APIs and configuration options.
- Resolve dependency conflicts properly.
- Retain plugins required by existing functionality.
- Review plugin security, maintenance status and compatibility.
- Avoid introducing unnecessary runtime dependencies.
- Regenerate and verify the lockfile where appropriate.
- Ensure CI and local builds use consistent dependency resolution.

For a GitHub Pages-managed build, use the supported `github-pages` dependency model rather than forcing an incompatible Jekyll version. For an Actions-managed build, pin the chosen versions and commit the lockfile to make dependency resolution reproducible.

### 5.4 Migration safety

Before editing the dependency files:

- Preserve the original configuration in version control.
- Identify breaking changes between the old and new versions.
- Map each breaking change to the affected templates, plugins or build configuration.
- Apply fixes incrementally.
- Rebuild after each logical migration stage.

Do not automatically change the deployment model if a compatible in-place upgrade meets all requirements.

## 6. Phase 3 — Review HTML, Liquid, Markdown and structured JSON

Conduct a repository-wide review of markup and embedded data.

### 6.1 HTML and Liquid

Review layouts, includes, content pages and generated HTML for:

- Valid, semantic HTML5.
- Correct heading hierarchy and document structure.
- Appropriate use of `<header>`, `<nav>`, `<main>`, `<article>`, `<section>` and `<footer>`.
- Valid attributes and correctly nested elements.
- Consistent template conventions.
- Correct Liquid filters, escaping and conditional logic.
- Unnecessary duplicated markup.
- Broken links, missing assets and malformed front matter.
- Incorrect assumptions about relative URLs or the site's base path.
- Deprecated HTML patterns and obsolete attributes.

Use Liquid's appropriate escaping mechanisms for dynamic content. Do not introduce unsafe rendering of untrusted values.

Retain existing content and rendering behaviour unless a change is required to correct a defect or meet an explicitly defined standard.

### 6.2 Structured JSON and JSON-LD

Find and review all JSON-related content, including:

- JSON-LD embedded in `<script type="application/ld+json">`.
- JSON stored in `_data/`.
- JSON in front matter or configuration files.
- JSON consumed by JavaScript.
- JSON embedded in HTML attributes or Liquid-generated markup.
- Structured data for articles, breadcrumbs, websites, organisations, products or other relevant entities.

Apply the following rules:

1. Validity: Ensure JSON is syntactically valid, with correct strings, escaping, arrays, objects and data types.
2. Schema compliance: Validate JSON-LD against the applicable Schema.org vocabulary and relevant search-engine requirements.
3. Factual accuracy: Derive properties from genuine site content. Never invent ratings, reviews, dates, prices, author credentials or organisation details.
4. Required properties: Include required and recommended properties where they genuinely apply.
5. Correct types: Use appropriate schema types, ISO 8601 date formats and absolute URLs where required.
6. Consistency: Keep structured data consistent with visible page content, metadata and canonical URLs.
7. Template safety: Ensure Liquid-generated JSON escapes strings correctly and does not emit invalid JSON when content contains quotes, Unicode, newlines or special characters.
8. Maintainability: Remove duplicated definitions where appropriate and consider shared data or reusable Liquid includes.
9. Search integrity: Remove misleading, redundant or unsupported structured data rather than adding markup purely for SEO.
10. Compatibility: Preserve useful existing schema properties and identifiers unless there is a documented reason to change them.

Do not mechanically convert every JSON object to JSON-LD. Each format has a different purpose.

### 6.3 JSON validation

Add automated validation appropriate to the repository:

- Parse standalone JSON files.
- Validate generated JSON-LD after a production build.
- Confirm that embedded JSON can be parsed independently of its surrounding HTML.
- Detect duplicate or contradictory schema declarations.
- Validate applicable schema properties and URL formats.
- Include representative pages containing optional or unusual content.

Use the official [Schema Markup Validator](https://validator.schema.org/?utm_source=chatgpt.com) and, where relevant, Google's [Rich Results Test](https://search.google.com/test/rich-results?utm_source=chatgpt.com) as complementary validation tools. Not all valid Schema.org markup qualifies for rich results.

Acceptance criterion: All JSON must parse successfully, and all intended structured data must pass the relevant automated checks or have explicitly documented exceptions.

## 7. Phase 4 — CSS and Sass architecture review

Refactor stylesheets to improve readability, consistency, maintainability and responsiveness without unintentionally changing the visual design.

### 7.1 CSS audit

Identify:

- Duplicate and conflicting declarations.
- Unused selectors and dead stylesheet files.
- Overly specific selectors.
- Excessive `!important` usage.
- Repeated colour, spacing, typography and sizing values.
- Inconsistent naming conventions.
- Unnecessary nesting in Sass.
- Fragile layout techniques and avoidable fixed dimensions.
- Unnecessary overrides and redundant media queries.
- Poor separation between component, layout and utility styles.
- Global selectors that cause unintended side effects.
- Obsolete vendor prefixes or legacy compatibility rules.
- CSS that hides focus indicators or interferes with accessibility.

### 7.2 Refactoring principles

Organise styles around the existing design and component structure.

Where appropriate:

- Separate design tokens from component styles.
- Consolidate repeated colours, spacing, typography and breakpoint values into CSS custom properties or Sass variables.
- Group related selectors and use consistent formatting.
- Adopt a coherent naming convention, such as BEM, only if it fits the existing codebase.
- Use Flexbox and Grid where they simplify layouts.
- Prefer fluid sizing and responsive constraints over brittle fixed dimensions.
- Keep selectors simple, predictable and scoped appropriately.
- Use logical properties such as `margin-inline` and `padding-block` where beneficial.
- Use modern CSS features only after checking browser support and build requirements.
- Remove duplicated rules after verifying they are genuinely redundant.
- Preserve meaningful comments and document non-obvious layout decisions.

Do not introduce a new CSS framework or rewrite all stylesheets merely to adopt a preferred methodology.

### 7.3 Responsive behaviour

Test representative pages at:

- 320px narrow mobile width.
- 375px and 390px mobile widths.
- 768px tablet width.
- 1024px laptop or small desktop width.
- 1440px and wider desktop widths.

Verify:

- No unintended horizontal overflow.
- Navigation remains usable.
- Text remains readable.
- Images and embedded media resize correctly.
- Layouts remain functional at high zoom.
- Controls retain sufficient size and spacing.
- Long words, code blocks and tables do not break the layout.

These are test widths, not mandatory breakpoint values.

### 7.4 CSS tooling

Choose linting and formatting tools compatible with the existing stack, such as Stylelint where appropriate.

Configure the tooling to:

- Enforce consistent formatting.
- Detect invalid or deprecated CSS.
- Identify avoidable specificity problems.
- Detect duplicate declarations and unnecessary rules.
- Support existing Sass syntax if used.
- Allow documented, justified exceptions.

Avoid enabling rules that produce excessive noise without improving quality.

Acceptance criterion: Refactored CSS passes the selected linting rules, builds correctly and introduces no unintended visual or responsive regressions.

## 8. Phase 5 — Accessibility audit and remediation

Target WCAG 2.2 Level AA as the principal accessibility standard, while following relevant W3C HTML, ARIA and authoring guidance.

Reference: [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/?utm_source=chatgpt.com).

Automated tools are necessary but insufficient. The agent must combine automated checks with manual keyboard, visual and assistive-technology-oriented reviews.

### 8.1 Semantic structure and navigation

Check that:

- Every page has an appropriate document title.
- The page language is declared correctly.
- Main content has a clear landmark structure.
- Heading levels communicate meaningful hierarchy.
- Navigation landmarks have distinguishable accessible names where needed.
- A skip link allows keyboard users to bypass repeated navigation.
- Links have meaningful text and understandable destinations.
- Buttons are implemented with native button semantics.
- Interactive elements are not simulated using non-interactive elements without appropriate justification.
- Repeated navigation and footer content remain consistent.

### 8.2 Images, audio and video

- Provide meaningful alternative text for informative images.
- Use empty alternative text for purely decorative images.
- Avoid repeating adjacent text in image alternatives unnecessarily.
- Ensure image links have understandable accessible names.
- Provide captions for prerecorded video where required.
- Provide appropriate transcripts and other alternatives for media where applicable.
- Avoid conveying essential information through colour or imagery alone.

### 8.3 Keyboard and focus

Manually test the entire site without a mouse.

Verify:

- Every interactive element can be reached and operated by keyboard.
- Focus order is logical.
- Focus indicators remain visible.
- No keyboard traps exist.
- Sticky headers, banners and overlays do not obscure focused elements.
- Menus and interactive controls can be operated using expected keyboard interactions.
- Focus is managed appropriately when dialogs or other overlays are present.
- Any custom widgets follow the relevant WAI-ARIA Authoring Practices.

Use native HTML elements whenever they satisfy the requirement.

### 8.4 Colour, typography and layout

Check:

- Text contrast of at least 4.5:1 for normal text.
- Text contrast of at least 3:1 for large text.
- Relevant UI component and graphical-object contrast of at least 3:1.
- Content remains usable at 200% text resizing.
- Reflow at a viewport equivalent to 320 CSS pixels, subject to the WCAG exceptions.
- Text spacing adjustments do not cause clipping or loss of content.
- Links can be distinguished without relying solely on colour.
- Reduced-motion preferences are respected where animations or transitions are present.
- Content and functionality remain available in high-contrast and other relevant display settings.

Do not remove the existing design identity simply to satisfy contrast checks. Improve the affected colours or states with the smallest effective changes.

### 8.5 Forms and interactive content

Where forms exist, verify:

- Every field has a programmatically associated label.
- Required fields and validation rules are explained.
- Error messages identify the affected field and describe how to correct the problem.
- Errors are not communicated by colour alone.
- Form controls have appropriate accessible names.
- Status changes are announced where necessary.
- Any custom controls support keyboard and assistive technology interaction.

### 8.6 Automated accessibility tooling

Integrate suitable tools, selected according to the project:

- axe-core or axe-based browser testing.
- Lighthouse accessibility audits.
- HTML validation.
- Automated checks for missing accessible names, invalid ARIA and structural issues.

Run checks against the generated website, not just the source templates.

Include representative page templates and content variations. Document any automated false positives and manual exceptions rather than suppressing warnings indiscriminately.

Acceptance criterion: No known critical or serious accessibility defects remain in the audited scope. Any remaining lower-severity issues must be documented with their impact, location and remediation plan. Automated results must not be presented as proof of full WCAG conformance.

## 9. Phase 6 — SEO, metadata and URL preservation

Review SEO-related output as part of the migration.

Verify:

- Page titles and meta descriptions remain correct.
- Canonical URLs are accurate.
- Open Graph and other existing social metadata remain intact.
- Sitemap and RSS/Atom feed generation still works.
- Robots directives are appropriate for production.
- Internal links resolve correctly.
- Relative URLs respect `baseurl` and `url`.
- Custom domains and HTTPS behaviour remain correct.
- Redirects preserve important old URLs.
- Structured data matches the actual page.
- Images have appropriate dimensions, alternative text and loading behaviour.

Do not change permalinks, post slugs, pagination paths or canonical URL conventions without a documented need and a regression plan.

For GitHub project sites hosted under a repository subpath, test all asset paths and internal links against the actual production base path.

## 10. Phase 7 — Comprehensive regression testing

The agent must create or extend a repeatable test suite that verifies both the build and the rendered website.

### Required testing layers

#### 01

Dependency and build tests

Install dependencies, verify versions, build production output and detect warnings or errors.

#### 02

Page and link tests

Check generated HTML, expected pages, navigation, local links, assets, redirects and URL paths.

#### 03

Structured-data tests

Parse JSON and JSON-LD, validate schema structure and check representative generated pages.

#### 04

CSS quality tests

Run linting and formatting checks and inspect unused or conflicting rules.

#### 05

Accessibility tests

Run automated accessibility audits and manual keyboard and visual checks.

#### 06

Visual regression tests

Compare representative page screenshots before and after the migration.

#### 07

Deployment tests

Build in CI, verify the published artifact and confirm GitHub Pages configuration.

### 10.1 Functional regression

Confirm that all existing features still work, including those specific to the repository:

- Navigation and internal links.
- Search, filtering and pagination if present.
- Posts, collections, categories and tags.
- Embedded media and downloads.
- Forms and external integrations.
- JavaScript interactions.
- Theme and responsive behaviour.
- Feeds, sitemap, metadata and redirects.
- Custom assets, fonts and third-party scripts.

Do not assume a feature is absent just because it is not listed here. Use the baseline inventory to create the actual regression checklist.

### 10.2 Visual regression

Capture representative pages before and after the upgrade under consistent browser, viewport and rendering conditions.

Compare:

- Typography and spacing.
- Navigation and page structure.
- Colour, borders and shadows.
- Image cropping and aspect ratios.
- Responsive layouts.
- Focus and hover states where testable.

Intentional accessibility or rendering improvements may change screenshots. Record and explain those changes rather than attempting to eliminate every difference.

### 10.3 Build quality gates

The migration is not complete until the production build and required checks pass.

Do not hide failures by disabling tests, suppressing warnings globally or excluding problematic pages without a documented justification.

If a test cannot run because of environmental limitations, report it explicitly as unverified.

## 11. Phase 8 — GitHub Actions and deployment

If GitHub Actions is used to manage the Jekyll build, review or implement a secure, reproducible workflow.

Requirements:

- Use an appropriate maintained Ruby setup action.
- Pin third-party actions to full commit SHAs where practical.
- Install dependencies using Bundler.
- Build with the intended production configuration.
- Run required linting, validation and regression checks.
- Upload the generated site using the supported GitHub Pages artifact mechanism.
- Deploy with the official GitHub Pages deployment actions.
- Use the required Pages deployment permissions and environment configuration.
- Avoid storing secrets in source code or generated static files.
- Avoid deploying when required quality gates fail.
- Preserve the existing custom domain and site URL configuration.
- Document how to configure the repository's Pages build and deployment source.

Use the official guide: [Building and deploying Jekyll sites with GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll?utm_source=chatgpt.com).

If the repository already uses a working GitHub Actions workflow, improve it incrementally rather than replacing it without cause.

## 12. Phase 9 — Performance, security and maintainability

Perform a proportionate review of the generated site.

### Performance

- Identify unnecessarily large images and assets.
- Preserve appropriate image quality and aspect ratios.
- Use responsive images where beneficial.
- Apply lazy loading to suitable below-the-fold images.
- Avoid lazy-loading critical above-the-fold content indiscriminately.
- Remove demonstrably unused CSS and JavaScript.
- Reduce unnecessary external requests.
- Avoid introducing heavy client-side dependencies into a static site without justification.

### Security

- Review dependency vulnerabilities using available Ruby and JavaScript dependency auditing tools.
- Check Liquid output escaping and untrusted content handling.
- Avoid embedding secrets or credentials in the site or build artifact.
- Review third-party scripts and external resources.
- Use HTTPS for relevant production links.
- Review the permissions and trigger conditions of deployment workflows.

### Maintainability

- Use consistent formatting and naming conventions.
- Remove dead code only after verifying it is unused.
- Document unusual configuration choices.
- Avoid unnecessary abstractions.
- Keep reusable components understandable.
- Add comments only when they explain intent, constraints or non-obvious behaviour.
- Ensure that future dependency updates can be performed predictably.

## 13. Autonomous execution workflow

The coding agent must work in the following order.

1. Inspect: Inventory the repository, determine its current state and establish baseline test results.
2. Plan: Identify compatibility constraints, risks, affected files and the deployment strategy.
3. Upgrade: Update Ruby/Jekyll dependencies and resolve migration issues in small, reviewable stages.
4. Refactor: Improve markup, JSON/JSON-LD and CSS without removing existing functionality.
5. Remediate: Fix accessibility defects and address SEO, security and performance issues.
6. Validate: Run the full test suite, compare visual output and verify the production build.
7. Deploy preparation: Verify CI configuration, deployment permissions and generated artifact paths.
8. Document: Produce a migration report, record exceptions and provide reproducible setup and testing instructions.

### Autonomous agent safeguards

- Work on a dedicated branch unless the environment explicitly requires otherwise.
- Never discard user changes or overwrite uncommitted work.
- Inspect Git status before and after major operations.
- Do not delete files simply because they appear unused; verify their references first.
- Do not modify production secrets, repository settings or deployment permissions without explicit authorisation.
- Do not push, merge or deploy to production without the required authorisation.
- Stop and report blockers that require a destructive action, an unavailable credential or a significant architectural decision outside the stated constraints.
- Continue independently on reversible, in-scope tasks where a blocker does not prevent progress.
- Keep changes focused, traceable and reviewable.

## 14. Deliverables

The agent must provide:

1. Repository audit report — Current architecture, versions, existing defects and deployment arrangement.
2. Upgrade implementation — Updated dependency files, compatible configuration and migration fixes.
3. Structured-data improvements — Validated JSON and JSON-LD, with documented exceptions.
4. CSS refactoring — Cleaner, consistent stylesheets and appropriate linting configuration.
5. Accessibility remediation — Fixed defects and a report of remaining issues.
6. Regression test suite — Automated checks and documented manual tests.
7. CI/deployment improvements — Updated GitHub Actions configuration where required.
8. Developer documentation — macOS setup, dependency installation, local serving, building, testing and troubleshooting instructions.
9. Final migration report — Changes made, versions selected, tests passed or failed, outstanding risks and deployment instructions.

The final report must distinguish between completed work, partially completed work and work that remains unverified.

## 15. Definition of done

Use these criteria to determine whether the migration is complete.

### Acceptance checklist

0/10 verified

Jekyll and dependencies

The selected Jekyll version and dependency stack are compatible, reproducible and documented.

GitHub Pages

The production build and deployment strategy are compatible with the chosen GitHub Pages configuration.

Functional preservation

All discovered existing features, content and important URLs remain intact.

HTML and Liquid

Templates render correctly and the generated markup passes applicable validation.

JSON and structured data

JSON parses successfully and applicable JSON-LD validations pass or have documented exceptions.

CSS quality

Stylesheets pass configured quality checks and preserve intended responsive design.

Accessibility

Automated checks pass the defined quality gates and no known critical or serious defects remain unaddressed.

Regression coverage

Functional, link, asset, structured-data and representative visual tests pass.

Security and performance

Material issues discovered during the review are fixed or documented with a remediation plan.

Documentation

A developer can set up, build, test and prepare the site for deployment using the supplied instructions.

Reset checklist

This checklist tracks your review in this conversation. Items should only be checked after evidence confirms completion.

## 16. Final instructions to the coding agent

Treat this specification as the project's implementation contract.

Do not begin by rewriting the entire site. First establish the baseline, discover the real architecture and deployment constraints, and create a risk-based migration plan. Then implement the upgrade in controlled stages, verifying each stage before continuing.

Prioritise correctness, maintainability, accessibility, reproducibility and preservation of existing functionality over superficial code changes.

The final outcome must be a working, modernised Jekyll website that can be developed on macOS, built reliably, tested comprehensively and deployed to GitHub Pages using a documented, compatible workflow.