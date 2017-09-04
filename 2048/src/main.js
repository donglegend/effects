var W = window.innerWidth,
    H = window.innerHeight,
    size = 4,
    targetVal = 2048,
    margin = 8,
    initX = 20,
    initY = 100,
    bgCellSize = (W - initX * 2 - margin * (size + 1)) / size,
    duration = 80,
    canSwipe = true,
    score = 0

var CHESSSPRITE = {}

var States = {
    preload: function () {
        console.log('load')
    },
    create: function () {
        // 设置舞台 背景色
        game.stage.setBackgroundColor('#fbf8ee')
        //score
        var scoreStyle = {
            font: "bold 30px Arial",
            fill: "#FFFFFF",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        var scoreSprite = game.add.sprite(10, 10);
        var scoreGraphics = game.add.graphics(0, 0);
        scoreGraphics.beginFill('0xedc850');
        scoreGraphics.drawRoundedRect(10, 0, 200, 60, 5);
        scoreGraphics.endFill();
        scoreSprite.addChild(scoreGraphics);
        this.scoreText = game.add.text(15, 15, '分数: ' + score, scoreStyle);
        scoreSprite.addChild(this.scoreText);


        this.drawChessBoard()
        init()
        this.renderChessBoard()


        // event 控制
        // game.input.onDown.add(() => {
        //     console.log('ondown')
        // })
        // game.input.onUp.add(function () {
        //     console.log('up')
        // })

        this.swipe = new Swipe(game, {
            up: this.swipeUP.bind(this),
            down: this.swipeDown.bind(this),
            left: this.swipeLeft.bind(this),
            right: this.swipeRight.bind(this),
        })
    },
    update: function () {
        if (canSwipe) {
            this.swipe.check()
        }
    },
    render: function () {
        this.scoreText.setText('分数: ' + score)
        if (score == targetVal) {
            this.gameOver()
        }
    },
    drawChessBoard: function () {
        // 绘制 棋盘 区域 背景
        this.chessBoard = game.add.sprite(initX, initY)
        var chessBoardBackGraphics = game.make.graphics(0, 0)
        chessBoardBackGraphics.beginFill('0xb7a99e')
        chessBoardBackGraphics.drawRoundedRect(0, 0, W - initX * 2, W - initX * 2, 5)
        chessBoardBackGraphics.endFill()
        this.chessBoard.addChild(chessBoardBackGraphics)
        // var margin = 8
        // var bgCellSize = (W - 40 - margin * (size + 1)) / size
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                var bgCell = game.make.graphics()
                bgCell.beginFill('0xBEB6B0')
                bgCell.drawRoundedRect((bgCellSize + margin) * j + margin, (bgCellSize + margin) * i + margin, bgCellSize, bgCellSize, 4)
                bgCell.endFill()
                this.chessBoard.addChild(bgCell)
            }
        }
    },
    drawChess: function (i, j, v, style) {
        // 绘制 方块
        if (v === 0) {
            return
        }
        var x = (bgCellSize + margin) * j + margin,
            y = (bgCellSize + margin) * i + margin
        var chessSprite = game.make.sprite(x, y)
        this.chessBoard.addChild(chessSprite)

        var chessGraphics = game.make.graphics()
        chessGraphics.beginFill(style.bgColor)
        chessGraphics.drawRoundedRect(0, 0, bgCellSize, bgCellSize, 4)
        chessGraphics.endFill()
        var chessText = game.make.text(0, 0, v, {
            font: 'bold ' + (style.fontSize || 30) + 'px Arial',
            fill: style.fontColor,
            boundsAlignH: "center",
            boundsAlignV: "middle"
        })
        chessText.setTextBounds(0, 0, bgCellSize, bgCellSize)
        chessGraphics.addChild(chessText)
        chessSprite.addChild(chessGraphics)

        chessSprite.anchor.setTo(0.5, 0.5)
        chessSprite.scale.setTo(0.6, 0.6);
        // chessSprite.alpha = 0
        game.add.tween(chessSprite.scale).to({
            // alpha: 1,
            x: 1,
            y: 1
        }, duration, Phaser.Easing.Sinusoidal.InOut, true).onComplete.add(function () {

        })
        CHESSSPRITE[`${i}-${j}`] = chessSprite
        return chessSprite
    },
    renderChessBoard: function () {
        matrix.forEach(function (row, i) {
            row.forEach(function (col, j) {
                this.drawChess(i, j, col.val, STYLES[col.val])
            }, this)
        }, this)
    },
    getChessSpriteKey: function (i, j, step, direction) {
        // 0 1 2 3
        // up down left right
        var key
        switch (direction) {
            case 0:
                key = `${i+step}-${j}`
                break;
            case 1:
                key = `${i-step}-${j}`
                break;
            case 2:
                key = `${i}-${j + step}`
                break;
            case 3:
                key = `${i}-${j - step}`
                break;
        }
        return key
    },
    getOffsetPos: function (step, direction) {
        var pos
        switch (direction) {
            case 0:
                pos = {
                    x: 0,
                    y: -step * (bgCellSize + margin),
                }
                break;
            case 1:
                pos = {
                    x: 0,
                    y: step * (bgCellSize + margin),
                }
                break;
            case 2:
                pos = {
                    x: -step * (bgCellSize + margin),
                    y: 0
                }
                break;
            case 3:
                pos = {
                    x: step * (bgCellSize + margin),
                    y: 0
                }
                break;
        }
        return pos
    },
    handleSwipeRes: function (res, direction) {
        // 如果转换后结果 和  原矩阵 相同，不同执行合并动画渲染，
        if (isEqual(matrix, res)) {
            canSwipe = true
            return
        }
        var self = this

        const allTweens = []
        res.forEach(function (row, i) {
            row.forEach(function (col, j) {
                if (col.val > 0) {
                    var duration = 100
                    if (col.merge) {
                        // 重新生成 结点
                        col.steps.forEach(function (item) {
                            let _resolve, _reject
                            const p1 = new Promise(function (resolve, reject) {
                                _resolve = resolve
                                _reject = reject
                            })
                            allTweens.push(p1)
                            let key = this.getChessSpriteKey(i, j, item, direction)
                            var sprite = CHESSSPRITE[key]
                            var pos = this.getOffsetPos(item, direction)
                            var tween = game.add.tween(sprite).to({
                                alpha: 0,
                                x: sprite.x + pos.x,
                                y: sprite.y + pos.y
                            }, duration, Phaser.Easing.Linear.None, true)
                            tween.onComplete.add(function () {
                                this.kill()
                                _resolve()
                            }, sprite)
                        }, this)
                        var newSprite = this.drawChess(i, j, col.val, STYLES[col.val])
                    } else {
                        let __resolve, __reject
                        const p2 = new Promise(function (resolve, reject) {
                            __resolve = resolve
                            __reject = reject
                        })
                        allTweens.push(p2)
                        var key = this.getChessSpriteKey(i, j, col.steps[0], direction)
                        var sprite = CHESSSPRITE[key]
                        var pos = this.getOffsetPos(col.steps[0], direction)
                        var tween = game.add.tween(sprite).to({
                            x: sprite.x + pos.x,
                            y: sprite.y + pos.y
                        }, duration, Phaser.Easing.Linear.None, true)
                        tween.onComplete.add(function () {
                            CHESSSPRITE[`${i}-${j}`] = this
                            __resolve()
                        }, sprite)
                    }
                }
            }, this)
        }, self)

        Promise.all(allTweens).then(function () {
            matrix = res
            var newItem = insertVal()
            if (newItem) {
                self.drawChess(newItem.i, newItem.j, newItem.val, STYLES[newItem.val])
            }
            // 判断 游戏是否结束
            clearMatrix()
            if (checkGameover()) {
                // game over
                self.gameOver()
            }
            setTimeout(function () {
                canSwipe = true
            }, 20)
        }, function (err) {
            console.log('发生错误!')
        })
    },
    gameOver: function () {
        document.getElementById('mask').style.display = 'block'
    },
    swipeUP: function () {
        canSwipe = false
        var res = Move.up(deepCopy(matrix))
        this.handleSwipeRes(res, 0)
    },
    swipeDown: function (arr) {
        canSwipe = false
        var res = Move.down(deepCopy(matrix))
        this.handleSwipeRes(res, 1)
    },
    swipeLeft: function () {
        canSwipe = false
        var res = Move.left(deepCopy(matrix))
        this.handleSwipeRes(res, 2)
    },
    swipeRight: function () {
        canSwipe = false
        var res = Move.right(deepCopy(matrix))
        this.handleSwipeRes(res, 3)
    }
}
var game = new Phaser.Game(W, H, Phaser.CANVAS, 'legend', States)