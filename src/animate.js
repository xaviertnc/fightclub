/**
 *
 * FIGHT CLUB - ANIMATION MANAGER
 *
 * @author: C. Moller
 * @date: 26 December 2017
 *
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

    FC.lib.extend(this, props);

  }

}



class Animation {

  constructor(props) {

    this.id = undefined;

    this.speed = 0;
    this.facing = '';
    this.frames = [];
    this.className = '';
    this.lastFrameIndex = 0;
    this.currentFrameIndex = 0;
    this.lastAnimationTime = 0;
    this.frameChanged = false;
    this.currentFrame = undefined;

    FC.lib.extend(this, props);

    this.currentFrameIndex = this.defaultFrameIndex || 0;

    var i, n;

    // Create all the frame instances based on "animation.framesCfg"
    for (i = 0, n = this.framesCfg.length; i < n; i++) {

      this.frames.push(new AnimationFrame(this.framesCfg[i]));

    }

    this.currentFrame = this.frames[this.currentFrameIndex];

  }

}



class Animator {

  constructor(sprite, props) {

    this.animations = [];
    this.currentAnimation = null;
    this.lastAnimation = null;

    this.animationChanged = false;

    FC.lib.extend(this, props);

    let cfg = sprite.animation;
    let animationsCfg = cfg.animationsCfg || [];
    let defaultAnimId = cfg.defaultAnimationId;

    // Create all the animation instances based on "sprite.animationsCfg"
    for (let i = 0, n = animationsCfg.length; i < n; i++) {

      let animation = new Animation(animationsCfg[i]);

      // Assign the current animation if a default is set.
      if (animation.id == defaultAnimId) { this.currentAnimation = animation; }

      this.animations.push(animation);

    }

  }


  getAnimation(id) {

    // Return the FIRST matching animation.
    return this.animations.find(function(anim) { return anim.id === id; });

  }


  getAnimationFacing(facing) {

    // Return the FIRST matching animation.
    return this.animations.find(function(anim) { return anim.facing === facing; });

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

  }

}
