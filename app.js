document.addEventListener("DOMContentLoaded", () => {
  // Get references to the input and preview elements
  const markdownInput = document.getElementById("markdown-input");
  const preview = document.getElementById("preview");

  // ✅ Initialize Marked with Syntax Highlighting
  const { Marked } = globalThis.marked;
  const { markedHighlight } = globalThis.markedHighlight;

  // Configure Marked.js with syntax highlighting using highlight.js
  const markedInstance = new Marked(
    markedHighlight({
      langPrefix: "hljs language-", // Add classes for highlight.js
      highlight(code, lang) {
        // Check if the language is supported, otherwise fallback to plaintext
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    })
  );

  // Function to update the preview when user types in the textarea
  function updatePreview() {
    const markdownText = markdownInput.value; // Get the input text
    preview.innerHTML = markedInstance.parse(markdownText); // Convert markdown to HTML
  }

  // Listen for input events and update the preview dynamically
  markdownInput.addEventListener("input", updatePreview);
});
