// from alf.nu
function escape (s) {
  let text = s.replace(/</g, '&lt;').replace(/"/g, '&quot;')
  // URLs
  text = text.replace(/(http:\/\/\S+)/g, '<a href="$1">$1</a>')
  // [[img123|Description]]
  text = text.replace(/\[\[(\w+)\|(.+?)\]\]/g, '<img alt="$2" src="$1.gif">')
  return text
}
