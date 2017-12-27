/**
 * FIGHT CLUB - CONFIG
 *
 * @author: C. Moller
 * @date: 26 December 2017
 *
 */

FC.config = {

  player: {

    animation: {

      defaultAnimationId: 0,

      animationsCfg: [
        {
          id: 0,
          dir: 0,
          speed: 0,
          facing: 'Right',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 0 , width: 30, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 1,
          dir: 45,
          speed: 0,
          facing: 'UpRight',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 29, width: 29, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 2,
          dir: 90,
          speed: 0,
          facing: 'Up',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 60 , width: 30, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 3,
          dir: 135,
          speed: 0,
          facing: 'UpLeft',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 29, width: 29, height: 56, flipH: true }],
          className: 'wizzard'
        },
        {
          id: 4,
          dir: 180,
          speed: 0,
          facing: 'Left',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 0 , width: 30, height: 56, flipH: true }],
          className: 'wizzard'
        },
        {
          id: 5,
          dir: 225,
          speed: 0,
          facing: 'DownLeft',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 127, width: 27, height: 56, flipH: true }],
          className: 'wizzard'
        },
        {
          id: 6,
          dir: 270,
          speed: 0,
          facing: 'Down',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 96, width: 30, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 7,
          dir: 315,
          speed: 0,
          facing: 'DownRight',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 127, width: 27, height: 56 }],
          className: 'wizzard'
        }
      ]

    }

  }

};
