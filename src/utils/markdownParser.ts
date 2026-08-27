function sanitizeLinkUrl(url: string): string {
  const normalized = url.trim().replace(/&amp;/g, '&');
  return /^(https?:|mailto:|[./#])/i.test(normalized) ? url : '#';
}

export function renderMarkdownToHtml(text: string): string {
  if (!text) return '<p class="text-zinc-500 italic">No detailed changelog provided.</p>';

  // Escape HTML characters
  let md = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  // Fenced code blocks
  md = md.replace(/```([\s\S]*?)```/g, '<pre class="my-4 p-4 rounded-lg bg-zinc-900 text-zinc-100 font-mono text-xs overflow-x-auto border border-zinc-800"><code>$1</code></pre>');

  // Inline code
  md = md.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 font-mono text-xs border border-zinc-200 dark:border-zinc-700">$1</code>');

  // Headings
  md = md.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-2 tracking-tight">$1</h3>');
  md = md.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-8 mb-3 tracking-tight border-b border-zinc-200 dark:border-zinc-800 pb-1.5">$1</h2>');
  md = md.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-8 mb-4 tracking-tight border-b border-zinc-200 dark:border-zinc-800 pb-2">$1</h1>');

  // Bold and Italic
  md = md.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-zinc-900 dark:text-zinc-100">$1</strong>');
  md = md.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Links
  md = md.replace(/\[(.*?)\]\((.*?)\)/g, (_match, label: string, url: string) => (
    `<a href="${sanitizeLinkUrl(url)}" target="_blank" rel="noopener noreferrer" class="text-brand-600 dark:text-brand-400 hover:underline font-medium">${label}</a>`
  ));

  // Unordered list items
  md = md.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="ml-4 list-disc text-zinc-700 dark:text-zinc-300 my-1 leading-relaxed">$1</li>');

  // Line breaks
  md = md.replace(/\n\n/g, '<div class="h-3"></div>');

  return md;
}
