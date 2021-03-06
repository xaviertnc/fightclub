/**
 * FIGHT CLUB - CONFIG
 *
 * @author: C. Moller
 * @date: 26 December 2017
 *
 * @update: C. Moller - 05 Feb 2020
 *   - Rename top-level keys "animation" + "animationsCfg"
 *   - Move x,y,height,width,vertSpeed,.. settings to config
 *   - Add "debug" setting to control game.log()
 *   - Add "Score" section
 *
 * @update: C. Moller - 08 Feb 2020
 *   - Add className:'score' + value:0 to score
 *   - Change initialState to state
 *   - Change startFacing to facing
 *
 */

FC.config = {

  debug: false,

  score: {

    className: 'score',

    x: 10,
    y: 10,

    height: 30,
    width: 270,

    value: 0,

  },


  player1: {

    x: 150,
    y: 250,

    vertSpeed: 30,
    horzSpeed: 30,

    state: 'Normal',
    facing: 'Right',

    animation: {

      animationSets: [

        // NORMAL
        {
          id: 0,
          dir: 0,
          speed: 0,
          state: 'Normal',
          facing: 'Right',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 0 , width: 30, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 1,
          dir: 45,
          speed: 0,
          state: 'Normal',
          facing: 'UpRight',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 29, width: 29, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 2,
          dir: 90,
          speed: 0,
          state: 'Normal',
          facing: 'Up',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 60 , width: 30, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 3,
          dir: 135,
          speed: 0,
          state: 'Normal',
          facing: 'UpLeft',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 29, width: 29, height: 56, flipH: true }],
          className: 'wizzard'
        },
        {
          id: 4,
          dir: 180,
          speed: 0,
          state: 'Normal',
          facing: 'Left',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 0 , width: 30, height: 56, flipH: true }],
          className: 'wizzard'
        },
        {
          id: 5,
          dir: 225,
          speed: 0,
          state: 'Normal',
          facing: 'DownLeft',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 127, width: 27, height: 56, flipH: true }],
          className: 'wizzard'
        },
        {
          id: 6,
          dir: 270,
          speed: 0,
          state: 'Normal',
          facing: 'Down',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 96, width: 30, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 7,
          dir: 315,
          speed: 0,
          state: 'Normal',
          facing: 'DownRight',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 127, width: 27, height: 56 }],
          className: 'wizzard'
        },

        // ATTACK
        {
          id: 8,
          dir: 0,
          speed: 0,
          state: 'Attack',
          facing: 'Right',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 159, width: 29, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 9,
          dir: 45,
          speed: 0,
          state: 'Attack',
          facing: 'UpRight',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 189, width: 33, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 10,
          dir: 90,
          speed: 0,
          state: 'Attack',
          facing: 'Up',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 224 , width: 30, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 11,
          dir: 135,
          speed: 0,
          state: 'Attack',
          facing: 'UpLeft',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 189, width: 33, height: 56, flipH: true }],
          className: 'wizzard'
        },
        {
          id: 12,
          dir: 180,
          speed: 0,
          state: 'Attack',
          facing: 'Left',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 160, width: 29, height: 56, flipH: true }],
          className: 'wizzard'
        },
        {
          id: 13,
          dir: 225,
          speed: 0,
          state: 'Attack',
          facing: 'DownLeft',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 288, width: 36, height: 56, flipH: true }],
          className: 'wizzard'
        },
        {
          id: 14,
          dir: 270,
          speed: 0,
          state: 'Attack',
          facing: 'Down',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 257, width: 30, height: 56 }],
          className: 'wizzard'
        },
        {
          id: 15,
          dir: 315,
          speed: 0,
          state: 'Attack',
          facing: 'DownRight',
          defaultFrameIndex: 0,
          framesCfg: [{ index: 0, top: 0, left: 288, width: 36, height: 56 }],
          className: 'wizzard'
        }
      ]

    }

  },


  boss1: {

    x: 575,
    y: 250,

    width: 64,
    height: 64,

    vertSpeed: 30,
    horzSpeed: 30,

    state: 'Normal',
    facing: 'Left',

    animation: {

      animationSets: [

        // NORMAL
        {
          id: 0,
          dir: 0,
          speed: 300,
          state: 'Normal',
          facing: 'Left',
          defaultFrameIndex: 0,
          framesCfg: [
            { index: 0, top: 0, left: 0  , width: 64, height: 64 },
            { index: 1, top: 0, left: 64 , width: 64, height: 64 }
          ],
          className: 'gringe'
        }

     ]

    }

  }

};
