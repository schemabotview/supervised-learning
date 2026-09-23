import type { Section } from '../types'

export const decidingWhatToTry: Section = {
  id: 'deciding-what-to-try',
  title: 'Deciding what to try',
  scene: 'deciding-what-to-try',
  slide: `## Six instincts, and only half of them are legal

Every row on that menu is somebody's reflex. Which one is *your* reflex is not evidence about your model.

### The same knob, both directions
λ **up** for variance, λ **down** for bias. **More** features for bias, **fewer** for variance. Nothing on that list is safe to reach for blind.

### Guessing does not stall you — it reverses you
Pick the wrong half and the next measurement is worse than the one that sent you there, and now you are debugging your own fix.

### The licence costs four lines
\`J_train\` against your baseline. \`J_val\` against \`J_train\`. That is the entire check, and it is cheaper than the change you were about to make.

### The most expensive row
**Collect more training examples** is the instinct everyone has, the only one that costs a quarter, and useless against bias — the learning curve says so before you spend a penny.`,
  narration:
    "So you have been round the loop, you have measured, and you are standing at the change box. What do you actually do? Here is the menu. It is short — six things — and you have met all of them already. Collect more training examples. Use fewer features. Increase lambda. Find additional features. Add polynomial features. Decrease lambda. That is essentially the whole vocabulary, and the striking thing about this list is not what is on it. It is the middle column. Look at how it sorts. The first three only ever help high variance. The last three only ever help high bias. There is no row that helps both, and there is no row that is neutral — each one actively makes the other problem worse. Increase lambda and you shrink the weights, which is exactly right if the model is too flexible and exactly wrong if it is already too simple. Add features and you give it more to work with, which is right for bias and is pouring petrol on variance. Now think about what that means when you do not measure first. You look at a disappointing number, you have a hunch, and you reach. And the thing is, everybody's hunch is the same hunch: get more data. It feels like diligence. It feels like the responsible, unglamorous, roll-your-sleeves-up answer. And if your model is underfitting, it does precisely nothing, and it does precisely nothing slowly and expensively — three months of collection, and a learning curve that was flat before you started and is flat afterwards. Guessing here is not neutral. This is worth being clear about, because it is the whole argument for measuring. If you guess and you are wrong, you do not simply fail to improve; you move backwards. The next measurement is worse than the one that sent you there, and now you are debugging your own fix on top of the original problem, with no idea which of the two you are looking at. And what does it cost to not guess? Two numbers. Training error compared against your baseline — that gap is bias. Validation error compared against training error — that gap is variance. Four lines of code, run in a second, and they tell you which half of the menu you are allowed to shop from. That is a spectacular return on four lines. One last rule, and it is the one people break when they are in a hurry, which is always. Change one thing per round. If you increase lambda and drop two features in the same turn, and the model improves, you have learned nothing you can build on, because you cannot tell which of the two did it, or whether one helped a lot while the other hurt a little. It feels slow. It is dramatically faster, because it is the only way each turn of the loop leaves you knowing more than you did.",
}
