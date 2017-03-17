function render (input) {
  input = input.replace(/[\n</"']/g, '')
  return `
    <script>
          // alert('${input}')
    </script>
  `
}
