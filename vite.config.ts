import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The render engine is the @graphlearning/flow package and the app shell is @graphlearning/shell —
// neither is a local folder. `dedupe` keeps a single copy of react / react-dom / @xyflow/react
// across this app and both packages: the gotcha that bites when two React copies meet
// (invalid-hook-call). The packages declare them as peer deps and externalise them, so they never
// carry their own React; dedupe is the belt to that braces.
// jsx is automatic by default with @vitejs/plugin-react.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/supervised-learning/' : '/',
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', '@xyflow/react'],
  },
  server: { port: 5173 },
}))
