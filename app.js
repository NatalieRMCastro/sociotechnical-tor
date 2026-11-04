/* Edit these definitions to replace the starter content. */
const definitions = {
 surface: ['The Surface Web', 'Starter definition: Public web pages that search engines can index. Replace this text with your own explanation, examples, and citations.'],
 deep: ['The Deep Web', 'Starter definition: Content outside ordinary search indexes, such as private accounts and databases. The deep web and dark web describe different things. Replace this starter with your own definition.'],
 dark: ['The Dark Web', 'Starter definition: Services accessed through specialized networks and software, including Tor onion services. Replace this text with your explanation and sources.'],
 outer: ['Outer layer · Guard relay', 'In this simplified onion metaphor, the first relay removes the outer encryption layer. It knows the client and the next relay, but not the final destination. Add your own explanation here.'],
 middle: ['Middle layer · Middle relay', 'The middle relay removes another layer and forwards traffic. It knows its neighboring relays, rather than both endpoints. Add your own explanation here.'],
 inner: ['Inner layer · Exit relay', 'For a connection to an ordinary website, the exit relay removes the final Tor layer and connects to the destination. HTTPS provides separate protection between browser and website. Onion-service connections use a different path.'],
 client: ['Client', 'The client selects a circuit and prepares layered encryption. Replace this starter definition with an explanation of the implementation and its social implications.'],
 guard: ['Guard relay', 'The entry point into this simplified circuit. It can see the client address and the next relay, but not the destination. Replace this text with your own discussion.'],
 relay: ['Middle relay', 'This relay connects the guard and exit. Click another component to compare what each participant can observe. Replace this text with your own discussion.'],
 exit: ['Exit relay', 'The last relay in this ordinary-web example. It connects to the destination, which sees the exit address. This is an illustrative overview, not an onion-service diagram.'],
 destination: ['Destination', 'The ordinary website reached through the exit. HTTPS encrypts application traffic between the browser and the website. Replace this text with your own discussion.']
};
const panel = document.getElementById('definition');
let active = null;
function closeDefinition(restoreFocus = false) {
 panel.hidden = true;
 if (active) { active.setAttribute('aria-expanded', 'false'); if (restoreFocus) active.focus(); }
 active = null;
}
function positionPanel() {
 if (!active) return;
 const rect = active.getBoundingClientRect();
 const width = panel.offsetWidth, height = panel.offsetHeight;
 panel.style.left = Math.max(16, Math.min(rect.left + rect.width / 2 - width / 2, innerWidth - width - 16)) + 'px';
 const below = rect.bottom + 12;
 panel.style.top = Math.max(16, Math.min(below + height <= innerHeight - 16 ? below : rect.top - height - 12, innerHeight - height - 16)) + 'px';
}
document.querySelectorAll('[data-definition]').forEach(button => {
 button.setAttribute('aria-expanded', 'false');
 button.setAttribute('aria-controls', 'definition');
 button.addEventListener('click', () => {
  if (active === button) { closeDefinition(); return; }
  closeDefinition(); active = button;
  const [title, text] = definitions[button.dataset.definition];
  panel.querySelector('h3').textContent = title;
  panel.querySelector('p').textContent = text;
  button.setAttribute('aria-expanded', 'true'); panel.hidden = false; positionPanel();
 });
});
panel.querySelector('button').addEventListener('click', () => closeDefinition(true));
document.addEventListener('click', event => { if (!event.target.closest('[data-definition]') && !panel.contains(event.target)) closeDefinition(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeDefinition(true); });
window.addEventListener('resize', positionPanel);
window.addEventListener('scroll', () => closeDefinition(), { passive: true });
/* Small offline highlighter for the illustrative Python blocks. Add code as
   ordinary text inside <pre><code class="language-python">…</code></pre>.
   Triple backticks belong to Markdown; HTML uses pre/code instead. */
const keywords = new Set('def return for in if else elif import from as class True False None with try except raise while pass and or not'.split(' '));
const tokenPattern = /#[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b/g;
document.querySelectorAll('code.language-python').forEach(code => {
 const source = code.textContent; const fragment = document.createDocumentFragment(); let previous = 0;
 for (const match of source.matchAll(tokenPattern)) {
  fragment.append(source.slice(previous, match.index));
  const value = match[0]; let type = value.startsWith('#') ? 'comment' : /^["']/.test(value) ? 'string' : /^\d/.test(value) ? 'number' : keywords.has(value) ? 'keyword' : /^\s*\(/.test(source.slice(match.index + value.length)) ? 'function' : '';
  if (type) { const span = document.createElement('span'); span.className = 'token ' + type; span.textContent = value; fragment.append(span); } else fragment.append(value);
  previous = match.index + value.length;
 }
 fragment.append(source.slice(previous)); code.replaceChildren(fragment);
});

// Read references from the bibliography.
const referenceEntries = [
  ...document.querySelectorAll("#references > li")
];

const referenceLookup = new Map(
  referenceEntries.map((entry, index) => [
    entry.id,
    { entry, number: index + 1 }
  ])
);

// Create one shared reference preview.
const sourcePreview = document.createElement("div");
sourcePreview.className = "source-preview";
sourcePreview.id = "source-preview";
sourcePreview.setAttribute("role", "tooltip");
sourcePreview.hidden = true;
document.body.append(sourcePreview);

let previewTimer;

function hideSourcePreview() {
  sourcePreview.hidden = true;
}

function schedulePreviewClose() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(hideSourcePreview, 150);
}

function showSourcePreview(citation, reference) {
  clearTimeout(previewTimer);

  // Copy the formatted reference, including its source link.
  const content = reference.entry.cloneNode(true);
  content.removeAttribute("id");

  sourcePreview.replaceChildren(
    document.createTextNode(`[${reference.number}] `),
    ...content.childNodes
  );

  sourcePreview.hidden = false;

  const anchor = citation.getBoundingClientRect();
  const preview = sourcePreview.getBoundingClientRect();

  const left = Math.max(
    12,
    Math.min(
      anchor.left + anchor.width / 2 - preview.width / 2,
      window.innerWidth - preview.width - 12
    )
  );

  const below = anchor.bottom + 10;
  const top = below + preview.height <= window.innerHeight - 12
    ? below
    : Math.max(12, anchor.top - preview.height - 10);

  sourcePreview.style.left = `${left}px`;
  sourcePreview.style.top = `${top}px`;
}

document.querySelectorAll(".source-citation").forEach(citation => {
  const reference = referenceLookup.get(
    citation.getAttribute("href").slice(1)
  );

  if (!reference) return;

  citation.textContent = `[${reference.number}]`;
  citation.setAttribute("aria-describedby", "source-preview");

  citation.addEventListener("mouseenter", () => {
    showSourcePreview(citation, reference);
  });

  citation.addEventListener("focus", () => {
    showSourcePreview(citation, reference);
  });

  citation.addEventListener("mouseleave", schedulePreviewClose);
  citation.addEventListener("blur", schedulePreviewClose);
  citation.addEventListener("click", hideSourcePreview);
});

sourcePreview.addEventListener("mouseenter", () => {
  clearTimeout(previewTimer);
});
sourcePreview.addEventListener("mouseleave", schedulePreviewClose);
sourcePreview.addEventListener("focusin", () => {
  clearTimeout(previewTimer);
});
sourcePreview.addEventListener("focusout", schedulePreviewClose);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") hideSourcePreview();
});

window.addEventListener("scroll", hideSourcePreview, { passive: true });
window.addEventListener("resize", hideSourcePreview);
