/**
 * Created by stas on 05.02.16.
 */
clog = true;
Board.prototype.updatePiece = function (e, t, o, i, s, r, a, n) {
    if (a && (this.board_xy = null, e.prePromotionRow && (e.row = e.prePromotionRow, e.column = e.prePromotionColumn)), null == a && e.column == t && e.row == o)
        return this.board_xy = null,
            e.setPosition(e.column, e.row, !1, null, this.moveAnimationLength), void(clog && console.log("moved piece back to its orig position"));
    var l = null;
    if (l = this.currentMove && this.currentMove.prev ? this.currentMove.prev : this.prev_move,
        clog && console.log(this.currentMove ? "updatepiece currentMove:" + this.currentMove.output() : "updatepiece currentmove null"),
        !i && !this.canMove(e.makeLightWeight(), t, o, l, !0))
        return this.board_xy = null,
        e.setPosition(e.column, e.row, !1, null, .5),
        void(clog && (console.log("move not legal , move back to orig:" + this.toMove),
        console.log(l ? "prevMove was:" + l.output() : "prevMove was null")));
    var h = "";
    if (r && e.piece == ChessPiece.PAWN && (7 == o || 0 == o))
        return void this.promptPromotion(e, t, o, i, s);
    null != a && (h = a);
    var c = "";
    c += Move.columnToChar(e.column),
        c += String.fromCharCode("1".charCodeAt(0) + e.row),
        c += Move.columnToChar(t),
        c += String.fromCharCode("1".charCodeAt(0) + o), h && (c += h);
    var userMove = this.createMoveFromString(c),
        move = userMove;
    move && (userMove.moveNum = move.moveNum);
    for (var v = null, m = 0; m < this.registeredUpdateListeners.length; m++) {
        if (g = this.registeredUpdateListeners[m].updatePieceCallback(h, e, t, o, i, s, r, a, n, l, userMove, userMove), !g)
            return !1;
        g.ignoreRetVal || (v = g)
    }
    if (!v) return clog && console.log("Got no update piece callbak"), !1;
    if (v.allowMove) {
        this.oldSelectedSquare && YAHOO.util.Dom.removeClass(this.oldSelectedSquare, "ct-source-square");
        for (var u = v.move, m = 0; m < this.registeredUpdateAllowMoveListeners.length; m++) {
            this.registeredUpdateAllowMoveListeners[m].updateAllowMoveCallback(h, e, t, o, i, s, r, a, n, u)
        }
        this.makeMove(userMove, e, s, this.moveAnimationLength, !0, !0, null, null, !0);
        this.toggleToMove();
        this.setCurrentMove(userMove);
    } else {
        {
            var u = v.move;
            e.column, e.row
        }
        this.board_xy = null, e.setPosition(e.column, e.row, !1, null, this.moveAnimationLength);
        for (var m = 0; m < this.registeredUpdateWrongMoveListeners.length; m++) var v = this.registeredUpdateWrongMoveListeners[m].updateWrongMoveCallback(h, e, t, o, i, s, r, a, n, move)
    }
};

Board.prototype.promptPromotion = function (e, t, o, i, s) {
    e.prePromotionColumn = e.column, e.prePromotionRow = e.row, e.setPosition(t, o, !1, null, this.moveAnimationLength);
    var r = this;
        r.updatePiece(e, t, o, i, s, !1, "q");
        return;

    // TODO: implement little promotions
        a = YAHOO.widget.Dialog("promotionDialogId", {
            width: "300px",
            fixedcenter: !0,
            visible: !0,
            modal: !0,
            close: !1,
            constraintoviewport: !0,
            buttons: [{
                text: _js("Queen"),
                handler: function () {
                    a.hide(), r.updatePiece(e, t, o, i, s, !1, "q")
                },
                isDefault: !0
            }, {
                text: _js("Rook"),
                handler: function () {
                    a.hide(), r.updatePiece(e, t, o, i, s, !1, "r")
                },
                isDefault: !1
            }, {
                text: _js("Bishop"),
                handler: function () {
                    a.hide(), r.updatePiece(e, t, o, i, s, !1, "b")
                },
                isDefault: !1
            }, {
                text: _js("Knight"),
                handler: function () {
                    a.hide(), r.updatePiece(e, t, o, i, s, !1, "n")
                },
                isDefault: !1
            }]
        });
    a.setHeader(_js("Select Promotion Piece")), a.setBody("<div></div>"), a.render(document.body)
}