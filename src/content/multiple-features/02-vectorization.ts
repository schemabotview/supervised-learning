import type { Section } from '../types'

export const vectorization: Section = {
  id: 'vectorization',
  title: 'Vectorization',
  scene: 'vectorization',
  slide: `## Same arithmetic, one instruction or many

\`np.dot(w, x)\` computes exactly what the loop computes. It is dramatically faster anyway.

### Where the difference comes from
- **No interpreter** — the loop runs in compiled C, not Python bytecode
- **SIMD** — the CPU multiplies several pairs per instruction
- **Contiguous memory** — one array walks one cache line; a Python list of floats chases pointers

### Be honest about the claim
Both are **O(n)**. Vectorizing does not change the growth rate — it changes the constant, by a factor of roughly 30–80 on typical hardware.

That is not a micro-optimization when the inner loop runs a million times.

### The habit
If you are writing \`for j in range(n)\` over features or examples, there is almost always an array expression that replaces it. Look for it.`,
  narration:
    "Now, np dot w comma x computes exactly the same number the loop computes. Bit for bit identical. And it is dramatically faster. It is worth understanding why, because the reason generalises to almost everything you will do with numerical Python. Three things are going on, and they are on the card at the bottom. First, the interpreter. A Python for-loop does an enormous amount of work per iteration that has nothing to do with your arithmetic — checking types, allocating objects, bumping reference counts. NumPy's loop is compiled C, so none of that happens. Second, SIMD. Modern CPUs have instructions that multiply four, eight, sometimes sixteen pairs of numbers in a single operation. A Python loop cannot reach those. A compiled kernel can. Third, memory layout. A NumPy array is one contiguous block, so walking it pulls whole cache lines of useful data. A Python list of floats is a list of pointers to separate objects scattered around the heap, and every access is a potential cache miss. Now look at the plot, and notice what it does not claim. Both lines are straight. Both are linear in n — vectorising does not change the big-O, it changes the constant. The gap you can see is roughly a factor of thirty to eighty on ordinary hardware, depending on the machine and the size. I am labouring this because people do sometimes come away thinking np dot is somehow asymptotically better, and it is not; it is the same algorithm, executed well. But a constant factor of fifty is not a micro-optimisation when that expression sits inside a loop that runs a million times, which is exactly where it sits in gradient descent. So here is the habit worth building. Any time you find yourself writing for j in range n, over features or over examples, stop and look for the array expression that replaces it. There almost always is one.",
}
