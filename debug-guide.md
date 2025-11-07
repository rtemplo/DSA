# 🐛 Debugging Guide for TypeScript Algorithms

This project is set up with comprehensive debugging support for VS Code.

## 🚀 Quick Start

1. Open any `.ts` file in the `src/` directory
2. Set breakpoints by clicking in the gutter (left of line numbers)
3. Press `F5` or go to Run and Debug panel
4. Choose a debug configuration and start debugging!

## 🔧 Available Debug Configurations

### 1. **Debug TypeScript (ts-node)** ⭐ _Recommended_

- Debugs TypeScript files directly without compilation
- Runs `src/index.ts` by default
- Source maps enabled for accurate debugging
- **Usage**: Best for development and testing algorithms

### 2. **Debug Current TypeScript File**

- Debugs the currently open TypeScript file
- Perfect for testing individual algorithms
- **Usage**: Open any `.ts` file and run this configuration

### 3. **Debug Compiled JavaScript**

- Debugs the compiled JavaScript in `dist/`
- Automatically builds before debugging
- **Usage**: Best for production-like debugging

### 4. **Debug with Arguments**

- Same as #1 but allows passing command-line arguments
- Environment variables can be set
- **Usage**: When your algorithms need input parameters

## 🎯 Debugging Tips

### Setting Breakpoints

- **Red dots**: Click in the gutter to set breakpoints
- **Conditional breakpoints**: Right-click breakpoint → Add condition
- **Logpoints**: Right-click gutter → Add logpoint (console.log without stopping)

### Debug Controls

- `F5` - Start/Continue
- `F10` - Step Over
- `F11` - Step Into
- `Shift+F11` - Step Out
- `Ctrl+Shift+F5` - Restart
- `Shift+F5` - Stop

### Watching Variables

- **Variables panel**: Shows local variables automatically
- **Watch panel**: Add expressions to monitor (e.g., `arr.length`, `i * 2`)
- **Hover inspection**: Hover over variables to see values

### Debug Console

- Execute code in the current context
- Evaluate expressions like `arr[0]`, `typeof variable`
- Call functions and modify variables

## 📁 Example Files

### `src/debug-example.ts`

Contains fibonacci algorithms with strategic console.log statements and good breakpoint locations:

```typescript
// Good breakpoint locations:
- Line with base cases (n <= 0, n === 1)
- Inside loops (for iterative version)
- Before recursive calls
- Variable assignments
```

### Quick Test

1. Open `src/debug-example.ts`
2. Set breakpoints on lines 10, 15, 35, 40
3. Press `F5` and select "Debug Current TypeScript File"
4. Watch variables: `n`, `a`, `b`, `result`

## 🛠️ Advanced Debugging Features

### Source Maps

- Enabled by default (`"sourceMap": true` in tsconfig.json)
- Allows debugging TypeScript directly even when running compiled JS

### Skip Files Configuration

- Node.js internals are skipped for cleaner debugging
- Only your algorithm code will be stepped through

### Tasks Integration

- Build tasks integrated with debug configurations
- Use `Ctrl+Shift+P` → "Tasks: Run Task" for manual builds

## 🚨 Troubleshooting

### Breakpoints Not Hit?

1. Ensure source maps are enabled in `tsconfig.json`
2. Check that file paths in launch.json are correct
3. Rebuild the project: `npm run rebuild`

### Cannot Find Module?

1. Ensure all dependencies are installed: `npm install`
2. Check import paths are relative or properly resolved

### TypeScript Errors?

1. Check the Problems panel (`Ctrl+Shift+M`)
2. Fix TypeScript errors before debugging
3. Ensure `tsconfig.json` settings are compatible

## 🎮 Practice Exercises

Try debugging these scenarios:

1. **Binary Search**: Set breakpoints on `left`, `right`, `mid` calculations
2. **Sorting Algorithms**: Watch array state changes during sorting
3. **Recursive Algorithms**: Step through recursive calls to understand the call stack
4. **Performance Testing**: Use console.time() and debug console to measure execution

Happy Debugging! 🐛✨
