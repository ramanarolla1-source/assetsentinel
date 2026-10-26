(() => {
  "use strict";

  const registry = document.getElementById("registry");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const recordCount = document.getElementById("record-count");
  const receiptPanel = document.getElementById("receipt-panel");
  const receiptTitle = document.getElementById("receipt-title");
  const receiptContent = document.getElementById("receipt-content");
  const hashButton = document.getElementById("hash-button");
  const fileInput = document.getElementById("document-file");
  const hashResult = document.getElementById("hash-result");
  let records = [];

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  const searchStatus = document.createElement("p");
  searchStatus.id = "search-status";
  searchStatus.className = "search-status";
  searchStatus.setAttribute("aria-live", "polite");
  searchForm.insertAdjacentElement("afterend", searchStatus);

  function renderRecords(query = "") {
    const term = query.trim().toLowerCase();
    const filtered = records.filter((record) => [
      record.title, record.asset, record.address, record.caseNumber,
      record.court, record.summary, record.id
    ].join(" ").toLowerCase().includes(term));

    recordCount.textContent = `${filtered.length} ${filtered.length === 1 ? "record" : "records"}`;
    searchStatus.textContent = term
      ? (filtered.length ? `Showing ${filtered.length} matching record${filtered.length === 1 ? "" : "s"} for “${query.trim()}”.` : `No records match “${query.trim()}”. This does not establish that an asset is legally clear.`)
      : `Showing all ${filtered.length} sample record${filtered.length === 1 ? "" : "s"}.`;

    if (!filtered.length) {
      registry.innerHTML = '<div class="empty-state">No matching records in this prototype. Try USDT, the address, or case number 1:2026cv08010. A missing record does not establish that an asset is legally clear.</div>';
      return;
    }

    registry.innerHTML = filtered.map((record) => `
      <article class="record-card">
        <div class="record-head">
          <div>
            <h3>${escapeHtml(record.title)}</h3>
            <p class="record-meta">${escapeHtml(record.court)} · ${escapeHtml(record.caseNumber)}</p>
          </div>
          <span class="status-badge">${escapeHtml(record.sourceStatus)}</span>
        </div>
        <p class="record-summary">${escapeHtml(record.summary)}</p>
        <div class="record-actions">
          <button class="button-primary" type="button" data-receipt="${escapeHtml(record.id)}">Open Legal Receipt</button>
          <a class="text-link source-action" href="${escapeHtml(record.sourceUrl)}" target="_blank" rel="noopener noreferrer">Open indexed source ↗</a>
        </div>
        <div class="notice"><strong>Important:</strong> This is a discovery lead from a secondary docket mirror, not a final determination of liability or confirmation that the order remains in force.</div>
      </article>
    `).join("");
  }

  function openReceipt(id) {
    const record = records.find((item) => item.id === id);
    if (!record) return;
    receiptTitle.textContent = record.title;
    const fields = [
      ["Court", record.court], ["Case number", record.caseNumber],
      ["Indexed order date", record.indexedOrderDate], ["Asset", record.asset],
      ["Address / identifier", record.address], ["Source state", record.sourceState]
    ];
    receiptContent.innerHTML = `
      <dl class="receipt-fields">${fields.map(([label, value]) => `
        <div class="receipt-field"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "Not recorded")}</dd></div>
      `).join("")}</dl>
      <h3 class="receipt-section-title">Verification dimensions</h3>
      <ul class="verification-list">${Object.entries(record.verification || {}).map(([key, value]) => `
        <li><span>${escapeHtml(key.replace(/([A-Z])/g, " $1"))}</span><strong>${escapeHtml(value)}</strong></li>
      `).join("")}</ul>
      <h3 class="receipt-section-title">Cautions and outstanding checks</h3>
      <ul>${(record.cautions || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <h3 class="receipt-section-title">Recorded history</h3>
      <ul>${(record.history || []).map((event) => `<li><strong>${escapeHtml(event.date)}</strong> — ${escapeHtml(event.event)} (${escapeHtml(event.status)})</li>`).join("")}</ul>
      <p class="record-meta">Asset linkage is not established merely because an address or token appears in a case title. Treat this record as unverified until primary sources have been reviewed.</p>
      <p><a class="source-link source-action" href="${escapeHtml(record.sourceUrl)}" target="_blank" rel="noopener noreferrer">Open indexed source ↗</a></p>
    `;
    receiptPanel.classList.remove("hidden");
    receiptPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderRecords(searchInput.value);
    document.getElementById("registry-heading").scrollIntoView({ behavior: "smooth", block: "center" });
  });
  searchInput.addEventListener("input", () => renderRecords(searchInput.value));

  registry.addEventListener("click", (event) => {
    const button = event.target.closest("[data-receipt]");
    if (button) openReceipt(button.dataset.receipt);
  });

  document.getElementById("close-receipt").addEventListener("click", () => {
    receiptPanel.classList.add("hidden");
  });

  hashButton.addEventListener("click", async () => {
    hashResult.textContent = "";
    const file = fileInput.files && fileInput.files[0];
    if (!file) {
      hashResult.textContent = "No file selected. First click “Choose file” and select a document, then click “Calculate hash”.";
      return;
    }
    if (!globalThis.crypto || !globalThis.crypto.subtle) {
      hashResult.textContent = "SHA-256 is unavailable in this browser context. Open the HTTPS site directly, or try a current browser.";
      return;
    }
    hashButton.disabled = true;
    hashButton.textContent = "Calculating…";
    hashResult.textContent = `Calculating SHA-256 for ${file.name}…`;
    try {
      const bytes = await file.arrayBuffer();
      const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
      const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
      hashResult.innerHTML = `<p><strong>File:</strong> ${escapeHtml(file.name)}</p><p><strong>SHA-256:</strong><code class="hash-value">${escapeHtml(hex)}</code></p><button class="button-secondary" id="copy-hash" type="button">Copy hash</button>`;
      document.getElementById("copy-hash").addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(hex);
          document.getElementById("copy-hash").textContent = "Copied";
        } catch {
          hashResult.insertAdjacentHTML("beforeend", "<p>Clipboard unavailable; select and copy the hash manually.</p>");
        }
      });
    } catch (error) {
      hashResult.textContent = "Could not calculate the hash for this file. " + (error && error.message ? error.message : "Please try another file.");
    } finally {
      hashButton.disabled = false;
      hashButton.textContent = "Calculate hash";
    }
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files && fileInput.files[0];
    if (file) hashResult.textContent = `Selected: ${file.name}. Click “Calculate hash” to continue.`;
  });

  fetch("data/cases.json")
    .then((response) => {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) throw new Error("Expected an array of records.");
      records = data;
      renderRecords(searchInput.value);
    })
    .catch((error) => {
      recordCount.textContent = "Unavailable";
      searchStatus.textContent = "The sample registry did not load.";
      registry.innerHTML = '<div class="empty-state">The sample registry could not be loaded. Refresh the page and try again. Details: ' + escapeHtml(error.message) + '</div>';
    });
})();
