/**
 *
 * FIGHT CLUB - ANIMATION MANAGER
 *
 * @author: C. Moller
 * @date: 26 December 2017
 *
 * @updated: 05 Feb 2020 (C. Moller)
 *   - Add "sprite" to constructor params
 *   - Add Animation.init(), Animator.init() + Refactor
 *   - Better currentAnimation detect in init()
 */

class AnimationFrame {


  constructor(props) {

    this.index = -1;

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


  constructor(sprite) {

    this.sprite = sprite;

  }


  init(props) {

    this.id = null;
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

    var i, n;

    // Create all the frame instances based on "animation.framesCfg"
    for (i = 0, n = this.framesCfg.length; i < n; i++) {

      this.frames.push(new AnimationFrame(this.framesCfg[i]));

    }

    this.currentFrame = this.frames[this.currentFrameIndex];

  }


} // End: Animation Class



class Animator {


  constructor(sprite) {

    this.sprite = sprite;

    this.animations = [];
    this.lastAnimation = null;
    this.animationChanged = false;
    this.currentAnimation = null;

    sprite.game.log('New Animator()', sprite.id);

  }


  init(props) {

    for (let prop in props) { this[prop] = props[prop]; }

    let animationCfg = this.sprite.animation;
    let animationSets = animationCfg.animationSets || [];
    let i = 0, n = animationSets.length;

    // Create all the animation instances required...
    for (i = 0; i < n; i++) { this.animations.push(new Animation(this.sprite)); }

    // Initialize every animation instance using "animationsCfg"
    for (i = 0; i < n; i++) { this.animations[i].init(animationSets[i]); }

    this.currentAnimation = this.getAnimationFacing(this.startFacing, this.initialState);

    this.sprite.game.log('Animator.init(),', this.sprite.id, '- Done', this);

  }


  getAnimation(id) {

    // Return the FIRST matching animation.
    return this.animations.find(function(anim) { return anim.id === id; });

  }


  getAnimationFacing(facing, state) {

    //console.log('animation.getAnimationFacing(), facing =', facing, ', state =', state);

    // Return the FIRST matching animation.
    return this.animations.find(function(anim) { return anim.facing === facing && anim.state === state; });

  }


  update(now) {

    let animation = this.currentAnimation;
    let frame = animation.frames[animation.currentFrameIndex];

    this.animationChanged = (animation !== this.lastAnimation);
    this.lastAnimation = animation;

    if (animation.speed && (now - animation.lastAnimationTime > animation.speed)) {

      let nextFrameIndex = animation.currentFrameIndex + 1;

      //console.log('animation.nextFrameIndex =', nextFrameIndex);

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