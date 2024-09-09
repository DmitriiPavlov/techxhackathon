import re
def remove_quotes(filename):
  """Removes quotes from a file.

  Args:
    filename: The name of the file to modify.
  """

  with open(filename, 'r+',encoding='iso-8859-1') as f:
    content = f.read()
    content = re.sub(r'\'', '', content)
    f.seek(0)
    f.write(content)
    f.truncate()

# Example usage:
remove_quotes("/Users/bison/Downloads/catalog.txt")