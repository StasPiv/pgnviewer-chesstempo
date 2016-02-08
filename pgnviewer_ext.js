/**
 * Created by stas on 05.02.16.
 */
clog = true;

PgnViewer.prototype.updatePieceCallback = function (e, r, t, s, a, i, o, n, h, l, d, c) {
    this.board.makeMove(c, r, s, this.moveAnimationLength, !0, !0, null, null, !0);
    return;
    var b = new Object,
        u = d,
        g = !1,
        p = Board.getVarMove(u, s, t, r, e);
    return u.fromColumn !== r.column || u.fromRow != r.row || u.toRow != s || u.toColumn != t || "" != e && e != u.promotion ? p && (u = p, g = !0) : g = !0, b.move = u, b.allowMove = g, b.dontMakeOpponentMove = !1, b
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