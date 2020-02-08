/**
 *
 * FIGHT CLUB - ANIMATION MANAGER
 *
 * @author: C. Moller
 * @date: 26 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   - Add "sprite" to constructor params
 *   - Add Animation.init(), Animator.init() + Refactor
 *   - Better currentAnimation detect in init()
 *
 * @update: C. Moller - 08 Feb 2020
 *   - Revert complexity(). Remove init() if not required.
 *   - Add approach() shortcut
 *   - Rename some vars
 *
 */

class AnimationFrame {


  constructor(props) {

    this.index = -1;

    this.id = null;
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.flipH = false;
    this.flipV = false;

    for (let prop in props) { this[prop] = props[prop]; }

  }


} // End: AnimationFrame Class



class Animation {


  constructor(id, parent, props) {

    this.id = id;
    this.parent = parent;

    this.speed = 0;
    this.facing = '';
    this.frames = [];
    this.className = '';
    this.lastFrameIndex = 0;
    this.currentFrameIndex = 0;
    this.lastAnimationTime = 0;
    this.frameChanged = false;
    this.currentFrame = undefined;

    for (let prop in props) { this[prop] = props[prop]; }

    this.currentFrameIndex = this.defaultFrameIndex || 0;

    for (let i = 0, n = this.framesCfg.length; i < n; i++) {

      this.frames.push(new AnimationFrame(this.framesCfg[i]));

    }

    this.currentFrame = this.frames[this.currentFrameIndex];

  }


} // End: Animation Class



class Animator {


  constructor(sprite, props) {

    this.log = sprite.log;
    this.log('New Animator()', sprite.id);

    this.sprite = sprite;

    this.animations = [];
    this.lastAnimation = null;
    this.animationChanged = false;
    this.currentAnimation = null;

    for (let prop in props) { this[prop] = props[prop]; }

    const animationCfg = this.sprite.animation;
    const animationSets = animationCfg.animationSets || [];

    for (let i = 0, n = animationSets.length; i < n; i++) {

      this.animations.push(new Animation(i, sprite, animationSets[i]));

    }

    this.currentAnimation = this.getAnimationFacing(this.initialDirection, this.initialState);

    this.log('Animator.init():', sprite.id, '- Done', this);

  }


  getAnimation(id) {

    // Return the FIRST matching animation.
    return this.animations.find(function(anim) { return anim.id === id; });

  }


  getAnimationFacing(facing, state) {

    // this.log('animation.getAnimationFacing(), facing =', facing, ', state =', state);
    // Return the FIRST matching animation.
    return this.animations.find(function(anim) {

      return anim.facing === facing && anim.state === state;

    });

  }


  update(now) {

    const animation = this.currentAnimation;
    // const frame = animation.frames[animation.currentFrameIndex];

    this.animationChanged = (animation !== this.lastAnimation);
    this.lastAnimation = animation;

    if (animation.speed && (now - animation.lastAnimationTime > animation.speed)) {

      let nextFrameIndex = animation.currentFrameIndex + 1;

      // this.log('animation.nextFrameIndex =', nextFrameIndex);

      if (nextFrameIndex >= animation.frames.length) { nextFrameIndex = 0; }

      animation.lastFrameIndex = animation.currentFrameIndex;

      animation.currentFrame = animation.frames[nextFrameIndex];

      animation.currentFrameIndex = nextFrameIndex;

      animation.lastAnimationTime = now;

      animation.frameChanged = true;

    } else {

      animation.frameChanged = false;

    }

    return animation;

  } // End: update


} // End: Animator Class
