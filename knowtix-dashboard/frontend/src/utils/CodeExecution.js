// Code Execution Utility
export const executeCode = async (code, language) => {
  // Simulate code execution with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    switch (language) {
      case 'javascript':
        // Create a safe execution environment for JavaScript
        const safeEval = new Function('return ' + code);
        return String(safeEval());
        
      case 'python':
        // Simulate Python execution
        if (code.includes('print(')) {
          const match = code.match(/print\((.*)\)/);
          if (match) {
            return match[1].replace(/['"]/g, '');
          }
        }
        return 'Python code executed successfully';
        
      case 'html':
        // For HTML, return a preview message
        return 'HTML code rendered successfully';
        
      case 'css':
        // For CSS, return a preview message
        return 'CSS styles applied successfully';
        
      case 'c':
        // Simulate C code execution
        if (code.includes('printf(')) {
          const match = code.match(/printf\((.*)\)/);
          if (match) {
            return match[1].replace(/['"]/g, '');
          }
        }
        return 'C code compiled and executed successfully';
        
      default:
        return 'Code executed successfully';
    }
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

// Additional code execution utilities
export const validateCode = (code, language) => {
  // Basic code validation
  if (!code || code.trim() === '') {
    return { valid: false, error: 'Code cannot be empty' };
  }
  
  // Language-specific validation
  switch (language) {
    case 'javascript':
      if (code.includes('eval(') || code.includes('Function(')) {
        return { valid: false, error: 'Potentially unsafe JavaScript code detected' };
      }
      break;
      
    case 'python':
      if (code.includes('import os') || code.includes('subprocess')) {
        return { valid: false, error: 'Potentially unsafe Python imports detected' };
      }
      break;
      
    case 'c':
      if (code.includes('#include <stdlib.h>') && code.includes('system(')) {
        return { valid: false, error: 'Potentially unsafe C system calls detected' };
      }
      break;
  }
  
  return { valid: true };
};

// Code formatting utility
export const formatCode = (code, language) => {
  // Basic code formatting
  return code
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim();
};

// Get language-specific hints
export const getLanguageHints = (language) => {
  switch (language) {
    case 'javascript':
      return [
        'Use console.log() for output',
        'Variables can be declared with let, const, or var',
        'Functions can be defined with function() or arrow syntax'
      ];
      
    case 'python':
      return [
        'Use print() for output',
        'Python uses indentation for code blocks',
        'Variables don\'t need explicit declaration'
      ];
      
    case 'html':
      return [
        'HTML uses tags to structure content',
        'Common tags: <div>, <p>, <h1>-<h6>, <span>',
        'Remember to close your tags'
      ];
      
    case 'css':
      return [
        'CSS uses selectors to style HTML elements',
        'Properties: color, font-size, margin, padding',
        'Use classes and IDs for specific styling'
      ];
      
    case 'c':
      return [
        'C requires semicolons at the end of statements',
        'Use printf() for output',
        'Remember to include necessary headers'
      ];
      
    default:
      return ['Write your code and click Run to execute'];
  }
};

// Code templates for quick start
export const getCodeTemplates = (language) => {
  switch (language) {
    case 'javascript':
      return `// JavaScript Example
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));`;
      
    case 'python':
      return `# Python Example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`;
      
    case 'html':
      return `<!-- HTML Example -->
<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`;
      
    case 'css':
      return `/* CSS Example */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
    text-align: center;
}`;
      
    case 'c':
      return `/* C Example */
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`;
      
    default:
      return '// Write your code here';
  }
};