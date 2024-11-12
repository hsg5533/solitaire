!(function () {
  var e = [],
    t = ["h", "s", "c", "d"],
    a = { n1: "A", n11: "J", n12: "Q", n13: "K" },
    s = {
      h: '<div class="icon heart"><span class="a"></span><span class="b"></span><span class="c"></span></div>',
      s: '<div class="icon spade"><span class="c"></span><span class="a"></span><span class="b"></span><span class="d"></span></div>',
      c: '<div class="icon club"><span class="a"></span><span class="b"></span><span class="c"></span><span class="d"></span></div>',
      d: '<div class="icon diamond"><span></span></div>',
    },
    n = {},
    r = [],
    l = {},
    i = {},
    c = !1;
  function o() {
    null !== f("currentGame") && (l = JSON.parse(f("currentGame"))),
      (document.body.innerHTML =
        '<div id="start-container" class="start-container"><h1>Solitaire</h1><button id="startnew">New game</button><br>' +
        (null !== f("currentGame")
          ? '<button id="resume-game" class="resumer">Resume previous</button>'
          : "") +
        "</div>");
  }
  function d() {
    (l.steps = l.steps + 1),
      (i = window.history.state),
      window.history.pushState(l, null, l.steps > 0 ? "#step" + l.steps : null),
      (document.cookie = "color=" + (f("color") ? f("color") : "dark")),
      (document.cookie = "currentGame=" + JSON.stringify(l)),
      m(),
      (i = l);
  }
  function f(e) {
    for (var t = document.cookie.split("; "), a = 0; a < t.length; a++) {
      var s = e + "=";
      if (0 === t[a].indexOf(s)) return t[a].replace(s, "");
    }
    return null;
  }
  function u(e, t) {
    var a = e.length;
    return !!(a < t.length) && e === t.slice(-a);
  }
  function h(e, t) {
    var n,
      r,
      l = document.createElement("div");
    return (
      ((l.data = e),
      (l.className = "cd "),
      (l.ontouchstart = function (e) {
        return e.preventDefault(), p(e), !1;
      }),
      (l.ontouchmove = function (e) {
        var t = e.changedTouches[0].clientX,
          a = e.changedTouches[0].clientY;
        g(e, t, a);
      }),
      (l.ontouchend = function (e) {
        e.preventDefault();
        var t = e.changedTouches[0].pageX,
          a = e.changedTouches[0].pageY;
        return v(e, t, a), !1;
      }),
      (l.onmousedown = function (e) {
        p(e);
      }),
      (l.onmousemove = function (e) {
        var t = e.clientX,
          a = e.clientY;
        g(e, t, a);
      }),
      (l.onmouseup = function (e) {
        var t = e.pageX,
          a = e.pageY;
        v(e, t, a);
      }),
      e.folded)
        ? (l.className = l.className + "f")
        : ((l.className +=
            e.s + " n" + e.n + (e.accepting ? " a" : "") + (t || "")),
          (l.innerHTML =
            ((n = e.n),
            (r = e.s),
            "<p>" +
              (a["n" + n] ? a["n" + n] : n) +
              "</p>" +
              s[r] +
              "<hr/>" +
              (function e(t, n) {
                if (t < 11) {
                  for (
                    var r = '<div class="numd len' + t + '">', l = 0;
                    l < t;
                    l++
                  )
                    r += s[n];
                  return r + "</div>";
                }
                return '<h2 class="numd">' + a["n" + t] + "</h2>";
              })(n, r)))),
      l
    );
  }
  function p(e) {
    if (
      ((r = []), e.target.className.indexOf("cd") > -1 && !e.target.data.folded)
    ) {
      (n = e.target.parentNode), r.push(e.target);
      for (
        var t = r[0].nextElementSibling;
        n.id.indexOf("stack") > -1 && null !== t;

      )
        r.push(t), (t = t.nextElementSibling);
    } else if (
      e.target.className.indexOf("cd f") > -1 &&
      e.target.parentNode.className.indexOf("refuse") > -1
    ) {
      if (e.target.nextElementSibling) {
        var a = l.refuse[l.refuse.length - 1];
        (a.folded = !0), l.refuse.pop(), l.refuse.unshift(a);
      }
      (l.refuse[l.refuse.length - 1].folded = !1), (r = []), d();
    }
  }
  function g(e, t, a) {
    if (r.length > 0)
      for (var s = t - 30, n = a + 15, l = 999999, i = 0; i < r.length; i++)
        (r[i].style =
          "position: fixed; z-index: " +
          l +
          "; left: " +
          s +
          "px; top: " +
          n +
          "px"),
          (n += 20),
          (l += 100);
  }
  function v(e, t, a) {
    var s = null,
      i = n.id,
      o = !1;
    if (r.length > 0) {
      for (
        var f = r[0].data.s,
          u = r[0].data.n,
          h = r[0].data.colr,
          p = document.getElementsByClassName("a"),
          g = 0;
        g < p.length;
        g++
      ) {
        var v = p[g];
        if (!v.data || v.data.id != r[0].data.id) {
          var _ = v.offsetLeft,
            k = _ + v.offsetWidth,
            $ = v.offsetTop,
            b = $ + v.offsetHeight,
            N = v.className.indexOf("stack") > -1 && 0 === v.children.length,
            x = v.className.indexOf("closet") > -1 && 1 === v.children.length,
            E = v.parentNode.className.indexOf("stack") > -1,
            w = v.parentNode.className.indexOf("closet") > -1;
          if (t >= _ && t <= k && a >= $ && a <= b) {
            if (N) {
              if (13 === u) {
                (s = l.stacks[v.id]), (o = !0);
                break;
              }
            } else if (x) {
              var y = v.getAttribute("data-suit");
              if (y === f && 1 === u && 1 === r.length) {
                (s = l.closets[v.id]), (o = !0);
                break;
              }
            } else if (w) {
              var y = v.data.s,
                C = v.data.n;
              if (y === f && C + 1 === u && 1 === r.length) {
                (s = l.closets[v.parentNode.id]), (o = !0);
                break;
              }
            } else if (E) {
              var C = v.data.n;
              if (v.data.colr !== h && C - 1 === u) {
                var s = l.stacks[v.parentNode.id],
                  i = n.id;
                o = !0;
                break;
              }
            }
          }
        }
      }
      if (o) {
        var O = l.stacks[i];
        for (
          "refuse" === i
            ? (O = l.refuse)
            : -1 === i.indexOf("stack") && (O = l.closets[i]);
          r.length > 0;

        )
          1 === r.length && (r[0].data.accepting = !0),
            s.push(r[0].data),
            O.pop(),
            r.shift();
        O.length &&
          ("refuse" !== i && (O[O.length - 1].accepting = !0),
          (O[O.length - 1].folded = !1)),
          d(),
          (function e() {
            for (var t = !0, a = 0; a < l.refuse.length; a++)
              l.refuse[a].folded && (t = !1);
            for (var s in l.stacks)
              for (var n = 0; n < l.stacks[s].length; n++)
                l.stacks[s][n].folded && (t = !1);
            if (t) {
              var r,
                i,
                o,
                f,
                u = l.closets;
              (c = !1),
                (i = 52 - (u.c.length + u.d.length + u.h.length + u.s.length)),
                (o = 0),
                (f = setInterval(function e() {
                  if (o >= i - 1)
                    clearInterval(f),
                      (document.getElementById("gameboard").innerHTML =
                        '<div class="won"><h1>You won!</h1><button id="startnew">Start new game</button></div>');
                  else {
                    for (var t in l.closets) {
                      var a = l.closets[t].length
                        ? l.closets[t][l.closets[t].length - 1]
                        : { s: t, n: 0 };
                      for (var s in l.stacks) {
                        var n = l.stacks[s][l.stacks[s].length - 1],
                          r = l.refuse[l.refuse.length - 1];
                        if (n && n.s == a.s && n.n === a.n + 1) {
                          l.stacks[s].pop(), l.closets[t].push(n), o++;
                          break;
                        }
                        if (r && r.s == a.s && r.n === a.n + 1) {
                          l.refuse.pop(), l.closets[t].push(r), o++;
                          break;
                        }
                      }
                    }
                    d();
                  }
                }, 200));
            }
          })();
      } else (r = []), m();
    }
  }
  function _() {
    e = [];
    for (
      var a = {
          steps: -28,
          stacks: {
            stack1: [],
            stack2: [],
            stack3: [],
            stack4: [],
            stack5: [],
            stack6: [],
            stack7: [],
          },
          refuse: [],
          closets: { c: [], d: [], h: [], s: [] },
        },
        s = 0;
      s < t.length;
      s++
    )
      for (var n = 1; n < 14; n++) e.push({ suit: t[s], num: n });
    e = (function e(t) {
      for (let a = t.length - 1; a > 0; a--) {
        let s = Math.floor(Math.random() * (a + 1));
        [t[a], t[s]] = [t[s], t[a]];
      }
      return t;
    })(e);
    for (var r = 0; r < e.length; r++) {
      var i = document.createElement("div");
      i.className = "cd f";
      var o = {
        s: e[r].suit,
        n: e[r].num,
        id: e[r].suit + e[r].num,
        colr: "d" === e[r].suit || "h" === e[r].suit ? "r" : "b",
        folded: !0,
        accepting: !1,
      };
      (i.data = o), a.refuse.push(o);
    }
    var f = 0,
      u = 2,
      h = 1;
    (l = a), d();
    var p = setInterval(function e() {
      if (29 === h) clearInterval(p);
      else {
        h++;
        var t = a.refuse[a.refuse.length - 1];
        a.refuse.pop(),
          (8 == ++f || 1 === f) && ((t.folded = !1), (t.accepting = !0)),
          8 === f && ((f = u), u++),
          u < 9 && a.stacks["stack" + f].push(t),
          (l = a),
          d();
      }
    }, 100);
    c = !0;
  }
  function m() {
    document.body.innerHTML = "";
    var e = document.createElement("div");
    (e.className = "board clear " + (f("color") ? f("color") : "dark")),
      (e.id = "gameboard");
    var t = document.createElement("div");
    t.className = "inner clear";
    var a = document.createElement("div");
    (a.className = "nav-buttons"),
      (a.innerHTML =
        '<div class="in"><button id="new-game" class="new">&#xff0b;</button><div class="toggle"><input type="checkbox" id="color" ' +
        ("dark" === f("color") ? "checked" : "") +
        '><label for="color"></label></div><button id="back-button" class="back">&larr;</button></div>'),
      t.appendChild(a);
    var n = document.createElement("div");
    for (var r in ((n.className = "closets-area"), l.closets)) {
      var o = document.createElement("div"),
        d = l.closets[r],
        u = i && i.closets ? i.closets[r] : [],
        p = d.length > u.length ? " glow" : "";
      (o.id = r),
        (o.className = "closet closet" + r + (d.length ? "" : " a")),
        (o.innerHTML = s[r]),
        o.setAttribute("data-suit", r);
      for (var g = 0; g < d.length; g++) o.appendChild(h(d[g], p));
      n.appendChild(o);
    }
    var v = document.createElement("div"),
      _ = i && i.refuse ? i.refuse[i.refuse.length - 1] : null,
      m = l.refuse[l.refuse.length - 1],
      p =
        m &&
        _ &&
        (m.id !== _.id ||
          m.folded !== _.folded ||
          l.refuse.length !== i.refuse.length);
    (v.className =
      "refuse-pile len" +
      (l.refuse.length < 25 ? l.refuse.length : " all") +
      (p ? " accordion" : "")),
      (v.id = "refuse");
    for (var k = 0; k < l.refuse.length; k++)
      v.appendChild(
        h(l.refuse[k], p && k === l.refuse.length - 1 ? " slide" : null)
      );
    t.appendChild(v), t.appendChild(n);
    var $ = document.createElement("div");
    ($.className = "stacks"), t.appendChild($);
    var b = 0;
    for (var N in l.stacks) {
      b++;
      var x = document.createElement("div"),
        E = l.stacks[N],
        w = i && i.stacks ? i.stacks[N] : null,
        y = "";
      w && w.length > E.length
        ? (y = " contract")
        : w && w.length < E.length && (y = " expand"),
        (x.id = "stack" + b),
        (x.className = "stack len" + E.length + (E.length ? "" : " a") + y);
      for (var C = 0; C < E.length; C++) {
        var O = null;
        w &&
          C == E.length - 1 &&
          !E[C].folded &&
          w[C] &&
          w[C].folded &&
          (O = " flipover"),
          x.appendChild(h(E[C], O));
      }
      t.appendChild(x);
    }
    e.appendChild(t);
    var L =
      -1 === window.navigator.appVersion.indexOf("Phone") &&
      -1 === window.navigator.appVersion.indexOf("Mobile");
    f("color"),
      (e.className = e.className + (L ? " desktop" : " mobile")),
      document.body.appendChild(e),
      (document.title =
        c && l.steps > 0 ? l.steps + " - Solitaire" : "Solitaire");
  }
  (window.onhashchange = function (e) {
    window.history.state &&
      ((l = window.history.state),
      m(),
      u("step1", e.newURL) && u("step2", e.oldURL)
        ? alert("You have reached the beginning of this game!")
        : u("step1", e.oldURL) && (window.history.go(-28), o()));
  }),
    (window.onresize = function () {
      c && m();
    }),
    document.addEventListener("click", function (e) {
      if ("startnew" === e.target.id) return _(), !1;
      if ("new-game" === e.target.id)
        return (
          window.confirm("Close this game and start a new one?") && _(), !1
        );
      if ("resume-game" === e.target.id) return d(), !1;
      if ("back-button" === e.target.id) return window.history.back(), !1;
      if ("color" === e.target.id) {
        e.preventDefault();
        var t = e.target.checked ? "dark" : "light";
        return (document.cookie = "color=" + t), m(), !1;
      }
    }),
    o();
})();
