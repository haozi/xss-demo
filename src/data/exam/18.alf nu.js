// from alf.nu
function escape (s) {
  s = s.replace(/"/g, '\\"')
  return '<script>console.log("' + s + '");</script>'
}
