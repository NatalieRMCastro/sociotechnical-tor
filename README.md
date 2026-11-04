# sociotechnical-tor

A single-page, editable interactive essay for GitHub Pages. No build step, package installation, external fonts, or CDN required.

## Preview

Open `index.html` in a browser. All features also work when opened directly from disk.

## Edit the page

- **Text and headings:** edit `index.html`. Search for `Introduction`, `The Internet`, `The Dark Web`, `Tor`, `Building Tor`, or `Discussion`. Replace the Lorem ipsum paragraphs.
- **Diagram definitions:** edit the `definitions` object at the top of `app.js`.
- **Colors, fonts, spacing:** edit `styles.css`. The palette variables are at the top. Headings use Didot on macOS, Bodoni where installed, then Times New Roman. Body text is fully justified.
- **Illustrations:** the original SVG illustrations are in `assets/`. They can be replaced with your own files by updating the corresponding `src` in the HTML.
- **Footer:** edit the name and the visible date and `datetime` value near the end of `index.html`.

The page uses semantic h2 section headings and h3 code-study headings for a consistent outline. Mobile layouts stack columns.

## Code coloring and adding a code study

The two code examples are deliberately labeled illustrative pseudocode, not actual Tor source. The starter highlighter supports Python comments, keywords, strings, numbers, and function calls without any dependencies.

In HTML, the equivalent of a triple-backtick Markdown fence is:

```html
<pre><code class="language-python">def example():
    return "Replace this example"
</code></pre>
```

Keep code as plain text, preserving line breaks and indentation. Escape `<` as `&lt;` and `&` as `&amp;` in code. To add a complete study, copy one entire `<article class="code-study">...</article>` in `index.html`, including both explanatory sidebars. Change its filename and contents. The highlighter finds the new block automatically. Other languages need a different highlighter; changing the class alone does not add support.

## Diagram interaction

Click or keyboard-activate a label to open its floating definition. Activate the same label again, click outside, or press Escape to close. The close control restores focus to the label. Scrolling closes an open card so it does not obscure reading.

The iceberg is a conceptual metaphor, not a measurement. Its middle label uses the conventional term **Deep Web**, rather than the mockup's **Middle Web**; change both label and definition if desired. The onion and circuit show a simplified connection to an ordinary website. They do not depict the separate onion-service rendezvous architecture. Starter definitions should be reviewed and supplied with your citations before academic publication.

## Publish with GitHub Pages

The remote GitHub repository has not been created. These are ready-to-upload source files.

1. Create a repository named **sociotechnical-tor** under **NatalieRMCastro**. For the standard free GitHub Pages route, make it public.
2. Upload the contents of this folder directly to the repository root: `index.html`, `styles.css`, `app.js`, `assets/`, `.nojekyll`, and this README. Do not put them inside an extra `sociotechnical-tor` directory.
3. In repository **Settings → Pages**, choose **Deploy from a branch**, then **main** and **/(root)**. Save.
4. When GitHub reports the deployment is complete, the expected address is:

   https://NatalieRMCastro.github.io/sociotechnical-tor/

This address is expected, not a verified live deployment. A repository name supplies the path; a standalone domain requires a custom domain.

Alternatively, from this folder after creating an empty remote repository:

```sh
git remote add origin https://github.com/NatalieRMCastro/sociotechnical-tor.git
git push -u origin main
```

Authentication happens through your normal GitHub setup. No credentials are included in this project.

## Validation status

The HTML structure, asset references, SVG XML, code-block count, definition keys, and JavaScript syntax were checked locally. This session could not run a browser preview because browser access was unavailable and binding a local HTTP server was denied. Please check desktop and mobile appearance in your browser before publishing.

All illustrations in this starter are original vector drawings, not extracted stock images. No external assets or tracking are loaded.
