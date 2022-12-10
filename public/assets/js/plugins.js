/*-------------------------------------------------------------------------------------
[TABLE OF CONTENTS]

01. SMARTMENUS
02. STICKY HEADER
03. PICTUREFILL RETINA IMAGE
04. SLICK
05. AOS
06. PLYR
07. WAYPOINTS
08. COUNTER UP
09. PROGRESSBAR
10. COUNTDOWN
11. PRETTIFY
12. IMAGE PARALLAX
13. VIDEO PARALLAX
14. CIRCLE INFO BOX
15. TYPER
17. LIGHTGALLERY
18. MOUSEWHEEL
19. GOODSHARE
20. ISOTOPE
21. IMAGESLOADED
22. FOTORAMA
23. COCOEN
24. VANILLA
25. GO TO TOP
26. LAZY LOAD GOOGLE MAPS
27. FLICKR
28. JRIBBBLE
29. EASING
30. BACKSTRETCH
31. COLLAGEPLUS
-------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
/*	01. SMARTMENUS
/*-----------------------------------------------------------------------------------*/
/*! SmartMenus jQuery Plugin - v1.0.1 - November 1, 2016
 * http://www.smartmenus.org/
 * Copyright Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com; Licensed MIT */ (function (
  t
) {
  "function" == typeof define && define.amd
    ? define(["jquery"], t)
    : "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = t(require("jquery")))
    : t(jQuery);
})(function ($) {
  function initMouseDetection(t) {
    var e = ".smartmenus_mouse";
    if (mouseDetectionEnabled || t)
      mouseDetectionEnabled &&
        t &&
        ($(document).unbind(e), (mouseDetectionEnabled = !1));
    else {
      var i = !0,
        s = null;
      $(document).bind(
        getEventsNS(
          [
            [
              "mousemove",
              function (t) {
                var e = {
                  x: t.pageX,
                  y: t.pageY,
                  timeStamp: new Date().getTime(),
                };
                if (s) {
                  var o = Math.abs(s.x - e.x),
                    a = Math.abs(s.y - e.y);
                  if (
                    (o > 0 || a > 0) &&
                    2 >= o &&
                    2 >= a &&
                    300 >= e.timeStamp - s.timeStamp &&
                    ((mouse = !0), i)
                  ) {
                    var n = $(t.target).closest("a");
                    n.is("a") &&
                      $.each(menuTrees, function () {
                        return $.contains(this.$root[0], n[0])
                          ? (this.itemEnter({ currentTarget: n[0] }), !1)
                          : void 0;
                      }),
                      (i = !1);
                  }
                }
                s = e;
              },
            ],
            [
              touchEvents
                ? "touchstart"
                : "pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut",
              function (t) {
                isTouchEvent(t.originalEvent) && (mouse = !1);
              },
            ],
          ],
          e
        )
      ),
        (mouseDetectionEnabled = !0);
    }
  }
  function isTouchEvent(t) {
    return !/^(4|mouse)$/.test(t.pointerType);
  }
  function getEventsNS(t, e) {
    e || (e = "");
    var i = {};
    return (
      $.each(t, function (t, s) {
        i[s[0].split(" ").join(e + " ") + e] = s[1];
      }),
      i
    );
  }
  var menuTrees = [],
    IE = !!window.createPopup,
    mouse = !1,
    touchEvents = "ontouchstart" in window,
    mouseDetectionEnabled = !1,
    requestAnimationFrame =
      window.requestAnimationFrame ||
      function (t) {
        return setTimeout(t, 1e3 / 60);
      },
    cancelAnimationFrame =
      window.cancelAnimationFrame ||
      function (t) {
        clearTimeout(t);
      };
  return (
    ($.SmartMenus = function (t, e) {
      (this.$root = $(t)),
        (this.opts = e),
        (this.rootId = ""),
        (this.accessIdPrefix = ""),
        (this.$subArrow = null),
        (this.activatedItems = []),
        (this.visibleSubMenus = []),
        (this.showTimeout = 0),
        (this.hideTimeout = 0),
        (this.scrollTimeout = 0),
        (this.clickActivated = !1),
        (this.focusActivated = !1),
        (this.zIndexInc = 0),
        (this.idInc = 0),
        (this.$firstLink = null),
        (this.$firstSub = null),
        (this.disabled = !1),
        (this.$disableOverlay = null),
        (this.$touchScrollingSub = null),
        (this.cssTransforms3d =
          "perspective" in t.style || "webkitPerspective" in t.style),
        (this.wasCollapsible = !1),
        this.init();
    }),
    $.extend($.SmartMenus, {
      hideAll: function () {
        $.each(menuTrees, function () {
          this.menuHideAll();
        });
      },
      destroy: function () {
        for (; menuTrees.length; ) menuTrees[0].destroy();
        initMouseDetection(!0);
      },
      prototype: {
        init: function (t) {
          var e = this;
          if (!t) {
            menuTrees.push(this),
              (this.rootId = (
                new Date().getTime() +
                Math.random() +
                ""
              ).replace(/\D/g, "")),
              (this.accessIdPrefix = "sm-" + this.rootId + "-"),
              this.$root.hasClass("sm-rtl") &&
                (this.opts.rightToLeftSubMenus = !0);
            var i = ".smartmenus";
            this.$root
              .data("smartmenus", this)
              .attr("data-smartmenus-id", this.rootId)
              .dataSM("level", 1)
              .bind(
                getEventsNS(
                  [
                    ["mouseover focusin", $.proxy(this.rootOver, this)],
                    ["mouseout focusout", $.proxy(this.rootOut, this)],
                    ["keydown", $.proxy(this.rootKeyDown, this)],
                  ],
                  i
                )
              )
              .delegate(
                "a",
                getEventsNS(
                  [
                    ["mouseenter", $.proxy(this.itemEnter, this)],
                    ["mouseleave", $.proxy(this.itemLeave, this)],
                    ["mousedown", $.proxy(this.itemDown, this)],
                    ["focus", $.proxy(this.itemFocus, this)],
                    ["blur", $.proxy(this.itemBlur, this)],
                    ["click", $.proxy(this.itemClick, this)],
                  ],
                  i
                )
              ),
              (i += this.rootId),
              this.opts.hideOnClick &&
                $(document).bind(
                  getEventsNS(
                    [
                      ["touchstart", $.proxy(this.docTouchStart, this)],
                      ["touchmove", $.proxy(this.docTouchMove, this)],
                      ["touchend", $.proxy(this.docTouchEnd, this)],
                      ["click", $.proxy(this.docClick, this)],
                    ],
                    i
                  )
                ),
              $(window).bind(
                getEventsNS(
                  [["resize orientationchange", $.proxy(this.winResize, this)]],
                  i
                )
              ),
              this.opts.subIndicators &&
                ((this.$subArrow = $("<span/>").addClass("sub-arrow")),
                this.opts.subIndicatorsText &&
                  this.$subArrow.html(this.opts.subIndicatorsText)),
              initMouseDetection();
          }
          if (
            ((this.$firstSub = this.$root
              .find("ul")
              .each(function () {
                e.menuInit($(this));
              })
              .eq(0)),
            (this.$firstLink = this.$root.find("a").eq(0)),
            this.opts.markCurrentItem)
          ) {
            var s = /(index|default)\.[^#\?\/]*/i,
              o = /#.*/,
              a = window.location.href.replace(s, ""),
              n = a.replace(o, "");
            this.$root.find("a").each(function () {
              var t = this.href.replace(s, ""),
                i = $(this);
              (t == a || t == n) &&
                (i.addClass("current"),
                e.opts.markCurrentTree &&
                  i
                    .parentsUntil("[data-smartmenus-id]", "ul")
                    .each(function () {
                      $(this).dataSM("parent-a").addClass("current");
                    }));
            });
          }
          this.wasCollapsible = this.isCollapsible();
        },
        destroy: function (t) {
          if (!t) {
            var e = ".smartmenus";
            this.$root
              .removeData("smartmenus")
              .removeAttr("data-smartmenus-id")
              .removeDataSM("level")
              .unbind(e)
              .undelegate(e),
              (e += this.rootId),
              $(document).unbind(e),
              $(window).unbind(e),
              this.opts.subIndicators && (this.$subArrow = null);
          }
          this.menuHideAll();
          var i = this;
          this.$root
            .find("ul")
            .each(function () {
              var t = $(this);
              t.dataSM("scroll-arrows") && t.dataSM("scroll-arrows").remove(),
                t.dataSM("shown-before") &&
                  ((i.opts.subMenusMinWidth || i.opts.subMenusMaxWidth) &&
                    t
                      .css({ width: "", minWidth: "", maxWidth: "" })
                      .removeClass("sm-nowrap"),
                  t.dataSM("scroll-arrows") &&
                    t.dataSM("scroll-arrows").remove(),
                  t.css({
                    zIndex: "",
                    top: "",
                    left: "",
                    marginLeft: "",
                    marginTop: "",
                    display: "",
                  })),
                0 == (t.attr("id") || "").indexOf(i.accessIdPrefix) &&
                  t.removeAttr("id");
            })
            .removeDataSM("in-mega")
            .removeDataSM("shown-before")
            .removeDataSM("ie-shim")
            .removeDataSM("scroll-arrows")
            .removeDataSM("parent-a")
            .removeDataSM("level")
            .removeDataSM("beforefirstshowfired")
            .removeAttr("role")
            .removeAttr("aria-hidden")
            .removeAttr("aria-labelledby")
            .removeAttr("aria-expanded"),
            this.$root
              .find("a.has-submenu")
              .each(function () {
                var t = $(this);
                0 == t.attr("id").indexOf(i.accessIdPrefix) &&
                  t.removeAttr("id");
              })
              .removeClass("has-submenu")
              .removeDataSM("sub")
              .removeAttr("aria-haspopup")
              .removeAttr("aria-controls")
              .removeAttr("aria-expanded")
              .closest("li")
              .removeDataSM("sub"),
            this.opts.subIndicators &&
              this.$root.find("span.sub-arrow").remove(),
            this.opts.markCurrentItem &&
              this.$root.find("a.current").removeClass("current"),
            t ||
              ((this.$root = null),
              (this.$firstLink = null),
              (this.$firstSub = null),
              this.$disableOverlay &&
                (this.$disableOverlay.remove(), (this.$disableOverlay = null)),
              menuTrees.splice($.inArray(this, menuTrees), 1));
        },
        disable: function (t) {
          if (!this.disabled) {
            if (
              (this.menuHideAll(),
              !t && !this.opts.isPopup && this.$root.is(":visible"))
            ) {
              var e = this.$root.offset();
              this.$disableOverlay = $(
                '<div class="sm-jquery-disable-overlay"/>'
              )
                .css({
                  position: "absolute",
                  top: e.top,
                  left: e.left,
                  width: this.$root.outerWidth(),
                  height: this.$root.outerHeight(),
                  zIndex: this.getStartZIndex(!0),
                  opacity: 0,
                })
                .appendTo(document.body);
            }
            this.disabled = !0;
          }
        },
        docClick: function (t) {
          return this.$touchScrollingSub
            ? ((this.$touchScrollingSub = null), void 0)
            : (((this.visibleSubMenus.length &&
                !$.contains(this.$root[0], t.target)) ||
                $(t.target).is("a")) &&
                this.menuHideAll(),
              void 0);
        },
        docTouchEnd: function () {
          if (this.lastTouch) {
            if (
              !(
                !this.visibleSubMenus.length ||
                (void 0 !== this.lastTouch.x2 &&
                  this.lastTouch.x1 != this.lastTouch.x2) ||
                (void 0 !== this.lastTouch.y2 &&
                  this.lastTouch.y1 != this.lastTouch.y2) ||
                (this.lastTouch.target &&
                  $.contains(this.$root[0], this.lastTouch.target))
              )
            ) {
              this.hideTimeout &&
                (clearTimeout(this.hideTimeout), (this.hideTimeout = 0));
              var t = this;
              this.hideTimeout = setTimeout(function () {
                t.menuHideAll();
              }, 350);
            }
            this.lastTouch = null;
          }
        },
        docTouchMove: function (t) {
          if (this.lastTouch) {
            var e = t.originalEvent.touches[0];
            (this.lastTouch.x2 = e.pageX), (this.lastTouch.y2 = e.pageY);
          }
        },
        docTouchStart: function (t) {
          var e = t.originalEvent.touches[0];
          this.lastTouch = { x1: e.pageX, y1: e.pageY, target: e.target };
        },
        enable: function () {
          this.disabled &&
            (this.$disableOverlay &&
              (this.$disableOverlay.remove(), (this.$disableOverlay = null)),
            (this.disabled = !1));
        },
        getClosestMenu: function (t) {
          for (var e = $(t).closest("ul"); e.dataSM("in-mega"); )
            e = e.parent().closest("ul");
          return e[0] || null;
        },
        getHeight: function (t) {
          return this.getOffset(t, !0);
        },
        getOffset: function (t, e) {
          var i;
          "none" == t.css("display") &&
            ((i = {
              position: t[0].style.position,
              visibility: t[0].style.visibility,
            }),
            t.css({ position: "absolute", visibility: "hidden" }).show());
          var s = t[0].getBoundingClientRect && t[0].getBoundingClientRect(),
            o =
              s &&
              (e ? s.height || s.bottom - s.top : s.width || s.right - s.left);
          return (
            o || 0 === o || (o = e ? t[0].offsetHeight : t[0].offsetWidth),
            i && t.hide().css(i),
            o
          );
        },
        getStartZIndex: function (t) {
          var e = parseInt(this[t ? "$root" : "$firstSub"].css("z-index"));
          return (
            !t && isNaN(e) && (e = parseInt(this.$root.css("z-index"))),
            isNaN(e) ? 1 : e
          );
        },
        getTouchPoint: function (t) {
          return (
            (t.touches && t.touches[0]) ||
            (t.changedTouches && t.changedTouches[0]) ||
            t
          );
        },
        getViewport: function (t) {
          var e = t ? "Height" : "Width",
            i = document.documentElement["client" + e],
            s = window["inner" + e];
          return s && (i = Math.min(i, s)), i;
        },
        getViewportHeight: function () {
          return this.getViewport(!0);
        },
        getViewportWidth: function () {
          return this.getViewport();
        },
        getWidth: function (t) {
          return this.getOffset(t);
        },
        handleEvents: function () {
          return !this.disabled && this.isCSSOn();
        },
        handleItemEvents: function (t) {
          return this.handleEvents() && !this.isLinkInMegaMenu(t);
        },
        isCollapsible: function () {
          return "static" == this.$firstSub.css("position");
        },
        isCSSOn: function () {
          return "block" == this.$firstLink.css("display");
        },
        isFixed: function () {
          var t = "fixed" == this.$root.css("position");
          return (
            t ||
              this.$root.parentsUntil("body").each(function () {
                return "fixed" == $(this).css("position")
                  ? ((t = !0), !1)
                  : void 0;
              }),
            t
          );
        },
        isLinkInMegaMenu: function (t) {
          return $(this.getClosestMenu(t[0])).hasClass("mega-menu");
        },
        isTouchMode: function () {
          return !mouse || this.opts.noMouseOver || this.isCollapsible();
        },
        itemActivate: function (t, e) {
          var i = t.closest("ul"),
            s = i.dataSM("level");
          if (
            s > 1 &&
            (!this.activatedItems[s - 2] ||
              this.activatedItems[s - 2][0] != i.dataSM("parent-a")[0])
          ) {
            var o = this;
            $(i.parentsUntil("[data-smartmenus-id]", "ul").get().reverse())
              .add(i)
              .each(function () {
                o.itemActivate($(this).dataSM("parent-a"));
              });
          }
          if (
            ((!this.isCollapsible() || e) &&
              this.menuHideSubMenus(
                this.activatedItems[s - 1] &&
                  this.activatedItems[s - 1][0] == t[0]
                  ? s
                  : s - 1
              ),
            (this.activatedItems[s - 1] = t),
            this.$root.triggerHandler("activate.smapi", t[0]) !== !1)
          ) {
            var a = t.dataSM("sub");
            a &&
              (this.isTouchMode() ||
                !this.opts.showOnClick ||
                this.clickActivated) &&
              this.menuShow(a);
          }
        },
        itemBlur: function (t) {
          var e = $(t.currentTarget);
          this.handleItemEvents(e) &&
            this.$root.triggerHandler("blur.smapi", e[0]);
        },
        itemClick: function (t) {
          var e = $(t.currentTarget);
          if (this.handleItemEvents(e)) {
            if (
              this.$touchScrollingSub &&
              this.$touchScrollingSub[0] == e.closest("ul")[0]
            )
              return (this.$touchScrollingSub = null), t.stopPropagation(), !1;
            if (this.$root.triggerHandler("click.smapi", e[0]) === !1)
              return !1;
            var i = $(t.target).is("span.sub-arrow"),
              s = e.dataSM("sub"),
              o = s ? 2 == s.dataSM("level") : !1;
            if (s && !s.is(":visible")) {
              if (
                (this.opts.showOnClick && o && (this.clickActivated = !0),
                this.itemActivate(e),
                s.is(":visible"))
              )
                return (this.focusActivated = !0), !1;
            } else if (this.isCollapsible() && i)
              return this.itemActivate(e), this.menuHide(s), !1;
            return (this.opts.showOnClick && o) ||
              e.hasClass("disabled") ||
              this.$root.triggerHandler("select.smapi", e[0]) === !1
              ? !1
              : void 0;
          }
        },
        itemDown: function (t) {
          var e = $(t.currentTarget);
          this.handleItemEvents(e) && e.dataSM("mousedown", !0);
        },
        itemEnter: function (t) {
          var e = $(t.currentTarget);
          if (this.handleItemEvents(e)) {
            if (!this.isTouchMode()) {
              this.showTimeout &&
                (clearTimeout(this.showTimeout), (this.showTimeout = 0));
              var i = this;
              this.showTimeout = setTimeout(
                function () {
                  i.itemActivate(e);
                },
                this.opts.showOnClick && 1 == e.closest("ul").dataSM("level")
                  ? 1
                  : this.opts.showTimeout
              );
            }
            this.$root.triggerHandler("mouseenter.smapi", e[0]);
          }
        },
        itemFocus: function (t) {
          var e = $(t.currentTarget);
          this.handleItemEvents(e) &&
            (!this.focusActivated ||
              (this.isTouchMode() && e.dataSM("mousedown")) ||
              (this.activatedItems.length &&
                this.activatedItems[this.activatedItems.length - 1][0] ==
                  e[0]) ||
              this.itemActivate(e, !0),
            this.$root.triggerHandler("focus.smapi", e[0]));
        },
        itemLeave: function (t) {
          var e = $(t.currentTarget);
          this.handleItemEvents(e) &&
            (this.isTouchMode() ||
              (e[0].blur(),
              this.showTimeout &&
                (clearTimeout(this.showTimeout), (this.showTimeout = 0))),
            e.removeDataSM("mousedown"),
            this.$root.triggerHandler("mouseleave.smapi", e[0]));
        },
        menuHide: function (t) {
          if (
            this.$root.triggerHandler("beforehide.smapi", t[0]) !== !1 &&
            (t.stop(!0, !0), "none" != t.css("display"))
          ) {
            var e = function () {
              t.css("z-index", "");
            };
            this.isCollapsible()
              ? this.opts.collapsibleHideFunction
                ? this.opts.collapsibleHideFunction.call(this, t, e)
                : t.hide(this.opts.collapsibleHideDuration, e)
              : this.opts.hideFunction
              ? this.opts.hideFunction.call(this, t, e)
              : t.hide(this.opts.hideDuration, e),
              t.dataSM("ie-shim") &&
                t
                  .dataSM("ie-shim")
                  .remove()
                  .css({ "-webkit-transform": "", transform: "" }),
              t.dataSM("scroll") &&
                (this.menuScrollStop(t),
                t
                  .css({
                    "touch-action": "",
                    "-ms-touch-action": "",
                    "-webkit-transform": "",
                    transform: "",
                  })
                  .unbind(".smartmenus_scroll")
                  .removeDataSM("scroll")
                  .dataSM("scroll-arrows")
                  .hide()),
              t
                .dataSM("parent-a")
                .removeClass("highlighted")
                .attr("aria-expanded", "false"),
              t.attr({ "aria-expanded": "false", "aria-hidden": "true" });
            var i = t.dataSM("level");
            this.activatedItems.splice(i - 1, 1),
              this.visibleSubMenus.splice(
                $.inArray(t, this.visibleSubMenus),
                1
              ),
              this.$root.triggerHandler("hide.smapi", t[0]);
          }
        },
        menuHideAll: function () {
          this.showTimeout &&
            (clearTimeout(this.showTimeout), (this.showTimeout = 0));
          for (
            var t = this.opts.isPopup ? 1 : 0,
              e = this.visibleSubMenus.length - 1;
            e >= t;
            e--
          )
            this.menuHide(this.visibleSubMenus[e]);
          this.opts.isPopup &&
            (this.$root.stop(!0, !0),
            this.$root.is(":visible") &&
              (this.opts.hideFunction
                ? this.opts.hideFunction.call(this, this.$root)
                : this.$root.hide(this.opts.hideDuration),
              this.$root.dataSM("ie-shim") &&
                this.$root.dataSM("ie-shim").remove())),
            (this.activatedItems = []),
            (this.visibleSubMenus = []),
            (this.clickActivated = !1),
            (this.focusActivated = !1),
            (this.zIndexInc = 0),
            this.$root.triggerHandler("hideAll.smapi");
        },
        menuHideSubMenus: function (t) {
          for (var e = this.activatedItems.length - 1; e >= t; e--) {
            var i = this.activatedItems[e].dataSM("sub");
            i && this.menuHide(i);
          }
        },
        menuIframeShim: function (t) {
          IE &&
            this.opts.overlapControlsInIE &&
            !t.dataSM("ie-shim") &&
            t.dataSM(
              "ie-shim",
              $("<iframe/>")
                .attr({ src: "javascript:0", tabindex: -9 })
                .css({
                  position: "absolute",
                  top: "auto",
                  left: "0",
                  opacity: 0,
                  border: "0",
                })
            );
        },
        menuInit: function (t) {
          if (!t.dataSM("in-mega")) {
            t.hasClass("mega-menu") && t.find("ul").dataSM("in-mega", !0);
            for (
              var e = 2, i = t[0];
              (i = i.parentNode.parentNode) != this.$root[0];

            )
              e++;
            var s = t.prevAll("a").eq(-1);
            s.length || (s = t.prevAll().find("a").eq(-1)),
              s.addClass("has-submenu").dataSM("sub", t),
              t
                .dataSM("parent-a", s)
                .dataSM("level", e)
                .parent()
                .dataSM("sub", t);
            var o = s.attr("id") || this.accessIdPrefix + ++this.idInc,
              a = t.attr("id") || this.accessIdPrefix + ++this.idInc;
            s.attr({
              id: o,
              "aria-haspopup": "true",
              "aria-controls": a,
              "aria-expanded": "false",
            }),
              t.attr({
                id: a,
                role: "group",
                "aria-hidden": "true",
                "aria-labelledby": o,
                "aria-expanded": "false",
              }),
              this.opts.subIndicators &&
                s[this.opts.subIndicatorsPos](this.$subArrow.clone());
          }
        },
        menuPosition: function (t) {
          var e,
            i,
            s = t.dataSM("parent-a"),
            o = s.closest("li"),
            a = o.parent(),
            n = t.dataSM("level"),
            r = this.getWidth(t),
            h = this.getHeight(t),
            u = s.offset(),
            l = u.left,
            c = u.top,
            d = this.getWidth(s),
            m = this.getHeight(s),
            p = $(window),
            f = p.scrollLeft(),
            v = p.scrollTop(),
            S = this.getViewportWidth(),
            b = this.getViewportHeight(),
            g =
              a.parent().is("[data-sm-horizontal-sub]") ||
              (2 == n && !a.hasClass("sm-vertical")),
            M =
              (this.opts.rightToLeftSubMenus && !o.is("[data-sm-reverse]")) ||
              (!this.opts.rightToLeftSubMenus && o.is("[data-sm-reverse]")),
            w =
              2 == n
                ? this.opts.mainMenuSubOffsetX
                : this.opts.subMenusSubOffsetX,
            T =
              2 == n
                ? this.opts.mainMenuSubOffsetY
                : this.opts.subMenusSubOffsetY;
          if (
            (g
              ? ((e = M ? d - r - w : w),
                (i = this.opts.bottomToTopSubMenus ? -h - T : m + T))
              : ((e = M ? w - r : d - w),
                (i = this.opts.bottomToTopSubMenus ? m - T - h : T)),
            this.opts.keepInViewport)
          ) {
            var y = l + e,
              I = c + i;
            if (
              (M && f > y
                ? (e = g ? f - y + e : d - w)
                : !M && y + r > f + S && (e = g ? f + S - r - y + e : w - r),
              g ||
                (b > h && I + h > v + b
                  ? (i += v + b - h - I)
                  : (h >= b || v > I) && (i += v - I)),
              (g && (I + h > v + b + 0.49 || v > I)) || (!g && h > b + 0.49))
            ) {
              var x = this;
              t.dataSM("scroll-arrows") ||
                t.dataSM(
                  "scroll-arrows",
                  $([
                    $(
                      '<span class="scroll-up"><span class="scroll-up-arrow"></span></span>'
                    )[0],
                    $(
                      '<span class="scroll-down"><span class="scroll-down-arrow"></span></span>'
                    )[0],
                  ])
                    .bind({
                      mouseenter: function () {
                        (t.dataSM("scroll").up = $(this).hasClass("scroll-up")),
                          x.menuScroll(t);
                      },
                      mouseleave: function (e) {
                        x.menuScrollStop(t), x.menuScrollOut(t, e);
                      },
                      "mousewheel DOMMouseScroll": function (t) {
                        t.preventDefault();
                      },
                    })
                    .insertAfter(t)
                );
              var C = ".smartmenus_scroll";
              t
                .dataSM("scroll", {
                  y: this.cssTransforms3d ? 0 : i - m,
                  step: 1,
                  itemH: m,
                  subH: h,
                  arrowDownH: this.getHeight(t.dataSM("scroll-arrows").eq(1)),
                })
                .bind(
                  getEventsNS(
                    [
                      [
                        "mouseover",
                        function (e) {
                          x.menuScrollOver(t, e);
                        },
                      ],
                      [
                        "mouseout",
                        function (e) {
                          x.menuScrollOut(t, e);
                        },
                      ],
                      [
                        "mousewheel DOMMouseScroll",
                        function (e) {
                          x.menuScrollMousewheel(t, e);
                        },
                      ],
                    ],
                    C
                  )
                )
                .dataSM("scroll-arrows")
                .css({
                  top: "auto",
                  left: "0",
                  marginLeft: e + (parseInt(t.css("border-left-width")) || 0),
                  width:
                    r -
                    (parseInt(t.css("border-left-width")) || 0) -
                    (parseInt(t.css("border-right-width")) || 0),
                  zIndex: t.css("z-index"),
                })
                .eq(g && this.opts.bottomToTopSubMenus ? 0 : 1)
                .show(),
                this.isFixed() &&
                  t
                    .css({ "touch-action": "none", "-ms-touch-action": "none" })
                    .bind(
                      getEventsNS(
                        [
                          [
                            touchEvents
                              ? "touchstart touchmove touchend"
                              : "pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp",
                            function (e) {
                              x.menuScrollTouch(t, e);
                            },
                          ],
                        ],
                        C
                      )
                    );
            }
          }
          t.css({ top: "auto", left: "0", marginLeft: e, marginTop: i - m }),
            this.menuIframeShim(t),
            t.dataSM("ie-shim") &&
              t
                .dataSM("ie-shim")
                .css({
                  zIndex: t.css("z-index"),
                  width: r,
                  height: h,
                  marginLeft: e,
                  marginTop: i - m,
                });
        },
        menuScroll: function (t, e, i) {
          var s,
            o = t.dataSM("scroll"),
            a = t.dataSM("scroll-arrows"),
            n = o.up ? o.upEnd : o.downEnd;
          if (!e && o.momentum) {
            if (((o.momentum *= 0.92), (s = o.momentum), 0.5 > s))
              return this.menuScrollStop(t), void 0;
          } else
            s =
              i ||
              (e || !this.opts.scrollAccelerate
                ? this.opts.scrollStep
                : Math.floor(o.step));
          var r = t.dataSM("level");
          if (
            (this.activatedItems[r - 1] &&
              this.activatedItems[r - 1].dataSM("sub") &&
              this.activatedItems[r - 1].dataSM("sub").is(":visible") &&
              this.menuHideSubMenus(r - 1),
            (o.y =
              (o.up && o.y >= n) || (!o.up && n >= o.y)
                ? o.y
                : Math.abs(n - o.y) > s
                ? o.y + (o.up ? s : -s)
                : n),
            t
              .add(t.dataSM("ie-shim"))
              .css(
                this.cssTransforms3d
                  ? {
                      "-webkit-transform": "translate3d(0, " + o.y + "px, 0)",
                      transform: "translate3d(0, " + o.y + "px, 0)",
                    }
                  : { marginTop: o.y }
              ),
            mouse &&
              ((o.up && o.y > o.downEnd) || (!o.up && o.y < o.upEnd)) &&
              a.eq(o.up ? 1 : 0).show(),
            o.y == n)
          )
            mouse && a.eq(o.up ? 0 : 1).hide(), this.menuScrollStop(t);
          else if (!e) {
            this.opts.scrollAccelerate &&
              o.step < this.opts.scrollStep &&
              (o.step += 0.2);
            var h = this;
            this.scrollTimeout = requestAnimationFrame(function () {
              h.menuScroll(t);
            });
          }
        },
        menuScrollMousewheel: function (t, e) {
          if (this.getClosestMenu(e.target) == t[0]) {
            e = e.originalEvent;
            var i = (e.wheelDelta || -e.detail) > 0;
            t
              .dataSM("scroll-arrows")
              .eq(i ? 0 : 1)
              .is(":visible") &&
              ((t.dataSM("scroll").up = i), this.menuScroll(t, !0));
          }
          e.preventDefault();
        },
        menuScrollOut: function (t, e) {
          mouse &&
            (/^scroll-(up|down)/.test((e.relatedTarget || "").className) ||
              ((t[0] == e.relatedTarget || $.contains(t[0], e.relatedTarget)) &&
                this.getClosestMenu(e.relatedTarget) == t[0]) ||
              t.dataSM("scroll-arrows").css("visibility", "hidden"));
        },
        menuScrollOver: function (t, e) {
          if (
            mouse &&
            !/^scroll-(up|down)/.test(e.target.className) &&
            this.getClosestMenu(e.target) == t[0]
          ) {
            this.menuScrollRefreshData(t);
            var i = t.dataSM("scroll"),
              s =
                $(window).scrollTop() -
                t.dataSM("parent-a").offset().top -
                i.itemH;
            t.dataSM("scroll-arrows")
              .eq(0)
              .css("margin-top", s)
              .end()
              .eq(1)
              .css("margin-top", s + this.getViewportHeight() - i.arrowDownH)
              .end()
              .css("visibility", "visible");
          }
        },
        menuScrollRefreshData: function (t) {
          var e = t.dataSM("scroll"),
            i =
              $(window).scrollTop() -
              t.dataSM("parent-a").offset().top -
              e.itemH;
          this.cssTransforms3d && (i = -(parseFloat(t.css("margin-top")) - i)),
            $.extend(e, {
              upEnd: i,
              downEnd: i + this.getViewportHeight() - e.subH,
            });
        },
        menuScrollStop: function (t) {
          return this.scrollTimeout
            ? (cancelAnimationFrame(this.scrollTimeout),
              (this.scrollTimeout = 0),
              (t.dataSM("scroll").step = 1),
              !0)
            : void 0;
        },
        menuScrollTouch: function (t, e) {
          if (((e = e.originalEvent), isTouchEvent(e))) {
            var i = this.getTouchPoint(e);
            if (this.getClosestMenu(i.target) == t[0]) {
              var s = t.dataSM("scroll");
              if (/(start|down)$/i.test(e.type))
                this.menuScrollStop(t)
                  ? (e.preventDefault(), (this.$touchScrollingSub = t))
                  : (this.$touchScrollingSub = null),
                  this.menuScrollRefreshData(t),
                  $.extend(s, {
                    touchStartY: i.pageY,
                    touchStartTime: e.timeStamp,
                  });
              else if (/move$/i.test(e.type)) {
                var o = void 0 !== s.touchY ? s.touchY : s.touchStartY;
                if (void 0 !== o && o != i.pageY) {
                  this.$touchScrollingSub = t;
                  var a = i.pageY > o;
                  void 0 !== s.up &&
                    s.up != a &&
                    $.extend(s, {
                      touchStartY: i.pageY,
                      touchStartTime: e.timeStamp,
                    }),
                    $.extend(s, { up: a, touchY: i.pageY }),
                    this.menuScroll(t, !0, Math.abs(i.pageY - o));
                }
                e.preventDefault();
              } else
                void 0 !== s.touchY &&
                  ((s.momentum =
                    15 *
                    Math.pow(
                      Math.abs(i.pageY - s.touchStartY) /
                        (e.timeStamp - s.touchStartTime),
                      2
                    )) &&
                    (this.menuScrollStop(t),
                    this.menuScroll(t),
                    e.preventDefault()),
                  delete s.touchY);
            }
          }
        },
        menuShow: function (t) {
          if (
            (t.dataSM("beforefirstshowfired") ||
              (t.dataSM("beforefirstshowfired", !0),
              this.$root.triggerHandler("beforefirstshow.smapi", t[0]) !==
                !1)) &&
            this.$root.triggerHandler("beforeshow.smapi", t[0]) !== !1 &&
            (t.dataSM("shown-before", !0).stop(!0, !0), !t.is(":visible"))
          ) {
            var e = t.dataSM("parent-a");
            if (
              ((this.opts.keepHighlighted || this.isCollapsible()) &&
                e.addClass("highlighted"),
              this.isCollapsible())
            )
              t.removeClass("sm-nowrap").css({
                zIndex: "",
                width: "auto",
                minWidth: "",
                maxWidth: "",
                top: "",
                left: "",
                marginLeft: "",
                marginTop: "",
              });
            else {
              if (
                (t.css(
                  "z-index",
                  (this.zIndexInc =
                    (this.zIndexInc || this.getStartZIndex()) + 1)
                ),
                (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) &&
                  (t
                    .css({ width: "auto", minWidth: "", maxWidth: "" })
                    .addClass("sm-nowrap"),
                  this.opts.subMenusMinWidth &&
                    t.css("min-width", this.opts.subMenusMinWidth),
                  this.opts.subMenusMaxWidth))
              ) {
                var i = this.getWidth(t);
                t.css("max-width", this.opts.subMenusMaxWidth),
                  i > this.getWidth(t) &&
                    t
                      .removeClass("sm-nowrap")
                      .css("width", this.opts.subMenusMaxWidth);
              }
              this.menuPosition(t),
                t.dataSM("ie-shim") && t.dataSM("ie-shim").insertBefore(t);
            }
            var s = function () {
              t.css("overflow", "");
            };
            this.isCollapsible()
              ? this.opts.collapsibleShowFunction
                ? this.opts.collapsibleShowFunction.call(this, t, s)
                : t.show(this.opts.collapsibleShowDuration, s)
              : this.opts.showFunction
              ? this.opts.showFunction.call(this, t, s)
              : t.show(this.opts.showDuration, s),
              e.attr("aria-expanded", "true"),
              t.attr({ "aria-expanded": "true", "aria-hidden": "false" }),
              this.visibleSubMenus.push(t),
              this.$root.triggerHandler("show.smapi", t[0]);
          }
        },
        popupHide: function (t) {
          this.hideTimeout &&
            (clearTimeout(this.hideTimeout), (this.hideTimeout = 0));
          var e = this;
          this.hideTimeout = setTimeout(
            function () {
              e.menuHideAll();
            },
            t ? 1 : this.opts.hideTimeout
          );
        },
        popupShow: function (t, e) {
          if (!this.opts.isPopup)
            return (
              alert(
                'SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.'
              ),
              void 0
            );
          if (
            (this.hideTimeout &&
              (clearTimeout(this.hideTimeout), (this.hideTimeout = 0)),
            this.$root.dataSM("shown-before", !0).stop(!0, !0),
            !this.$root.is(":visible"))
          ) {
            this.$root.css({ left: t, top: e }),
              this.menuIframeShim(this.$root),
              this.$root.dataSM("ie-shim") &&
                this.$root
                  .dataSM("ie-shim")
                  .css({
                    zIndex: this.$root.css("z-index"),
                    width: this.getWidth(this.$root),
                    height: this.getHeight(this.$root),
                    left: t,
                    top: e,
                  })
                  .insertBefore(this.$root);
            var i = this,
              s = function () {
                i.$root.css("overflow", "");
              };
            this.opts.showFunction
              ? this.opts.showFunction.call(this, this.$root, s)
              : this.$root.show(this.opts.showDuration, s),
              (this.visibleSubMenus[0] = this.$root);
          }
        },
        refresh: function () {
          this.destroy(!0), this.init(!0);
        },
        rootKeyDown: function (t) {
          if (this.handleEvents())
            switch (t.keyCode) {
              case 27:
                var e = this.activatedItems[0];
                if (e) {
                  this.menuHideAll(), e[0].focus();
                  var i = e.dataSM("sub");
                  i && this.menuHide(i);
                }
                break;
              case 32:
                var s = $(t.target);
                if (s.is("a") && this.handleItemEvents(s)) {
                  var i = s.dataSM("sub");
                  i &&
                    !i.is(":visible") &&
                    (this.itemClick({ currentTarget: t.target }),
                    t.preventDefault());
                }
            }
        },
        rootOut: function (t) {
          if (
            this.handleEvents() &&
            !this.isTouchMode() &&
            t.target != this.$root[0] &&
            (this.hideTimeout &&
              (clearTimeout(this.hideTimeout), (this.hideTimeout = 0)),
            !this.opts.showOnClick || !this.opts.hideOnClick)
          ) {
            var e = this;
            this.hideTimeout = setTimeout(function () {
              e.menuHideAll();
            }, this.opts.hideTimeout);
          }
        },
        rootOver: function (t) {
          this.handleEvents() &&
            !this.isTouchMode() &&
            t.target != this.$root[0] &&
            this.hideTimeout &&
            (clearTimeout(this.hideTimeout), (this.hideTimeout = 0));
        },
        winResize: function (t) {
          if (this.handleEvents()) {
            if (
              !("onorientationchange" in window) ||
              "orientationchange" == t.type
            ) {
              var e = this.isCollapsible();
              (this.wasCollapsible && e) ||
                (this.activatedItems.length &&
                  this.activatedItems[this.activatedItems.length - 1][0].blur(),
                this.menuHideAll()),
                (this.wasCollapsible = e);
            }
          } else if (this.$disableOverlay) {
            var i = this.$root.offset();
            this.$disableOverlay.css({
              top: i.top,
              left: i.left,
              width: this.$root.outerWidth(),
              height: this.$root.outerHeight(),
            });
          }
        },
      },
    }),
    ($.fn.dataSM = function (t, e) {
      return e ? this.data(t + "_smartmenus", e) : this.data(t + "_smartmenus");
    }),
    ($.fn.removeDataSM = function (t) {
      return this.removeData(t + "_smartmenus");
    }),
    ($.fn.smartmenus = function (options) {
      if ("string" == typeof options) {
        var args = arguments,
          method = options;
        return (
          Array.prototype.shift.call(args),
          this.each(function () {
            var t = $(this).data("smartmenus");
            t && t[method] && t[method].apply(t, args);
          })
        );
      }
      var dataOpts = this.data("sm-options") || null;
      if (dataOpts)
        try {
          dataOpts = eval("(" + dataOpts + ")");
        } catch (e) {
          (dataOpts = null),
            alert(
              'ERROR\n\nSmartMenus jQuery init:\nInvalid "data-sm-options" attribute value syntax.'
            );
        }
      return this.each(function () {
        new $.SmartMenus(
          this,
          $.extend({}, $.fn.smartmenus.defaults, options, dataOpts)
        );
      });
    }),
    ($.fn.smartmenus.defaults = {
      isPopup: !1,
      mainMenuSubOffsetX: 0,
      mainMenuSubOffsetY: 0,
      subMenusSubOffsetX: 0,
      subMenusSubOffsetY: 0,
      subMenusMinWidth: "10em",
      subMenusMaxWidth: "20em",
      subIndicators: !0,
      subIndicatorsPos: "prepend",
      subIndicatorsText: "+",
      scrollStep: 30,
      scrollAccelerate: !0,
      showTimeout: 150,
      hideTimeout: 150,
      showDuration: 0,
      showFunction: null,
      hideDuration: 0,
      hideFunction: function (t, e) {
        t.fadeOut(200, e);
      },
      collapsibleShowDuration: 0,
      collapsibleShowFunction: function (t, e) {
        t.slideDown(200, e);
      },
      collapsibleHideDuration: 0,
      collapsibleHideFunction: function (t, e) {
        t.slideUp(200, e);
      },
      showOnClick: !1,
      hideOnClick: !0,
      noMouseOver: !1,
      keepInViewport: !0,
      keepHighlighted: !0,
      markCurrentItem: !1,
      markCurrentTree: !0,
      rightToLeftSubMenus: !1,
      bottomToTopSubMenus: !1,
      overlapControlsInIE: !0,
    }),
    $
  );
});
/*! SmartMenus jQuery Plugin Bootstrap Addon - v0.3.1 - November 1, 2016
 * http://www.smartmenus.org/
 * Copyright Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com; Licensed MIT */ (function (
  t
) {
  "function" == typeof define && define.amd
    ? define(["jquery", "jquery.smartmenus"], t)
    : "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = t(require("jquery")))
    : t(jQuery);
})(function (t) {
  return (
    t.extend((t.SmartMenus.Bootstrap = {}), {
      keydownFix: !1,
      init: function () {
        var e = t("ul.navbar-nav:not([data-sm-skip])");
        e.each(function () {
          function e() {
            o.find("a.current").parent().addClass("active"),
              o.find("a.has-submenu").each(function () {
                var e = t(this);
                e.is('[data-toggle="dropdown"]') &&
                  e
                    .dataSM("bs-data-toggle-dropdown", !0)
                    .removeAttr("data-toggle"),
                  e.is('[role="button"]') &&
                    e.dataSM("bs-role-button", !0).removeAttr("role");
              });
          }
          function s() {
            o.find("a.current").parent().removeClass("active"),
              o.find("a.has-submenu").each(function () {
                var e = t(this);
                e.dataSM("bs-data-toggle-dropdown") &&
                  e
                    .attr("data-toggle", "dropdown")
                    .removeDataSM("bs-data-toggle-dropdown"),
                  e.dataSM("bs-role-button") &&
                    e.attr("role", "button").removeDataSM("bs-role-button");
              });
          }
          function i(t) {
            var e = a.getViewportWidth();
            if (e != n || t) {
              var s = o.find(".caret");
              a.isCollapsible()
                ? (o.addClass("sm-collapsible"),
                  o.is("[data-sm-skip-collapsible-behavior]") ||
                    s.addClass("navbar-toggle sub-arrow"))
                : (o.removeClass("sm-collapsible"),
                  o.is("[data-sm-skip-collapsible-behavior]") ||
                    s.removeClass("navbar-toggle sub-arrow")),
                (n = e);
            }
          }
          var o = t(this),
            a = o.data("smartmenus");
          if (!a) {
            o
              .smartmenus({
                subMenusSubOffsetX: 2,
                subMenusSubOffsetY: -6,
                subIndicators: !1,
                collapsibleShowFunction: null,
                collapsibleHideFunction: null,
                rightToLeftSubMenus: o.hasClass("navbar-right"),
                bottomToTopSubMenus: o
                  .closest(".navbar")
                  .hasClass("navbar-fixed-bottom"),
              })
              .bind({
                "show.smapi": function (e, s) {
                  var i = t(s),
                    o = i.dataSM("scroll-arrows");
                  o &&
                    o.css(
                      "background-color",
                      t(document.body).css("background-color")
                    ),
                    i.parent().addClass("open");
                },
                "hide.smapi": function (e, s) {
                  t(s).parent().removeClass("open");
                },
              }),
              e(),
              (a = o.data("smartmenus")),
              (a.isCollapsible = function () {
                return !/^(left|right)$/.test(
                  this.$firstLink.parent().css("float")
                );
              }),
              (a.refresh = function () {
                t.SmartMenus.prototype.refresh.call(this), e(), i(!0);
              }),
              (a.destroy = function (e) {
                s(), t.SmartMenus.prototype.destroy.call(this, e);
              }),
              o.is("[data-sm-skip-collapsible-behavior]") &&
                o.bind({
                  "click.smapi": function (e, s) {
                    if (a.isCollapsible()) {
                      var i = t(s),
                        o = i.parent().dataSM("sub");
                      if (o && o.dataSM("shown-before") && o.is(":visible"))
                        return a.itemActivate(i), a.menuHide(o), !1;
                    }
                  },
                });
            var n;
            i(), t(window).bind("resize.smartmenus" + a.rootId, i);
          }
        }),
          e.length &&
            !t.SmartMenus.Bootstrap.keydownFix &&
            (t(document).off("keydown.bs.dropdown.data-api", ".dropdown-menu"),
            t.fn.dropdown &&
              t.fn.dropdown.Constructor &&
              t(document).on(
                "keydown.bs.dropdown.data-api",
                '.dropdown-menu:not([id^="sm-"])',
                t.fn.dropdown.Constructor.prototype.keydown
              ),
            (t.SmartMenus.Bootstrap.keydownFix = !0));
      },
    }),
    t(t.SmartMenus.Bootstrap.init),
    t
  );
});
// SmartMenus mod - hide the menus on document click just in collapsible mode
($.SmartMenus.prototype._docClick = $.SmartMenus.prototype.docClick),
  ($.SmartMenus.prototype._docTouchEnd = $.SmartMenus.prototype.docTouchEnd),
  ($.SmartMenus.prototype.docClick = function (a) {
    this.isCollapsible() && this._docClick(a);
  }),
  ($.SmartMenus.prototype.docTouchEnd = function (a) {
    this.isCollapsible() && this._docTouchEnd(a);
  }),
  $(function () {
    $(".navbar-nav").bind("click.smapi", function (a, b) {
      var c = $(this).data("smartmenus");
      if (c.isCollapsible()) {
        var d = $(b).dataSM("sub");
        if (d && d.is(":visible")) return c.menuHide(d), !1;
      }
    });
  });
/*-----------------------------------------------------------------------------------*/
/*	02. STICKY HEADER
/*-----------------------------------------------------------------------------------*/
/*!
 * Headhesive.js v1.2.3 - An on-demand sticky header
 * Author: Copyright (c) Mark Goodyear <@markgdyr> <http://markgoodyear.com>
 * Url: http://markgoodyear.com/labs/headhesive
 * License: MIT
 */
!(function (t, e) {
  "function" == typeof define && define.amd
    ? define([], function () {
        return e();
      })
    : "object" == typeof exports
    ? (module.exports = e())
    : (t.Headhesive = e());
})(this, function () {
  "use strict";
  var t = function (e, s) {
      for (var o in s)
        s.hasOwnProperty(o) &&
          (e[o] = "object" == typeof s[o] ? t(e[o], s[o]) : s[o]);
      return e;
    },
    e = function (t, e) {
      var s,
        o,
        i,
        n =
          Date.now ||
          function () {
            return new Date().getTime();
          },
        l = null,
        c = 0,
        r = function () {
          (c = n()), (l = null), (i = t.apply(s, o)), (s = o = null);
        };
      return function () {
        var f = n(),
          h = e - (f - c);
        return (
          (s = this),
          (o = arguments),
          0 >= h
            ? (clearTimeout(l),
              (l = null),
              (c = f),
              (i = t.apply(s, o)),
              (s = o = null))
            : l || (l = setTimeout(r, h)),
          i
        );
      };
    },
    s = function () {
      return void 0 !== window.pageYOffset
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;
    },
    o = function (t, e) {
      for (var s = 0, o = t.offsetHeight; t; )
        (s += t.offsetTop), (t = t.offsetParent);
      return "bottom" === e && (s += o), s;
    },
    i = function (e, s) {
      "querySelector" in document &&
        "addEventListener" in window &&
        ((this.visible = !1),
        (this.options = {
          offset: 300,
          offsetSide: "top",
          classes: {
            clone: "headhesive",
            stick: "headhesive--stick",
            unstick: "headhesive--unstick",
          },
          throttle: 250,
          onInit: function () {},
          onStick: function () {},
          onUnstick: function () {},
          onDestroy: function () {},
        }),
        (this.elem = "string" == typeof e ? document.querySelector(e) : e),
        (this.options = t(this.options, s)),
        this.init());
    };
  return (
    (i.prototype = {
      constructor: i,
      init: function () {
        if (
          ((this.clonedElem = this.elem.cloneNode(!0)),
          (this.clonedElem.className += " " + this.options.classes.clone),
          document.body.insertBefore(this.clonedElem, document.body.firstChild),
          "number" == typeof this.options.offset)
        )
          this.scrollOffset = this.options.offset;
        else {
          if ("string" != typeof this.options.offset)
            throw new Error("Invalid offset: " + this.options.offset);
          this._setScrollOffset();
        }
        (this._throttleUpdate = e(
          this.update.bind(this),
          this.options.throttle
        )),
          (this._throttleScrollOffset = e(
            this._setScrollOffset.bind(this),
            this.options.throttle
          )),
          window.addEventListener("scroll", this._throttleUpdate, !1),
          window.addEventListener("resize", this._throttleScrollOffset, !1),
          this.options.onInit.call(this);
      },
      _setScrollOffset: function () {
        "string" == typeof this.options.offset &&
          (this.scrollOffset = o(
            document.querySelector(this.options.offset),
            this.options.offsetSide
          ));
      },
      destroy: function () {
        document.body.removeChild(this.clonedElem),
          window.removeEventListener("scroll", this._throttleUpdate),
          window.removeEventListener("resize", this._throttleScrollOffset),
          this.options.onDestroy.call(this);
      },
      stick: function () {
        this.visible ||
          ((this.clonedElem.className = this.clonedElem.className.replace(
            new RegExp(
              "(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*",
              "g"
            ),
            ""
          )),
          (this.clonedElem.className += " " + this.options.classes.stick),
          (this.visible = !0),
          this.options.onStick.call(this));
      },
      unstick: function () {
        this.visible &&
          ((this.clonedElem.className = this.clonedElem.className.replace(
            new RegExp(
              "(^|\\s)*" + this.options.classes.stick + "(\\s|$)*",
              "g"
            ),
            ""
          )),
          (this.clonedElem.className += " " + this.options.classes.unstick),
          (this.visible = !1),
          this.options.onUnstick.call(this));
      },
      update: function () {
        s() > this.scrollOffset ? this.stick() : this.unstick();
      },
    }),
    i
  );
});
/*-----------------------------------------------------------------------------------*/
/*	03. PICTUREFILL RETINA IMAGE
/*-----------------------------------------------------------------------------------*/
/*! Picturefill - v2.3.1 - 2015-04-09
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
window.matchMedia ||
  (window.matchMedia = (function () {
    "use strict";
    var a = window.styleMedia || window.media;
    if (!a) {
      var b = document.createElement("style"),
        c = document.getElementsByTagName("script")[0],
        d = null;
      (b.type = "text/css"),
        (b.id = "matchmediajs-test"),
        c.parentNode.insertBefore(b, c),
        (d =
          ("getComputedStyle" in window && window.getComputedStyle(b, null)) ||
          b.currentStyle),
        (a = {
          matchMedium: function (a) {
            var c = "@media " + a + "{ #matchmediajs-test { width: 1px; } }";
            return (
              b.styleSheet ? (b.styleSheet.cssText = c) : (b.textContent = c),
              "1px" === d.width
            );
          },
        });
    }
    return function (b) {
      return { matches: a.matchMedium(b || "all"), media: b || "all" };
    };
  })()),
  (function (a, b, c) {
    "use strict";
    function d(b) {
      "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = b)
        : "function" == typeof define &&
          define.amd &&
          define("picturefill", function () {
            return b;
          }),
        "object" == typeof a && (a.picturefill = b);
    }
    function e(a) {
      var b,
        c,
        d,
        e,
        f,
        i = a || {};
      b = i.elements || g.getAllElements();
      for (var j = 0, k = b.length; k > j; j++)
        if (
          ((c = b[j]),
          (d = c.parentNode),
          (e = void 0),
          (f = void 0),
          "IMG" === c.nodeName.toUpperCase() &&
            (c[g.ns] || (c[g.ns] = {}), i.reevaluate || !c[g.ns].evaluated))
        ) {
          if (d && "PICTURE" === d.nodeName.toUpperCase()) {
            if ((g.removeVideoShim(d), (e = g.getMatch(c, d)), e === !1))
              continue;
          } else e = void 0;
          ((d && "PICTURE" === d.nodeName.toUpperCase()) ||
            (!g.sizesSupported && c.srcset && h.test(c.srcset))) &&
            g.dodgeSrcset(c),
            e
              ? ((f = g.processSourceSet(e)), g.applyBestCandidate(f, c))
              : ((f = g.processSourceSet(c)),
                (void 0 === c.srcset || c[g.ns].srcset) &&
                  g.applyBestCandidate(f, c)),
            (c[g.ns].evaluated = !0);
        }
    }
    function f() {
      function c() {
        clearTimeout(d), (d = setTimeout(h, 60));
      }
      g.initTypeDetects(), e();
      var d,
        f = setInterval(function () {
          return (
            e(),
            /^loaded|^i|^c/.test(b.readyState) ? void clearInterval(f) : void 0
          );
        }, 250),
        h = function () {
          e({ reevaluate: !0 });
        };
      a.addEventListener
        ? a.addEventListener("resize", c, !1)
        : a.attachEvent && a.attachEvent("onresize", c);
    }
    if (a.HTMLPictureElement) return void d(function () {});
    b.createElement("picture");
    var g = a.picturefill || {},
      h = /\s+\+?\d+(e\d+)?w/;
    (g.ns = "picturefill"),
      (function () {
        (g.srcsetSupported = "srcset" in c),
          (g.sizesSupported = "sizes" in c),
          (g.curSrcSupported = "currentSrc" in c);
      })(),
      (g.trim = function (a) {
        return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "");
      }),
      (g.makeUrl = (function () {
        var a = b.createElement("a");
        return function (b) {
          return (a.href = b), a.href;
        };
      })()),
      (g.restrictsMixedContent = function () {
        return "https:" === a.location.protocol;
      }),
      (g.matchesMedia = function (b) {
        return a.matchMedia && a.matchMedia(b).matches;
      }),
      (g.getDpr = function () {
        return a.devicePixelRatio || 1;
      }),
      (g.getWidthFromLength = function (a) {
        var c;
        if (
          !a ||
          a.indexOf("%") > -1 != !1 ||
          !(parseFloat(a) > 0 || a.indexOf("calc(") > -1)
        )
          return !1;
        (a = a.replace("vw", "%")),
          g.lengthEl ||
            ((g.lengthEl = b.createElement("div")),
            (g.lengthEl.style.cssText =
              "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden"),
            (g.lengthEl.className = "helper-from-picturefill-js")),
          (g.lengthEl.style.width = "0px");
        try {
          g.lengthEl.style.width = a;
        } catch (d) {}
        return (
          b.body.appendChild(g.lengthEl),
          (c = g.lengthEl.offsetWidth),
          0 >= c && (c = !1),
          b.body.removeChild(g.lengthEl),
          c
        );
      }),
      (g.detectTypeSupport = function (b, c) {
        var d = new a.Image();
        return (
          (d.onerror = function () {
            (g.types[b] = !1), e();
          }),
          (d.onload = function () {
            (g.types[b] = 1 === d.width), e();
          }),
          (d.src = c),
          "pending"
        );
      }),
      (g.types = g.types || {}),
      (g.initTypeDetects = function () {
        (g.types["image/jpeg"] = !0),
          (g.types["image/gif"] = !0),
          (g.types["image/png"] = !0),
          (g.types["image/svg+xml"] = b.implementation.hasFeature(
            "http://www.w3.org/TR/SVG11/feature#Image",
            "1.1"
          )),
          (g.types["image/webp"] = g.detectTypeSupport(
            "image/webp",
            "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
          ));
      }),
      (g.verifyTypeSupport = function (a) {
        var b = a.getAttribute("type");
        if (null === b || "" === b) return !0;
        var c = g.types[b];
        return "string" == typeof c && "pending" !== c
          ? ((g.types[b] = g.detectTypeSupport(b, c)), "pending")
          : "function" == typeof c
          ? (c(), "pending")
          : c;
      }),
      (g.parseSize = function (a) {
        var b = /(\([^)]+\))?\s*(.+)/g.exec(a);
        return { media: b && b[1], length: b && b[2] };
      }),
      (g.findWidthFromSourceSize = function (c) {
        for (
          var d, e = g.trim(c).split(/\s*,\s*/), f = 0, h = e.length;
          h > f;
          f++
        ) {
          var i = e[f],
            j = g.parseSize(i),
            k = j.length,
            l = j.media;
          if (k && (!l || g.matchesMedia(l)) && (d = g.getWidthFromLength(k)))
            break;
        }
        return d || Math.max(a.innerWidth || 0, b.documentElement.clientWidth);
      }),
      (g.parseSrcset = function (a) {
        for (var b = []; "" !== a; ) {
          a = a.replace(/^\s+/g, "");
          var c,
            d = a.search(/\s/g),
            e = null;
          if (-1 !== d) {
            c = a.slice(0, d);
            var f = c.slice(-1);
            if (
              (("," === f || "" === c) &&
                ((c = c.replace(/,+$/, "")), (e = "")),
              (a = a.slice(d + 1)),
              null === e)
            ) {
              var g = a.indexOf(",");
              -1 !== g
                ? ((e = a.slice(0, g)), (a = a.slice(g + 1)))
                : ((e = a), (a = ""));
            }
          } else (c = a), (a = "");
          (c || e) && b.push({ url: c, descriptor: e });
        }
        return b;
      }),
      (g.parseDescriptor = function (a, b) {
        var c,
          d = b || "100vw",
          e = a && a.replace(/(^\s+|\s+$)/g, ""),
          f = g.findWidthFromSourceSize(d);
        if (e)
          for (var h = e.split(" "), i = h.length - 1; i >= 0; i--) {
            var j = h[i],
              k = j && j.slice(j.length - 1);
            if (("h" !== k && "w" !== k) || g.sizesSupported) {
              if ("x" === k) {
                var l = j && parseFloat(j, 10);
                c = l && !isNaN(l) ? l : 1;
              }
            } else c = parseFloat(parseInt(j, 10) / f);
          }
        return c || 1;
      }),
      (g.getCandidatesFromSourceSet = function (a, b) {
        for (
          var c = g.parseSrcset(a), d = [], e = 0, f = c.length;
          f > e;
          e++
        ) {
          var h = c[e];
          d.push({
            url: h.url,
            resolution: g.parseDescriptor(h.descriptor, b),
          });
        }
        return d;
      }),
      (g.dodgeSrcset = function (a) {
        a.srcset &&
          ((a[g.ns].srcset = a.srcset),
          (a.srcset = ""),
          a.setAttribute("data-pfsrcset", a[g.ns].srcset));
      }),
      (g.processSourceSet = function (a) {
        var b = a.getAttribute("srcset"),
          c = a.getAttribute("sizes"),
          d = [];
        return (
          "IMG" === a.nodeName.toUpperCase() &&
            a[g.ns] &&
            a[g.ns].srcset &&
            (b = a[g.ns].srcset),
          b && (d = g.getCandidatesFromSourceSet(b, c)),
          d
        );
      }),
      (g.backfaceVisibilityFix = function (a) {
        var b = a.style || {},
          c = "webkitBackfaceVisibility" in b,
          d = b.zoom;
        c && ((b.zoom = ".999"), (c = a.offsetWidth), (b.zoom = d));
      }),
      (g.setIntrinsicSize = (function () {
        var c = {},
          d = function (a, b, c) {
            b && a.setAttribute("width", parseInt(b / c, 10));
          };
        return function (e, f) {
          var h;
          e[g.ns] &&
            !a.pfStopIntrinsicSize &&
            (void 0 === e[g.ns].dims &&
              (e[g.ns].dims =
                e.getAttribute("width") || e.getAttribute("height")),
            e[g.ns].dims ||
              (f.url in c
                ? d(e, c[f.url], f.resolution)
                : ((h = b.createElement("img")),
                  (h.onload = function () {
                    if (((c[f.url] = h.width), !c[f.url]))
                      try {
                        b.body.appendChild(h),
                          (c[f.url] = h.width || h.offsetWidth),
                          b.body.removeChild(h);
                      } catch (a) {}
                    e.src === f.url && d(e, c[f.url], f.resolution),
                      (e = null),
                      (h.onload = null),
                      (h = null);
                  }),
                  (h.src = f.url))));
        };
      })()),
      (g.applyBestCandidate = function (a, b) {
        var c, d, e;
        a.sort(g.ascendingSort), (d = a.length), (e = a[d - 1]);
        for (var f = 0; d > f; f++)
          if (((c = a[f]), c.resolution >= g.getDpr())) {
            e = c;
            break;
          }
        e &&
          ((e.url = g.makeUrl(e.url)),
          b.src !== e.url &&
            (g.restrictsMixedContent() &&
            "http:" === e.url.substr(0, "http:".length).toLowerCase()
              ? void 0 !== window.console &&
                console.warn("Blocked mixed content image " + e.url)
              : ((b.src = e.url),
                g.curSrcSupported || (b.currentSrc = b.src),
                g.backfaceVisibilityFix(b))),
          g.setIntrinsicSize(b, e));
      }),
      (g.ascendingSort = function (a, b) {
        return a.resolution - b.resolution;
      }),
      (g.removeVideoShim = function (a) {
        var b = a.getElementsByTagName("video");
        if (b.length) {
          for (var c = b[0], d = c.getElementsByTagName("source"); d.length; )
            a.insertBefore(d[0], c);
          c.parentNode.removeChild(c);
        }
      }),
      (g.getAllElements = function () {
        for (
          var a = [], c = b.getElementsByTagName("img"), d = 0, e = c.length;
          e > d;
          d++
        ) {
          var f = c[d];
          ("PICTURE" === f.parentNode.nodeName.toUpperCase() ||
            null !== f.getAttribute("srcset") ||
            (f[g.ns] && null !== f[g.ns].srcset)) &&
            a.push(f);
        }
        return a;
      }),
      (g.getMatch = function (a, b) {
        for (var c, d = b.childNodes, e = 0, f = d.length; f > e; e++) {
          var h = d[e];
          if (1 === h.nodeType) {
            if (h === a) return c;
            if ("SOURCE" === h.nodeName.toUpperCase()) {
              null !== h.getAttribute("src") &&
                void 0 !== typeof console &&
                console.warn(
                  "The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`."
                );
              var i = h.getAttribute("media");
              if (h.getAttribute("srcset") && (!i || g.matchesMedia(i))) {
                var j = g.verifyTypeSupport(h);
                if (j === !0) {
                  c = h;
                  break;
                }
                if ("pending" === j) return !1;
              }
            }
          }
        }
        return c;
      }),
      f(),
      (e._ = g),
      d(e);
  })(window, window.document, new window.Image());
/*-----------------------------------------------------------------------------------*/
/*	04. SLICK
/*-----------------------------------------------------------------------------------*/
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.7.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  ((e = (function () {
    var e = 0;
    return function (t, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(t)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(t).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        void 0 !== document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : void 0 !== document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = e++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    };
  })()).prototype.activateADA = function () {
    this.$slideTrack
      .find(".slick-active")
      .attr({ "aria-hidden": "false" })
      .find("a, input, button, select")
      .attr({ tabindex: "0" });
  }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : !0 === o
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled
          ? !1 === s.options.vertical
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : !1 === s.cssTransitions
          ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    !1 === s.options.vertical
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                },
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            !1 === s.options.vertical
              ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor;
      return t && null !== t && (t = i(t).not(e.$slider)), t;
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this.getNavTarget();
      null !== t &&
        "object" == typeof t &&
        t.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      !1 === e.options.fade
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (!1 === i.options.infinite &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      !0 === e.options.arrows &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            !0 !== e.options.infinite &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (!0 === o.options.dots) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        !0 === e.options.draggable && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 1)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
          ? (n = d)
          : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (!1 === r.originalSettings.mobileFirst
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        (n = r.slideCount % r.options.slidesToScroll != 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t);
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e, t;
      if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var o in e) {
          if (i < e[o]) {
            i = t;
            break;
          }
          t = e[o];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility &&
          e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 1 &&
        ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      !1 === this.shouldClick &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]);
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      !1 === t.cssTransitions
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      !1 === e.cssTransitions
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick blur.slick", "*", function (t) {
          t.stopImmediatePropagation();
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              ((e.focussed = o.is(":focus")), e.autoPlay());
          }, 0);
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (!0 === i.options.centerMode) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : !0 === n.options.centerMode &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          !1 === n.options.vertical
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        return this.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        !1 === e.options.infinite
          ? (i = e.slideCount)
          : ((t = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o = this;
      return (
        (t =
          !0 === o.options.centerMode
            ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
            : 0),
        !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
              if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return (e = n), !1;
            }),
            Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
          : o.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (t) {
              var s = o.indexOf(t);
              i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1,
              }),
                -1 !== s &&
                  i(this).attr({
                    "aria-describedby":
                      "slick-slide-control" + e.instanceUid + s,
                  });
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.$slides.eq(s).attr("tabindex", 0);
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        !0 === i.options.accessibility &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      !0 === e.options.dots &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        !0 === e.options.accessibility &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots &&
          !0 === e.options.pauseOnDotsHover &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility &&
          e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && !0 === e.options.accessibility
          ? e.changeSlide({
              data: { message: !0 === e.options.rtl ? "next" : "previous" },
            })
          : 39 === i.keyCode &&
            !0 === e.options.accessibility &&
            e.changeSlide({
              data: { message: !0 === e.options.rtl ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            r = document.createElement("img");
          (r.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                n.$slider.trigger("lazyLoaded", [n, e, t]);
            });
          }),
            (r.onerror = function () {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                n.$slider.trigger("lazyLoadError", [n, e, t]);
            }),
            (r.src = t);
        });
      }
      var t,
        o,
        s,
        n = this;
      if (
        (!0 === n.options.centerMode
          ? !0 === n.options.infinite
            ? (s =
                (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                n.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                n.currentSlide - (n.options.slidesToShow / 2 + 1)
              )),
              (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((o = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (s = Math.ceil(o + n.options.slidesToShow)),
            !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
        (t = n.$slider.find(".slick-slide").slice(o, s)),
        "anticipated" === n.options.lazyLoad)
      )
        for (
          var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0;
          a < n.options.slidesToScroll;
          a++
        )
          r < 0 && (r = n.slideCount - 1),
            (t = (t = t.add(d.eq(r))).add(d.eq(l))),
            r--,
            l++;
      e(t),
        n.slideCount <= n.options.slidesToShow
          ? e(n.$slider.find(".slick-slide"))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
          ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
          : 0 === n.currentSlide &&
            e(
              n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)
            );
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      t.unslicked ||
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility &&
          (t.initADA(),
          t.options.focusOnChange &&
            i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          ((r = document.createElement("img")).onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        if (
          ((i =
            "boolean" == typeof i
              ? !0 === (e = i)
                ? 0
                : o.slideCount - 1
              : !0 === e
              ? --i
              : i),
          o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
        )
          return !1;
        o.unload(),
          !0 === t
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(i).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      !0 === o.options.rtl && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(s)
          : ((s = {}),
            !1 === o.cssTransitions
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      !1 === i.options.vertical
        ? !0 === i.options.centerMode &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          !0 === i.options.centerMode &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        !1 === i.options.vertical && !1 === i.options.variableWidth
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : !0 === i.options.variableWidth
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      !1 === i.options.variableWidth &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          !0 === t.options.rtl
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : void 0 !== arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === i.options.useCSS && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          !1 !== i.animType &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && !1 !== i.animType);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode)
      ) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          !0 === n.options.infinite &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center");
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite &&
          !1 === s.options.fade &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            !0 === s.options.centerMode
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this;
      i || e.autoPlay(), (e.interrupted = i);
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? t.slideHandler(s, !1, !0)
          : t.slideHandler(s);
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (!0 === a.animating && !0 === a.options.waitForAnimate) ||
          (!0 === a.options.fade && a.currentSlide === i)
        ))
      )
        if (
          (!1 === e && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          !1 === a.options.infinite &&
            !1 === a.options.centerMode &&
            (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else if (
          !1 === a.options.infinite &&
          !0 === a.options.centerMode &&
          (i < 0 || i > a.slideCount - a.options.slidesToScroll)
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else {
          if (
            (a.options.autoplay && clearInterval(a.autoPlayTimer),
            (s =
              o < 0
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                  : a.slideCount + o
                : o >= a.slideCount
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? 0
                  : o - a.slideCount
                : o),
            (a.animating = !0),
            a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
            (n = a.currentSlide),
            (a.currentSlide = s),
            a.setSlideClasses(a.currentSlide),
            a.options.asNavFor &&
              (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <=
                l.options.slidesToShow &&
              l.setSlideClasses(a.currentSlide),
            a.updateDots(),
            a.updateArrows(),
            !0 === a.options.fade)
          )
            return (
              !0 !== t
                ? (a.fadeSlideOut(n),
                  a.fadeSlide(s, function () {
                    a.postSlide(s);
                  }))
                : a.postSlide(s),
              void a.animateHeight()
            );
          !0 !== t
            ? a.animateSlide(d, function () {
                a.postSlide(s);
              })
            : a.postSlide(s);
        }
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o <= 360 && o >= 315
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? !1 === s.options.rtl
            ? "right"
            : "left"
          : !0 === s.options.verticalSwiping
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          !1 === e.options.swipe ||
          ("ontouchend" in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (!0 === l.options.verticalSwiping &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (!1 === l.options.rtl ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              !0 === l.options.verticalSwiping &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              !1 === l.options.infinite &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              !1 === l.options.vertical
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
              !0 !== l.options.fade &&
                !1 !== l.options.touchMove &&
                (!0 === l.animating
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      if (
        ((t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
          t.slideCount <= t.options.slidesToShow)
      )
        return (t.touchObject = {}), !1;
      void 0 !== i.originalEvent &&
        void 0 !== i.originalEvent.touches &&
        (e = i.originalEvent.touches[0]),
        (t.touchObject.startX = t.touchObject.curX =
          void 0 !== e ? e.pageX : i.clientX),
        (t.touchObject.startY = t.touchObject.curY =
          void 0 !== e ? e.pageY : i.clientY),
        (t.dragging = !0);
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      e.$slider.trigger("unslick", [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i = this;
      Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          !i.options.infinite &&
          (i.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          i.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === i.currentSlide
            ? (i.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - i.options.slidesToShow &&
              !1 === i.options.centerMode
            ? (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - 1 &&
              !0 === i.options.centerMode &&
              (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || void 0 === s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          void 0 !== t)
        )
          return t;
      return o;
    });
});
/*-----------------------------------------------------------------------------------*/
/*	05. AOS
/*-----------------------------------------------------------------------------------*/
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.AOS = t())
    : (e.AOS = t());
})(this, function () {
  return (function (e) {
    function t(n) {
      if (o[n]) return o[n].exports;
      var i = (o[n] = { exports: {}, id: n, loaded: !1 });
      return e[n].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var o = {};
    return (t.m = e), (t.c = o), (t.p = "dist/index.html"), t(0);
  })([
    function (e, t, o) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var i =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var o = arguments[t];
              for (var n in o)
                Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
            }
            return e;
          },
        a = o(1),
        r = (n(a), o(5)),
        c = n(r),
        u = o(6),
        s = n(u),
        d = o(7),
        f = n(d),
        l = o(8),
        m = n(l),
        p = o(9),
        b = n(p),
        v = o(10),
        g = n(v),
        y = o(13),
        w = n(y),
        h = [],
        k = !1,
        x = document.all && !window.atob,
        j = {
          offset: 120,
          delay: 0,
          easing: "ease",
          duration: 400,
          disable: !1,
          once: !1,
          startEvent: "DOMContentLoaded",
        },
        O = function () {
          var e =
            arguments.length <= 0 || void 0 === arguments[0]
              ? !1
              : arguments[0];
          return (
            e && (k = !0),
            k
              ? ((h = (0, g["default"])(h, j)), (0, b["default"])(h, j.once), h)
              : void 0
          );
        },
        _ = function () {
          (h = (0, w["default"])()), O();
        },
        z = function () {
          h.forEach(function (e, t) {
            e.node.removeAttribute("data-aos"),
              e.node.removeAttribute("data-aos-easing"),
              e.node.removeAttribute("data-aos-duration"),
              e.node.removeAttribute("data-aos-delay");
          });
        },
        A = function (e) {
          return (
            e === !0 ||
            ("mobile" === e && m["default"].mobile()) ||
            ("phone" === e && m["default"].phone()) ||
            ("tablet" === e && m["default"].tablet()) ||
            ("function" == typeof e && e() === !0)
          );
        },
        E = function (e) {
          return (
            (j = i(j, e)),
            (h = (0, w["default"])()),
            A(j.disable) || x
              ? z()
              : (document
                  .querySelector("body")
                  .setAttribute("data-aos-easing", j.easing),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-duration", j.duration),
                document
                  .querySelector("body")
                  .setAttribute("data-aos-delay", j.delay),
                "DOMContentLoaded" === j.startEvent &&
                ["complete", "interactive"].indexOf(document.readyState) > -1
                  ? O(!0)
                  : "load" === j.startEvent
                  ? window.addEventListener(j.startEvent, function () {
                      O(!0);
                    })
                  : document.addEventListener(j.startEvent, function () {
                      O(!0);
                    }),
                window.addEventListener("resize", (0, s["default"])(O, 50, !0)),
                window.addEventListener(
                  "orientationchange",
                  (0, s["default"])(O, 50, !0)
                ),
                window.addEventListener(
                  "scroll",
                  (0, c["default"])(function () {
                    (0, b["default"])(h, j.once);
                  }, 99)
                ),
                document.addEventListener("DOMNodeRemoved", function (e) {
                  var t = e.target;
                  t &&
                    1 === t.nodeType &&
                    t.hasAttribute &&
                    t.hasAttribute("data-aos") &&
                    (0, s["default"])(_, 50, !0);
                }),
                (0, f["default"])("[data-aos]", _),
                h)
          );
        };
      e.exports = { init: E, refresh: O, refreshHard: _ };
    },
    function (e, t) {},
    ,
    ,
    ,
    function (e, t, o) {
      "use strict";
      function n(e, t, o) {
        var n = !0,
          a = !0;
        if ("function" != typeof e) throw new TypeError(c);
        return (
          i(o) &&
            ((n = "leading" in o ? !!o.leading : n),
            (a = "trailing" in o ? !!o.trailing : a)),
          r(e, t, { leading: n, maxWait: t, trailing: a })
        );
      }
      function i(e) {
        var t = "undefined" == typeof e ? "undefined" : a(e);
        return !!e && ("object" == t || "function" == t);
      }
      var a =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol
                  ? "symbol"
                  : typeof e;
              },
        r = o(6),
        c = "Expected a function";
      e.exports = n;
    },
    function (e, t) {
      "use strict";
      function o(e, t, o) {
        function n(t) {
          var o = b,
            n = v;
          return (b = v = void 0), (O = t), (y = e.apply(n, o));
        }
        function a(e) {
          return (O = e), (w = setTimeout(d, t)), _ ? n(e) : y;
        }
        function r(e) {
          var o = e - h,
            n = e - O,
            i = t - o;
          return z ? x(i, g - n) : i;
        }
        function u(e) {
          var o = e - h,
            n = e - O;
          return !h || o >= t || 0 > o || (z && n >= g);
        }
        function d() {
          var e = j();
          return u(e) ? f(e) : void (w = setTimeout(d, r(e)));
        }
        function f(e) {
          return (
            clearTimeout(w), (w = void 0), A && b ? n(e) : ((b = v = void 0), y)
          );
        }
        function l() {
          void 0 !== w && clearTimeout(w), (h = O = 0), (b = v = w = void 0);
        }
        function m() {
          return void 0 === w ? y : f(j());
        }
        function p() {
          var e = j(),
            o = u(e);
          if (((b = arguments), (v = this), (h = e), o)) {
            if (void 0 === w) return a(h);
            if (z) return clearTimeout(w), (w = setTimeout(d, t)), n(h);
          }
          return void 0 === w && (w = setTimeout(d, t)), y;
        }
        var b,
          v,
          g,
          y,
          w,
          h = 0,
          O = 0,
          _ = !1,
          z = !1,
          A = !0;
        if ("function" != typeof e) throw new TypeError(s);
        return (
          (t = c(t) || 0),
          i(o) &&
            ((_ = !!o.leading),
            (z = "maxWait" in o),
            (g = z ? k(c(o.maxWait) || 0, t) : g),
            (A = "trailing" in o ? !!o.trailing : A)),
          (p.cancel = l),
          (p.flush = m),
          p
        );
      }
      function n(e) {
        var t = i(e) ? h.call(e) : "";
        return t == f || t == l;
      }
      function i(e) {
        var t = "undefined" == typeof e ? "undefined" : u(e);
        return !!e && ("object" == t || "function" == t);
      }
      function a(e) {
        return (
          !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
        );
      }
      function r(e) {
        return (
          "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) ||
          (a(e) && h.call(e) == m)
        );
      }
      function c(e) {
        if ("number" == typeof e) return e;
        if (r(e)) return d;
        if (i(e)) {
          var t = n(e.valueOf) ? e.valueOf() : e;
          e = i(t) ? t + "" : t;
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(p, "");
        var o = v.test(e);
        return o || g.test(e) ? y(e.slice(2), o ? 2 : 8) : b.test(e) ? d : +e;
      }
      var u =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol
                  ? "symbol"
                  : typeof e;
              },
        s = "Expected a function",
        d = NaN,
        f = "[object Function]",
        l = "[object GeneratorFunction]",
        m = "[object Symbol]",
        p = /^\s+|\s+$/g,
        b = /^[-+]0x[0-9a-f]+$/i,
        v = /^0b[01]+$/i,
        g = /^0o[0-7]+$/i,
        y = parseInt,
        w = Object.prototype,
        h = w.toString,
        k = Math.max,
        x = Math.min,
        j = Date.now;
      e.exports = o;
    },
    function (e, t) {
      "use strict";
      function o(e, t) {
        r.push({ selector: e, fn: t }),
          !c &&
            a &&
            ((c = new a(n)),
            c.observe(i.documentElement, {
              childList: !0,
              subtree: !0,
              removedNodes: !0,
            })),
          n();
      }
      function n() {
        for (var e, t, o = 0, n = r.length; n > o; o++) {
          (e = r[o]), (t = i.querySelectorAll(e.selector));
          for (var a, c = 0, u = t.length; u > c; c++)
            (a = t[c]), a.ready || ((a.ready = !0), e.fn.call(a, a));
        }
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = window.document,
        a = window.MutationObserver || window.WebKitMutationObserver,
        r = [],
        c = void 0;
      t["default"] = o;
    },
    function (e, t) {
      "use strict";
      function o(e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = (function () {
          function e(e, t) {
            for (var o = 0; o < t.length; o++) {
              var n = t[o];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          return function (t, o, n) {
            return o && e(t.prototype, o), n && e(t, n), t;
          };
        })(),
        i = (function () {
          function e() {
            o(this, e);
          }
          return (
            n(e, [
              {
                key: "phone",
                value: function () {
                  var e = !1;
                  return (
                    (function (t) {
                      (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                        t
                      ) ||
                        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                          t.substr(0, 4)
                        )) &&
                        (e = !0);
                    })(navigator.userAgent || navigator.vendor || window.opera),
                    e
                  );
                },
              },
              {
                key: "mobile",
                value: function () {
                  var e = !1;
                  return (
                    (function (t) {
                      (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                        t
                      ) ||
                        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                          t.substr(0, 4)
                        )) &&
                        (e = !0);
                    })(navigator.userAgent || navigator.vendor || window.opera),
                    e
                  );
                },
              },
              {
                key: "tablet",
                value: function () {
                  return this.mobile() && !this.phone();
                },
              },
            ]),
            e
          );
        })();
      t["default"] = new i();
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = function (e, t, o) {
          var n = e.node.getAttribute("data-aos-once");
          t > e.position
            ? e.node.classList.add("aos-animate")
            : "undefined" != typeof n &&
              ("false" === n || (!o && "true" !== n)) &&
              e.node.classList.remove("aos-animate");
        },
        n = function (e, t) {
          var n = window.pageYOffset,
            i = window.innerHeight;
          e.forEach(function (e, a) {
            o(e, i + n, t);
          });
        };
      t["default"] = n;
    },
    function (e, t, o) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = o(11),
        a = n(i),
        r = function (e, t) {
          return (
            e.forEach(function (e, o) {
              e.node.classList.add("aos-init"),
                (e.position = (0, a["default"])(e.node, t.offset));
            }),
            e
          );
        };
      t["default"] = r;
    },
    function (e, t, o) {
      "use strict";
      function n(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = o(12),
        a = n(i),
        r = function (e, t) {
          var o = 0,
            n = 0,
            i = window.innerHeight,
            r = {
              offset: e.getAttribute("data-aos-offset"),
              anchor: e.getAttribute("data-aos-anchor"),
              anchorPlacement: e.getAttribute("data-aos-anchor-placement"),
            };
          switch (
            (r.offset && !isNaN(r.offset) && (n = parseInt(r.offset)),
            r.anchor &&
              document.querySelectorAll(r.anchor) &&
              (e = document.querySelectorAll(r.anchor)[0]),
            (o = (0, a["default"])(e).top),
            r.anchorPlacement)
          ) {
            case "top-bottom":
              break;
            case "center-bottom":
              o += e.offsetHeight / 2;
              break;
            case "bottom-bottom":
              o += e.offsetHeight;
              break;
            case "top-center":
              o += i / 2;
              break;
            case "bottom-center":
              o += i / 2 + e.offsetHeight;
              break;
            case "center-center":
              o += i / 2 + e.offsetHeight / 2;
              break;
            case "top-top":
              o += i;
              break;
            case "bottom-top":
              o += e.offsetHeight + i;
              break;
            case "center-top":
              o += e.offsetHeight / 2 + i;
          }
          return r.anchorPlacement || r.offset || isNaN(t) || (n = t), o + n;
        };
      t["default"] = r;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = function (e) {
        for (
          var t = 0, o = 0;
          e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);

        )
          (t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0)),
            (o += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0)),
            (e = e.offsetParent);
        return { top: o, left: t };
      };
      t["default"] = o;
    },
    function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var o = function (e) {
        e = e || document.querySelectorAll("[data-aos]");
        var t = [];
        return (
          [].forEach.call(e, function (e, o) {
            t.push({ node: e });
          }),
          t
        );
      };
      t["default"] = o;
    },
  ]);
});
/*-----------------------------------------------------------------------------------*/
/*	06. PLYR
/*-----------------------------------------------------------------------------------*/
!(function (e, t) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = t(e, document))
    : "function" == typeof define && define.amd
    ? define([], function () {
        return t(e, document);
      })
    : (e.plyr = t(e, document));
})("undefined" != typeof window ? window : this, function (e, t) {
  "use strict";
  function n() {
    var e,
      n,
      r,
      a = navigator.userAgent,
      s = navigator.appName,
      o = "" + parseFloat(navigator.appVersion),
      i = parseInt(navigator.appVersion, 10),
      l = !1,
      u = !1,
      c = !1,
      d = !1;
    return (
      navigator.appVersion.indexOf("Windows NT") !== -1 &&
      navigator.appVersion.indexOf("rv:11") !== -1
        ? ((l = !0), (s = "IE"), (o = "11"))
        : (n = a.indexOf("MSIE")) !== -1
        ? ((l = !0), (s = "IE"), (o = a.substring(n + 5)))
        : (n = a.indexOf("Chrome")) !== -1
        ? ((c = !0), (s = "Chrome"), (o = a.substring(n + 7)))
        : (n = a.indexOf("Safari")) !== -1
        ? ((d = !0),
          (s = "Safari"),
          (o = a.substring(n + 7)),
          (n = a.indexOf("Version")) !== -1 && (o = a.substring(n + 8)))
        : (n = a.indexOf("Firefox")) !== -1
        ? ((u = !0), (s = "Firefox"), (o = a.substring(n + 8)))
        : (e = a.lastIndexOf(" ") + 1) <
            (n = a.lastIndexOf("https://demos.elemisthemes.com/")) &&
          ((s = a.substring(e, n)),
          (o = a.substring(n + 1)),
          s.toLowerCase() === s.toUpperCase() && (s = navigator.appName)),
      (r = o.indexOf(";")) !== -1 && (o = o.substring(0, r)),
      (r = o.indexOf(" ")) !== -1 && (o = o.substring(0, r)),
      (i = parseInt("" + o, 10)),
      isNaN(i) &&
        ((o = "" + parseFloat(navigator.appVersion)),
        (i = parseInt(navigator.appVersion, 10))),
      {
        name: s,
        version: i,
        isIE: l,
        isFirefox: u,
        isChrome: c,
        isSafari: d,
        isIos: /(iPad|iPhone|iPod)/g.test(navigator.platform),
        isIphone: /(iPhone|iPod)/g.test(navigator.userAgent),
        isTouch: "ontouchstart" in t.documentElement,
      }
    );
  }
  function r(e, t) {
    var n = e.media;
    if ("video" === e.type)
      switch (t) {
        case "video/webm":
          return !(
            !n.canPlayType ||
            !n.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, "")
          );
        case "video/mp4":
          return !(
            !n.canPlayType ||
            !n
              .canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')
              .replace(/no/, "")
          );
        case "video/ogg":
          return !(
            !n.canPlayType ||
            !n.canPlayType('video/ogg; codecs="theora"').replace(/no/, "")
          );
      }
    else if ("audio" === e.type)
      switch (t) {
        case "audio/mpeg":
          return !(
            !n.canPlayType || !n.canPlayType("audio/mpeg;").replace(/no/, "")
          );
        case "audio/ogg":
          return !(
            !n.canPlayType ||
            !n.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, "")
          );
        case "audio/wav":
          return !(
            !n.canPlayType ||
            !n.canPlayType('audio/wav; codecs="1"').replace(/no/, "")
          );
      }
    return !1;
  }
  function a(e) {
    if (!t.querySelectorAll('script[src="' + e + '"]').length) {
      var n = t.createElement("script");
      n.src = e;
      var r = t.getElementsByTagName("script")[0];
      r.parentNode.insertBefore(n, r);
    }
  }
  function s(e, t) {
    return Array.prototype.indexOf && e.indexOf(t) !== -1;
  }
  function o(e, t, n) {
    return e.replace(
      new RegExp(t.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"),
      n
    );
  }
  function i(e, t) {
    e.length || (e = [e]);
    for (var n = e.length - 1; n >= 0; n--) {
      var r = n > 0 ? t.cloneNode(!0) : t,
        a = e[n],
        s = a.parentNode,
        o = a.nextSibling;
      return r.appendChild(a), o ? s.insertBefore(r, o) : s.appendChild(r), r;
    }
  }
  function l(e) {
    e && e.parentNode.removeChild(e);
  }
  function u(e, t) {
    e.insertBefore(t, e.firstChild);
  }
  function c(e, t) {
    for (var n in t) e.setAttribute(n, O.boolean(t[n]) && t[n] ? "" : t[n]);
  }
  function d(e, n, r) {
    var a = t.createElement(e);
    c(a, r), u(n, a);
  }
  function p(e) {
    return e.replace(".", "");
  }
  function m(e, t, n) {
    if (e)
      if (e.classList) e.classList[n ? "add" : "remove"](t);
      else {
        var r = (" " + e.className + " ")
          .replace(/\s+/g, " ")
          .replace(" " + t + " ", "");
        e.className = r + (n ? " " + t : "");
      }
  }
  function f(e, t) {
    return (
      !!e &&
      (e.classList
        ? e.classList.contains(t)
        : new RegExp("(\\s|^)" + t + "(\\s|$)").test(e.className))
    );
  }
  function y(e, n) {
    var r = Element.prototype,
      a =
        r.matches ||
        r.webkitMatchesSelector ||
        r.mozMatchesSelector ||
        r.msMatchesSelector ||
        function (e) {
          return [].indexOf.call(t.querySelectorAll(e), this) !== -1;
        };
    return a.call(e, n);
  }
  function b(e, t, n, r, a) {
    g(
      e,
      t,
      function (t) {
        n && n.apply(e, [t]), r.apply(e, [t]);
      },
      a
    );
  }
  function v(e, t, n, r, a) {
    var s = t.split(" ");
    if ((O.boolean(a) || (a = !1), e instanceof NodeList))
      for (var o = 0; o < e.length; o++)
        e[o] instanceof Node &&
          v(e[o], arguments[1], arguments[2], arguments[3]);
    else
      for (var i = 0; i < s.length; i++)
        e[r ? "addEventListener" : "removeEventListener"](s[i], n, a);
  }
  function g(e, t, n, r) {
    e && v(e, t, n, !0, r);
  }
  function h(e, t, n, r) {
    if (e && t) {
      O.boolean(n) || (n = !1);
      var a = new CustomEvent(t, { bubbles: n, detail: r });
      e.dispatchEvent(a);
    }
  }
  function k(e, t) {
    if (e)
      return (
        (t = O.boolean(t) ? t : !e.getAttribute("aria-pressed")),
        e.setAttribute("aria-pressed", t),
        t
      );
  }
  function w(e, t) {
    return 0 === e || 0 === t || isNaN(e) || isNaN(t)
      ? 0
      : ((e / t) * 100).toFixed(2);
  }
  function x() {
    var e = arguments;
    if (e.length) {
      if (1 === e.length) return e[0];
      for (
        var t = Array.prototype.shift.call(e), n = e.length, r = 0;
        r < n;
        r++
      ) {
        var a = e[r];
        for (var s in a)
          a[s] && a[s].constructor && a[s].constructor === Object
            ? ((t[s] = t[s] || {}), x(t[s], a[s]))
            : (t[s] = a[s]);
      }
      return t;
    }
  }
  function T(e) {
    var t = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    return e.match(t) ? RegExp.$2 : e;
  }
  function S(e) {
    var t = /^.*(vimeo.com\/|video\/)(\d+).*/;
    return e.match(t) ? RegExp.$2 : e;
  }
  function _() {
    var e = {
        supportsFullScreen: !1,
        isFullScreen: function () {
          return !1;
        },
        requestFullScreen: function () {},
        cancelFullScreen: function () {},
        fullScreenEventName: "",
        element: null,
        prefix: "",
      },
      n = "webkit o moz ms khtml".split(" ");
    if (O.undefined(t.cancelFullScreen))
      for (var r = 0, a = n.length; r < a; r++) {
        if (
          ((e.prefix = n[r]), !O.undefined(t[e.prefix + "CancelFullScreen"]))
        ) {
          e.supportsFullScreen = !0;
          break;
        }
        if (!O.undefined(t.msExitFullscreen) && t.msFullscreenEnabled) {
          (e.prefix = "ms"), (e.supportsFullScreen = !0);
          break;
        }
      }
    else e.supportsFullScreen = !0;
    return (
      e.supportsFullScreen &&
        ((e.fullScreenEventName =
          "ms" === e.prefix
            ? "MSFullscreenChange"
            : e.prefix + "fullscreenchange"),
        (e.isFullScreen = function (e) {
          switch ((O.undefined(e) && (e = t.body), this.prefix)) {
            case "":
              return t.fullscreenElement === e;
            case "moz":
              return t.mozFullScreenElement === e;
            default:
              return t[this.prefix + "FullscreenElement"] === e;
          }
        }),
        (e.requestFullScreen = function (e) {
          return (
            O.undefined(e) && (e = t.body),
            "" === this.prefix
              ? e.requestFullScreen()
              : e[
                  this.prefix +
                    ("ms" === this.prefix
                      ? "RequestFullscreen"
                      : "RequestFullScreen")
                ]()
          );
        }),
        (e.cancelFullScreen = function () {
          return "" === this.prefix
            ? t.cancelFullScreen()
            : t[
                this.prefix +
                  ("ms" === this.prefix ? "ExitFullscreen" : "CancelFullScreen")
              ]();
        }),
        (e.element = function () {
          return "" === this.prefix
            ? t.fullscreenElement
            : t[this.prefix + "FullscreenElement"];
        })),
      e
    );
  }
  function E(v, E) {
    function A(e, t, n, r) {
      h(e, t, n, x({}, r, { plyr: Ue }));
    }
    function j(t, n) {
      E.debug &&
        e.console &&
        ((n = Array.prototype.slice.call(n)),
        O.string(E.logPrefix) && E.logPrefix.length && n.unshift(E.logPrefix),
        console[t].apply(console, n));
    }
    function V() {
      return {
        url: E.iconUrl,
        absolute: 0 === E.iconUrl.indexOf("http") || Be.browser.isIE,
      };
    }
    function R() {
      var e = [],
        t = V(),
        n = (t.absolute ? "" : t.url) + "#" + E.iconPrefix;
      return (
        s(E.controls, "play-large") &&
          e.push(
            '<button type="button" data-plyr="play" class="plyr__play-large">',
            '<svg><use xlink:href="' + n + '-play" /></svg>',
            '<span class="plyr__sr-only">' + E.i18n.play + "</span>",
            "</button>"
          ),
        e.push('<div class="plyr__controls">'),
        s(E.controls, "restart") &&
          e.push(
            '<button type="button" data-plyr="restart">',
            '<svg><use xlink:href="' + n + '-restart" /></svg>',
            '<span class="plyr__sr-only">' + E.i18n.restart + "</span>",
            "</button>"
          ),
        s(E.controls, "rewind") &&
          e.push(
            '<button type="button" data-plyr="rewind">',
            '<svg><use xlink:href="' + n + '-rewind" /></svg>',
            '<span class="plyr__sr-only">' + E.i18n.rewind + "</span>",
            "</button>"
          ),
        s(E.controls, "play") &&
          e.push(
            '<button type="button" data-plyr="play">',
            '<svg><use xlink:href="' + n + '-play" /></svg>',
            '<span class="plyr__sr-only">' + E.i18n.play + "</span>",
            "</button>",
            '<button type="button" data-plyr="pause">',
            '<svg><use xlink:href="' + n + '-pause" /></svg>',
            '<span class="plyr__sr-only">' + E.i18n.pause + "</span>",
            "</button>"
          ),
        s(E.controls, "fast-forward") &&
          e.push(
            '<button type="button" data-plyr="fast-forward">',
            '<svg><use xlink:href="' + n + '-fast-forward" /></svg>',
            '<span class="plyr__sr-only">' + E.i18n.forward + "</span>",
            "</button>"
          ),
        s(E.controls, "progress") &&
          (e.push(
            '<span class="plyr__progress">',
            '<label for="seek{id}" class="plyr__sr-only">Seek</label>',
            '<input id="seek{id}" class="plyr__progress--seek" type="range" min="0" max="100" step="0.1" value="0" data-plyr="seek">',
            '<progress class="plyr__progress--played" max="100" value="0" role="presentation"></progress>',
            '<progress class="plyr__progress--buffer" max="100" value="0">',
            "<span>0</span>% " + E.i18n.buffered,
            "</progress>"
          ),
          E.tooltips.seek && e.push('<span class="plyr__tooltip">00:00</span>'),
          e.push("</span>")),
        s(E.controls, "current-time") &&
          e.push(
            '<span class="plyr__time">',
            '<span class="plyr__sr-only">' + E.i18n.currentTime + "</span>",
            '<span class="plyr__time--current">00:00</span>',
            "</span>"
          ),
        s(E.controls, "duration") &&
          e.push(
            '<span class="plyr__time">',
            '<span class="plyr__sr-only">' + E.i18n.duration + "</span>",
            '<span class="plyr__time--duration">00:00</span>',
            "</span>"
          ),
        s(E.controls, "mute") &&
          e.push(
            '<button type="button" data-plyr="mute">',
            '<svg class="icon--muted"><use xlink:href="' +
              n +
              '-muted" /></svg>',
            '<svg><use xlink:href="' + n + '-volume" /></svg>',
            '<span class="plyr__sr-only">' + E.i18n.toggleMute + "</span>",
            "</button>"
          ),
        s(E.controls, "volume") &&
          e.push(
            '<span class="plyr__volume">',
            '<label for="volume{id}" class="plyr__sr-only">' +
              E.i18n.volume +
              "</label>",
            '<input id="volume{id}" class="plyr__volume--input" type="range" min="' +
              E.volumeMin +
              '" max="' +
              E.volumeMax +
              '" value="' +
              E.volume +
              '" data-plyr="volume">',
            '<progress class="plyr__volume--display" max="' +
              E.volumeMax +
              '" value="' +
              E.volumeMin +
              '" role="presentation"></progress>',
            "</span>"
          ),
        s(E.controls, "captions") &&
          e.push(
            '<button type="button" data-plyr="captions">',
            '<svg class="icon--captions-on"><use xlink:href="' +
              n +
              '-captions-on" /></svg>',
            '<svg><use xlink:href="' + n + '-captions-off" /></svg>',
            '<span class="plyr__sr-only">' + E.i18n.toggleCaptions + "</span>",
            "</button>"
          ),
        s(E.controls, "fullscreen") &&
          e.push(
            '<button type="button" data-plyr="fullscreen">',
            '<svg class="icon--exit-fullscreen"><use xlink:href="' +
              n +
              '-exit-fullscreen" /></svg>',
            '<svg><use xlink:href="' + n + '-enter-fullscreen" /></svg>',
            '<span class="plyr__sr-only">' +
              E.i18n.toggleFullscreen +
              "</span>",
            "</button>"
          ),
        e.push("</div>"),
        e.join("")
      );
    }
    function q() {
      if (
        Be.supported.full &&
        ("audio" !== Be.type || E.fullscreen.allowAudio) &&
        E.fullscreen.enabled
      ) {
        var e = N.supportsFullScreen;
        e || (E.fullscreen.fallback && !X())
          ? (Je((e ? "Native" : "Fallback") + " fullscreen enabled"),
            m(Be.container, E.classes.fullscreen.enabled, !0))
          : Je("Fullscreen not supported and fallback disabled"),
          Be.buttons && Be.buttons.fullscreen && k(Be.buttons.fullscreen, !1),
          $();
      }
    }
    function D() {
      if ("video" === Be.type) {
        B(E.selectors.captions) ||
          Be.videoContainer.insertAdjacentHTML(
            "afterbegin",
            '<div class="' + p(E.selectors.captions) + '"></div>'
          ),
          (Be.usingTextTracks = !1),
          Be.media.textTracks && (Be.usingTextTracks = !0);
        for (var e, t = "", n = Be.media.childNodes, r = 0; r < n.length; r++)
          "track" === n[r].nodeName.toLowerCase() &&
            ((e = n[r].kind),
            ("captions" !== e && "subtitles" !== e) ||
              (t = n[r].getAttribute("src")));
        if (
          ((Be.captionExists = !0),
          "" === t
            ? ((Be.captionExists = !1), Je("No caption track found"))
            : Je("Caption track found; URI: " + t),
          Be.captionExists)
        ) {
          for (var a = Be.media.textTracks, s = 0; s < a.length; s++)
            a[s].mode = "hidden";
          if (
            (Y(Be),
            ((Be.browser.isIE && Be.browser.version >= 10) ||
              (Be.browser.isFirefox && Be.browser.version >= 31)) &&
              (Je(
                "Detected browser with known TextTrack issues - using manual fallback"
              ),
              (Be.usingTextTracks = !1)),
            Be.usingTextTracks)
          ) {
            Je("TextTracks supported");
            for (var o = 0; o < a.length; o++) {
              var i = a[o];
              ("captions" !== i.kind && "subtitles" !== i.kind) ||
                g(i, "cuechange", function () {
                  this.activeCues[0] && "text" in this.activeCues[0]
                    ? H(this.activeCues[0].getCueAsHTML())
                    : H();
                });
            }
          } else if (
            (Je("TextTracks not supported so rendering captions manually"),
            (Be.currentCaption = ""),
            (Be.captions = []),
            "" !== t)
          ) {
            var l = new XMLHttpRequest();
            (l.onreadystatechange = function () {
              if (4 === l.readyState)
                if (200 === l.status) {
                  var e,
                    t = [],
                    n = l.responseText,
                    r = "\r\n";
                  n.indexOf(r + r) === -1 &&
                    (r = n.indexOf("\r\r") !== -1 ? "\r" : "\n"),
                    (t = n.split(r + r));
                  for (var a = 0; a < t.length; a++) {
                    (e = t[a]), (Be.captions[a] = []);
                    var s = e.split(r),
                      o = 0;
                    s[o].indexOf(":") === -1 && (o = 1),
                      (Be.captions[a] = [s[o], s[o + 1]]);
                  }
                  Be.captions.shift(),
                    Je("Successfully loaded the caption file via AJAX");
                } else
                  ze(
                    E.logPrefix +
                      "There was a problem loading the caption file via AJAX"
                  );
            }),
              l.open("get.html", t, !0),
              l.send();
          }
        } else m(Be.container, E.classes.captions.enabled);
      }
    }
    function H(e) {
      var n = B(E.selectors.captions),
        r = t.createElement("span");
      (n.innerHTML = ""),
        O.undefined(e) && (e = ""),
        O.string(e) ? (r.innerHTML = e.trim()) : r.appendChild(e),
        n.appendChild(r);
      n.offsetHeight;
    }
    function W(e) {
      function t(e, t) {
        var n = [];
        n = e.split(" --> ");
        for (var r = 0; r < n.length; r++)
          n[r] = n[r].replace(/(\d+:\d+:\d+\.\d+).*/, "$1");
        return a(n[t]);
      }
      function n(e) {
        return t(e, 0);
      }
      function r(e) {
        return t(e, 1);
      }
      function a(e) {
        if (null === e || void 0 === e) return 0;
        var t,
          n = [],
          r = [];
        return (
          (n = e.split(",")),
          (r = n[0].split(":")),
          (t =
            Math.floor(60 * r[0] * 60) +
            Math.floor(60 * r[1]) +
            Math.floor(r[2]))
        );
      }
      if (
        !Be.usingTextTracks &&
        "video" === Be.type &&
        Be.supported.full &&
        ((Be.subcount = 0),
        (e = O.number(e) ? e : Be.media.currentTime),
        Be.captions[Be.subcount])
      ) {
        for (; r(Be.captions[Be.subcount][0]) < e.toFixed(1); )
          if ((Be.subcount++, Be.subcount > Be.captions.length - 1)) {
            Be.subcount = Be.captions.length - 1;
            break;
          }
        Be.media.currentTime.toFixed(1) >= n(Be.captions[Be.subcount][0]) &&
        Be.media.currentTime.toFixed(1) <= r(Be.captions[Be.subcount][0])
          ? ((Be.currentCaption = Be.captions[Be.subcount][1]),
            H(Be.currentCaption))
          : H();
      }
    }
    function Y() {
      if (Be.buttons.captions) {
        m(Be.container, E.classes.captions.enabled, !0);
        var e = Be.storage.captionsEnabled;
        O.boolean(e) || (e = E.captions.defaultActive),
          e &&
            (m(Be.container, E.classes.captions.active, !0),
            k(Be.buttons.captions, !0));
      }
    }
    function U(e) {
      return Be.container.querySelectorAll(e);
    }
    function B(e) {
      return U(e)[0];
    }
    function X() {
      try {
        return e.self !== e.top;
      } catch (e) {
        return !0;
      }
    }
    function $() {
      function e(e) {
        9 === e.which &&
          Be.isFullscreen &&
          (e.target !== r || e.shiftKey
            ? e.target === n && e.shiftKey && (e.preventDefault(), r.focus())
            : (e.preventDefault(), n.focus()));
      }
      var t = U("input:not([disabled]), button:not([disabled])"),
        n = t[0],
        r = t[t.length - 1];
      g(Be.container, "keydown", e);
    }
    function J(e, t) {
      if (O.string(t)) d(e, Be.media, { src: t });
      else if (t.constructor === Array)
        for (var n = t.length - 1; n >= 0; n--) d(e, Be.media, t[n]);
    }
    function z() {
      if (E.loadSprite) {
        var e = V();
        e.absolute
          ? (Je(
              "AJAX loading absolute SVG sprite" +
                (Be.browser.isIE ? " (due to IE)" : "")
            ),
            C(e.url, "sprite-plyr"))
          : Je("Sprite will be used as external resource directly");
      }
      var n = E.html;
      Je("Injecting custom controls"),
        n || (n = R()),
        (n = o(n, "{seektime}", E.seekTime)),
        (n = o(n, "{id}", Math.floor(1e4 * Math.random())));
      var r;
      if (
        (O.string(E.selectors.controls.container) &&
          (r = t.querySelector(E.selectors.controls.container)),
        O.htmlElement(r) || (r = Be.container),
        r.insertAdjacentHTML("beforeend", n),
        E.tooltips.controls)
      )
        for (
          var a = U(
              [
                E.selectors.controls.wrapper,
                " ",
                E.selectors.labels,
                " .",
                E.classes.hidden,
              ].join("")
            ),
            s = a.length - 1;
          s >= 0;
          s--
        ) {
          var i = a[s];
          m(i, E.classes.hidden, !1), m(i, E.classes.tooltip, !0);
        }
    }
    function G() {
      try {
        return (
          (Be.controls = B(E.selectors.controls.wrapper)),
          (Be.buttons = {}),
          (Be.buttons.seek = B(E.selectors.buttons.seek)),
          (Be.buttons.play = U(E.selectors.buttons.play)),
          (Be.buttons.pause = B(E.selectors.buttons.pause)),
          (Be.buttons.restart = B(E.selectors.buttons.restart)),
          (Be.buttons.rewind = B(E.selectors.buttons.rewind)),
          (Be.buttons.forward = B(E.selectors.buttons.forward)),
          (Be.buttons.fullscreen = B(E.selectors.buttons.fullscreen)),
          (Be.buttons.mute = B(E.selectors.buttons.mute)),
          (Be.buttons.captions = B(E.selectors.buttons.captions)),
          (Be.progress = {}),
          (Be.progress.container = B(E.selectors.progress.container)),
          (Be.progress.buffer = {}),
          (Be.progress.buffer.bar = B(E.selectors.progress.buffer)),
          (Be.progress.buffer.text =
            Be.progress.buffer.bar &&
            Be.progress.buffer.bar.getElementsByTagName("span")[0]),
          (Be.progress.played = B(E.selectors.progress.played)),
          (Be.progress.tooltip =
            Be.progress.container &&
            Be.progress.container.querySelector("." + E.classes.tooltip)),
          (Be.volume = {}),
          (Be.volume.input = B(E.selectors.volume.input)),
          (Be.volume.display = B(E.selectors.volume.display)),
          (Be.duration = B(E.selectors.duration)),
          (Be.currentTime = B(E.selectors.currentTime)),
          (Be.seekTime = U(E.selectors.seekTime)),
          !0
        );
      } catch (e) {
        return (
          ze("It looks like there is a problem with your controls HTML"),
          Q(!0),
          !1
        );
      }
    }
    function K() {
      m(
        Be.container,
        E.selectors.container.replace(".", ""),
        Be.supported.full
      );
    }
    function Q(e) {
      e && s(E.types.html5, Be.type)
        ? Be.media.setAttribute("controls", "")
        : Be.media.removeAttribute("controls");
    }
    function Z(e) {
      var t = E.i18n.play;
      if (
        (O.string(E.title) &&
          E.title.length &&
          ((t += ", " + E.title),
          Be.container.setAttribute("aria-label", E.title)),
        Be.supported.full && Be.buttons.play)
      )
        for (var n = Be.buttons.play.length - 1; n >= 0; n--)
          Be.buttons.play[n].setAttribute("aria-label", t);
      O.htmlElement(e) &&
        e.setAttribute("title", E.i18n.frameTitle.replace("{title}", E.title));
    }
    function ee() {
      var t = null;
      (Be.storage = {}),
        L.supported &&
          E.storage.enabled &&
          (e.localStorage.removeItem("plyr-volume"),
          (t = e.localStorage.getItem(E.storage.key)),
          t &&
            (/^\d+(\.\d+)?$/.test(t)
              ? te({ volume: parseFloat(t) })
              : (Be.storage = JSON.parse(t))));
    }
    function te(t) {
      L.supported &&
        E.storage.enabled &&
        (x(Be.storage, t),
        e.localStorage.setItem(E.storage.key, JSON.stringify(Be.storage)));
    }
    function ne() {
      if (!Be.media) return void ze("No media element found!");
      if (
        Be.supported.full &&
        (m(Be.container, E.classes.type.replace("{0}", Be.type), !0),
        s(E.types.embed, Be.type) &&
          m(Be.container, E.classes.type.replace("{0}", "video"), !0),
        m(Be.container, E.classes.stopped, E.autoplay),
        m(Be.container, E.classes.isIos, Be.browser.isIos),
        m(Be.container, E.classes.isTouch, Be.browser.isTouch),
        "video" === Be.type)
      ) {
        var e = t.createElement("div");
        e.setAttribute("class", E.classes.videoWrapper),
          i(Be.media, e),
          (Be.videoContainer = e);
      }
      s(E.types.embed, Be.type) && re();
    }
    function re() {
      var n,
        r = t.createElement("div"),
        s = Be.type + "-" + Math.floor(1e4 * Math.random());
      switch (Be.type) {
        case "youtube":
          n = T(Be.embedId);
          break;
        case "vimeo":
          n = S(Be.embedId);
          break;
        default:
          n = Be.embedId;
      }
      for (var o = U('[id^="' + Be.type + '-"]'), i = o.length - 1; i >= 0; i--)
        l(o[i]);
      if (
        (m(Be.media, E.classes.videoWrapper, !0),
        m(Be.media, E.classes.embedWrapper, !0),
        "youtube" === Be.type)
      )
        Be.media.appendChild(r),
          r.setAttribute("id", s),
          O.object(e.YT)
            ? se(n, r)
            : (a(E.urls.youtube.api),
              (e.onYouTubeReadyCallbacks = e.onYouTubeReadyCallbacks || []),
              e.onYouTubeReadyCallbacks.push(function () {
                se(n, r);
              }),
              (e.onYouTubeIframeAPIReady = function () {
                e.onYouTubeReadyCallbacks.forEach(function (e) {
                  e();
                });
              }));
      else if ("vimeo" === Be.type)
        if (
          (Be.supported.full ? Be.media.appendChild(r) : (r = Be.media),
          r.setAttribute("id", s),
          O.object(e.Vimeo))
        )
          oe(n, r);
        else {
          a(E.urls.vimeo.api);
          var u = e.setInterval(function () {
            O.object(e.Vimeo) && (e.clearInterval(u), oe(n, r));
          }, 50);
        }
      else if ("soundcloud" === Be.type) {
        var d = t.createElement("iframe");
        (d.loaded = !1),
          g(d, "load", function () {
            d.loaded = !0;
          }),
          c(d, {
            src:
              "https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/" +
              n,
            id: s,
          }),
          r.appendChild(d),
          Be.media.appendChild(r),
          e.SC || a(E.urls.soundcloud.api);
        var p = e.setInterval(function () {
          e.SC && d.loaded && (e.clearInterval(p), ie.call(d));
        }, 50);
      }
    }
    function ae() {
      Be.supported.full && (We(), Ye()), Z(B("iframe"));
    }
    function se(t, n) {
      Be.embed = new e.YT.Player(n.id, {
        videoId: t,
        playerVars: {
          autoplay: E.autoplay ? 1 : 0,
          controls: Be.supported.full ? 0 : 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          cc_load_policy: E.captions.defaultActive ? 1 : 0,
          cc_lang_pref: "en",
          wmode: "transparent",
          modestbranding: 1,
          disablekb: 1,
          origin: "*",
        },
        events: {
          onError: function (e) {
            A(Be.container, "error", !0, { code: e.data, embed: e.target });
          },
          onReady: function (t) {
            var n = t.target;
            (Be.media.play = function () {
              n.playVideo(), (Be.media.paused = !1);
            }),
              (Be.media.pause = function () {
                n.pauseVideo(), (Be.media.paused = !0);
              }),
              (Be.media.stop = function () {
                n.stopVideo(), (Be.media.paused = !0);
              }),
              (Be.media.duration = n.getDuration()),
              (Be.media.paused = !0),
              (Be.media.currentTime = 0),
              (Be.media.muted = n.isMuted()),
              (E.title = n.getVideoData().title),
              Be.supported.full &&
                Be.media.querySelector("iframe").setAttribute("tabindex", "-1"),
              ae(),
              A(Be.media, "timeupdate"),
              A(Be.media, "durationchange"),
              e.clearInterval(Xe.buffering),
              (Xe.buffering = e.setInterval(function () {
                (Be.media.buffered = n.getVideoLoadedFraction()),
                  (null === Be.media.lastBuffered ||
                    Be.media.lastBuffered < Be.media.buffered) &&
                    A(Be.media, "progress"),
                  (Be.media.lastBuffered = Be.media.buffered),
                  1 === Be.media.buffered &&
                    (e.clearInterval(Xe.buffering),
                    A(Be.media, "canplaythrough"));
              }, 200));
          },
          onStateChange: function (t) {
            var n = t.target;
            switch ((e.clearInterval(Xe.playing), t.data)) {
              case 0:
                (Be.media.paused = !0), A(Be.media, "ended");
                break;
              case 1:
                (Be.media.paused = !1),
                  Be.media.seeking && A(Be.media, "seeked"),
                  (Be.media.seeking = !1),
                  A(Be.media, "play"),
                  A(Be.media, "playing"),
                  (Xe.playing = e.setInterval(function () {
                    (Be.media.currentTime = n.getCurrentTime()),
                      A(Be.media, "timeupdate");
                  }, 100)),
                  Be.media.duration !== n.getDuration() &&
                    ((Be.media.duration = n.getDuration()),
                    A(Be.media, "durationchange"));
                break;
              case 2:
                (Be.media.paused = !0), A(Be.media, "pause");
            }
            A(Be.container, "statechange", !1, { code: t.data });
          },
        },
      });
    }
    function oe(t, n) {
      (Be.embed = new e.Vimeo.Player(n, {
        id: parseInt(t),
        loop: E.loop,
        autoplay: E.autoplay,
        byline: !1,
        portrait: !1,
        title: !1,
      })),
        (Be.media.play = function () {
          Be.embed.play(), (Be.media.paused = !1);
        }),
        (Be.media.pause = function () {
          Be.embed.pause(), (Be.media.paused = !0);
        }),
        (Be.media.stop = function () {
          Be.embed.stop(), (Be.media.paused = !0);
        }),
        (Be.media.paused = !0),
        (Be.media.currentTime = 0),
        ae(),
        Be.embed.getCurrentTime().then(function (e) {
          (Be.media.currentTime = e), A(Be.media, "timeupdate");
        }),
        Be.embed.getDuration().then(function (e) {
          (Be.media.duration = e), A(Be.media, "durationchange");
        }),
        Be.embed.on("loaded", function () {
          O.htmlElement(Be.embed.element) &&
            Be.supported.full &&
            Be.embed.element.setAttribute("tabindex", "-1");
        }),
        Be.embed.on("play", function () {
          (Be.media.paused = !1), A(Be.media, "play"), A(Be.media, "playing");
        }),
        Be.embed.on("pause", function () {
          (Be.media.paused = !0), A(Be.media, "pause");
        }),
        Be.embed.on("timeupdate", function (e) {
          (Be.media.seeking = !1),
            (Be.media.currentTime = e.seconds),
            A(Be.media, "timeupdate");
        }),
        Be.embed.on("progress", function (e) {
          (Be.media.buffered = e.percent),
            A(Be.media, "progress"),
            1 === parseInt(e.percent) && A(Be.media, "canplaythrough");
        }),
        Be.embed.on("seeked", function () {
          (Be.media.seeking = !1), A(Be.media, "seeked"), A(Be.media, "play");
        }),
        Be.embed.on("ended", function () {
          (Be.media.paused = !0), A(Be.media, "ended");
        });
    }
    function ie() {
      (Be.embed = e.SC.Widget(this)),
        Be.embed.bind(e.SC.Widget.Events.READY, function () {
          (Be.media.play = function () {
            Be.embed.play(), (Be.media.paused = !1);
          }),
            (Be.media.pause = function () {
              Be.embed.pause(), (Be.media.paused = !0);
            }),
            (Be.media.stop = function () {
              Be.embed.seekTo(0), Be.embed.pause(), (Be.media.paused = !0);
            }),
            (Be.media.paused = !0),
            (Be.media.currentTime = 0),
            Be.embed.getDuration(function (e) {
              (Be.media.duration = e / 1e3), ae();
            }),
            Be.embed.getPosition(function (e) {
              (Be.media.currentTime = e), A(Be.media, "timeupdate");
            }),
            Be.embed.bind(e.SC.Widget.Events.PLAY, function () {
              (Be.media.paused = !1),
                A(Be.media, "play"),
                A(Be.media, "playing");
            }),
            Be.embed.bind(e.SC.Widget.Events.PAUSE, function () {
              (Be.media.paused = !0), A(Be.media, "pause");
            }),
            Be.embed.bind(e.SC.Widget.Events.PLAY_PROGRESS, function (e) {
              (Be.media.seeking = !1),
                (Be.media.currentTime = e.currentPosition / 1e3),
                A(Be.media, "timeupdate");
            }),
            Be.embed.bind(e.SC.Widget.Events.LOAD_PROGRESS, function (e) {
              (Be.media.buffered = e.loadProgress),
                A(Be.media, "progress"),
                1 === parseInt(e.loadProgress) && A(Be.media, "canplaythrough");
            }),
            Be.embed.bind(e.SC.Widget.Events.FINISH, function () {
              (Be.media.paused = !0), A(Be.media, "ended");
            });
        });
    }
    function le() {
      "play" in Be.media && Be.media.play();
    }
    function ue() {
      "pause" in Be.media && Be.media.pause();
    }
    function ce(e) {
      return O.boolean(e) || (e = Be.media.paused), e ? le() : ue(), e;
    }
    function de(e) {
      O.number(e) || (e = E.seekTime), me(Be.media.currentTime - e);
    }
    function pe(e) {
      O.number(e) || (e = E.seekTime), me(Be.media.currentTime + e);
    }
    function me(e) {
      var t = 0,
        n = Be.media.paused,
        r = fe();
      O.number(e)
        ? (t = e)
        : O.object(e) &&
          s(["input", "change"], e.type) &&
          (t = (e.target.value / e.target.max) * r),
        t < 0 ? (t = 0) : t > r && (t = r),
        Ne(t);
      try {
        Be.media.currentTime = t.toFixed(4);
      } catch (e) {}
      if (s(E.types.embed, Be.type)) {
        switch (Be.type) {
          case "youtube":
            Be.embed.seekTo(t);
            break;
          case "vimeo":
            Be.embed.setCurrentTime(t.toFixed(0));
            break;
          case "soundcloud":
            Be.embed.seekTo(1e3 * t);
        }
        n && ue(),
          A(Be.media, "timeupdate"),
          (Be.media.seeking = !0),
          A(Be.media, "seeking");
      }
      Je("Seeking to " + Be.media.currentTime + " seconds"), W(t);
    }
    function fe() {
      var e = parseInt(E.duration),
        t = 0;
      return (
        null === Be.media.duration ||
          isNaN(Be.media.duration) ||
          (t = Be.media.duration),
        isNaN(e) ? t : e
      );
    }
    function ye() {
      m(Be.container, E.classes.playing, !Be.media.paused),
        m(Be.container, E.classes.stopped, Be.media.paused),
        Me(Be.media.paused);
    }
    function be() {
      P = { x: e.pageXOffset || 0, y: e.pageYOffset || 0 };
    }
    function ve() {
      e.scrollTo(P.x, P.y);
    }
    function ge(e) {
      var n = N.supportsFullScreen;
      if (n) {
        if (!e || e.type !== N.fullScreenEventName)
          return (
            N.isFullScreen(Be.container)
              ? N.cancelFullScreen()
              : (be(), N.requestFullScreen(Be.container)),
            void (Be.isFullscreen = N.isFullScreen(Be.container))
          );
        Be.isFullscreen = N.isFullScreen(Be.container);
      } else (Be.isFullscreen = !Be.isFullscreen), (t.body.style.overflow = Be.isFullscreen ? "hidden" : "");
      m(Be.container, E.classes.fullscreen.active, Be.isFullscreen),
        $(Be.isFullscreen),
        Be.buttons &&
          Be.buttons.fullscreen &&
          k(Be.buttons.fullscreen, Be.isFullscreen),
        A(
          Be.container,
          Be.isFullscreen ? "enterfullscreen" : "exitfullscreen",
          !0
        ),
        !Be.isFullscreen && n && ve();
    }
    function he(e) {
      if (
        (O.boolean(e) || (e = !Be.media.muted),
        k(Be.buttons.mute, e),
        (Be.media.muted = e),
        0 === Be.media.volume && ke(E.volume),
        s(E.types.embed, Be.type))
      ) {
        switch (Be.type) {
          case "youtube":
            Be.embed[Be.media.muted ? "mute" : "unMute"]();
            break;
          case "vimeo":
          case "soundcloud":
            Be.embed.setVolume(
              Be.media.muted ? 0 : parseFloat(E.volume / E.volumeMax)
            );
        }
        A(Be.media, "volumechange");
      }
    }
    function ke(e) {
      var t = E.volumeMax,
        n = E.volumeMin;
      if (
        (O.undefined(e) && (e = Be.storage.volume),
        (null === e || isNaN(e)) && (e = E.volume),
        e > t && (e = t),
        e < n && (e = n),
        (Be.media.volume = parseFloat(e / t)),
        Be.volume.display && (Be.volume.display.value = e),
        s(E.types.embed, Be.type))
      ) {
        switch (Be.type) {
          case "youtube":
            Be.embed.setVolume(100 * Be.media.volume);
            break;
          case "vimeo":
          case "soundcloud":
            Be.embed.setVolume(Be.media.volume);
        }
        A(Be.media, "volumechange");
      }
      0 === e ? (Be.media.muted = !0) : Be.media.muted && e > 0 && he();
    }
    function we(e) {
      var t = Be.media.muted ? 0 : Be.media.volume * E.volumeMax;
      O.number(e) || (e = E.volumeStep), ke(t + e);
    }
    function xe(e) {
      var t = Be.media.muted ? 0 : Be.media.volume * E.volumeMax;
      O.number(e) || (e = E.volumeStep), ke(t - e);
    }
    function Te() {
      var e = Be.media.muted ? 0 : Be.media.volume * E.volumeMax;
      Be.supported.full &&
        (Be.volume.input && (Be.volume.input.value = e),
        Be.volume.display && (Be.volume.display.value = e)),
        te({ volume: e }),
        m(Be.container, E.classes.muted, 0 === e),
        Be.supported.full && Be.buttons.mute && k(Be.buttons.mute, 0 === e);
    }
    function Se(e) {
      Be.supported.full &&
        Be.buttons.captions &&
        (O.boolean(e) ||
          (e =
            Be.container.className.indexOf(E.classes.captions.active) === -1),
        (Be.captionsEnabled = e),
        k(Be.buttons.captions, Be.captionsEnabled),
        m(Be.container, E.classes.captions.active, Be.captionsEnabled),
        A(
          Be.container,
          Be.captionsEnabled ? "captionsenabled" : "captionsdisabled",
          !0
        ),
        te({ captionsEnabled: Be.captionsEnabled }));
    }
    function _e(e) {
      var t = "waiting" === e.type;
      clearTimeout(Xe.loading),
        (Xe.loading = setTimeout(
          function () {
            m(Be.container, E.classes.loading, t), Me(t);
          },
          t ? 250 : 0
        ));
    }
    function Ee(e) {
      if (Be.supported.full) {
        var t = Be.progress.played,
          n = 0,
          r = fe();
        if (e)
          switch (e.type) {
            case "timeupdate":
            case "seeking":
              if (Be.controls.pressed) return;
              (n = w(Be.media.currentTime, r)),
                "timeupdate" === e.type &&
                  Be.buttons.seek &&
                  (Be.buttons.seek.value = n);
              break;
            case "playing":
            case "progress":
              (t = Be.progress.buffer),
                (n = (function () {
                  var e = Be.media.buffered;
                  return e && e.length
                    ? w(e.end(0), r)
                    : O.number(e)
                    ? 100 * e
                    : 0;
                })());
          }
        Ce(t, n);
      }
    }
    function Ce(e, t) {
      if (Be.supported.full) {
        if ((O.undefined(t) && (t = 0), O.undefined(e))) {
          if (!Be.progress || !Be.progress.buffer) return;
          e = Be.progress.buffer;
        }
        O.htmlElement(e)
          ? (e.value = t)
          : e && (e.bar && (e.bar.value = t), e.text && (e.text.innerHTML = t));
      }
    }
    function Fe(e, t) {
      if (t) {
        isNaN(e) && (e = 0),
          (Be.secs = parseInt(e % 60)),
          (Be.mins = parseInt((e / 60) % 60)),
          (Be.hours = parseInt((e / 60 / 60) % 60));
        var n = parseInt((fe() / 60 / 60) % 60) > 0;
        (Be.secs = ("0" + Be.secs).slice(-2)),
          (Be.mins = ("0" + Be.mins).slice(-2)),
          (t.innerHTML = (n ? Be.hours + ":" : "") + Be.mins + ":" + Be.secs);
      }
    }
    function Ae() {
      if (Be.supported.full) {
        var e = fe() || 0;
        !Be.duration &&
          E.displayDuration &&
          Be.media.paused &&
          Fe(e, Be.currentTime),
          Be.duration && Fe(e, Be.duration),
          Pe();
      }
    }
    function Ie(e) {
      Fe(Be.media.currentTime, Be.currentTime),
        (e && "timeupdate" === e.type && Be.media.seeking) || Ee(e);
    }
    function Ne(e) {
      O.number(e) || (e = 0);
      var t = fe(),
        n = w(e, t);
      Be.progress && Be.progress.played && (Be.progress.played.value = n),
        Be.buttons && Be.buttons.seek && (Be.buttons.seek.value = n);
    }
    function Pe(e) {
      var t = fe();
      if (E.tooltips.seek && Be.progress.container && 0 !== t) {
        var n = Be.progress.container.getBoundingClientRect(),
          r = 0,
          a = E.classes.tooltip + "--visible";
        if (e) r = (100 / n.width) * (e.pageX - n.left);
        else {
          if (!f(Be.progress.tooltip, a)) return;
          r = Be.progress.tooltip.style.left.replace("%", "");
        }
        r < 0 ? (r = 0) : r > 100 && (r = 100),
          Fe((t / 100) * r, Be.progress.tooltip),
          (Be.progress.tooltip.style.left = r + "%"),
          e &&
            s(["mouseenter", "mouseleave"], e.type) &&
            m(Be.progress.tooltip, a, "mouseenter" === e.type);
      }
    }
    function Me(t) {
      if (E.hideControls && "audio" !== Be.type) {
        var n = 0,
          r = !1,
          a = t,
          o = f(Be.container, E.classes.loading);
        if (
          (O.boolean(t) ||
            (t && t.type
              ? ((r = "enterfullscreen" === t.type),
                (a = s(
                  ["mousemove", "touchstart", "mouseenter", "focus"],
                  t.type
                )),
                s(["mousemove", "touchmove"], t.type) && (n = 2e3),
                "focus" === t.type && (n = 3e3))
              : (a = f(Be.container, E.classes.hideControls))),
          e.clearTimeout(Xe.hover),
          a || Be.media.paused || o)
        ) {
          if (
            (m(Be.container, E.classes.hideControls, !1), Be.media.paused || o)
          )
            return;
          Be.browser.isTouch && (n = 3e3);
        }
        (a && Be.media.paused) ||
          (Xe.hover = e.setTimeout(function () {
            ((!Be.controls.pressed && !Be.controls.hover) || r) &&
              m(Be.container, E.classes.hideControls, !0);
          }, n));
      }
    }
    function Oe(e) {
      if (!O.undefined(e)) return void Le(e);
      var t;
      switch (Be.type) {
        case "youtube":
          t = Be.embed.getVideoUrl();
          break;
        case "vimeo":
          Be.embed.getVideoUrl.then(function (e) {
            t = e;
          });
          break;
        case "soundcloud":
          Be.embed.getCurrentSound(function (e) {
            t = e.permalink_url;
          });
          break;
        default:
          t = Be.media.currentSrc;
      }
      return t || "";
    }
    function Le(e) {
      function n() {
        if (
          ((Be.embed = null),
          l(Be.media),
          "video" === Be.type && Be.videoContainer && l(Be.videoContainer),
          Be.container && Be.container.removeAttribute("class"),
          "type" in e && ((Be.type = e.type), "video" === Be.type))
        ) {
          var n = e.sources[0];
          "type" in n && s(E.types.embed, n.type) && (Be.type = n.type);
        }
        switch (((Be.supported = F(Be.type)), Be.type)) {
          case "video":
            Be.media = t.createElement("video");
            break;
          case "audio":
            Be.media = t.createElement("audio");
            break;
          case "youtube":
          case "vimeo":
          case "soundcloud":
            (Be.media = t.createElement("div")),
              (Be.embedId = e.sources[0].src);
        }
        u(Be.container, Be.media),
          O.boolean(e.autoplay) && (E.autoplay = e.autoplay),
          s(E.types.html5, Be.type) &&
            (E.crossorigin && Be.media.setAttribute("crossorigin", ""),
            E.autoplay && Be.media.setAttribute("autoplay", ""),
            "poster" in e && Be.media.setAttribute("poster", e.poster),
            E.loop && Be.media.setAttribute("loop", "")),
          m(Be.container, E.classes.fullscreen.active, Be.isFullscreen),
          m(Be.container, E.classes.captions.active, Be.captionsEnabled),
          K(),
          s(E.types.html5, Be.type) && J("source", e.sources),
          ne(),
          s(E.types.html5, Be.type) &&
            ("tracks" in e && J("track", e.tracks), Be.media.load()),
          (s(E.types.html5, Be.type) ||
            (s(E.types.embed, Be.type) && !Be.supported.full)) &&
            (We(), Ye()),
          (E.title = e.title),
          Z();
      }
      return O.object(e) && "sources" in e && e.sources.length
        ? (m(Be.container, E.classes.ready, !1),
          ue(),
          Ne(),
          Ce(),
          qe(),
          void De(n, !1))
        : void ze("Invalid source format");
    }
    function je(e) {
      "video" === Be.type && Be.media.setAttribute("poster", e);
    }
    function Ve() {
      function n() {
        var e = ce(),
          t = Be.buttons[e ? "play" : "pause"],
          n = Be.buttons[e ? "pause" : "play"];
        if ((n = n && n.length > 1 ? n[n.length - 1] : n[0])) {
          var r = f(t, E.classes.tabFocus);
          setTimeout(function () {
            n.focus(),
              r && (m(t, E.classes.tabFocus, !1), m(n, E.classes.tabFocus, !0));
          }, 100);
        }
      }
      function r() {
        var e = t.activeElement;
        return (e = e && e !== t.body ? t.querySelector(":focus") : null);
      }
      function a(e) {
        return e.keyCode ? e.keyCode : e.which;
      }
      function o(e) {
        for (var t in Be.buttons) {
          var n = Be.buttons[t];
          if (O.nodeList(n))
            for (var r = 0; r < n.length; r++)
              m(n[r], E.classes.tabFocus, n[r] === e);
          else m(n, E.classes.tabFocus, n === e);
        }
      }
      function i(e) {
        function t() {
          var e = Be.media.duration;
          O.number(e) && me((e / 10) * (n - 48));
        }
        var n = a(e),
          r = "keydown" === e.type,
          o = r && n === u;
        if (O.number(n))
          if (r) {
            var i = [
              48, 49, 50, 51, 52, 53, 54, 56, 57, 32, 75, 38, 40, 77, 39, 37,
              70, 67,
            ];
            switch ((s(i, n) && (e.preventDefault(), e.stopPropagation()), n)) {
              case 48:
              case 49:
              case 50:
              case 51:
              case 52:
              case 53:
              case 54:
              case 55:
              case 56:
              case 57:
                o || t();
                break;
              case 32:
              case 75:
                o || ce();
                break;
              case 38:
                we();
                break;
              case 40:
                xe();
                break;
              case 77:
                o || he();
                break;
              case 39:
                pe();
                break;
              case 37:
                de();
                break;
              case 70:
                ge();
                break;
              case 67:
                o || Se();
            }
            !N.supportsFullScreen && Be.isFullscreen && 27 === n && ge(),
              (u = n);
          } else u = null;
      }
      var l = Be.browser.isIE ? "change" : "input";
      if (E.keyboardShorcuts.focused) {
        var u = null;
        E.keyboardShorcuts.global &&
          g(e, "keydown keyup", function (e) {
            var t = a(e),
              n = r(),
              o = [48, 49, 50, 51, 52, 53, 54, 56, 57, 75, 77, 70, 67],
              l = I().length;
            1 !== l ||
              !s(o, t) ||
              (O.htmlElement(n) && y(n, E.selectors.editable)) ||
              i(e);
          }),
          g(Be.container, "keydown keyup", i);
      }
      g(e, "keyup", function (e) {
        var t = a(e),
          n = r();
        9 === t && o(n);
      }),
        g(t.body, "click", function () {
          m(B("." + E.classes.tabFocus), E.classes.tabFocus, !1);
        });
      for (var c in Be.buttons) {
        var d = Be.buttons[c];
        g(d, "blur", function () {
          m(d, "tab-focus", !1);
        });
      }
      b(Be.buttons.play, "click", E.listeners.play, n),
        b(Be.buttons.pause, "click", E.listeners.pause, n),
        b(Be.buttons.restart, "click", E.listeners.restart, me),
        b(Be.buttons.rewind, "click", E.listeners.rewind, de),
        b(Be.buttons.forward, "click", E.listeners.forward, pe),
        b(Be.buttons.seek, l, E.listeners.seek, me),
        b(Be.volume.input, l, E.listeners.volume, function () {
          ke(Be.volume.input.value);
        }),
        b(Be.buttons.mute, "click", E.listeners.mute, he),
        b(Be.buttons.fullscreen, "click", E.listeners.fullscreen, ge),
        N.supportsFullScreen && g(t, N.fullScreenEventName, ge),
        b(Be.buttons.captions, "click", E.listeners.captions, Se),
        g(Be.progress.container, "mouseenter mouseleave mousemove", Pe),
        E.hideControls &&
          (g(
            Be.container,
            "mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen",
            Me
          ),
          g(Be.controls, "mouseenter mouseleave", function (e) {
            Be.controls.hover = "mouseenter" === e.type;
          }),
          g(
            Be.controls,
            "mousedown mouseup touchstart touchend touchcancel",
            function (e) {
              Be.controls.pressed = s(["mousedown", "touchstart"], e.type);
            }
          ),
          g(Be.controls, "focus blur", Me, !0)),
        g(Be.volume.input, "wheel", function (e) {
          e.preventDefault();
          var t = e.webkitDirectionInvertedFromDevice,
            n = E.volumeStep / 5;
          (e.deltaY < 0 || e.deltaX > 0) && (t ? xe(n) : we(n)),
            (e.deltaY > 0 || e.deltaX < 0) && (t ? we(n) : xe(n));
        });
    }
    function Re() {
      if (
        (g(Be.media, "timeupdate seeking", Ie),
        g(Be.media, "timeupdate", W),
        g(Be.media, "durationchange loadedmetadata", Ae),
        g(Be.media, "ended", function () {
          "video" === Be.type &&
            E.showPosterOnEnd &&
            ("video" === Be.type && H(), me(), Be.media.load());
        }),
        g(Be.media, "progress playing", Ee),
        g(Be.media, "volumechange", Te),
        g(Be.media, "play pause ended", ye),
        g(Be.media, "waiting canplay seeked", _e),
        E.clickToPlay && "audio" !== Be.type)
      ) {
        var e = B("." + E.classes.videoWrapper);
        if (!e) return;
        (e.style.cursor = "pointer"),
          g(e, "click", function () {
            (E.hideControls && Be.browser.isTouch && !Be.media.paused) ||
              (Be.media.paused ? le() : Be.media.ended ? (me(), le()) : ue());
          });
      }
      E.disableContextMenu &&
        g(Be.media, "contextmenu", function (e) {
          e.preventDefault();
        }),
        g(
          Be.media,
          E.events.concat(["keyup", "keydown"]).join(" "),
          function (e) {
            A(Be.container, e.type, !0);
          }
        );
    }
    function qe() {
      if (s(E.types.html5, Be.type)) {
        for (
          var e = Be.media.querySelectorAll("source"), t = 0;
          t < e.length;
          t++
        )
          l(e[t]);
        Be.media.setAttribute("src", E.blankUrl),
          Be.media.load(),
          Je("Cancelled network requests");
      }
    }
    function De(n, r) {
      function a() {
        clearTimeout(Xe.cleanUp),
          O.boolean(r) || (r = !0),
          O.function(n) && n.call($e),
          r &&
            ((Be.init = !1),
            Be.container.parentNode.replaceChild($e, Be.container),
            (t.body.style.overflow = ""),
            A($e, "destroyed", !0));
      }
      if (!Be.init) return null;
      switch (Be.type) {
        case "youtube":
          e.clearInterval(Xe.buffering),
            e.clearInterval(Xe.playing),
            Be.embed.destroy(),
            a();
          break;
        case "vimeo":
          Be.embed.unload().then(a), (Xe.cleanUp = e.setTimeout(a, 200));
          break;
        case "video":
        case "audio":
          Q(!0), a();
      }
    }
    function He() {
      if (Be.init) return null;
      if (((N = _()), (Be.browser = n()), O.htmlElement(Be.media))) {
        ee();
        var e = v.tagName.toLowerCase();
        "div" === e
          ? ((Be.type = v.getAttribute("data-type")),
            (Be.embedId = v.getAttribute("data-video-id")),
            v.removeAttribute("data-type"),
            v.removeAttribute("data-video-id"))
          : ((Be.type = e),
            (E.crossorigin = null !== v.getAttribute("crossorigin")),
            (E.autoplay = E.autoplay || null !== v.getAttribute("autoplay")),
            (E.loop = E.loop || null !== v.getAttribute("loop"))),
          (Be.supported = F(Be.type)),
          Be.supported.basic &&
            ((Be.container = i(v, t.createElement("div"))),
            Be.container.setAttribute("tabindex", 0),
            K(),
            Je("" + Be.browser.name + " " + Be.browser.version),
            ne(),
            (s(E.types.html5, Be.type) ||
              (s(E.types.embed, Be.type) && !Be.supported.full)) &&
              (We(), Ye(), Z()),
            (Be.init = !0));
      }
    }
    function We() {
      if (!Be.supported.full)
        return (
          ze("Basic support only", Be.type),
          l(B(E.selectors.controls.wrapper)),
          l(B(E.selectors.buttons.play)),
          void Q(!0)
        );
      var e = !U(E.selectors.controls.wrapper).length;
      e && z(), G() && (e && Ve(), Re(), Q(), q(), D(), ke(), Te(), Ie(), ye());
    }
    function Ye() {
      e.setTimeout(function () {
        A(Be.media, "ready");
      }, 0),
        m(Be.media, M.classes.setup, !0),
        m(Be.container, E.classes.ready, !0),
        (Be.media.plyr = Ue),
        E.autoplay && le();
    }
    var Ue,
      Be = this,
      Xe = {};
    Be.media = v;
    var $e = v.cloneNode(!0),
      Je = function () {
        j("log", arguments);
      },
      ze = function () {
        j("warn", arguments);
      };
    return (
      Je("Config", E),
      (Ue = {
        getOriginal: function () {
          return $e;
        },
        getContainer: function () {
          return Be.container;
        },
        getEmbed: function () {
          return Be.embed;
        },
        getMedia: function () {
          return Be.media;
        },
        getType: function () {
          return Be.type;
        },
        getDuration: fe,
        getCurrentTime: function () {
          return Be.media.currentTime;
        },
        getVolume: function () {
          return Be.media.volume;
        },
        isMuted: function () {
          return Be.media.muted;
        },
        isReady: function () {
          return f(Be.container, E.classes.ready);
        },
        isLoading: function () {
          return f(Be.container, E.classes.loading);
        },
        isPaused: function () {
          return Be.media.paused;
        },
        on: function (e, t) {
          return g(Be.container, e, t), this;
        },
        play: le,
        pause: ue,
        stop: function () {
          ue(), me();
        },
        restart: me,
        rewind: de,
        forward: pe,
        seek: me,
        source: Oe,
        poster: je,
        setVolume: ke,
        togglePlay: ce,
        toggleMute: he,
        toggleCaptions: Se,
        toggleFullscreen: ge,
        toggleControls: Me,
        isFullscreen: function () {
          return Be.isFullscreen || !1;
        },
        support: function (e) {
          return r(Be, e);
        },
        destroy: De,
      }),
      He(),
      Be.init ? Ue : null
    );
  }
  function C(e, n) {
    var r = new XMLHttpRequest();
    if (!O.string(n) || !O.htmlElement(t.querySelector("#" + n))) {
      var a = t.createElement("div");
      a.setAttribute("hidden", ""),
        O.string(n) && a.setAttribute("id", n),
        t.body.insertBefore(a, t.body.childNodes[0]),
        "withCredentials" in r &&
          (r.open("GET-2.html", e, !0),
          (r.onload = function () {
            a.innerHTML = r.responseText;
          }),
          r.send());
    }
  }
  function F(e) {
    var r = n(),
      a = r.isIE && r.version <= 9,
      s = r.isIos,
      o = r.isIphone,
      i = !!t.createElement("audio").canPlayType,
      l = !!t.createElement("video").canPlayType,
      u = !1,
      c = !1;
    switch (e) {
      case "video":
        (u = l), (c = u && !a && !o);
        break;
      case "audio":
        (u = i), (c = u && !a);
        break;
      case "vimeo":
        (u = !0), (c = !a && !s);
        break;
      case "youtube":
        (u = !0), (c = !a && !s), s && !o && r.version >= 10 && (c = !0);
        break;
      case "soundcloud":
        (u = !0), (c = !a && !o);
        break;
      default:
        (u = i && l), (c = u && !a);
    }
    return { basic: u, full: c };
  }
  function A(e, n) {
    function r(e, t) {
      f(t, M.classes.hook) || a.push({ target: e, media: t });
    }
    var a = [],
      s = [],
      o = [M.selectors.html5, M.selectors.embed].join(",");
    if (
      (O.string(e)
        ? (e = t.querySelectorAll(e))
        : O.htmlElement(e)
        ? (e = [e])
        : O.nodeList(e) ||
          O.array(e) ||
          O.string(e) ||
          (O.undefined(n) && O.object(e) && (n = e),
          (e = t.querySelectorAll(o))),
      O.nodeList(e) && (e = Array.prototype.slice.call(e)),
      !F().basic || !e.length)
    )
      return !1;
    for (var i = 0; i < e.length; i++) {
      var l = e[i],
        u = l.querySelectorAll(o);
      if (u.length) for (var c = 0; c < u.length; c++) r(l, u[c]);
      else y(l, o) && r(l, l);
    }
    return (
      a.forEach(function (e) {
        var t = e.target,
          r = e.media,
          a = !1;
        r === t && (a = !0);
        var o = {};
        try {
          o = JSON.parse(t.getAttribute("data-plyr"));
        } catch (e) {}
        var i = x({}, M, n, o);
        if (!i.enabled) return null;
        var l = new E(r, i);
        if (O.object(l)) {
          if (i.debug) {
            var u = i.events.concat([
              "setup",
              "statechange",
              "enterfullscreen",
              "exitfullscreen",
              "captionsenabled",
              "captionsdisabled",
            ]);
            g(l.getContainer(), u.join(" "), function (e) {
              console.log(
                [i.logPrefix, "event:", e.type].join(" "),
                e.detail.plyr
              );
            });
          }
          h(l.getContainer(), "setup", !0, { plyr: l }), s.push(l);
        }
      }),
      s
    );
  }
  function I(e) {
    if (
      (O.string(e) ? (e = t.querySelector(e)) : O.undefined(e) && (e = t.body),
      O.htmlElement(e))
    ) {
      var n = e.querySelectorAll("." + M.classes.setup),
        r = [];
      return (
        Array.prototype.slice.call(n).forEach(function (e) {
          O.object(e.plyr) && r.push(e.plyr);
        }),
        r
      );
    }
    return [];
  }
  var N,
    P = { x: 0, y: 0 },
    M = {
      enabled: !0,
      debug: !1,
      autoplay: !1,
      loop: !1,
      seekTime: 10,
      volume: 10,
      volumeMin: 0,
      volumeMax: 10,
      volumeStep: 1,
      duration: null,
      displayDuration: !0,
      loadSprite: !0,
      iconPrefix: "plyr",
      iconUrl: "https://cdn.plyr.io/2.0.13/plyr.svg",
      blankUrl: "https://cdn.selz.com/plyr/blank.mp4",
      clickToPlay: !0,
      hideControls: !0,
      showPosterOnEnd: !1,
      disableContextMenu: !0,
      keyboardShorcuts: { focused: !0, global: !1 },
      tooltips: { controls: !1, seek: !0 },
      selectors: {
        html5: "video, audio",
        embed: "[data-type]",
        editable: "input, textarea, select, [contenteditable]",
        container: ".plyr",
        controls: { container: null, wrapper: ".plyr__controls" },
        labels: "[data-plyr]",
        buttons: {
          seek: '[data-plyr="seek"]',
          play: '[data-plyr="play"]',
          pause: '[data-plyr="pause"]',
          restart: '[data-plyr="restart"]',
          rewind: '[data-plyr="rewind"]',
          forward: '[data-plyr="fast-forward"]',
          mute: '[data-plyr="mute"]',
          captions: '[data-plyr="captions"]',
          fullscreen: '[data-plyr="fullscreen"]',
        },
        volume: {
          input: '[data-plyr="volume"]',
          display: ".plyr__volume--display",
        },
        progress: {
          container: ".plyr__progress",
          buffer: ".plyr__progress--buffer",
          played: ".plyr__progress--played",
        },
        captions: ".plyr__captions",
        currentTime: ".plyr__time--current",
        duration: ".plyr__time--duration",
      },
      classes: {
        setup: "plyr--setup",
        ready: "plyr--ready",
        videoWrapper: "plyr__video-wrapper",
        embedWrapper: "plyr__video-embed",
        type: "plyr--{0}",
        stopped: "plyr--stopped",
        playing: "plyr--playing",
        muted: "plyr--muted",
        loading: "plyr--loading",
        hover: "plyr--hover",
        tooltip: "plyr__tooltip",
        hidden: "plyr__sr-only",
        hideControls: "plyr--hide-controls",
        isIos: "plyr--is-ios",
        isTouch: "plyr--is-touch",
        captions: {
          enabled: "plyr--captions-enabled",
          active: "plyr--captions-active",
        },
        fullscreen: {
          enabled: "plyr--fullscreen-enabled",
          active: "plyr--fullscreen-active",
        },
        tabFocus: "tab-focus",
      },
      captions: { defaultActive: !1 },
      fullscreen: { enabled: !0, fallback: !0, allowAudio: !1 },
      storage: { enabled: !0, key: "plyr" },
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "fullscreen",
      ],
      i18n: {
        restart: "Restart",
        rewind: "Rewind {seektime} secs",
        play: "Play",
        pause: "Pause",
        forward: "Forward {seektime} secs",
        played: "played",
        buffered: "buffered",
        currentTime: "Current time",
        duration: "Duration",
        volume: "Volume",
        toggleMute: "Toggle Mute",
        toggleCaptions: "Toggle Captions",
        toggleFullscreen: "Toggle Fullscreen",
        frameTitle: "Player for {title}",
      },
      types: {
        embed: ["youtube", "vimeo", "soundcloud"],
        html5: ["video", "audio"],
      },
      urls: {
        vimeo: { api: "https://player.vimeo.com/api/player.js" },
        youtube: { api: "https://www.youtube.com/iframe_api" },
        soundcloud: { api: "https://w.soundcloud.com/player/api.js" },
      },
      listeners: {
        seek: null,
        play: null,
        pause: null,
        restart: null,
        rewind: null,
        forward: null,
        mute: null,
        volume: null,
        captions: null,
        fullscreen: null,
      },
      events: [
        "ready",
        "ended",
        "progress",
        "stalled",
        "playing",
        "waiting",
        "canplay",
        "canplaythrough",
        "loadstart",
        "loadeddata",
        "loadedmetadata",
        "timeupdate",
        "volumechange",
        "play",
        "pause",
        "error",
        "seeking",
        "seeked",
        "emptied",
      ],
      logPrefix: "[Plyr]",
    },
    O = {
      object: function (e) {
        return null !== e && "object" == typeof e;
      },
      array: function (e) {
        return null !== e && "object" == typeof e && e.constructor === Array;
      },
      number: function (e) {
        return (
          null !== e &&
          (("number" == typeof e && !isNaN(e - 0)) ||
            ("object" == typeof e && e.constructor === Number))
        );
      },
      string: function (e) {
        return (
          null !== e &&
          ("string" == typeof e ||
            ("object" == typeof e && e.constructor === String))
        );
      },
      boolean: function (e) {
        return null !== e && "boolean" == typeof e;
      },
      nodeList: function (e) {
        return null !== e && e instanceof NodeList;
      },
      htmlElement: function (e) {
        return null !== e && e instanceof HTMLElement;
      },
      function: function (e) {
        return null !== e && "function" == typeof e;
      },
      undefined: function (e) {
        return null !== e && "undefined" == typeof e;
      },
    },
    L = {
      supported: (function () {
        if (!("localStorage" in e)) return !1;
        try {
          e.localStorage.setItem("___test", "OK");
          var t = e.localStorage.getItem("___test");
          return e.localStorage.removeItem("___test"), "OK" === t;
        } catch (e) {
          return !1;
        }
        return !1;
      })(),
    };
  return { setup: A, supported: F, loadSprite: C, get: I };
}),
  (function () {
    function e(e, t) {
      t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
      var n = document.createEvent("CustomEvent");
      return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
    }
    "function" != typeof window.CustomEvent &&
      ((e.prototype = window.Event.prototype), (window.CustomEvent = e));
  })();
/*-----------------------------------------------------------------------------------*/
/*	07. WAYPOINTS
/*-----------------------------------------------------------------------------------*/
// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function () {
  var t =
      [].indexOf ||
      function (t) {
        for (var e = 0, n = this.length; e < n; e++) {
          if (e in this && this[e] === t) return e;
        }
        return -1;
      },
    e = [].slice;
  (function (t, e) {
    if (typeof define === "function" && define.amd) {
      return define("waypoints", ["jquery"], function (n) {
        return e(n, t);
      });
    } else {
      return e(t.jQuery, t);
    }
  })(this, function (n, r) {
    var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
    i = n(r);
    c = t.call(r, "ontouchstart") >= 0;
    s = { horizontal: {}, vertical: {} };
    f = 1;
    a = {};
    u = "waypoints-context-id";
    p = "resize.waypoints";
    y = "scroll.waypoints";
    v = 1;
    w = "waypoints-waypoint-ids";
    g = "waypoint";
    m = "waypoints";
    o = (function () {
      function t(t) {
        var e = this;
        this.$element = t;
        this.element = t[0];
        this.didResize = false;
        this.didScroll = false;
        this.id = "context" + f++;
        this.oldScroll = { x: t.scrollLeft(), y: t.scrollTop() };
        this.waypoints = { horizontal: {}, vertical: {} };
        t.data(u, this.id);
        a[this.id] = this;
        t.bind(y, function () {
          var t;
          if (!(e.didScroll || c)) {
            e.didScroll = true;
            t = function () {
              e.doScroll();
              return (e.didScroll = false);
            };
            return r.setTimeout(t, n[m].settings.scrollThrottle);
          }
        });
        t.bind(p, function () {
          var t;
          if (!e.didResize) {
            e.didResize = true;
            t = function () {
              n[m]("refresh");
              return (e.didResize = false);
            };
            return r.setTimeout(t, n[m].settings.resizeThrottle);
          }
        });
      }
      t.prototype.doScroll = function () {
        var t,
          e = this;
        t = {
          horizontal: {
            newScroll: this.$element.scrollLeft(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
          },
          vertical: {
            newScroll: this.$element.scrollTop(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
          },
        };
        if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
          n[m]("refresh");
        }
        n.each(t, function (t, r) {
          var i, o, l;
          l = [];
          o = r.newScroll > r.oldScroll;
          i = o ? r.forward : r.backward;
          n.each(e.waypoints[t], function (t, e) {
            var n, i;
            if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
              return l.push(e);
            } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
              return l.push(e);
            }
          });
          l.sort(function (t, e) {
            return t.offset - e.offset;
          });
          if (!o) {
            l.reverse();
          }
          return n.each(l, function (t, e) {
            if (e.options.continuous || t === l.length - 1) {
              return e.trigger([i]);
            }
          });
        });
        return (this.oldScroll = {
          x: t.horizontal.newScroll,
          y: t.vertical.newScroll,
        });
      };
      t.prototype.refresh = function () {
        var t,
          e,
          r,
          i = this;
        r = n.isWindow(this.element);
        e = this.$element.offset();
        this.doScroll();
        t = {
          horizontal: {
            contextOffset: r ? 0 : e.left,
            contextScroll: r ? 0 : this.oldScroll.x,
            contextDimension: this.$element.width(),
            oldScroll: this.oldScroll.x,
            forward: "right",
            backward: "left",
            offsetProp: "left",
          },
          vertical: {
            contextOffset: r ? 0 : e.top,
            contextScroll: r ? 0 : this.oldScroll.y,
            contextDimension: r
              ? n[m]("viewportHeight")
              : this.$element.height(),
            oldScroll: this.oldScroll.y,
            forward: "down",
            backward: "up",
            offsetProp: "top",
          },
        };
        return n.each(t, function (t, e) {
          return n.each(i.waypoints[t], function (t, r) {
            var i, o, l, s, f;
            i = r.options.offset;
            l = r.offset;
            o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
            if (n.isFunction(i)) {
              i = i.apply(r.element);
            } else if (typeof i === "string") {
              i = parseFloat(i);
              if (r.options.offset.indexOf("%") > -1) {
                i = Math.ceil((e.contextDimension * i) / 100);
              }
            }
            r.offset = o - e.contextOffset + e.contextScroll - i;
            if ((r.options.onlyOnScroll && l != null) || !r.enabled) {
              return;
            }
            if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
              return r.trigger([e.backward]);
            } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
              return r.trigger([e.forward]);
            } else if (l === null && e.oldScroll >= r.offset) {
              return r.trigger([e.forward]);
            }
          });
        });
      };
      t.prototype.checkEmpty = function () {
        if (
          n.isEmptyObject(this.waypoints.horizontal) &&
          n.isEmptyObject(this.waypoints.vertical)
        ) {
          this.$element.unbind([p, y].join(" "));
          return delete a[this.id];
        }
      };
      return t;
    })();
    l = (function () {
      function t(t, e, r) {
        var i, o;
        r = n.extend({}, n.fn[g].defaults, r);
        if (r.offset === "bottom-in-view") {
          r.offset = function () {
            var t;
            t = n[m]("viewportHeight");
            if (!n.isWindow(e.element)) {
              t = e.$element.height();
            }
            return t - n(this).outerHeight();
          };
        }
        this.$element = t;
        this.element = t[0];
        this.axis = r.horizontal ? "horizontal" : "vertical";
        this.callback = r.handler;
        this.context = e;
        this.enabled = r.enabled;
        this.id = "waypoints" + v++;
        this.offset = null;
        this.options = r;
        e.waypoints[this.axis][this.id] = this;
        s[this.axis][this.id] = this;
        i = (o = t.data(w)) != null ? o : [];
        i.push(this.id);
        t.data(w, i);
      }
      t.prototype.trigger = function (t) {
        if (!this.enabled) {
          return;
        }
        if (this.callback != null) {
          this.callback.apply(this.element, t);
        }
        if (this.options.triggerOnce) {
          return this.destroy();
        }
      };
      t.prototype.disable = function () {
        return (this.enabled = false);
      };
      t.prototype.enable = function () {
        this.context.refresh();
        return (this.enabled = true);
      };
      t.prototype.destroy = function () {
        delete s[this.axis][this.id];
        delete this.context.waypoints[this.axis][this.id];
        return this.context.checkEmpty();
      };
      t.getWaypointsByElement = function (t) {
        var e, r;
        r = n(t).data(w);
        if (!r) {
          return [];
        }
        e = n.extend({}, s.horizontal, s.vertical);
        return n.map(r, function (t) {
          return e[t];
        });
      };
      return t;
    })();
    d = {
      init: function (t, e) {
        var r;
        if (e == null) {
          e = {};
        }
        if ((r = e.handler) == null) {
          e.handler = t;
        }
        this.each(function () {
          var t, r, i, s;
          t = n(this);
          i = (s = e.context) != null ? s : n.fn[g].defaults.context;
          if (!n.isWindow(i)) {
            i = t.closest(i);
          }
          i = n(i);
          r = a[i.data(u)];
          if (!r) {
            r = new o(i);
          }
          return new l(t, r, e);
        });
        n[m]("refresh");
        return this;
      },
      disable: function () {
        return d._invoke(this, "disable");
      },
      enable: function () {
        return d._invoke(this, "enable");
      },
      destroy: function () {
        return d._invoke(this, "destroy");
      },
      prev: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e > 0) {
            return t.push(n[e - 1]);
          }
        });
      },
      next: function (t, e) {
        return d._traverse.call(this, t, e, function (t, e, n) {
          if (e < n.length - 1) {
            return t.push(n[e + 1]);
          }
        });
      },
      _traverse: function (t, e, i) {
        var o, l;
        if (t == null) {
          t = "vertical";
        }
        if (e == null) {
          e = r;
        }
        l = h.aggregate(e);
        o = [];
        this.each(function () {
          var e;
          e = n.inArray(this, l[t]);
          return i(o, e, l[t]);
        });
        return this.pushStack(o);
      },
      _invoke: function (t, e) {
        t.each(function () {
          var t;
          t = l.getWaypointsByElement(this);
          return n.each(t, function (t, n) {
            n[e]();
            return true;
          });
        });
        return this;
      },
    };
    n.fn[g] = function () {
      var t, r;
      (r = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (d[r]) {
        return d[r].apply(this, t);
      } else if (n.isFunction(r)) {
        return d.init.apply(this, arguments);
      } else if (n.isPlainObject(r)) {
        return d.init.apply(this, [null, r]);
      } else if (!r) {
        return n.error(
          "jQuery Waypoints needs a callback function or handler option."
        );
      } else {
        return n.error(
          "The " + r + " method does not exist in jQuery Waypoints."
        );
      }
    };
    n.fn[g].defaults = {
      context: r,
      continuous: true,
      enabled: true,
      horizontal: false,
      offset: 0,
      triggerOnce: false,
    };
    h = {
      refresh: function () {
        return n.each(a, function (t, e) {
          return e.refresh();
        });
      },
      viewportHeight: function () {
        var t;
        return (t = r.innerHeight) != null ? t : i.height();
      },
      aggregate: function (t) {
        var e, r, i;
        e = s;
        if (t) {
          e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0;
        }
        if (!e) {
          return [];
        }
        r = { horizontal: [], vertical: [] };
        n.each(r, function (t, i) {
          n.each(e[t], function (t, e) {
            return i.push(e);
          });
          i.sort(function (t, e) {
            return t.offset - e.offset;
          });
          r[t] = n.map(i, function (t) {
            return t.element;
          });
          return (r[t] = n.unique(r[t]));
        });
        return r;
      },
      above: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset <= t.oldScroll.y;
        });
      },
      below: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "vertical", function (t, e) {
          return e.offset > t.oldScroll.y;
        });
      },
      left: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset <= t.oldScroll.x;
        });
      },
      right: function (t) {
        if (t == null) {
          t = r;
        }
        return h._filter(t, "horizontal", function (t, e) {
          return e.offset > t.oldScroll.x;
        });
      },
      enable: function () {
        return h._invoke("enable");
      },
      disable: function () {
        return h._invoke("disable");
      },
      destroy: function () {
        return h._invoke("destroy");
      },
      extendFn: function (t, e) {
        return (d[t] = e);
      },
      _invoke: function (t) {
        var e;
        e = n.extend({}, s.vertical, s.horizontal);
        return n.each(e, function (e, n) {
          n[t]();
          return true;
        });
      },
      _filter: function (t, e, r) {
        var i, o;
        i = a[n(t).data(u)];
        if (!i) {
          return [];
        }
        o = [];
        n.each(i.waypoints[e], function (t, e) {
          if (r(i, e)) {
            return o.push(e);
          }
        });
        o.sort(function (t, e) {
          return t.offset - e.offset;
        });
        return n.map(o, function (t) {
          return t.element;
        });
      },
    };
    n[m] = function () {
      var t, n;
      (n = arguments[0]),
        (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
      if (h[n]) {
        return h[n].apply(null, t);
      } else {
        return h.aggregate.call(null, n);
      }
    };
    n[m].settings = { resizeThrottle: 100, scrollThrottle: 30 };
    return i.load(function () {
      return n[m]("refresh");
    });
  });
}.call(this));
/*-----------------------------------------------------------------------------------*/
/*	08. COUNTER UP
/*-----------------------------------------------------------------------------------*/
/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */ (function (e) {
  "use strict";
  e.fn.counterUp = function (t) {
    var n = e.extend({ time: 400, delay: 10 }, t);
    return this.each(function () {
      var t = e(this),
        r = n,
        i = function () {
          var e = [],
            n = r.time / r.delay,
            i = t.text(),
            s = /[0-9]+,[0-9]+/.test(i);
          i = i.replace(/,/g, "");
          var o = /^[0-9]+$/.test(i),
            u = /^[0-9]+\.[0-9]+$/.test(i),
            a = u ? (i.split(".")[1] || []).length : 0;
          for (var f = n; f >= 1; f--) {
            var l = parseInt((i / n) * f);
            u && (l = parseFloat((i / n) * f).toFixed(a));
            if (s)
              while (/(\d+)(\d{3})/.test(l.toString()))
                l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
            e.unshift(l);
          }
          t.data("counterup-nums", e);
          t.text("0");
          var c = function () {
            t.text(t.data("counterup-nums").shift());
            if (t.data("counterup-nums").length)
              setTimeout(t.data("counterup-func"), r.delay);
            else {
              delete t.data("counterup-nums");
              t.data("counterup-nums", null);
              t.data("counterup-func", null);
            }
          };
          t.data("counterup-func", c);
          setTimeout(t.data("counterup-func"), r.delay);
        };
      t.waypoint(i, { offset: "100%", triggerOnce: !0 });
    });
  };
})(jQuery);
/*-----------------------------------------------------------------------------------*/
/*	09. PROGRESSBAR
/*-----------------------------------------------------------------------------------*/
// ProgressBar.js 1.0.1
// https://kimmobrunfeldt.github.io/progressbar.js
// License: MIT

!(function (a) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = a();
  else if ("function" == typeof define && define.amd) define([], a);
  else {
    var b;
    (b =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this),
      (b.ProgressBar = a());
  }
})(function () {
  var a;
  return (function b(a, c, d) {
    function e(g, h) {
      if (!c[g]) {
        if (!a[g]) {
          var i = "function" == typeof require && require;
          if (!h && i) return i(g, !0);
          if (f) return f(g, !0);
          var j = new Error("Cannot find module '" + g + "'");
          throw ((j.code = "MODULE_NOT_FOUND"), j);
        }
        var k = (c[g] = { exports: {} });
        a[g][0].call(
          k.exports,
          function (b) {
            var c = a[g][1][b];
            return e(c ? c : b);
          },
          k,
          k.exports,
          b,
          a,
          c,
          d
        );
      }
      return c[g].exports;
    }
    for (
      var f = "function" == typeof require && require, g = 0;
      g < d.length;
      g++
    )
      e(d[g]);
    return e;
  })(
    {
      1: [
        function (b, c, d) {
          (function () {
            var b = this || Function("return this")(),
              e = (function () {
                "use strict";
                function e() {}
                function f(a, b) {
                  var c;
                  for (c in a) Object.hasOwnProperty.call(a, c) && b(c);
                }
                function g(a, b) {
                  return (
                    f(b, function (c) {
                      a[c] = b[c];
                    }),
                    a
                  );
                }
                function h(a, b) {
                  f(b, function (c) {
                    "undefined" == typeof a[c] && (a[c] = b[c]);
                  });
                }
                function i(a, b, c, d, e, f, g) {
                  var h,
                    i,
                    k,
                    l = f > a ? 0 : (a - f) / e;
                  for (h in b)
                    b.hasOwnProperty(h) &&
                      ((i = g[h]),
                      (k = "function" == typeof i ? i : o[i]),
                      (b[h] = j(c[h], d[h], k, l)));
                  return b;
                }
                function j(a, b, c, d) {
                  return a + (b - a) * c(d);
                }
                function k(a, b) {
                  var c = n.prototype.filter,
                    d = a._filterArgs;
                  f(c, function (e) {
                    "undefined" != typeof c[e][b] && c[e][b].apply(a, d);
                  });
                }
                function l(a, b, c, d, e, f, g, h, j, l, m) {
                  (v = b + c + d),
                    (w = Math.min(m || u(), v)),
                    (x = w >= v),
                    (y = d - (v - w)),
                    a.isPlaying() &&
                      (x
                        ? (j(g, a._attachment, y), a.stop(!0))
                        : ((a._scheduleId = l(a._timeoutHandler, s)),
                          k(a, "beforeTween"),
                          b + c > w
                            ? i(1, e, f, g, 1, 1, h)
                            : i(w, e, f, g, d, b + c, h),
                          k(a, "afterTween"),
                          j(e, a._attachment, y)));
                }
                function m(a, b) {
                  var c = {},
                    d = typeof b;
                  return (
                    "string" === d || "function" === d
                      ? f(a, function (a) {
                          c[a] = b;
                        })
                      : f(a, function (a) {
                          c[a] || (c[a] = b[a] || q);
                        }),
                    c
                  );
                }
                function n(a, b) {
                  (this._currentState = a || {}),
                    (this._configured = !1),
                    (this._scheduleFunction = p),
                    "undefined" != typeof b && this.setConfig(b);
                }
                var o,
                  p,
                  q = "linear",
                  r = 500,
                  s = 1e3 / 60,
                  t = Date.now
                    ? Date.now
                    : function () {
                        return +new Date();
                      },
                  u =
                    "undefined" != typeof SHIFTY_DEBUG_NOW
                      ? SHIFTY_DEBUG_NOW
                      : t;
                p =
                  "undefined" != typeof window
                    ? window.requestAnimationFrame ||
                      window.webkitRequestAnimationFrame ||
                      window.oRequestAnimationFrame ||
                      window.msRequestAnimationFrame ||
                      (window.mozCancelRequestAnimationFrame &&
                        window.mozRequestAnimationFrame) ||
                      setTimeout
                    : setTimeout;
                var v, w, x, y;
                return (
                  (n.prototype.tween = function (a) {
                    return this._isTweening
                      ? this
                      : ((void 0 === a && this._configured) ||
                          this.setConfig(a),
                        (this._timestamp = u()),
                        this._start(this.get(), this._attachment),
                        this.resume());
                  }),
                  (n.prototype.setConfig = function (a) {
                    (a = a || {}),
                      (this._configured = !0),
                      (this._attachment = a.attachment),
                      (this._pausedAtTime = null),
                      (this._scheduleId = null),
                      (this._delay = a.delay || 0),
                      (this._start = a.start || e),
                      (this._step = a.step || e),
                      (this._finish = a.finish || e),
                      (this._duration = a.duration || r),
                      (this._currentState = g({}, a.from) || this.get()),
                      (this._originalState = this.get()),
                      (this._targetState = g({}, a.to) || this.get());
                    var b = this;
                    this._timeoutHandler = function () {
                      l(
                        b,
                        b._timestamp,
                        b._delay,
                        b._duration,
                        b._currentState,
                        b._originalState,
                        b._targetState,
                        b._easing,
                        b._step,
                        b._scheduleFunction
                      );
                    };
                    var c = this._currentState,
                      d = this._targetState;
                    return (
                      h(d, c),
                      (this._easing = m(c, a.easing || q)),
                      (this._filterArgs = [
                        c,
                        this._originalState,
                        d,
                        this._easing,
                      ]),
                      k(this, "tweenCreated"),
                      this
                    );
                  }),
                  (n.prototype.get = function () {
                    return g({}, this._currentState);
                  }),
                  (n.prototype.set = function (a) {
                    this._currentState = a;
                  }),
                  (n.prototype.pause = function () {
                    return (
                      (this._pausedAtTime = u()), (this._isPaused = !0), this
                    );
                  }),
                  (n.prototype.resume = function () {
                    return (
                      this._isPaused &&
                        (this._timestamp += u() - this._pausedAtTime),
                      (this._isPaused = !1),
                      (this._isTweening = !0),
                      this._timeoutHandler(),
                      this
                    );
                  }),
                  (n.prototype.seek = function (a) {
                    a = Math.max(a, 0);
                    var b = u();
                    return this._timestamp + a === 0
                      ? this
                      : ((this._timestamp = b - a),
                        this.isPlaying() ||
                          ((this._isTweening = !0),
                          (this._isPaused = !1),
                          l(
                            this,
                            this._timestamp,
                            this._delay,
                            this._duration,
                            this._currentState,
                            this._originalState,
                            this._targetState,
                            this._easing,
                            this._step,
                            this._scheduleFunction,
                            b
                          ),
                          this.pause()),
                        this);
                  }),
                  (n.prototype.stop = function (a) {
                    return (
                      (this._isTweening = !1),
                      (this._isPaused = !1),
                      (this._timeoutHandler = e),
                      (
                        b.cancelAnimationFrame ||
                        b.webkitCancelAnimationFrame ||
                        b.oCancelAnimationFrame ||
                        b.msCancelAnimationFrame ||
                        b.mozCancelRequestAnimationFrame ||
                        b.clearTimeout
                      )(this._scheduleId),
                      a &&
                        (k(this, "beforeTween"),
                        i(
                          1,
                          this._currentState,
                          this._originalState,
                          this._targetState,
                          1,
                          0,
                          this._easing
                        ),
                        k(this, "afterTween"),
                        k(this, "afterTweenEnd"),
                        this._finish.call(
                          this,
                          this._currentState,
                          this._attachment
                        )),
                      this
                    );
                  }),
                  (n.prototype.isPlaying = function () {
                    return this._isTweening && !this._isPaused;
                  }),
                  (n.prototype.setScheduleFunction = function (a) {
                    this._scheduleFunction = a;
                  }),
                  (n.prototype.dispose = function () {
                    var a;
                    for (a in this) this.hasOwnProperty(a) && delete this[a];
                  }),
                  (n.prototype.filter = {}),
                  (n.prototype.formula = {
                    linear: function (a) {
                      return a;
                    },
                  }),
                  (o = n.prototype.formula),
                  g(n, {
                    now: u,
                    each: f,
                    tweenProps: i,
                    tweenProp: j,
                    applyFilter: k,
                    shallowCopy: g,
                    defaults: h,
                    composeEasingObject: m,
                  }),
                  "function" == typeof SHIFTY_DEBUG_NOW &&
                    (b.timeoutHandler = l),
                  "object" == typeof d
                    ? (c.exports = n)
                    : "function" == typeof a && a.amd
                    ? a(function () {
                        return n;
                      })
                    : "undefined" == typeof b.Tweenable && (b.Tweenable = n),
                  n
                );
              })();
            !(function () {
              e.shallowCopy(e.prototype.formula, {
                easeInQuad: function (a) {
                  return Math.pow(a, 2);
                },
                easeOutQuad: function (a) {
                  return -(Math.pow(a - 1, 2) - 1);
                },
                easeInOutQuad: function (a) {
                  return (a /= 0.5) < 1
                    ? 0.5 * Math.pow(a, 2)
                    : -0.5 * ((a -= 2) * a - 2);
                },
                easeInCubic: function (a) {
                  return Math.pow(a, 3);
                },
                easeOutCubic: function (a) {
                  return Math.pow(a - 1, 3) + 1;
                },
                easeInOutCubic: function (a) {
                  return (a /= 0.5) < 1
                    ? 0.5 * Math.pow(a, 3)
                    : 0.5 * (Math.pow(a - 2, 3) + 2);
                },
                easeInQuart: function (a) {
                  return Math.pow(a, 4);
                },
                easeOutQuart: function (a) {
                  return -(Math.pow(a - 1, 4) - 1);
                },
                easeInOutQuart: function (a) {
                  return (a /= 0.5) < 1
                    ? 0.5 * Math.pow(a, 4)
                    : -0.5 * ((a -= 2) * Math.pow(a, 3) - 2);
                },
                easeInQuint: function (a) {
                  return Math.pow(a, 5);
                },
                easeOutQuint: function (a) {
                  return Math.pow(a - 1, 5) + 1;
                },
                easeInOutQuint: function (a) {
                  return (a /= 0.5) < 1
                    ? 0.5 * Math.pow(a, 5)
                    : 0.5 * (Math.pow(a - 2, 5) + 2);
                },
                easeInSine: function (a) {
                  return -Math.cos(a * (Math.PI / 2)) + 1;
                },
                easeOutSine: function (a) {
                  return Math.sin(a * (Math.PI / 2));
                },
                easeInOutSine: function (a) {
                  return -0.5 * (Math.cos(Math.PI * a) - 1);
                },
                easeInExpo: function (a) {
                  return 0 === a ? 0 : Math.pow(2, 10 * (a - 1));
                },
                easeOutExpo: function (a) {
                  return 1 === a ? 1 : -Math.pow(2, -10 * a) + 1;
                },
                easeInOutExpo: function (a) {
                  return 0 === a
                    ? 0
                    : 1 === a
                    ? 1
                    : (a /= 0.5) < 1
                    ? 0.5 * Math.pow(2, 10 * (a - 1))
                    : 0.5 * (-Math.pow(2, -10 * --a) + 2);
                },
                easeInCirc: function (a) {
                  return -(Math.sqrt(1 - a * a) - 1);
                },
                easeOutCirc: function (a) {
                  return Math.sqrt(1 - Math.pow(a - 1, 2));
                },
                easeInOutCirc: function (a) {
                  return (a /= 0.5) < 1
                    ? -0.5 * (Math.sqrt(1 - a * a) - 1)
                    : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
                },
                easeOutBounce: function (a) {
                  return 1 / 2.75 > a
                    ? 7.5625 * a * a
                    : 2 / 2.75 > a
                    ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
                    : 2.5 / 2.75 > a
                    ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
                    : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
                },
                easeInBack: function (a) {
                  var b = 1.70158;
                  return a * a * ((b + 1) * a - b);
                },
                easeOutBack: function (a) {
                  var b = 1.70158;
                  return (a -= 1) * a * ((b + 1) * a + b) + 1;
                },
                easeInOutBack: function (a) {
                  var b = 1.70158;
                  return (a /= 0.5) < 1
                    ? 0.5 * (a * a * (((b *= 1.525) + 1) * a - b))
                    : 0.5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2);
                },
                elastic: function (a) {
                  return (
                    -1 *
                      Math.pow(4, -8 * a) *
                      Math.sin(((6 * a - 1) * (2 * Math.PI)) / 2) +
                    1
                  );
                },
                swingFromTo: function (a) {
                  var b = 1.70158;
                  return (a /= 0.5) < 1
                    ? 0.5 * (a * a * (((b *= 1.525) + 1) * a - b))
                    : 0.5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2);
                },
                swingFrom: function (a) {
                  var b = 1.70158;
                  return a * a * ((b + 1) * a - b);
                },
                swingTo: function (a) {
                  var b = 1.70158;
                  return (a -= 1) * a * ((b + 1) * a + b) + 1;
                },
                bounce: function (a) {
                  return 1 / 2.75 > a
                    ? 7.5625 * a * a
                    : 2 / 2.75 > a
                    ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
                    : 2.5 / 2.75 > a
                    ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
                    : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
                },
                bouncePast: function (a) {
                  return 1 / 2.75 > a
                    ? 7.5625 * a * a
                    : 2 / 2.75 > a
                    ? 2 - (7.5625 * (a -= 1.5 / 2.75) * a + 0.75)
                    : 2.5 / 2.75 > a
                    ? 2 - (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375)
                    : 2 - (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375);
                },
                easeFromTo: function (a) {
                  return (a /= 0.5) < 1
                    ? 0.5 * Math.pow(a, 4)
                    : -0.5 * ((a -= 2) * Math.pow(a, 3) - 2);
                },
                easeFrom: function (a) {
                  return Math.pow(a, 4);
                },
                easeTo: function (a) {
                  return Math.pow(a, 0.25);
                },
              });
            })(),
              (function () {
                function a(a, b, c, d, e, f) {
                  function g(a) {
                    return ((n * a + o) * a + p) * a;
                  }
                  function h(a) {
                    return ((q * a + r) * a + s) * a;
                  }
                  function i(a) {
                    return (3 * n * a + 2 * o) * a + p;
                  }
                  function j(a) {
                    return 1 / (200 * a);
                  }
                  function k(a, b) {
                    return h(m(a, b));
                  }
                  function l(a) {
                    return a >= 0 ? a : 0 - a;
                  }
                  function m(a, b) {
                    var c, d, e, f, h, j;
                    for (e = a, j = 0; 8 > j; j++) {
                      if (((f = g(e) - a), l(f) < b)) return e;
                      if (((h = i(e)), l(h) < 1e-6)) break;
                      e -= f / h;
                    }
                    if (((c = 0), (d = 1), (e = a), c > e)) return c;
                    if (e > d) return d;
                    for (; d > c; ) {
                      if (((f = g(e)), l(f - a) < b)) return e;
                      a > f ? (c = e) : (d = e), (e = 0.5 * (d - c) + c);
                    }
                    return e;
                  }
                  var n = 0,
                    o = 0,
                    p = 0,
                    q = 0,
                    r = 0,
                    s = 0;
                  return (
                    (p = 3 * b),
                    (o = 3 * (d - b) - p),
                    (n = 1 - p - o),
                    (s = 3 * c),
                    (r = 3 * (e - c) - s),
                    (q = 1 - s - r),
                    k(a, j(f))
                  );
                }
                function b(b, c, d, e) {
                  return function (f) {
                    return a(f, b, c, d, e, 1);
                  };
                }
                (e.setBezierFunction = function (a, c, d, f, g) {
                  var h = b(c, d, f, g);
                  return (
                    (h.displayName = a),
                    (h.x1 = c),
                    (h.y1 = d),
                    (h.x2 = f),
                    (h.y2 = g),
                    (e.prototype.formula[a] = h)
                  );
                }),
                  (e.unsetBezierFunction = function (a) {
                    delete e.prototype.formula[a];
                  });
              })(),
              (function () {
                function a(a, b, c, d, f, g) {
                  return e.tweenProps(d, b, a, c, 1, g, f);
                }
                var b = new e();
                (b._filterArgs = []),
                  (e.interpolate = function (c, d, f, g, h) {
                    var i = e.shallowCopy({}, c),
                      j = h || 0,
                      k = e.composeEasingObject(c, g || "linear");
                    b.set({});
                    var l = b._filterArgs;
                    (l.length = 0),
                      (l[0] = i),
                      (l[1] = c),
                      (l[2] = d),
                      (l[3] = k),
                      e.applyFilter(b, "tweenCreated"),
                      e.applyFilter(b, "beforeTween");
                    var m = a(c, i, d, f, k, j);
                    return e.applyFilter(b, "afterTween"), m;
                  });
              })(),
              (function (a) {
                function b(a, b) {
                  var c,
                    d = [],
                    e = a.length;
                  for (c = 0; e > c; c++) d.push("_" + b + "_" + c);
                  return d;
                }
                function c(a) {
                  var b = a.match(v);
                  return (
                    b
                      ? (1 === b.length || a[0].match(u)) && b.unshift("")
                      : (b = ["", ""]),
                    b.join(A)
                  );
                }
                function d(b) {
                  a.each(b, function (a) {
                    var c = b[a];
                    "string" == typeof c && c.match(z) && (b[a] = e(c));
                  });
                }
                function e(a) {
                  return i(z, a, f);
                }
                function f(a) {
                  var b = g(a);
                  return "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")";
                }
                function g(a) {
                  return (
                    (a = a.replace(/#/, "")),
                    3 === a.length &&
                      ((a = a.split("")),
                      (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2])),
                    (B[0] = h(a.substr(0, 2))),
                    (B[1] = h(a.substr(2, 2))),
                    (B[2] = h(a.substr(4, 2))),
                    B
                  );
                }
                function h(a) {
                  return parseInt(a, 16);
                }
                function i(a, b, c) {
                  var d = b.match(a),
                    e = b.replace(a, A);
                  if (d)
                    for (var f, g = d.length, h = 0; g > h; h++)
                      (f = d.shift()), (e = e.replace(A, c(f)));
                  return e;
                }
                function j(a) {
                  return i(x, a, k);
                }
                function k(a) {
                  for (
                    var b = a.match(w), c = b.length, d = a.match(y)[0], e = 0;
                    c > e;
                    e++
                  )
                    d += parseInt(b[e], 10) + ",";
                  return (d = d.slice(0, -1) + ")");
                }
                function l(d) {
                  var e = {};
                  return (
                    a.each(d, function (a) {
                      var f = d[a];
                      if ("string" == typeof f) {
                        var g = r(f);
                        e[a] = { formatString: c(f), chunkNames: b(g, a) };
                      }
                    }),
                    e
                  );
                }
                function m(b, c) {
                  a.each(c, function (a) {
                    for (
                      var d = b[a], e = r(d), f = e.length, g = 0;
                      f > g;
                      g++
                    )
                      b[c[a].chunkNames[g]] = +e[g];
                    delete b[a];
                  });
                }
                function n(b, c) {
                  a.each(c, function (a) {
                    var d = b[a],
                      e = o(b, c[a].chunkNames),
                      f = p(e, c[a].chunkNames);
                    (d = q(c[a].formatString, f)), (b[a] = j(d));
                  });
                }
                function o(a, b) {
                  for (var c, d = {}, e = b.length, f = 0; e > f; f++)
                    (c = b[f]), (d[c] = a[c]), delete a[c];
                  return d;
                }
                function p(a, b) {
                  C.length = 0;
                  for (var c = b.length, d = 0; c > d; d++) C.push(a[b[d]]);
                  return C;
                }
                function q(a, b) {
                  for (var c = a, d = b.length, e = 0; d > e; e++)
                    c = c.replace(A, +b[e].toFixed(4));
                  return c;
                }
                function r(a) {
                  return a.match(w);
                }
                function s(b, c) {
                  a.each(c, function (a) {
                    var d,
                      e = c[a],
                      f = e.chunkNames,
                      g = f.length,
                      h = b[a];
                    if ("string" == typeof h) {
                      var i = h.split(" "),
                        j = i[i.length - 1];
                      for (d = 0; g > d; d++) b[f[d]] = i[d] || j;
                    } else for (d = 0; g > d; d++) b[f[d]] = h;
                    delete b[a];
                  });
                }
                function t(b, c) {
                  a.each(c, function (a) {
                    var d = c[a],
                      e = d.chunkNames,
                      f = e.length,
                      g = b[e[0]],
                      h = typeof g;
                    if ("string" === h) {
                      for (var i = "", j = 0; f > j; j++)
                        (i += " " + b[e[j]]), delete b[e[j]];
                      b[a] = i.substr(1);
                    } else b[a] = g;
                  });
                }
                var u = /(\d|\-|\.)/,
                  v = /([^\-0-9\.]+)/g,
                  w = /[0-9.\-]+/g,
                  x = new RegExp(
                    "rgb\\(" +
                      w.source +
                      /,\s*/.source +
                      w.source +
                      /,\s*/.source +
                      w.source +
                      "\\)",
                    "g"
                  ),
                  y = /^.*\(/,
                  z = /#([0-9]|[a-f]){3,6}/gi,
                  A = "VAL",
                  B = [],
                  C = [];
                a.prototype.filter.token = {
                  tweenCreated: function (a, b, c, e) {
                    d(a), d(b), d(c), (this._tokenData = l(a));
                  },
                  beforeTween: function (a, b, c, d) {
                    s(d, this._tokenData),
                      m(a, this._tokenData),
                      m(b, this._tokenData),
                      m(c, this._tokenData);
                  },
                  afterTween: function (a, b, c, d) {
                    n(a, this._tokenData),
                      n(b, this._tokenData),
                      n(c, this._tokenData),
                      t(d, this._tokenData);
                  },
                };
              })(e);
          }.call(null));
        },
        {},
      ],
      2: [
        function (a, b, c) {
          var d = a("./shape"),
            e = a("./utils"),
            f = function (a, b) {
              (this._pathTemplate =
                "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}"),
                (this.containerAspectRatio = 1),
                d.apply(this, arguments);
            };
          (f.prototype = new d()),
            (f.prototype.constructor = f),
            (f.prototype._pathString = function (a) {
              var b = a.strokeWidth;
              a.trailWidth &&
                a.trailWidth > a.strokeWidth &&
                (b = a.trailWidth);
              var c = 50 - b / 2;
              return e.render(this._pathTemplate, {
                radius: c,
                "2radius": 2 * c,
              });
            }),
            (f.prototype._trailString = function (a) {
              return this._pathString(a);
            }),
            (b.exports = f);
        },
        { "./shape": 7, "./utils": 8 },
      ],
      3: [
        function (a, b, c) {
          var d = a("./shape"),
            e = a("./utils"),
            f = function (a, b) {
              (this._pathTemplate = "M 0,{center} L 100,{center}"),
                d.apply(this, arguments);
            };
          (f.prototype = new d()),
            (f.prototype.constructor = f),
            (f.prototype._initializeSvg = function (a, b) {
              a.setAttribute("viewBox", "0 0 100 " + b.strokeWidth),
                a.setAttribute("preserveAspectRatio", "none");
            }),
            (f.prototype._pathString = function (a) {
              return e.render(this._pathTemplate, {
                center: a.strokeWidth / 2,
              });
            }),
            (f.prototype._trailString = function (a) {
              return this._pathString(a);
            }),
            (b.exports = f);
        },
        { "./shape": 7, "./utils": 8 },
      ],
      4: [
        function (a, b, c) {
          b.exports = {
            Line: a("./line"),
            Circle: a("./circle"),
            SemiCircle: a("./semicircle"),
            Path: a("./path"),
            Shape: a("./shape"),
            utils: a("./utils"),
          };
        },
        {
          "./circle": 2,
          "./line": 3,
          "./path": 5,
          "./semicircle": 6,
          "./shape": 7,
          "./utils": 8,
        },
      ],
      5: [
        function (a, b, c) {
          var d = a("shifty"),
            e = a("./utils"),
            f = {
              easeIn: "easeInCubic",
              easeOut: "easeOutCubic",
              easeInOut: "easeInOutCubic",
            },
            g = function h(a, b) {
              if (!(this instanceof h))
                throw new Error("Constructor was called without new keyword");
              b = e.extend(
                {
                  duration: 800,
                  easing: "linear",
                  from: {},
                  to: {},
                  step: function () {},
                },
                b
              );
              var c;
              (c = e.isString(a) ? document.querySelector(a) : a),
                (this.path = c),
                (this._opts = b),
                (this._tweenable = null);
              var d = this.path.getTotalLength();
              (this.path.style.strokeDasharray = d + " " + d), this.set(0);
            };
          (g.prototype.value = function () {
            var a = this._getComputedDashOffset(),
              b = this.path.getTotalLength(),
              c = 1 - a / b;
            return parseFloat(c.toFixed(6), 10);
          }),
            (g.prototype.set = function (a) {
              this.stop(),
                (this.path.style.strokeDashoffset = this._progressToOffset(a));
              var b = this._opts.step;
              if (e.isFunction(b)) {
                var c = this._easing(this._opts.easing),
                  d = this._calculateTo(a, c),
                  f = this._opts.shape || this;
                b(d, f, this._opts.attachment);
              }
            }),
            (g.prototype.stop = function () {
              this._stopTween(),
                (this.path.style.strokeDashoffset =
                  this._getComputedDashOffset());
            }),
            (g.prototype.animate = function (a, b, c) {
              (b = b || {}), e.isFunction(b) && ((c = b), (b = {}));
              var f = e.extend({}, b),
                g = e.extend({}, this._opts);
              b = e.extend(g, b);
              var h = this._easing(b.easing),
                i = this._resolveFromAndTo(a, h, f);
              this.stop(), this.path.getBoundingClientRect();
              var j = this._getComputedDashOffset(),
                k = this._progressToOffset(a),
                l = this;
              (this._tweenable = new d()),
                this._tweenable.tween({
                  from: e.extend({ offset: j }, i.from),
                  to: e.extend({ offset: k }, i.to),
                  duration: b.duration,
                  easing: h,
                  step: function (a) {
                    l.path.style.strokeDashoffset = a.offset;
                    var c = b.shape || l;
                    b.step(a, c, b.attachment);
                  },
                  finish: function (a) {
                    e.isFunction(c) && c();
                  },
                });
            }),
            (g.prototype._getComputedDashOffset = function () {
              var a = window.getComputedStyle(this.path, null);
              return parseFloat(a.getPropertyValue("stroke-dashoffset"), 10);
            }),
            (g.prototype._progressToOffset = function (a) {
              var b = this.path.getTotalLength();
              return b - a * b;
            }),
            (g.prototype._resolveFromAndTo = function (a, b, c) {
              return c.from && c.to
                ? { from: c.from, to: c.to }
                : { from: this._calculateFrom(b), to: this._calculateTo(a, b) };
            }),
            (g.prototype._calculateFrom = function (a) {
              return d.interpolate(
                this._opts.from,
                this._opts.to,
                this.value(),
                a
              );
            }),
            (g.prototype._calculateTo = function (a, b) {
              return d.interpolate(this._opts.from, this._opts.to, a, b);
            }),
            (g.prototype._stopTween = function () {
              null !== this._tweenable &&
                (this._tweenable.stop(), (this._tweenable = null));
            }),
            (g.prototype._easing = function (a) {
              return f.hasOwnProperty(a) ? f[a] : a;
            }),
            (b.exports = g);
        },
        { "./utils": 8, shifty: 1 },
      ],
      6: [
        function (a, b, c) {
          var d = a("./shape"),
            e = a("./circle"),
            f = a("./utils"),
            g = function (a, b) {
              (this._pathTemplate =
                "M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0"),
                (this.containerAspectRatio = 2),
                d.apply(this, arguments);
            };
          (g.prototype = new d()),
            (g.prototype.constructor = g),
            (g.prototype._initializeSvg = function (a, b) {
              a.setAttribute("viewBox", "0 0 100 50");
            }),
            (g.prototype._initializeTextContainer = function (a, b, c) {
              a.text.style &&
                ((c.style.top = "auto"),
                (c.style.bottom = "0"),
                a.text.alignToBottom
                  ? f.setStyle(c, "transform", "translate(-50%, 0)")
                  : f.setStyle(c, "transform", "translate(-50%, 50%)"));
            }),
            (g.prototype._pathString = e.prototype._pathString),
            (g.prototype._trailString = e.prototype._trailString),
            (b.exports = g);
        },
        { "./circle": 2, "./shape": 7, "./utils": 8 },
      ],
      7: [
        function (a, b, c) {
          var d = a("./path"),
            e = a("./utils"),
            f = "Object is destroyed",
            g = function h(a, b) {
              if (!(this instanceof h))
                throw new Error("Constructor was called without new keyword");
              if (0 !== arguments.length) {
                (this._opts = e.extend(
                  {
                    color: "#555",
                    strokeWidth: 1,
                    trailColor: null,
                    trailWidth: null,
                    fill: null,
                    text: {
                      style: {
                        color: null,
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        padding: 0,
                        margin: 0,
                        transform: {
                          prefix: !0,
                          value: "translate(-50%, -50%)",
                        },
                      },
                      autoStyleContainer: !0,
                      alignToBottom: !0,
                      value: null,
                      className: "progressbar-text",
                    },
                    svgStyle: { display: "block", width: "100%" },
                    warnings: !1,
                  },
                  b,
                  !0
                )),
                  e.isObject(b) &&
                    void 0 !== b.svgStyle &&
                    (this._opts.svgStyle = b.svgStyle),
                  e.isObject(b) &&
                    e.isObject(b.text) &&
                    void 0 !== b.text.style &&
                    (this._opts.text.style = b.text.style);
                var c,
                  f = this._createSvgView(this._opts);
                if (((c = e.isString(a) ? document.querySelector(a) : a), !c))
                  throw new Error("Container does not exist: " + a);
                (this._container = c),
                  this._container.appendChild(f.svg),
                  this._opts.warnings &&
                    this._warnContainerAspectRatio(this._container),
                  this._opts.svgStyle &&
                    e.setStyles(f.svg, this._opts.svgStyle),
                  (this.svg = f.svg),
                  (this.path = f.path),
                  (this.trail = f.trail),
                  (this.text = null);
                var g = e.extend(
                  { attachment: void 0, shape: this },
                  this._opts
                );
                (this._progressPath = new d(f.path, g)),
                  e.isObject(this._opts.text) &&
                    null !== this._opts.text.value &&
                    this.setText(this._opts.text.value);
              }
            };
          (g.prototype.animate = function (a, b, c) {
            if (null === this._progressPath) throw new Error(f);
            this._progressPath.animate(a, b, c);
          }),
            (g.prototype.stop = function () {
              if (null === this._progressPath) throw new Error(f);
              void 0 !== this._progressPath && this._progressPath.stop();
            }),
            (g.prototype.destroy = function () {
              if (null === this._progressPath) throw new Error(f);
              this.stop(),
                this.svg.parentNode.removeChild(this.svg),
                (this.svg = null),
                (this.path = null),
                (this.trail = null),
                (this._progressPath = null),
                null !== this.text &&
                  (this.text.parentNode.removeChild(this.text),
                  (this.text = null));
            }),
            (g.prototype.set = function (a) {
              if (null === this._progressPath) throw new Error(f);
              this._progressPath.set(a);
            }),
            (g.prototype.value = function () {
              if (null === this._progressPath) throw new Error(f);
              return void 0 === this._progressPath
                ? 0
                : this._progressPath.value();
            }),
            (g.prototype.setText = function (a) {
              if (null === this._progressPath) throw new Error(f);
              null === this.text &&
                ((this.text = this._createTextContainer(
                  this._opts,
                  this._container
                )),
                this._container.appendChild(this.text)),
                e.isObject(a)
                  ? (e.removeChildren(this.text), this.text.appendChild(a))
                  : (this.text.innerHTML = a);
            }),
            (g.prototype._createSvgView = function (a) {
              var b = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
              );
              this._initializeSvg(b, a);
              var c = null;
              (a.trailColor || a.trailWidth) &&
                ((c = this._createTrail(a)), b.appendChild(c));
              var d = this._createPath(a);
              return b.appendChild(d), { svg: b, path: d, trail: c };
            }),
            (g.prototype._initializeSvg = function (a, b) {
              a.setAttribute("viewBox", "0 0 100 100");
            }),
            (g.prototype._createPath = function (a) {
              var b = this._pathString(a);
              return this._createPathElement(b, a);
            }),
            (g.prototype._createTrail = function (a) {
              var b = this._trailString(a),
                c = e.extend({}, a);
              return (
                c.trailColor || (c.trailColor = "#eee"),
                c.trailWidth || (c.trailWidth = c.strokeWidth),
                (c.color = c.trailColor),
                (c.strokeWidth = c.trailWidth),
                (c.fill = null),
                this._createPathElement(b, c)
              );
            }),
            (g.prototype._createPathElement = function (a, b) {
              var c = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
              );
              return (
                c.setAttribute("d", a),
                c.setAttribute("stroke", b.color),
                c.setAttribute("stroke-width", b.strokeWidth),
                b.fill
                  ? c.setAttribute("fill", b.fill)
                  : c.setAttribute("fill-opacity", "0"),
                c
              );
            }),
            (g.prototype._createTextContainer = function (a, b) {
              var c = document.createElement("div");
              c.className = a.text.className;
              var d = a.text.style;
              return (
                d &&
                  (a.text.autoStyleContainer && (b.style.position = "relative"),
                  e.setStyles(c, d),
                  d.color || (c.style.color = a.color)),
                this._initializeTextContainer(a, b, c),
                c
              );
            }),
            (g.prototype._initializeTextContainer = function (a, b, c) {}),
            (g.prototype._pathString = function (a) {
              throw new Error("Override this function for each progress bar");
            }),
            (g.prototype._trailString = function (a) {
              throw new Error("Override this function for each progress bar");
            }),
            (g.prototype._warnContainerAspectRatio = function (a) {
              if (this.containerAspectRatio) {
                var b = window.getComputedStyle(a, null),
                  c = parseFloat(b.getPropertyValue("width"), 10),
                  d = parseFloat(b.getPropertyValue("height"), 10);
                e.floatEquals(this.containerAspectRatio, c / d) ||
                  (console.warn(
                    "Incorrect aspect ratio of container",
                    "#" + a.id,
                    "detected:",
                    b.getPropertyValue("width") + "(width)",
                    "https://demos.elemisthemes.com/",
                    b.getPropertyValue("height") + "(height)",
                    "=",
                    c / d
                  ),
                  console.warn(
                    "Aspect ratio of should be",
                    this.containerAspectRatio
                  ));
              }
            }),
            (b.exports = g);
        },
        { "./path": 5, "./utils": 8 },
      ],
      8: [
        function (a, b, c) {
          function d(a, b, c) {
            (a = a || {}), (b = b || {}), (c = c || !1);
            for (var e in b)
              if (b.hasOwnProperty(e)) {
                var f = a[e],
                  g = b[e];
                c && l(f) && l(g) ? (a[e] = d(f, g, c)) : (a[e] = g);
              }
            return a;
          }
          function e(a, b) {
            var c = a;
            for (var d in b)
              if (b.hasOwnProperty(d)) {
                var e = b[d],
                  f = "\\{" + d + "\\}",
                  g = new RegExp(f, "g");
                c = c.replace(g, e);
              }
            return c;
          }
          function f(a, b, c) {
            for (var d = a.style, e = 0; e < p.length; ++e) {
              var f = p[e];
              d[f + h(b)] = c;
            }
            d[b] = c;
          }
          function g(a, b) {
            m(b, function (b, c) {
              null !== b &&
                void 0 !== b &&
                (l(b) && b.prefix === !0 ? f(a, c, b.value) : (a.style[c] = b));
            });
          }
          function h(a) {
            return a.charAt(0).toUpperCase() + a.slice(1);
          }
          function i(a) {
            return "string" == typeof a || a instanceof String;
          }
          function j(a) {
            return "function" == typeof a;
          }
          function k(a) {
            return "[object Array]" === Object.prototype.toString.call(a);
          }
          function l(a) {
            if (k(a)) return !1;
            var b = typeof a;
            return "object" === b && !!a;
          }
          function m(a, b) {
            for (var c in a)
              if (a.hasOwnProperty(c)) {
                var d = a[c];
                b(d, c);
              }
          }
          function n(a, b) {
            return Math.abs(a - b) < q;
          }
          function o(a) {
            for (; a.firstChild; ) a.removeChild(a.firstChild);
          }
          var p = "Webkit Moz O ms".split(" "),
            q = 0.001;
          b.exports = {
            extend: d,
            render: e,
            setStyle: f,
            setStyles: g,
            capitalize: h,
            isString: i,
            isFunction: j,
            isObject: l,
            forEachObject: m,
            floatEquals: n,
            removeChildren: o,
          };
        },
        {},
      ],
    },
    {},
    [4]
  )(4);
});
/*-----------------------------------------------------------------------------------*/
/*	10. COUNTDOWN
/*-----------------------------------------------------------------------------------*/
/*!
 * Countdown v0.1.0
 * https://github.com/fengyuanchen/countdown
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

!(function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery);
})(function (a) {
  "use strict";
  var b = function (c, d) {
    (this.$element = a(c)),
      (this.defaults = a.extend(
        {},
        b.defaults,
        this.$element.data(),
        a.isPlainObject(d) ? d : {}
      )),
      this.init();
  };
  (b.prototype = {
    constructor: b,
    init: function () {
      var a = this.$element.html(),
        b = new Date(this.defaults.date || a);
      b.getTime() &&
        ((this.content = a),
        (this.date = b),
        this.find(),
        this.defaults.autoStart && this.start());
    },
    find: function () {
      var a = this.$element;
      (this.$days = a.find("[data-days]")),
        (this.$hours = a.find("[data-hours]")),
        (this.$minutes = a.find("[data-minutes]")),
        (this.$seconds = a.find("[data-seconds]")),
        this.$days.length +
          this.$hours.length +
          this.$minutes.length +
          this.$seconds.length >
          0 && (this.found = !0);
    },
    reset: function () {
      this.found
        ? (this.output("days"),
          this.output("hours"),
          this.output("minutes"),
          this.output("seconds"))
        : this.output();
    },
    ready: function () {
      var a,
        b = this.date,
        c = 100,
        d = 1e3,
        e = 6e4,
        f = 36e5,
        g = 864e5,
        h = {};
      return b
        ? ((a = b.getTime() - new Date().getTime()),
          0 >= a
            ? (this.end(), !1)
            : ((h.days = a),
              (h.hours = h.days % g),
              (h.minutes = h.hours % f),
              (h.seconds = h.minutes % e),
              (h.milliseconds = h.seconds % d),
              (this.days = Math.floor(h.days / g)),
              (this.hours = Math.floor(h.hours / f)),
              (this.minutes = Math.floor(h.minutes / e)),
              (this.seconds = Math.floor(h.seconds / d)),
              (this.deciseconds = Math.floor(h.milliseconds / c)),
              !0))
        : !1;
    },
    start: function () {
      !this.active &&
        this.ready() &&
        ((this.active = !0),
        this.reset(),
        (this.autoUpdate = this.defaults.fast
          ? setInterval(a.proxy(this.fastUpdate, this), 100)
          : setInterval(a.proxy(this.update, this), 1e3)));
    },
    stop: function () {
      this.active && ((this.active = !1), clearInterval(this.autoUpdate));
    },
    end: function () {
      this.date &&
        (this.stop(),
        (this.days = 0),
        (this.hours = 0),
        (this.minutes = 0),
        (this.seconds = 0),
        (this.deciseconds = 0),
        this.reset(),
        this.defaults.end());
    },
    destroy: function () {
      this.date &&
        (this.stop(),
        (this.$days = null),
        (this.$hours = null),
        (this.$minutes = null),
        (this.$seconds = null),
        this.$element.empty().html(this.content),
        this.$element.removeData("countdown"));
    },
    fastUpdate: function () {
      --this.deciseconds >= 0
        ? this.output("deciseconds")
        : ((this.deciseconds = 9), this.update());
    },
    update: function () {
      --this.seconds >= 0
        ? this.output("seconds")
        : ((this.seconds = 59),
          --this.minutes >= 0
            ? this.output("minutes")
            : ((this.minutes = 59),
              --this.hours >= 0
                ? this.output("hours")
                : ((this.hours = 23),
                  --this.days >= 0 ? this.output("days") : this.end())));
    },
    output: function (a) {
      if (!this.found) return void this.$element.empty().html(this.template());
      switch (a) {
        case "deciseconds":
          this.$seconds.text(this.getSecondsText());
          break;
        case "seconds":
          this.$seconds.text(this.seconds);
          break;
        case "minutes":
          this.$minutes.text(this.minutes);
          break;
        case "hours":
          this.$hours.text(this.hours);
          break;
        case "days":
          this.$days.text(this.days);
      }
    },
    template: function () {
      return this.defaults.text
        .replace("%s", this.days)
        .replace("%s", this.hours)
        .replace("%s", this.minutes)
        .replace("%s", this.getSecondsText());
    },
    getSecondsText: function () {
      return this.active && this.defaults.fast
        ? this.seconds + "." + this.deciseconds
        : this.seconds;
    },
  }),
    (b.defaults = {
      autoStart: !0,
      date: null,
      fast: !1,
      end: a.noop,
      text: "%s days, %s hours, %s minutes, %s seconds",
    }),
    (b.setDefaults = function (c) {
      a.extend(b.defaults, c);
    }),
    (a.fn.countdown = function (c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("countdown");
        e || d.data("countdown", (e = new b(this, c))),
          "string" == typeof c && a.isFunction(e[c]) && e[c]();
      });
    }),
    (a.fn.countdown.constructor = b),
    (a.fn.countdown.setDefaults = b.setDefaults),
    a(function () {
      a("[countdown]").countdown();
    });
});
/*-----------------------------------------------------------------------------------*/
/*	11. PRETTIFY
/*-----------------------------------------------------------------------------------*/
!(function () {
  /*

 Copyright (C) 2006 Google Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
  window.PR_SHOULD_USE_CONTINUATION = !0;
  (function () {
    function T(a) {
      function d(e) {
        var b = e.charCodeAt(0);
        if (92 !== b) return b;
        var a = e.charAt(1);
        return (b = w[a])
          ? b
          : "0" <= a && "7" >= a
          ? parseInt(e.substring(1), 8)
          : "u" === a || "x" === a
          ? parseInt(e.substring(2), 16)
          : e.charCodeAt(1);
      }
      function f(e) {
        if (32 > e) return (16 > e ? "\\x0" : "\\x") + e.toString(16);
        e = String.fromCharCode(e);
        return "\\" === e || "-" === e || "]" === e || "^" === e ? "\\" + e : e;
      }
      function b(e) {
        var b = e
          .substring(1, e.length - 1)
          .match(
            /\\u[0-9A-Fa-f]{4}|\\x[0-9A-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\s\S]|-|[^-\\]/g
          );
        e = [];
        var a = "^" === b[0],
          c = ["["];
        a && c.push("^");
        for (var a = a ? 1 : 0, g = b.length; a < g; ++a) {
          var h = b[a];
          if (/\\[bdsw]/i.test(h)) c.push(h);
          else {
            var h = d(h),
              k;
            a + 2 < g && "-" === b[a + 1]
              ? ((k = d(b[a + 2])), (a += 2))
              : (k = h);
            e.push([h, k]);
            65 > k ||
              122 < h ||
              (65 > k ||
                90 < h ||
                e.push([Math.max(65, h) | 32, Math.min(k, 90) | 32]),
              97 > k ||
                122 < h ||
                e.push([Math.max(97, h) & -33, Math.min(k, 122) & -33]));
          }
        }
        e.sort(function (e, a) {
          return e[0] - a[0] || a[1] - e[1];
        });
        b = [];
        g = [];
        for (a = 0; a < e.length; ++a)
          (h = e[a]),
            h[0] <= g[1] + 1 ? (g[1] = Math.max(g[1], h[1])) : b.push((g = h));
        for (a = 0; a < b.length; ++a)
          (h = b[a]),
            c.push(f(h[0])),
            h[1] > h[0] && (h[1] + 1 > h[0] && c.push("-"), c.push(f(h[1])));
        c.push("]");
        return c.join("");
      }
      function v(e) {
        for (
          var a = e.source.match(
              /(?:\[(?:[^\x5C\x5D]|\\[\s\S])*\]|\\u[A-Fa-f0-9]{4}|\\x[A-Fa-f0-9]{2}|\\[0-9]+|\\[^ux0-9]|\(\?[:!=]|[\(\)\^]|[^\x5B\x5C\(\)\^]+)/g
            ),
            c = a.length,
            d = [],
            g = 0,
            h = 0;
          g < c;
          ++g
        ) {
          var k = a[g];
          "(" === k
            ? ++h
            : "\\" === k.charAt(0) &&
              (k = +k.substring(1)) &&
              (k <= h ? (d[k] = -1) : (a[g] = f(k)));
        }
        for (g = 1; g < d.length; ++g) -1 === d[g] && (d[g] = ++A);
        for (h = g = 0; g < c; ++g)
          (k = a[g]),
            "(" === k
              ? (++h, d[h] || (a[g] = "(?:"))
              : "\\" === k.charAt(0) &&
                (k = +k.substring(1)) &&
                k <= h &&
                (a[g] = "\\" + d[k]);
        for (g = 0; g < c; ++g) "^" === a[g] && "^" !== a[g + 1] && (a[g] = "");
        if (e.ignoreCase && n)
          for (g = 0; g < c; ++g)
            (k = a[g]),
              (e = k.charAt(0)),
              2 <= k.length && "[" === e
                ? (a[g] = b(k))
                : "\\" !== e &&
                  (a[g] = k.replace(/[a-zA-Z]/g, function (a) {
                    a = a.charCodeAt(0);
                    return "[" + String.fromCharCode(a & -33, a | 32) + "]";
                  }));
        return a.join("");
      }
      for (var A = 0, n = !1, l = !1, m = 0, c = a.length; m < c; ++m) {
        var p = a[m];
        if (p.ignoreCase) l = !0;
        else if (
          /[a-z]/i.test(
            p.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, "")
          )
        ) {
          n = !0;
          l = !1;
          break;
        }
      }
      for (
        var w = { b: 8, t: 9, n: 10, v: 11, f: 12, r: 13 },
          r = [],
          m = 0,
          c = a.length;
        m < c;
        ++m
      ) {
        p = a[m];
        if (p.global || p.multiline) throw Error("" + p);
        r.push("(?:" + v(p) + ")");
      }
      return new RegExp(r.join("|"), l ? "gi" : "g");
    }
    function U(a, d) {
      function f(a) {
        var c = a.nodeType;
        if (1 == c) {
          if (!b.test(a.className)) {
            for (c = a.firstChild; c; c = c.nextSibling) f(c);
            c = a.nodeName.toLowerCase();
            if ("br" === c || "li" === c)
              (v[l] = "\n"), (n[l << 1] = A++), (n[(l++ << 1) | 1] = a);
          }
        } else if (3 == c || 4 == c)
          (c = a.nodeValue),
            c.length &&
              ((c = d
                ? c.replace(/\r\n?/g, "\n")
                : c.replace(/[ \t\r\n]+/g, " ")),
              (v[l] = c),
              (n[l << 1] = A),
              (A += c.length),
              (n[(l++ << 1) | 1] = a));
      }
      var b = /(?:^|\s)nocode(?:\s|$)/,
        v = [],
        A = 0,
        n = [],
        l = 0;
      f(a);
      return { a: v.join("").replace(/\n$/, ""), c: n };
    }
    function J(a, d, f, b, v) {
      f &&
        ((a = { h: a, l: 1, j: null, m: null, a: f, c: null, i: d, g: null }),
        b(a),
        v.push.apply(v, a.g));
    }
    function V(a) {
      for (var d = void 0, f = a.firstChild; f; f = f.nextSibling)
        var b = f.nodeType,
          d =
            1 === b ? (d ? a : f) : 3 === b ? (W.test(f.nodeValue) ? a : d) : d;
      return d === a ? void 0 : d;
    }
    function G(a, d) {
      function f(a) {
        for (
          var l = a.i,
            m = a.h,
            c = [l, "pln"],
            p = 0,
            w = a.a.match(v) || [],
            r = {},
            e = 0,
            t = w.length;
          e < t;
          ++e
        ) {
          var z = w[e],
            q = r[z],
            g = void 0,
            h;
          if ("string" === typeof q) h = !1;
          else {
            var k = b[z.charAt(0)];
            if (k) (g = z.match(k[1])), (q = k[0]);
            else {
              for (h = 0; h < A; ++h)
                if (((k = d[h]), (g = z.match(k[1])))) {
                  q = k[0];
                  break;
                }
              g || (q = "pln");
            }
            !(h = 5 <= q.length && "lang-" === q.substring(0, 5)) ||
              (g && "string" === typeof g[1]) ||
              ((h = !1), (q = "src"));
            h || (r[z] = q);
          }
          k = p;
          p += z.length;
          if (h) {
            h = g[1];
            var B = z.indexOf(h),
              D = B + h.length;
            g[2] && ((D = z.length - g[2].length), (B = D - h.length));
            q = q.substring(5);
            J(m, l + k, z.substring(0, B), f, c);
            J(m, l + k + B, h, K(q, h), c);
            J(m, l + k + D, z.substring(D), f, c);
          } else c.push(l + k, q);
        }
        a.g = c;
      }
      var b = {},
        v;
      (function () {
        for (
          var f = a.concat(d), l = [], m = {}, c = 0, p = f.length;
          c < p;
          ++c
        ) {
          var w = f[c],
            r = w[3];
          if (r) for (var e = r.length; 0 <= --e; ) b[r.charAt(e)] = w;
          w = w[1];
          r = "" + w;
          m.hasOwnProperty(r) || (l.push(w), (m[r] = null));
        }
        l.push(/[\0-\uffff]/);
        v = T(l);
      })();
      var A = d.length;
      return f;
    }
    function y(a) {
      var d = [],
        f = [];
      a.tripleQuotedStrings
        ? d.push([
            "str",
            /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
            null,
            "'\"",
          ])
        : a.multiLineStrings
        ? d.push([
            "str",
            /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,
            null,
            "'\"`",
          ])
        : d.push([
            "str",
            /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,
            null,
            "\"'",
          ]);
      a.verbatimStrings && f.push(["str", /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
      var b = a.hashComments;
      b &&
        (a.cStyleComments
          ? (1 < b
              ? d.push([
                  "com",
                  /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,
                  null,
                  "#",
                ])
              : d.push([
                  "com",
                  /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,
                  null,
                  "#",
                ]),
            f.push([
              "str",
              /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,
              null,
            ]))
          : d.push(["com", /^#[^\r\n]*/, null, "#"]));
      a.cStyleComments &&
        (f.push(["com", /^\/\/[^\r\n]*/, null]),
        f.push(["com", /^\/\*[\s\S]*?(?:\*\/|$)/, null]));
      if ((b = a.regexLiterals)) {
        var v = (b = 1 < b ? "" : "\n\r") ? "." : "[\\S\\s]";
        f.push([
          "lang-regex",
          RegExp(
            "^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" +
              ("/(?=[^/*" +
                b +
                "])(?:[^/\\x5B\\x5C" +
                b +
                "]|\\x5C" +
                v +
                "|\\x5B(?:[^\\x5C\\x5D" +
                b +
                "]|\\x5C" +
                v +
                ")*(?:\\x5D|$))+/") +
              ")"
          ),
        ]);
      }
      (b = a.types) && f.push(["typ", b]);
      b = ("" + a.keywords).replace(/^ | $/g, "");
      b.length &&
        f.push([
          "kwd",
          new RegExp("^(?:" + b.replace(/[\s,]+/g, "|") + ")\\b"),
          null,
        ]);
      d.push(["pln", /^\s+/, null, " \r\n\t\u00a0"]);
      b = "^.[^\\s\\w.$@'\"`/\\\\]*";
      a.regexLiterals && (b += "(?!s*/)");
      f.push(
        ["lit", /^@[a-z_$][a-z_$@0-9]*/i, null],
        ["typ", /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null],
        ["pln", /^[a-z_$][a-z_$@0-9]*/i, null],
        [
          "lit",
          /^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i,
          null,
          "0123456789",
        ],
        ["pln", /^\\[\s\S]?/, null],
        ["pun", new RegExp(b), null]
      );
      return G(d, f);
    }
    function L(a, d, f) {
      function b(a) {
        var c = a.nodeType;
        if (1 == c && !A.test(a.className))
          if ("br" === a.nodeName)
            v(a), a.parentNode && a.parentNode.removeChild(a);
          else for (a = a.firstChild; a; a = a.nextSibling) b(a);
        else if ((3 == c || 4 == c) && f) {
          var d = a.nodeValue,
            q = d.match(n);
          q &&
            ((c = d.substring(0, q.index)),
            (a.nodeValue = c),
            (d = d.substring(q.index + q[0].length)) &&
              a.parentNode.insertBefore(l.createTextNode(d), a.nextSibling),
            v(a),
            c || a.parentNode.removeChild(a));
        }
      }
      function v(a) {
        function b(a, c) {
          var d = c ? a.cloneNode(!1) : a,
            k = a.parentNode;
          if (k) {
            var k = b(k, 1),
              e = a.nextSibling;
            k.appendChild(d);
            for (var f = e; f; f = e) (e = f.nextSibling), k.appendChild(f);
          }
          return d;
        }
        for (; !a.nextSibling; ) if (((a = a.parentNode), !a)) return;
        a = b(a.nextSibling, 0);
        for (var d; (d = a.parentNode) && 1 === d.nodeType; ) a = d;
        c.push(a);
      }
      for (
        var A = /(?:^|\s)nocode(?:\s|$)/,
          n = /\r\n?|\n/,
          l = a.ownerDocument,
          m = l.createElement("li");
        a.firstChild;

      )
        m.appendChild(a.firstChild);
      for (var c = [m], p = 0; p < c.length; ++p) b(c[p]);
      d === (d | 0) && c[0].setAttribute("value", d);
      var w = l.createElement("ol");
      w.className = "linenums";
      d = Math.max(0, (d - 1) | 0) || 0;
      for (var p = 0, r = c.length; p < r; ++p)
        (m = c[p]),
          (m.className = "L" + ((p + d) % 10)),
          m.firstChild || m.appendChild(l.createTextNode("\u00a0")),
          w.appendChild(m);
      a.appendChild(w);
    }
    function t(a, d) {
      for (var f = d.length; 0 <= --f; ) {
        var b = d[f];
        I.hasOwnProperty(b)
          ? E.console && console.warn("cannot override language handler %s", b)
          : (I[b] = a);
      }
    }
    function K(a, d) {
      (a && I.hasOwnProperty(a)) ||
        (a = /^\s*</.test(d) ? "default-markup" : "default-code");
      return I[a];
    }
    function M(a) {
      var d = a.j;
      try {
        var f = U(a.h, a.l),
          b = f.a;
        a.a = b;
        a.c = f.c;
        a.i = 0;
        K(d, b)(a);
        var v = /\bMSIE\s(\d+)/.exec(navigator.userAgent),
          v = v && 8 >= +v[1],
          d = /\n/g,
          A = a.a,
          n = A.length,
          f = 0,
          l = a.c,
          m = l.length,
          b = 0,
          c = a.g,
          p = c.length,
          w = 0;
        c[p] = n;
        var r, e;
        for (e = r = 0; e < p; )
          c[e] !== c[e + 2] ? ((c[r++] = c[e++]), (c[r++] = c[e++])) : (e += 2);
        p = r;
        for (e = r = 0; e < p; ) {
          for (
            var t = c[e], z = c[e + 1], q = e + 2;
            q + 2 <= p && c[q + 1] === z;

          )
            q += 2;
          c[r++] = t;
          c[r++] = z;
          e = q;
        }
        c.length = r;
        var g = a.h;
        a = "";
        g && ((a = g.style.display), (g.style.display = "none"));
        try {
          for (; b < m; ) {
            var h = l[b + 2] || n,
              k = c[w + 2] || n,
              q = Math.min(h, k),
              B = l[b + 1],
              D;
            if (1 !== B.nodeType && (D = A.substring(f, q))) {
              v && (D = D.replace(d, "\r"));
              B.nodeValue = D;
              var N = B.ownerDocument,
                u = N.createElement("span");
              u.className = c[w + 1];
              var y = B.parentNode;
              y.replaceChild(u, B);
              u.appendChild(B);
              f < h &&
                ((l[b + 1] = B = N.createTextNode(A.substring(q, h))),
                y.insertBefore(B, u.nextSibling));
            }
            f = q;
            f >= h && (b += 2);
            f >= k && (w += 2);
          }
        } finally {
          g && (g.style.display = a);
        }
      } catch (x) {
        E.console && console.log((x && x.stack) || x);
      }
    }
    var E = window,
      C = ["break,continue,do,else,for,if,return,while"],
      F = [
        [
          C,
          "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,restrict,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile",
        ],
        "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof",
      ],
      H = [
        F,
        "alignas,alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,noexcept,noreturn,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where",
      ],
      O = [
        F,
        "abstract,assert,boolean,byte,extends,finally,final,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient",
      ],
      P = [
        F,
        "abstract,add,alias,as,ascending,async,await,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,get,global,group,implicit,in,interface,internal,into,is,join,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,remove,sbyte,sealed,select,set,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,value,var,virtual,where,yield",
      ],
      F = [
        F,
        "abstract,async,await,constructor,debugger,enum,eval,export,function,get,implements,instanceof,interface,let,null,set,undefined,var,with,yield,Infinity,NaN",
      ],
      Q = [
        C,
        "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None",
      ],
      R = [
        C,
        "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END",
      ],
      C = [C, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
      S =
        /^(DIR|FILE|array|vector|(de|priority_)?queue|(forward_)?list|stack|(const_)?(reverse_)?iterator|(unordered_)?(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
      W = /\S/,
      X = y({
        keywords: [
          H,
          P,
          O,
          F,
          "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
          Q,
          R,
          C,
        ],
        hashComments: !0,
        cStyleComments: !0,
        multiLineStrings: !0,
        regexLiterals: !0,
      }),
      I = {};
    t(X, ["default-code"]);
    t(
      G(
        [],
        [
          ["pln", /^[^<?]+/],
          ["dec", /^<!\w[^>]*(?:>|$)/],
          ["com", /^<\!--[\s\S]*?(?:-\->|$)/],
          ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/],
          ["lang-", /^<%([\s\S]+?)(?:%>|$)/],
          ["pun", /^(?:<[%?]|[%?]>)/],
          ["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
          ["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
          ["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
          ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i],
        ]
      ),
      "default-markup htm html mxml xhtml xml xsl".split(" ")
    );
    t(
      G(
        [
          ["pln", /^[\s]+/, null, " \t\r\n"],
          ["atv", /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'"],
        ],
        [
          ["tag", /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
          ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
          ["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
          ["pun", /^[=<>\/]+/],
          ["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i],
          ["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i],
          ["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i],
          ["lang-css", /^style\s*=\s*\"([^\"]+)\"/i],
          ["lang-css", /^style\s*=\s*\'([^\']+)\'/i],
          ["lang-css", /^style\s*=\s*([^\"\'>\s]+)/i],
        ]
      ),
      ["in.tag"]
    );
    t(G([], [["atv", /^[\s\S]+/]]), ["uq.val"]);
    t(
      y({ keywords: H, hashComments: !0, cStyleComments: !0, types: S }),
      "c cc cpp cxx cyc m".split(" ")
    );
    t(y({ keywords: "null,true,false" }), ["json"]);
    t(
      y({
        keywords: P,
        hashComments: !0,
        cStyleComments: !0,
        verbatimStrings: !0,
        types: S,
      }),
      ["cs"]
    );
    t(y({ keywords: O, cStyleComments: !0 }), ["java"]);
    t(y({ keywords: C, hashComments: !0, multiLineStrings: !0 }), [
      "bash",
      "bsh",
      "csh",
      "sh",
    ]);
    t(
      y({
        keywords: Q,
        hashComments: !0,
        multiLineStrings: !0,
        tripleQuotedStrings: !0,
      }),
      ["cv", "py", "python"]
    );
    t(
      y({
        keywords:
          "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
        hashComments: !0,
        multiLineStrings: !0,
        regexLiterals: 2,
      }),
      ["perl", "pl", "pm"]
    );
    t(
      y({
        keywords: R,
        hashComments: !0,
        multiLineStrings: !0,
        regexLiterals: !0,
      }),
      ["rb", "ruby"]
    );
    t(y({ keywords: F, cStyleComments: !0, regexLiterals: !0 }), [
      "javascript",
      "js",
      "ts",
      "typescript",
    ]);
    t(
      y({
        keywords:
          "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
        hashComments: 3,
        cStyleComments: !0,
        multilineStrings: !0,
        tripleQuotedStrings: !0,
        regexLiterals: !0,
      }),
      ["coffee"]
    );
    t(G([], [["str", /^[\s\S]+/]]), ["regex"]);
    var Y = (E.PR = {
        createSimpleLexer: G,
        registerLangHandler: t,
        sourceDecorator: y,
        PR_ATTRIB_NAME: "atn",
        PR_ATTRIB_VALUE: "atv",
        PR_COMMENT: "com",
        PR_DECLARATION: "dec",
        PR_KEYWORD: "kwd",
        PR_LITERAL: "lit",
        PR_NOCODE: "nocode",
        PR_PLAIN: "pln",
        PR_PUNCTUATION: "pun",
        PR_SOURCE: "src",
        PR_STRING: "str",
        PR_TAG: "tag",
        PR_TYPE: "typ",
        prettyPrintOne: (E.prettyPrintOne = function (a, d, f) {
          f = f || !1;
          d = d || null;
          var b = document.createElement("div");
          b.innerHTML = "<pre>" + a + "</pre>";
          b = b.firstChild;
          f && L(b, f, !0);
          M({ j: d, m: f, h: b, l: 1, a: null, i: null, c: null, g: null });
          return b.innerHTML;
        }),
        prettyPrint: (E.prettyPrint = function (a, d) {
          function f() {
            for (
              var b = E.PR_SHOULD_USE_CONTINUATION ? c.now() + 250 : Infinity;
              p < t.length && c.now() < b;
              p++
            ) {
              for (var d = t[p], l = g, m = d; (m = m.previousSibling); ) {
                var n = m.nodeType,
                  u = (7 === n || 8 === n) && m.nodeValue;
                if (
                  u
                    ? !/^\??prettify\b/.test(u)
                    : 3 !== n || /\S/.test(m.nodeValue)
                )
                  break;
                if (u) {
                  l = {};
                  u.replace(/\b(\w+)=([\w:.%+-]+)/g, function (a, b, c) {
                    l[b] = c;
                  });
                  break;
                }
              }
              m = d.className;
              if ((l !== g || r.test(m)) && !e.test(m)) {
                n = !1;
                for (u = d.parentNode; u; u = u.parentNode)
                  if (q.test(u.tagName) && u.className && r.test(u.className)) {
                    n = !0;
                    break;
                  }
                if (!n) {
                  d.className += " prettyprinted";
                  n = l.lang;
                  if (!n) {
                    var n = m.match(w),
                      C;
                    !n &&
                      (C = V(d)) &&
                      z.test(C.tagName) &&
                      (n = C.className.match(w));
                    n && (n = n[1]);
                  }
                  if (y.test(d.tagName)) u = 1;
                  else
                    var u = d.currentStyle,
                      x = v.defaultView,
                      u =
                        (u = u
                          ? u.whiteSpace
                          : x && x.getComputedStyle
                          ? x
                              .getComputedStyle(d, null)
                              .getPropertyValue("white-space")
                          : 0) && "pre" === u.substring(0, 3);
                  x = l.linenums;
                  (x = "true" === x || +x) ||
                    (x = (x = m.match(/\blinenums\b(?::(\d+))?/))
                      ? x[1] && x[1].length
                        ? +x[1]
                        : !0
                      : !1);
                  x && L(d, x, u);
                  M({
                    j: n,
                    h: d,
                    m: x,
                    l: u,
                    a: null,
                    i: null,
                    c: null,
                    g: null,
                  });
                }
              }
            }
            p < t.length
              ? E.setTimeout(f, 250)
              : "function" === typeof a && a();
          }
          for (
            var b = d || document.body,
              v = b.ownerDocument || document,
              b = [
                b.getElementsByTagName("pre"),
                b.getElementsByTagName("code"),
                b.getElementsByTagName("xmp"),
              ],
              t = [],
              n = 0;
            n < b.length;
            ++n
          )
            for (var l = 0, m = b[n].length; l < m; ++l) t.push(b[n][l]);
          var b = null,
            c = Date;
          c.now ||
            (c = {
              now: function () {
                return +new Date();
              },
            });
          var p = 0,
            w = /\blang(?:uage)?-([\w.]+)(?!\S)/,
            r = /\bprettyprint\b/,
            e = /\bprettyprinted\b/,
            y = /pre|xmp/i,
            z = /^code$/i,
            q = /^(?:pre|code|xmp)$/i,
            g = {};
          f();
        }),
      }),
      H = E.define;
    "function" === typeof H &&
      H.amd &&
      H("google-code-prettify", [], function () {
        return Y;
      });
  })();
})();
/*-----------------------------------------------------------------------------------*/
/*	12. IMAGE PARALLAX
/*-----------------------------------------------------------------------------------*/
function parallaxUpdate(a, b) {
  var d = ($(window).width(), $(window).height()),
    e = $(window).scrollTop(),
    g = ($(window).scrollLeft(), $(b).offset()),
    h = g.top,
    j = (g.left, $(b).innerWidth()),
    k = $(b).innerHeight();
  if (!(e + d < h || e > h + k)) {
    var l = parseInt($(b).attr("data-parallax-img-width")),
      m = parseInt($(b).attr("data-parallax-img-height")),
      n = parseFloat($(b).attr("data-parallax-ratio"));
    n = isNaN(n) ? 1 : n;
    var o = parseFloat($(b).attr("data-parallax-expand"));
    o = isNaN(o) ? 1 : o;
    var p = l / m < j / k,
      q = p ? l / j : m / k,
      r = (l / q) * o,
      s = (m / q) * o,
      t = r + "px " + s + "px",
      u = Math.abs(h - d - e),
      v = d + k,
      w = u / v,
      x = ((r - j) / 2) * -1,
      y = 0;
    y = (s - k) * w * -1;
    var z = x + "px " + y + "px";
    $(b).css({ "background-size": t, "background-position": z });
  }
}
function parallaxUpdateAll(a, b) {
  $(b).each(function (a, b) {
    parallaxUpdate(null, b);
  });
}
function parallaxInit(a) {
  $(a).each(function (a, b) {
    var c = $(b).attr("data-parallax-img");
    $(b).css({
      "background-image": "url(" + c + ")",
      "background-repeat": "repeat",
    }),
      parallaxUpdate(null, b);
  }),
    $(a).on("resize", parallaxUpdate),
    $(window).on("scroll", function (b) {
      parallaxUpdateAll(b, a);
    }),
    $(window).on("resize", function (b) {
      parallaxUpdateAll(b, a);
    });
}
/*-----------------------------------------------------------------------------------*/
/*	13. VIDEO PARALLAX
/*-----------------------------------------------------------------------------------*/
!(function (a, b, c, d) {
  "use strict";
  function e(b, c) {
    function d() {
      (e.options.originalVideoW = e.options.$video[0].videoWidth),
        (e.options.originalVideoH = e.options.$video[0].videoHeight),
        e.initialised || e.init();
    }
    var e = this;
    (this.element = b),
      (this.options = a.extend({}, g, c)),
      (this._defaults = g),
      (this._name = f),
      (this.options.$video = a(b)),
      this.detectBrowser(),
      this.shimRequestAnimationFrame(),
      (this.options.has3d = this.detect3d()),
      this.options.$videoWrap.css({
        position: "relative",
        overflow: "hidden",
        "z-index": "10",
      }),
      this.options.$video.css({ position: "absolute", "z-index": "1" }),
      this.options.$video.on("canplay canplaythrough", d),
      this.options.$video[0].readyState > 3 && d();
  }
  var f = "backgroundVideo",
    g = {
      $videoWrap: a(".video-parallax-inner"),
      $outerWrap: a(b),
      $window: a(b),
      minimumVideoWidth: 400,
      preventContextMenu: !1,
      parallax: !0,
      parallaxOptions: { effect: 1.5 },
      pauseVideoOnViewLoss: !1,
    };
  (e.prototype = {
    init: function () {
      var a = this;
      (this.initialised = !0),
        (this.lastPosition = -1),
        (this.ticking = !1),
        this.options.$window.resize(function () {
          a.positionObject();
        }),
        this.options.parallax &&
          this.options.$window.on("scroll", function () {
            a.update();
          }),
        this.options.pauseVideoOnViewLoss && this.playPauseVideo(),
        this.options.preventContextMenu &&
          this.options.$video.on("contextmenu", function () {
            return !1;
          }),
        this.options.$window.trigger("resize");
    },
    requestTick: function () {
      var a = this;
      this.ticking ||
        (b.requestAnimationFrame(a.positionObject.bind(a)),
        (this.ticking = !0));
    },
    update: function () {
      (this.lastPosition = b.pageYOffset), this.requestTick();
    },
    detect3d: function () {
      var a,
        e,
        f = c.createElement("p"),
        g = {
          WebkitTransform: "-webkit-transform",
          OTransform: "-o-transform",
          MSTransform: "-ms-transform",
          MozTransform: "-moz-transform",
          transform: "transform",
        };
      c.body.insertBefore(f, c.body.lastChild);
      for (a in g)
        f.style[a] !== d &&
          ((f.style[a] =
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)"),
          (e = b.getComputedStyle(f).getPropertyValue(g[a])));
      return f.parentNode.removeChild(f), e !== d && "none" !== e;
    },
    detectBrowser: function () {
      var a = navigator.userAgent.toLowerCase();
      a.indexOf("chrome") > -1 || a.indexOf("safari") > -1
        ? ((this.options.browser = "webkit"),
          (this.options.browserPrexix = "-webkit-"))
        : a.indexOf("firefox") > -1
        ? ((this.options.browser = "firefox"),
          (this.options.browserPrexix = "-moz-"))
        : -1 !== a.indexOf("MSIE") || a.indexOf("Trident/index.html") > 0
        ? ((this.options.browser = "ie"), (this.options.browserPrexix = "-ms-"))
        : a.indexOf("Opera") > -1 &&
          ((this.options.browser = "opera"),
          (this.options.browserPrexix = "-o-"));
    },
    scaleObject: function () {
      var a, b, c;
      return (
        this.options.$videoWrap.width(this.options.$outerWrap.width()),
        this.options.$videoWrap.height(this.options.$outerWrap.height()),
        (a = this.options.$window.width() / this.options.originalVideoW),
        (b = this.options.$window.height() / this.options.originalVideoH),
        (c = a > b ? a : b),
        c * this.options.originalVideoW < this.options.minimumVideoWidth &&
          (c = this.options.minimumVideoWidth / this.options.originalVideoW),
        this.options.$video.width(c * this.options.originalVideoW),
        this.options.$video.height(c * this.options.originalVideoH),
        {
          xPos:
            -parseInt(
              this.options.$video.width() - this.options.$window.width()
            ) / 2,
          yPos:
            parseInt(
              this.options.$video.height() - this.options.$window.height()
            ) / 2,
        }
      );
    },
    positionObject: function () {
      var a = this,
        c = b.pageYOffset,
        d = this.scaleObject(this.options.$video, a.options.$videoWrap),
        e = d.xPos,
        f = d.yPos;
      (f = this.options.parallax
        ? c >= 0
          ? this.calculateYPos(f, c)
          : this.calculateYPos(f, 0)
        : -f),
        a.options.has3d
          ? (this.options.$video.css(
              a.options.browserPrexix + "transform3d",
              "translate3d(-" + e + "px, " + f + "px, 0)"
            ),
            this.options.$video.css(
              "transform",
              "translate3d(" + e + "px, " + f + "px, 0)"
            ))
          : (this.options.$video.css(
              a.options.browserPrexix + "transform",
              "translate(-" + e + "px, " + f + "px)"
            ),
            this.options.$video.css(
              "transform",
              "translate(" + e + "px, " + f + "px)"
            )),
        (this.ticking = !1);
    },
    calculateYPos: function (a, b) {
      var c, d;
      return (
        (c = parseInt(this.options.$videoWrap.offset().top)),
        (d = c - b),
        (a = -(d / this.options.parallaxOptions.effect + a))
      );
    },
    disableParallax: function () {
      this.options.$window.unbind(".backgroundVideoParallax");
    },
    playPauseVideo: function () {
      var a = this;
      this.options.$window.on("scroll.backgroundVideoPlayPause", function () {
        a.options.$window.scrollTop() < a.options.$videoWrap.height()
          ? a.options.$video.get(0).play()
          : a.options.$video.get(0).pause();
      });
    },
    shimRequestAnimationFrame: function () {
      for (
        var a = 0, c = ["ms", "moz", "webkit", "o"], d = 0;
        d < c.length && !b.requestAnimationFrame;
        ++d
      )
        (b.requestAnimationFrame = b[c[d] + "RequestAnimationFrame"]),
          (b.cancelAnimationFrame =
            b[c[d] + "CancelAnimationFrame"] ||
            b[c[d] + "CancelRequestAnimationFrame"]);
      b.requestAnimationFrame ||
        (b.requestAnimationFrame = function (c) {
          var d = new Date().getTime(),
            e = Math.max(0, 16 - (d - a)),
            f = b.setTimeout(function () {
              c(d + e);
            }, e);
          return (a = d + e), f;
        }),
        b.cancelAnimationFrame ||
          (b.cancelAnimationFrame = function (a) {
            clearTimeout(a);
          });
    },
  }),
    (a.fn[f] = function (b) {
      return this.each(function () {
        a.data(this, "plugin_" + f) ||
          a.data(this, "plugin_" + f, new e(this, b));
      });
    });
})(jQuery, window, document);
/*-----------------------------------------------------------------------------------*/
/*	14. CIRCLE INFO BOX
/*-----------------------------------------------------------------------------------*/
!(function (a) {
  a.fn.s8CircleInfoBox = function (b) {
    var l,
      c = a.extend(
        {
          autoSlide: !0,
          slideSpeed: 3e3,
          notResponsive: !1,
          action: "mouseover",
          responsive: !0,
          breakpoint: 760,
          hoverStyle: "active",
          spreadStyle: "all",
        },
        b
      ),
      d = a(this).find(".dial"),
      e = d.find(".dial-item"),
      f = e.length,
      g = c.spreadStyle.toLowerCase(),
      h = !0,
      i = d.find(".dial-item-info"),
      j = 0,
      k = null,
      m = !1;
    c.notResponsive &&
      (i.addClass("noResponsive"),
      e.addClass("noResponsive"),
      d.addClass("noResponsive"));
    var o,
      n = function () {
        var b = 0;
        switch (g) {
          case "left":
            b = 90;
            break;
          case "top":
            b = 180;
            break;
          case "right":
            b = 270;
            break;
          default:
            b = 0;
        }
        var c = "all" === g ? 360 / f : 180 / (f - 1);
        d.css("height", d.width()),
          (l = d.width() / 2),
          e.css("lineHeight", e.height() + "px"),
          e.each(function () {
            a(this).css({
              transform:
                "rotate(" +
                b +
                "deg) translate(" +
                l +
                "px) rotate(" +
                -1 * b +
                "deg)",
            }),
              (b += c);
          });
      },
      p = function (a) {
        e.removeClass(c.hoverStyle),
          (o = a.attr("data-cyrcleBox")),
          a.addClass(c.hoverStyle),
          i.filter("#" + o).fadeIn();
      },
      q = function (a) {
        i.fadeOut(), a.removeClass(c.hoverStyle);
      };
    if (c.autoSlide) {
      var r = function () {
          return setInterval(function () {
            m || (q(a(e[j])), (j = (j + 1) % f), p(a(e[j])));
          }, c.slideSpeed);
        },
        s = function () {
          k = r();
        };
      d.hover(
        function (a) {
          m = !0;
        },
        function () {
          h || (m = !1);
        }
      );
    }
    e.on(c.action, function () {
      j == a(this).parent().index() ||
        h ||
        (i.fadeOut(), (j = a(this).parent().index()), p(a(this)));
    }),
      a(window).resize(function () {
        c.responsive && !h && n(),
          a(window).width() < c.breakpoint
            ? ((h = !0),
              (m = !0),
              e.removeClass(c.hoverStyle),
              d.css("height", "auto"))
            : ((h = !1), (m = !1), null === k && c.autoSlide && s());
      }),
      a(window).width() >= c.breakpoint && (n(), (h = !1), c.autoSlide && s());
  };
})(jQuery);
/*-----------------------------------------------------------------------------------*/
/*	15. TYPER
/*-----------------------------------------------------------------------------------*/
function TyperSetup() {
  (typers = {}), (elements = document.getElementsByClassName("typer"));
  for (var b, a = 0; (b = elements[a++]); ) typers[b.id] = new Typer(b);
  elements = document.getElementsByClassName("typer-stop");
  for (var b, a = 0; (b = elements[a++]); ) {
    var c = typers[b.dataset.owner];
    b.onclick = function () {
      c.stop();
    };
  }
  elements = document.getElementsByClassName("typer-start");
  for (var b, a = 0; (b = elements[a++]); ) {
    var c = typers[b.dataset.owner];
    b.onclick = function () {
      c.start();
    };
  }
  elements2 = document.getElementsByClassName("cursor");
  for (var b, a = 0; (b = elements2[a++]); ) {
    var d = new Cursor(b);
    (d.owner.cursor = d), console.log(d.owner.cursor);
  }
}
var Typer = function (a) {
  console.log("constructor called"), (this.element = a);
  var b = a.dataset.delim || ",",
    c = a.dataset.words || "override these,sample typing";
  (this.words = c.split(b).filter(function (a) {
    return a;
  })),
    (this.delay = a.dataset.delay || 200),
    (this.deleteDelay = a.dataset.deleteDelay || 800),
    (this.progress = { word: 0, char: 0, building: !0, atWordEnd: !1 }),
    (this.typing = !0);
  var d = a.dataset.colors || "inherit";
  (this.colors = d.split(",")),
    (this.element.style.color = this.colors[0]),
    (this.colorIndex = 0),
    this.doTyping();
};
(Typer.prototype.start = function () {
  this.typing || ((this.typing = !0), this.doTyping());
}),
  (Typer.prototype.stop = function () {
    this.typing = !1;
  }),
  (Typer.prototype.doTyping = function () {
    var a = this.element,
      b = this.progress,
      c = b.word,
      d = b.char,
      e = this.words[c][d];
    if (((b.atWordEnd = !1), this.cursor)) {
      (this.cursor.element.style.opacity = "1"),
        (this.cursor.on = !0),
        clearInterval(this.cursor.interval);
      var f = this.cursor;
      this.cursor.interval = setInterval(function () {
        f.updateBlinkState();
      }, 400);
    }
    b.building
      ? ((a.innerHTML += e),
        (b.char += 1),
        b.char == this.words[c].length &&
          ((b.building = !1), (b.atWordEnd = !0)))
      : ((a.innerHTML = a.innerHTML.slice(0, -1)),
        this.element.innerHTML ||
          ((b.building = !0),
          (b.word = (b.word + 1) % this.words.length),
          (b.char = 0),
          (this.colorIndex = (this.colorIndex + 1) % this.colors.length),
          (this.element.style.color = this.colors[this.colorIndex])));
    var g = this;
    setTimeout(
      function () {
        g.typing && g.doTyping();
      },
      b.atWordEnd ? this.deleteDelay : this.delay
    );
  });
var Cursor = function (a) {
  (this.element = a),
    (this.cursorDisplay = a.dataset.cursorDisplay || "|"),
    (this.owner = typers[a.dataset.owner] || ""),
    (a.innerHTML = this.cursorDisplay),
    (this.on = !0),
    (a.style.transition = "all 0.1s");
  var b = this;
  this.interval = setInterval(function () {
    b.updateBlinkState();
  }, 400);
};
(Cursor.prototype.updateBlinkState = function () {
  this.on
    ? ((this.element.style.opacity = "0"), (this.on = !1))
    : ((this.element.style.opacity = "1"), (this.on = !0));
}),
  TyperSetup();
/*-----------------------------------------------------------------------------------*/
/*	17. LIGHTGALLERY
/*-----------------------------------------------------------------------------------*/
/*! lightgallery - v1.4.0 - 2017-06-04
 * http://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2017 Sachin N; Licensed GPLv3 */
!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (a) {
        return b(a);
      })
    : "object" == typeof exports
    ? (module.exports = b(require("jquery")))
    : b(a.jQuery);
})(this, function (a) {
  !(function () {
    "use strict";
    function b(b, d) {
      if (
        ((this.el = b),
        (this.$el = a(b)),
        (this.s = a.extend({}, c, d)),
        this.s.dynamic &&
          "undefined" !== this.s.dynamicEl &&
          this.s.dynamicEl.constructor === Array &&
          !this.s.dynamicEl.length)
      )
        throw "When using dynamic mode, you must also define dynamicEl as an Array.";
      return (
        (this.modules = {}),
        (this.lGalleryOn = !1),
        (this.lgBusy = !1),
        (this.hideBartimeout = !1),
        (this.isTouch = "ontouchstart" in document.documentElement),
        this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
        this.s.dynamic
          ? (this.$items = this.s.dynamicEl)
          : "this" === this.s.selector
          ? (this.$items = this.$el)
          : "" !== this.s.selector
          ? this.s.selectWithin
            ? (this.$items = a(this.s.selectWithin).find(this.s.selector))
            : (this.$items = this.$el.find(a(this.s.selector)))
          : (this.$items = this.$el.children()),
        (this.$slide = ""),
        (this.$outer = ""),
        this.init(),
        this
      );
    }
    var c = {
      mode: "lg-slide",
      cssEasing: "ease",
      easing: "linear",
      speed: 600,
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 150,
      hideBarsDelay: 6e3,
      useLeft: !1,
      closable: !0,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      controls: !0,
      slideEndAnimatoin: !0,
      hideControlOnEnd: !1,
      mousewheel: !0,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 1,
      showAfterLoad: !0,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: !1,
      iframeMaxWidth: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      galleryId: 1,
    };
    (b.prototype.init = function () {
      var b = this;
      b.s.preload > b.$items.length && (b.s.preload = b.$items.length);
      var c = window.location.hash;
      c.indexOf("lg=" + this.s.galleryId) > 0 &&
        ((b.index = parseInt(c.split("&slide=")[1], 10)),
        a("body").addClass("lg-from-hash"),
        a("body").hasClass("lg-on") ||
          (setTimeout(function () {
            b.build(b.index);
          }),
          a("body").addClass("lg-on"))),
        b.s.dynamic
          ? (b.$el.trigger("onBeforeOpen.lg"),
            (b.index = b.s.index || 0),
            a("body").hasClass("lg-on") ||
              setTimeout(function () {
                b.build(b.index), a("body").addClass("lg-on");
              }))
          : b.$items.on("click.lgcustom", function (c) {
              try {
                c.preventDefault(), c.preventDefault();
              } catch (a) {
                c.returnValue = !1;
              }
              b.$el.trigger("onBeforeOpen.lg"),
                (b.index = b.s.index || b.$items.index(this)),
                a("body").hasClass("lg-on") ||
                  (b.build(b.index), a("body").addClass("lg-on"));
            });
    }),
      (b.prototype.build = function (b) {
        var c = this;
        c.structure(),
          a.each(a.fn.lightGallery.modules, function (b) {
            c.modules[b] = new a.fn.lightGallery.modules[b](c.el);
          }),
          c.slide(b, !1, !1, !1),
          c.s.keyPress && c.keyPress(),
          c.$items.length > 1
            ? (c.arrow(),
              setTimeout(function () {
                c.enableDrag(), c.enableSwipe();
              }, 50),
              c.s.mousewheel && c.mousewheel())
            : c.$slide.on("click.lg", function () {
                c.$el.trigger("onSlideClick.lg");
              }),
          c.counter(),
          c.closeGallery(),
          c.$el.trigger("onAfterOpen.lg"),
          c.$outer.on("mousemove.lg click.lg touchstart.lg", function () {
            c.$outer.removeClass("lg-hide-items"),
              clearTimeout(c.hideBartimeout),
              (c.hideBartimeout = setTimeout(function () {
                c.$outer.addClass("lg-hide-items");
              }, c.s.hideBarsDelay));
          }),
          c.$outer.trigger("mousemove.lg");
      }),
      (b.prototype.structure = function () {
        var b,
          c = "",
          d = "",
          e = 0,
          f = "",
          g = this;
        for (
          a("body").append('<div class="lg-backdrop"></div>'),
            a(".lg-backdrop").css(
              "transition-duration",
              this.s.backdropDuration + "ms"
            ),
            e = 0;
          e < this.$items.length;
          e++
        )
          c += '<div class="lg-item"></div>';
        if (
          (this.s.controls &&
            this.$items.length > 1 &&
            (d =
              '<div class="lg-actions"><button class="lg-prev lg-icon">' +
              this.s.prevHtml +
              '</button><button class="lg-next lg-icon">' +
              this.s.nextHtml +
              "</button></div>"),
          ".lg-sub-html" === this.s.appendSubHtmlTo &&
            (f = '<div class="lg-sub-html"></div>'),
          (b =
            '<div class="lg-outer ' +
            this.s.addClass +
            " " +
            this.s.startClass +
            '"><div class="lg" style="width:' +
            this.s.width +
            "; height:" +
            this.s.height +
            '"><div class="lg-inner">' +
            c +
            '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' +
            d +
            f +
            "</div></div>"),
          a("body").append(b),
          (this.$outer = a(".lg-outer")),
          (this.$slide = this.$outer.find(".lg-item")),
          this.s.useLeft
            ? (this.$outer.addClass("lg-use-left"), (this.s.mode = "lg-slide"))
            : this.$outer.addClass("lg-use-css3"),
          g.setTop(),
          a(window).on("resize.lg orientationchange.lg", function () {
            setTimeout(function () {
              g.setTop();
            }, 100);
          }),
          this.$slide.eq(this.index).addClass("lg-current"),
          this.doCss()
            ? this.$outer.addClass("lg-css3")
            : (this.$outer.addClass("lg-css"), (this.s.speed = 0)),
          this.$outer.addClass(this.s.mode),
          this.s.enableDrag &&
            this.$items.length > 1 &&
            this.$outer.addClass("lg-grab"),
          this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"),
          this.doCss())
        ) {
          var h = this.$outer.find(".lg-inner");
          h.css("transition-timing-function", this.s.cssEasing),
            h.css("transition-duration", this.s.speed + "ms");
        }
        setTimeout(function () {
          a(".lg-backdrop").addClass("in");
        }),
          setTimeout(function () {
            g.$outer.addClass("lg-visible");
          }, this.s.backdropDuration),
          this.s.download &&
            this.$outer
              .find(".lg-toolbar")
              .append(
                '<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'
              ),
          (this.prevScrollTop = a(window).scrollTop());
      }),
      (b.prototype.setTop = function () {
        if ("100%" !== this.s.height) {
          var b = a(window).height(),
            c = (b - parseInt(this.s.height, 10)) / 2,
            d = this.$outer.find(".lg");
          b >= parseInt(this.s.height, 10)
            ? d.css("top", c + "px")
            : d.css("top", "0px");
        }
      }),
      (b.prototype.doCss = function () {
        var a = function () {
          var a = [
              "transition",
              "MozTransition",
              "WebkitTransition",
              "OTransition",
              "msTransition",
              "KhtmlTransition",
            ],
            b = document.documentElement,
            c = 0;
          for (c = 0; c < a.length; c++) if (a[c] in b.style) return !0;
        };
        return !!a();
      }),
      (b.prototype.isVideo = function (a, b) {
        var c;
        if (
          ((c = this.s.dynamic
            ? this.s.dynamicEl[b].html
            : this.$items.eq(b).attr("data-html")),
          !a)
        )
          return c
            ? { html5: !0 }
            : (console.error(
                "lightGallery :- data-src is not pvovided on slide item " +
                  (b + 1) +
                  ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"
              ),
              !1);
        var d = a.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i
          ),
          e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
          f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
          g = a.match(
            /\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i
          );
        return d
          ? { youtube: d }
          : e
          ? { vimeo: e }
          : f
          ? { dailymotion: f }
          : g
          ? { vk: g }
          : void 0;
      }),
      (b.prototype.counter = function () {
        this.s.counter &&
          a(this.s.appendCounterTo).append(
            '<div id="lg-counter"><span id="lg-counter-current">' +
              (parseInt(this.index, 10) + 1) +
              '</span> / <span id="lg-counter-all">' +
              this.$items.length +
              "</span></div>"
          );
      }),
      (b.prototype.addHtml = function (b) {
        var c,
          d,
          e = null;
        if (
          (this.s.dynamic
            ? this.s.dynamicEl[b].subHtmlUrl
              ? (c = this.s.dynamicEl[b].subHtmlUrl)
              : (e = this.s.dynamicEl[b].subHtml)
            : ((d = this.$items.eq(b)),
              d.attr("data-sub-html-url")
                ? (c = d.attr("data-sub-html-url"))
                : ((e = d.attr("data-sub-html")),
                  this.s.getCaptionFromTitleOrAlt &&
                    !e &&
                    (e =
                      d.attr("title") || d.find("img").first().attr("alt")))),
          !c)
        )
          if ("undefined" != typeof e && null !== e) {
            var f = e.substring(0, 1);
            ("." !== f && "#" !== f) ||
              (e =
                this.s.subHtmlSelectorRelative && !this.s.dynamic
                  ? d.find(e).html()
                  : a(e).html());
          } else e = "";
        ".lg-sub-html" === this.s.appendSubHtmlTo
          ? c
            ? this.$outer.find(this.s.appendSubHtmlTo).load(c)
            : this.$outer.find(this.s.appendSubHtmlTo).html(e)
          : c
          ? this.$slide.eq(b).load(c)
          : this.$slide.eq(b).append(e),
          "undefined" != typeof e &&
            null !== e &&
            ("" === e
              ? this.$outer
                  .find(this.s.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.$outer
                  .find(this.s.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
          this.$el.trigger("onAfterAppendSubHtml.lg", [b]);
      }),
      (b.prototype.preload = function (a) {
        var b = 1,
          c = 1;
        for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++)
          this.loadContent(a + b, !1, 0);
        for (c = 1; c <= this.s.preload && !(a - c < 0); c++)
          this.loadContent(a - c, !1, 0);
      }),
      (b.prototype.loadContent = function (b, c, d) {
        var e,
          f,
          g,
          h,
          i,
          j,
          k = this,
          l = !1,
          m = function (b) {
            for (var c = [], d = [], e = 0; e < b.length; e++) {
              var g = b[e].split(" ");
              "" === g[0] && g.splice(0, 1), d.push(g[0]), c.push(g[1]);
            }
            for (var h = a(window).width(), i = 0; i < c.length; i++)
              if (parseInt(c[i], 10) > h) {
                f = d[i];
                break;
              }
          };
        if (k.s.dynamic) {
          if (
            (k.s.dynamicEl[b].poster &&
              ((l = !0), (g = k.s.dynamicEl[b].poster)),
            (j = k.s.dynamicEl[b].html),
            (f = k.s.dynamicEl[b].src),
            k.s.dynamicEl[b].responsive)
          ) {
            var n = k.s.dynamicEl[b].responsive.split(",");
            m(n);
          }
          (h = k.s.dynamicEl[b].srcset), (i = k.s.dynamicEl[b].sizes);
        } else {
          if (
            (k.$items.eq(b).attr("data-poster") &&
              ((l = !0), (g = k.$items.eq(b).attr("data-poster"))),
            (j = k.$items.eq(b).attr("data-html")),
            (f =
              k.$items.eq(b).attr("href") || k.$items.eq(b).attr("data-src")),
            k.$items.eq(b).attr("data-responsive"))
          ) {
            var o = k.$items.eq(b).attr("data-responsive").split(",");
            m(o);
          }
          (h = k.$items.eq(b).attr("data-srcset")),
            (i = k.$items.eq(b).attr("data-sizes"));
        }
        var p = !1;
        k.s.dynamic
          ? k.s.dynamicEl[b].iframe && (p = !0)
          : "true" === k.$items.eq(b).attr("data-iframe") && (p = !0);
        var q = k.isVideo(f, b);
        if (!k.$slide.eq(b).hasClass("lg-loaded")) {
          if (p)
            k.$slide
              .eq(b)
              .prepend(
                '<div class="lg-video-cont lg-has-iframe" style="max-width:' +
                  k.s.iframeMaxWidth +
                  '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' +
                  f +
                  '"  allowfullscreen="true"></iframe></div></div>'
              );
          else if (l) {
            var r = "";
            (r =
              q && q.youtube
                ? "lg-has-youtube"
                : q && q.vimeo
                ? "lg-has-vimeo"
                : "lg-has-html5"),
              k.$slide
                .eq(b)
                .prepend(
                  '<div class="lg-video-cont ' +
                    r +
                    ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' +
                    g +
                    '" /></div></div>'
                );
          } else
            q
              ? (k.$slide
                  .eq(b)
                  .prepend(
                    '<div class="lg-video-cont "><div class="lg-video"></div></div>'
                  ),
                k.$el.trigger("hasVideo.lg", [b, f, j]))
              : k.$slide
                  .eq(b)
                  .prepend(
                    '<div class="lg-img-wrap"><img class="lg-object lg-image" src="' +
                      f +
                      '" /></div>'
                  );
          if (
            (k.$el.trigger("onAferAppendSlide.lg", [b]),
            (e = k.$slide.eq(b).find(".lg-object")),
            i && e.attr("sizes", i),
            h)
          ) {
            e.attr("srcset", h);
            try {
              picturefill({ elements: [e[0]] });
            } catch (a) {
              console.warn(
                "lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document."
              );
            }
          }
          ".lg-sub-html" !== this.s.appendSubHtmlTo && k.addHtml(b),
            k.$slide.eq(b).addClass("lg-loaded");
        }
        k.$slide
          .eq(b)
          .find(".lg-object")
          .on("load.lg error.lg", function () {
            var c = 0;
            d && !a("body").hasClass("lg-from-hash") && (c = d),
              setTimeout(function () {
                k.$slide.eq(b).addClass("lg-complete"),
                  k.$el.trigger("onSlideItemLoad.lg", [b, d || 0]);
              }, c);
          }),
          q && q.html5 && !l && k.$slide.eq(b).addClass("lg-complete"),
          c === !0 &&
            (k.$slide.eq(b).hasClass("lg-complete")
              ? k.preload(b)
              : k.$slide
                  .eq(b)
                  .find(".lg-object")
                  .on("load.lg error.lg", function () {
                    k.preload(b);
                  }));
      }),
      (b.prototype.slide = function (b, c, d, e) {
        var f = this.$outer.find(".lg-current").index(),
          g = this;
        if (!g.lGalleryOn || f !== b) {
          var h = this.$slide.length,
            i = g.lGalleryOn ? this.s.speed : 0;
          if (!g.lgBusy) {
            if (this.s.download) {
              var j;
              (j = g.s.dynamic
                ? g.s.dynamicEl[b].downloadUrl !== !1 &&
                  (g.s.dynamicEl[b].downloadUrl || g.s.dynamicEl[b].src)
                : "false" !== g.$items.eq(b).attr("data-download-url") &&
                  (g.$items.eq(b).attr("data-download-url") ||
                    g.$items.eq(b).attr("href") ||
                    g.$items.eq(b).attr("data-src"))),
                j
                  ? (a("#lg-download").attr("href", j),
                    g.$outer.removeClass("lg-hide-download"))
                  : g.$outer.addClass("lg-hide-download");
            }
            if (
              (this.$el.trigger("onBeforeSlide.lg", [f, b, c, d]),
              (g.lgBusy = !0),
              clearTimeout(g.hideBartimeout),
              ".lg-sub-html" === this.s.appendSubHtmlTo &&
                setTimeout(function () {
                  g.addHtml(b);
                }, i),
              this.arrowDisable(b),
              e || (b < f ? (e = "prev") : b > f && (e = "next")),
              c)
            ) {
              this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");
              var k, l;
              h > 2
                ? ((k = b - 1),
                  (l = b + 1),
                  0 === b && f === h - 1
                    ? ((l = 0), (k = h - 1))
                    : b === h - 1 && 0 === f && ((l = 0), (k = h - 1)))
                : ((k = 0), (l = 1)),
                "prev" === e
                  ? g.$slide.eq(l).addClass("lg-next-slide")
                  : g.$slide.eq(k).addClass("lg-prev-slide"),
                g.$slide.eq(b).addClass("lg-current");
            } else
              g.$outer.addClass("lg-no-trans"),
                this.$slide.removeClass("lg-prev-slide lg-next-slide"),
                "prev" === e
                  ? (this.$slide.eq(b).addClass("lg-prev-slide"),
                    this.$slide.eq(f).addClass("lg-next-slide"))
                  : (this.$slide.eq(b).addClass("lg-next-slide"),
                    this.$slide.eq(f).addClass("lg-prev-slide")),
                setTimeout(function () {
                  g.$slide.removeClass("lg-current"),
                    g.$slide.eq(b).addClass("lg-current"),
                    g.$outer.removeClass("lg-no-trans");
                }, 50);
            g.lGalleryOn
              ? (setTimeout(function () {
                  g.loadContent(b, !0, 0);
                }, this.s.speed + 50),
                setTimeout(function () {
                  (g.lgBusy = !1),
                    g.$el.trigger("onAfterSlide.lg", [f, b, c, d]);
                }, this.s.speed))
              : (g.loadContent(b, !0, g.s.backdropDuration),
                (g.lgBusy = !1),
                g.$el.trigger("onAfterSlide.lg", [f, b, c, d])),
              (g.lGalleryOn = !0),
              this.s.counter && a("#lg-counter-current").text(b + 1);
          }
        }
      }),
      (b.prototype.goToNextSlide = function (a) {
        var b = this,
          c = b.s.loop;
        a && b.$slide.length < 3 && (c = !1),
          b.lgBusy ||
            (b.index + 1 < b.$slide.length
              ? (b.index++,
                b.$el.trigger("onBeforeNextSlide.lg", [b.index]),
                b.slide(b.index, a, !1, "next"))
              : c
              ? ((b.index = 0),
                b.$el.trigger("onBeforeNextSlide.lg", [b.index]),
                b.slide(b.index, a, !1, "next"))
              : b.s.slideEndAnimatoin &&
                !a &&
                (b.$outer.addClass("lg-right-end"),
                setTimeout(function () {
                  b.$outer.removeClass("lg-right-end");
                }, 400)));
      }),
      (b.prototype.goToPrevSlide = function (a) {
        var b = this,
          c = b.s.loop;
        a && b.$slide.length < 3 && (c = !1),
          b.lgBusy ||
            (b.index > 0
              ? (b.index--,
                b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]),
                b.slide(b.index, a, !1, "prev"))
              : c
              ? ((b.index = b.$items.length - 1),
                b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]),
                b.slide(b.index, a, !1, "prev"))
              : b.s.slideEndAnimatoin &&
                !a &&
                (b.$outer.addClass("lg-left-end"),
                setTimeout(function () {
                  b.$outer.removeClass("lg-left-end");
                }, 400)));
      }),
      (b.prototype.keyPress = function () {
        var b = this;
        this.$items.length > 1 &&
          a(window).on("keyup.lg", function (a) {
            b.$items.length > 1 &&
              (37 === a.keyCode && (a.preventDefault(), b.goToPrevSlide()),
              39 === a.keyCode && (a.preventDefault(), b.goToNextSlide()));
          }),
          a(window).on("keydown.lg", function (a) {
            b.s.escKey === !0 &&
              27 === a.keyCode &&
              (a.preventDefault(),
              b.$outer.hasClass("lg-thumb-open")
                ? b.$outer.removeClass("lg-thumb-open")
                : b.destroy());
          });
      }),
      (b.prototype.arrow = function () {
        var a = this;
        this.$outer.find(".lg-prev").on("click.lg", function () {
          a.goToPrevSlide();
        }),
          this.$outer.find(".lg-next").on("click.lg", function () {
            a.goToNextSlide();
          });
      }),
      (b.prototype.arrowDisable = function (a) {
        !this.s.loop &&
          this.s.hideControlOnEnd &&
          (a + 1 < this.$slide.length
            ? this.$outer
                .find(".lg-next")
                .removeAttr("disabled")
                .removeClass("disabled")
            : this.$outer
                .find(".lg-next")
                .attr("disabled", "disabled")
                .addClass("disabled"),
          a > 0
            ? this.$outer
                .find(".lg-prev")
                .removeAttr("disabled")
                .removeClass("disabled")
            : this.$outer
                .find(".lg-prev")
                .attr("disabled", "disabled")
                .addClass("disabled"));
      }),
      (b.prototype.setTranslate = function (a, b, c) {
        this.s.useLeft
          ? a.css("left", b)
          : a.css({ transform: "translate3d(" + b + "px, " + c + "px, 0px)" });
      }),
      (b.prototype.touchMove = function (b, c) {
        var d = c - b;
        Math.abs(d) > 15 &&
          (this.$outer.addClass("lg-dragging"),
          this.setTranslate(this.$slide.eq(this.index), d, 0),
          this.setTranslate(
            a(".lg-prev-slide"),
            -this.$slide.eq(this.index).width() + d,
            0
          ),
          this.setTranslate(
            a(".lg-next-slide"),
            this.$slide.eq(this.index).width() + d,
            0
          ));
      }),
      (b.prototype.touchEnd = function (a) {
        var b = this;
        "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"),
          this.$slide
            .not(".lg-current, .lg-prev-slide, .lg-next-slide")
            .css("opacity", "0"),
          setTimeout(function () {
            b.$outer.removeClass("lg-dragging"),
              a < 0 && Math.abs(a) > b.s.swipeThreshold
                ? b.goToNextSlide(!0)
                : a > 0 && Math.abs(a) > b.s.swipeThreshold
                ? b.goToPrevSlide(!0)
                : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"),
              b.$slide.removeAttr("style");
          }),
          setTimeout(function () {
            b.$outer.hasClass("lg-dragging") ||
              "lg-slide" === b.s.mode ||
              b.$outer.removeClass("lg-slide");
          }, b.s.speed + 100);
      }),
      (b.prototype.enableSwipe = function () {
        var a = this,
          b = 0,
          c = 0,
          d = !1;
        a.s.enableSwipe &&
          a.isTouch &&
          a.doCss() &&
          (a.$slide.on("touchstart.lg", function (c) {
            a.$outer.hasClass("lg-zoomed") ||
              a.lgBusy ||
              (c.preventDefault(),
              a.manageSwipeClass(),
              (b = c.originalEvent.targetTouches[0].pageX));
          }),
          a.$slide.on("touchmove.lg", function (e) {
            a.$outer.hasClass("lg-zoomed") ||
              (e.preventDefault(),
              (c = e.originalEvent.targetTouches[0].pageX),
              a.touchMove(b, c),
              (d = !0));
          }),
          a.$slide.on("touchend.lg", function () {
            a.$outer.hasClass("lg-zoomed") ||
              (d
                ? ((d = !1), a.touchEnd(c - b))
                : a.$el.trigger("onSlideClick.lg"));
          }));
      }),
      (b.prototype.enableDrag = function () {
        var b = this,
          c = 0,
          d = 0,
          e = !1,
          f = !1;
        b.s.enableDrag &&
          !b.isTouch &&
          b.doCss() &&
          (b.$slide.on("mousedown.lg", function (d) {
            b.$outer.hasClass("lg-zoomed") ||
              ((a(d.target).hasClass("lg-object") ||
                a(d.target).hasClass("lg-video-play")) &&
                (d.preventDefault(),
                b.lgBusy ||
                  (b.manageSwipeClass(),
                  (c = d.pageX),
                  (e = !0),
                  (b.$outer.scrollLeft += 1),
                  (b.$outer.scrollLeft -= 1),
                  b.$outer.removeClass("lg-grab").addClass("lg-grabbing"),
                  b.$el.trigger("onDragstart.lg"))));
          }),
          a(window).on("mousemove.lg", function (a) {
            e &&
              ((f = !0),
              (d = a.pageX),
              b.touchMove(c, d),
              b.$el.trigger("onDragmove.lg"));
          }),
          a(window).on("mouseup.lg", function (g) {
            f
              ? ((f = !1), b.touchEnd(d - c), b.$el.trigger("onDragend.lg"))
              : (a(g.target).hasClass("lg-object") ||
                  a(g.target).hasClass("lg-video-play")) &&
                b.$el.trigger("onSlideClick.lg"),
              e &&
                ((e = !1),
                b.$outer.removeClass("lg-grabbing").addClass("lg-grab"));
          }));
      }),
      (b.prototype.manageSwipeClass = function () {
        var a = this.index + 1,
          b = this.index - 1;
        this.s.loop &&
          this.$slide.length > 2 &&
          (0 === this.index
            ? (b = this.$slide.length - 1)
            : this.index === this.$slide.length - 1 && (a = 0)),
          this.$slide.removeClass("lg-next-slide lg-prev-slide"),
          b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"),
          this.$slide.eq(a).addClass("lg-next-slide");
      }),
      (b.prototype.mousewheel = function () {
        var a = this;
        a.$outer.on("mousewheel.lg", function (b) {
          b.deltaY &&
            (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(),
            b.preventDefault());
        });
      }),
      (b.prototype.closeGallery = function () {
        var b = this,
          c = !1;
        this.$outer.find(".lg-close").on("click.lg", function () {
          b.destroy();
        }),
          b.s.closable &&
            (b.$outer.on("mousedown.lg", function (b) {
              c = !!(
                a(b.target).is(".lg-outer") ||
                a(b.target).is(".lg-item ") ||
                a(b.target).is(".lg-img-wrap")
              );
            }),
            b.$outer.on("mouseup.lg", function (d) {
              (a(d.target).is(".lg-outer") ||
                a(d.target).is(".lg-item ") ||
                (a(d.target).is(".lg-img-wrap") && c)) &&
                (b.$outer.hasClass("lg-dragging") || b.destroy());
            }));
      }),
      (b.prototype.destroy = function (b) {
        var c = this;
        b ||
          (c.$el.trigger("onBeforeClose.lg"),
          a(window).scrollTop(c.prevScrollTop)),
          b &&
            (c.s.dynamic || this.$items.off("click.lg click.lgcustom"),
            a.removeData(c.el, "lightGallery")),
          this.$el.off(".lg.tm"),
          a.each(a.fn.lightGallery.modules, function (a) {
            c.modules[a] && c.modules[a].destroy();
          }),
          (this.lGalleryOn = !1),
          clearTimeout(c.hideBartimeout),
          (this.hideBartimeout = !1),
          a(window).off(".lg"),
          a("body").removeClass("lg-on lg-from-hash"),
          c.$outer && c.$outer.removeClass("lg-visible"),
          a(".lg-backdrop").removeClass("in"),
          setTimeout(function () {
            c.$outer && c.$outer.remove(),
              a(".lg-backdrop").remove(),
              b || c.$el.trigger("onCloseAfter.lg");
          }, c.s.backdropDuration + 50);
      }),
      (a.fn.lightGallery = function (c) {
        return this.each(function () {
          if (a.data(this, "lightGallery"))
            try {
              a(this).data("lightGallery").init();
            } catch (a) {
              console.error("lightGallery has not initiated properly");
            }
          else a.data(this, "lightGallery", new b(this, c));
        });
      }),
      (a.fn.lightGallery.modules = {});
  })();
});
/*! lg-video - v1.0.2 - 2017-06-04
 * http://sachinchoolur.github.io/lightGallery
 * Copyright (c) 2017 Sachin N; Licensed GPLv3 */
!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (a) {
        return b(a);
      })
    : "object" == typeof exports
    ? (module.exports = b(require("jquery")))
    : b(jQuery);
})(this, function (a) {
  !(function () {
    "use strict";
    var b = {
        videoMaxWidth: "855px",
        youtubePlayerParams: !1,
        vimeoPlayerParams: !1,
        dailymotionPlayerParams: !1,
        vkPlayerParams: !1,
        videojs: !1,
        videojsOptions: {},
      },
      c = function (c) {
        return (
          (this.core = a(c).data("lightGallery")),
          (this.$el = a(c)),
          (this.core.s = a.extend({}, b, this.core.s)),
          (this.videoLoaded = !1),
          this.init(),
          this
        );
      };
    (c.prototype.init = function () {
      var b = this;
      b.core.$el.on("hasVideo.lg.tm", function (a, c, d, e) {
        if (
          (b.core.$slide
            .eq(c)
            .find(".lg-video")
            .append(b.loadVideo(d, "lg-object", !0, c, e)),
          e)
        )
          if (b.core.s.videojs)
            try {
              videojs(
                b.core.$slide.eq(c).find(".lg-html5").get(0),
                b.core.s.videojsOptions,
                function () {
                  b.videoLoaded || this.play();
                }
              );
            } catch (a) {
              console.error("Make sure you have included videojs");
            }
          else
            b.videoLoaded ||
              b.core.$slide.eq(c).find(".lg-html5").get(0).play();
      }),
        b.core.$el.on("onAferAppendSlide.lg.tm", function (a, c) {
          var d = b.core.$slide.eq(c).find(".lg-video-cont");
          d.hasClass("lg-has-iframe") ||
            (d.css("max-width", b.core.s.videoMaxWidth), (b.videoLoaded = !0));
        });
      var c = function (a) {
        if (
          a.find(".lg-object").hasClass("lg-has-poster") &&
          a.find(".lg-object").is(":visible")
        )
          if (a.hasClass("lg-has-video")) {
            var c = a.find(".lg-youtube").get(0),
              d = a.find(".lg-vimeo").get(0),
              e = a.find(".lg-dailymotion").get(0),
              f = a.find(".lg-html5").get(0);
            if (c)
              c.contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                "*"
              );
            else if (d)
              try {
                $f(d).api("play");
              } catch (a) {
                console.error("Make sure you have included froogaloop2 js");
              }
            else if (e) e.contentWindow.postMessage("play", "*");
            else if (f)
              if (b.core.s.videojs)
                try {
                  videojs(f).play();
                } catch (a) {
                  console.error("Make sure you have included videojs");
                }
              else f.play();
            a.addClass("lg-video-playing");
          } else {
            a.addClass("lg-video-playing lg-has-video");
            var g,
              h,
              i = function (c, d) {
                if (
                  (a
                    .find(".lg-video")
                    .append(b.loadVideo(c, "", !1, b.core.index, d)),
                  d)
                )
                  if (b.core.s.videojs)
                    try {
                      videojs(
                        b.core.$slide.eq(b.core.index).find(".lg-html5").get(0),
                        b.core.s.videojsOptions,
                        function () {
                          this.play();
                        }
                      );
                    } catch (a) {
                      console.error("Make sure you have included videojs");
                    }
                  else
                    b.core.$slide
                      .eq(b.core.index)
                      .find(".lg-html5")
                      .get(0)
                      .play();
              };
            b.core.s.dynamic
              ? ((g = b.core.s.dynamicEl[b.core.index].src),
                (h = b.core.s.dynamicEl[b.core.index].html),
                i(g, h))
              : ((g =
                  b.core.$items.eq(b.core.index).attr("href") ||
                  b.core.$items.eq(b.core.index).attr("data-src")),
                (h = b.core.$items.eq(b.core.index).attr("data-html")),
                i(g, h));
            var j = a.find(".lg-object");
            a.find(".lg-video").append(j),
              a.find(".lg-video-object").hasClass("lg-html5") ||
                (a.removeClass("lg-complete"),
                a.find(".lg-video-object").on("load.lg error.lg", function () {
                  a.addClass("lg-complete");
                }));
          }
      };
      b.core.doCss() &&
      b.core.$items.length > 1 &&
      ((b.core.s.enableSwipe && b.core.isTouch) ||
        (b.core.s.enableDrag && !b.core.isTouch))
        ? b.core.$el.on("onSlideClick.lg.tm", function () {
            var a = b.core.$slide.eq(b.core.index);
            c(a);
          })
        : b.core.$slide.on("click.lg", function () {
            c(a(this));
          }),
        b.core.$el.on("onBeforeSlide.lg.tm", function (c, d, e) {
          var f = b.core.$slide.eq(d),
            g = f.find(".lg-youtube").get(0),
            h = f.find(".lg-vimeo").get(0),
            i = f.find(".lg-dailymotion").get(0),
            j = f.find(".lg-vk").get(0),
            k = f.find(".lg-html5").get(0);
          if (g)
            g.contentWindow.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              "*"
            );
          else if (h)
            try {
              $f(h).api("pause");
            } catch (a) {
              console.error("Make sure you have included froogaloop2 js");
            }
          else if (i) i.contentWindow.postMessage("pause", "*");
          else if (k)
            if (b.core.s.videojs)
              try {
                videojs(k).pause();
              } catch (a) {
                console.error("Make sure you have included videojs");
              }
            else k.pause();
          j &&
            a(j).attr("src", a(j).attr("src").replace("&autoplay", "&noplay"));
          var l;
          l = b.core.s.dynamic
            ? b.core.s.dynamicEl[e].src
            : b.core.$items.eq(e).attr("href") ||
              b.core.$items.eq(e).attr("data-src");
          var m = b.core.isVideo(l, e) || {};
          (m.youtube || m.vimeo || m.dailymotion || m.vk) &&
            b.core.$outer.addClass("lg-hide-download");
        }),
        b.core.$el.on("onAfterSlide.lg.tm", function (a, c) {
          b.core.$slide.eq(c).removeClass("lg-video-playing");
        });
    }),
      (c.prototype.loadVideo = function (b, c, d, e, f) {
        var g = "",
          h = 1,
          i = "",
          j = this.core.isVideo(b, e) || {};
        if ((d && (h = this.videoLoaded ? 0 : 1), j.youtube))
          (i = "?wmode=opaque&autoplay=" + h + "&enablejsapi=1"),
            this.core.s.youtubePlayerParams &&
              (i = i + "&" + a.param(this.core.s.youtubePlayerParams)),
            (g =
              '<iframe class="lg-video-object lg-youtube ' +
              c +
              '" width="560" height="315" src="//www.youtube.com/embed/' +
              j.youtube[1] +
              i +
              '" frameborder="0" allowfullscreen></iframe>');
        else if (j.vimeo)
          (i = "?autoplay=" + h + "&api=1"),
            this.core.s.vimeoPlayerParams &&
              (i = i + "&" + a.param(this.core.s.vimeoPlayerParams)),
            (g =
              '<iframe class="lg-video-object lg-vimeo ' +
              c +
              '" width="560" height="315"  src="//player.vimeo.com/video/' +
              j.vimeo[1] +
              i +
              '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
        else if (j.dailymotion)
          (i = "?wmode=opaque&autoplay=" + h + "&api=postMessage"),
            this.core.s.dailymotionPlayerParams &&
              (i = i + "&" + a.param(this.core.s.dailymotionPlayerParams)),
            (g =
              '<iframe class="lg-video-object lg-dailymotion ' +
              c +
              '" width="560" height="315" src="//www.dailymotion.com/embed/video/' +
              j.dailymotion[1] +
              i +
              '" frameborder="0" allowfullscreen></iframe>');
        else if (j.html5) {
          var k = f.substring(0, 1);
          ("." !== k && "#" !== k) || (f = a(f).html()), (g = f);
        } else
          j.vk &&
            ((i = "&autoplay=" + h),
            this.core.s.vkPlayerParams &&
              (i = i + "&" + a.param(this.core.s.vkPlayerParams)),
            (g =
              '<iframe class="lg-video-object lg-vk ' +
              c +
              '" width="560" height="315" src="http://vk.com/video_ext.php?' +
              j.vk[1] +
              i +
              '" frameborder="0" allowfullscreen></iframe>'));
        return g;
      }),
      (c.prototype.destroy = function () {
        this.videoLoaded = !1;
      }),
      (a.fn.lightGallery.modules.video = c);
  })();
});
/*! lg-thumbnail - v1.0.3 - 2017-02-05
 * http://sachinchoolur.github.io/lightGallery
 * Copyright (c) 2017 Sachin N; Licensed GPLv3 */
!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (a) {
        return b(a);
      })
    : "object" == typeof exports
    ? (module.exports = b(require("jquery")))
    : b(jQuery);
})(this, function (a) {
  !(function () {
    "use strict";
    var b = {
        thumbnail: !0,
        animateThumb: !0,
        currentPagerPosition: "middle",
        thumbWidth: 100,
        thumbContHeight: 100,
        thumbMargin: 5,
        exThumbImage: !1,
        showThumbByDefault: !0,
        toogleThumb: !0,
        pullCaptionUp: !0,
        enableThumbDrag: !0,
        enableThumbSwipe: !0,
        swipeThreshold: 50,
        loadYoutubeThumbnail: !0,
        youtubeThumbSize: 1,
        loadVimeoThumbnail: !0,
        vimeoThumbSize: "thumbnail_small",
        loadDailymotionThumbnail: !0,
      },
      c = function (c) {
        return (
          (this.core = a(c).data("lightGallery")),
          (this.core.s = a.extend({}, b, this.core.s)),
          (this.$el = a(c)),
          (this.$thumbOuter = null),
          (this.thumbOuterWidth = 0),
          (this.thumbTotalWidth =
            this.core.$items.length *
            (this.core.s.thumbWidth + this.core.s.thumbMargin)),
          (this.thumbIndex = this.core.index),
          (this.left = 0),
          this.init(),
          this
        );
      };
    (c.prototype.init = function () {
      var a = this;
      this.core.s.thumbnail &&
        this.core.$items.length > 1 &&
        (this.core.s.showThumbByDefault &&
          setTimeout(function () {
            a.core.$outer.addClass("lg-thumb-open");
          }, 700),
        this.core.s.pullCaptionUp &&
          this.core.$outer.addClass("lg-pull-caption-up"),
        this.build(),
        this.core.s.animateThumb
          ? (this.core.s.enableThumbDrag &&
              !this.core.isTouch &&
              this.core.doCss() &&
              this.enableThumbDrag(),
            this.core.s.enableThumbSwipe &&
              this.core.isTouch &&
              this.core.doCss() &&
              this.enableThumbSwipe(),
            (this.thumbClickable = !1))
          : (this.thumbClickable = !0),
        this.toogle(),
        this.thumbkeyPress());
    }),
      (c.prototype.build = function () {
        function b(a, b, c) {
          var g,
            h = d.core.isVideo(a, c) || {},
            i = "";
          h.youtube || h.vimeo || h.dailymotion
            ? h.youtube
              ? (g = d.core.s.loadYoutubeThumbnail
                  ? "//img.youtube.com/vi/" +
                    h.youtube[1] +
                    "/" +
                    d.core.s.youtubeThumbSize +
                    ".jpg"
                  : b)
              : h.vimeo
              ? d.core.s.loadVimeoThumbnail
                ? ((g = "//i.vimeocdn.com/video/error_" + f + ".jpg"),
                  (i = h.vimeo[1]))
                : (g = b)
              : h.dailymotion &&
                (g = d.core.s.loadDailymotionThumbnail
                  ? "//www.dailymotion.com/thumbnail/video/" + h.dailymotion[1]
                  : b)
            : (g = b),
            (e +=
              '<div data-vimeo-id="' +
              i +
              '" class="lg-thumb-item" style="width:' +
              d.core.s.thumbWidth +
              "px; margin-right: " +
              d.core.s.thumbMargin +
              'px"><img src="' +
              g +
              '" /></div>'),
            (i = "");
        }
        var c,
          d = this,
          e = "",
          f = "",
          g =
            '<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>';
        switch (this.core.s.vimeoThumbSize) {
          case "thumbnail_large":
            f = "640";
            break;
          case "thumbnail_medium":
            f = "200x150";
            break;
          case "thumbnail_small":
            f = "100x75";
        }
        if (
          (d.core.$outer.addClass("lg-has-thumb"),
          d.core.$outer.find(".lg").append(g),
          (d.$thumbOuter = d.core.$outer.find(".lg-thumb-outer")),
          (d.thumbOuterWidth = d.$thumbOuter.width()),
          d.core.s.animateThumb &&
            d.core.$outer
              .find(".lg-thumb")
              .css({ width: d.thumbTotalWidth + "px", position: "relative" }),
          this.core.s.animateThumb &&
            d.$thumbOuter.css("height", d.core.s.thumbContHeight + "px"),
          d.core.s.dynamic)
        )
          for (var h = 0; h < d.core.s.dynamicEl.length; h++)
            b(d.core.s.dynamicEl[h].src, d.core.s.dynamicEl[h].thumb, h);
        else
          d.core.$items.each(function (c) {
            d.core.s.exThumbImage
              ? b(
                  a(this).attr("href") || a(this).attr("data-src"),
                  a(this).attr(d.core.s.exThumbImage),
                  c
                )
              : b(
                  a(this).attr("href") || a(this).attr("data-src"),
                  a(this).find("img").attr("src"),
                  c
                );
          });
        d.core.$outer.find(".lg-thumb").html(e),
          (c = d.core.$outer.find(".lg-thumb-item")),
          c.each(function () {
            var b = a(this),
              c = b.attr("data-vimeo-id");
            c &&
              a.getJSON(
                "//www.vimeo.com/api/v2/video/" + c + ".json?callback=?",
                { format: "json" },
                function (a) {
                  b.find("img").attr("src", a[0][d.core.s.vimeoThumbSize]);
                }
              );
          }),
          c.eq(d.core.index).addClass("active"),
          d.core.$el.on("onBeforeSlide.lg.tm", function () {
            c.removeClass("active"), c.eq(d.core.index).addClass("active");
          }),
          c.on("click.lg touchend.lg", function () {
            var b = a(this);
            setTimeout(function () {
              ((d.thumbClickable && !d.core.lgBusy) || !d.core.doCss()) &&
                ((d.core.index = b.index()),
                d.core.slide(d.core.index, !1, !0, !1));
            }, 50);
          }),
          d.core.$el.on("onBeforeSlide.lg.tm", function () {
            d.animateThumb(d.core.index);
          }),
          a(window).on(
            "resize.lg.thumb orientationchange.lg.thumb",
            function () {
              setTimeout(function () {
                d.animateThumb(d.core.index),
                  (d.thumbOuterWidth = d.$thumbOuter.width());
              }, 200);
            }
          );
      }),
      (c.prototype.setTranslate = function (a) {
        this.core.$outer
          .find(".lg-thumb")
          .css({ transform: "translate3d(-" + a + "px, 0px, 0px)" });
      }),
      (c.prototype.animateThumb = function (a) {
        var b = this.core.$outer.find(".lg-thumb");
        if (this.core.s.animateThumb) {
          var c;
          switch (this.core.s.currentPagerPosition) {
            case "left":
              c = 0;
              break;
            case "middle":
              c = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
              break;
            case "right":
              c = this.thumbOuterWidth - this.core.s.thumbWidth;
          }
          (this.left =
            (this.core.s.thumbWidth + this.core.s.thumbMargin) * a - 1 - c),
            this.left > this.thumbTotalWidth - this.thumbOuterWidth &&
              (this.left = this.thumbTotalWidth - this.thumbOuterWidth),
            this.left < 0 && (this.left = 0),
            this.core.lGalleryOn
              ? (b.hasClass("on") ||
                  this.core.$outer
                    .find(".lg-thumb")
                    .css("transition-duration", this.core.s.speed + "ms"),
                this.core.doCss() ||
                  b.animate({ left: -this.left + "px" }, this.core.s.speed))
              : this.core.doCss() || b.css("left", -this.left + "px"),
            this.setTranslate(this.left);
        }
      }),
      (c.prototype.enableThumbDrag = function () {
        var b = this,
          c = 0,
          d = 0,
          e = !1,
          f = !1,
          g = 0;
        b.$thumbOuter.addClass("lg-grab"),
          b.core.$outer
            .find(".lg-thumb")
            .on("mousedown.lg.thumb", function (a) {
              b.thumbTotalWidth > b.thumbOuterWidth &&
                (a.preventDefault(),
                (c = a.pageX),
                (e = !0),
                (b.core.$outer.scrollLeft += 1),
                (b.core.$outer.scrollLeft -= 1),
                (b.thumbClickable = !1),
                b.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"));
            }),
          a(window).on("mousemove.lg.thumb", function (a) {
            e &&
              ((g = b.left),
              (f = !0),
              (d = a.pageX),
              b.$thumbOuter.addClass("lg-dragging"),
              (g -= d - c),
              g > b.thumbTotalWidth - b.thumbOuterWidth &&
                (g = b.thumbTotalWidth - b.thumbOuterWidth),
              g < 0 && (g = 0),
              b.setTranslate(g));
          }),
          a(window).on("mouseup.lg.thumb", function () {
            f
              ? ((f = !1),
                b.$thumbOuter.removeClass("lg-dragging"),
                (b.left = g),
                Math.abs(d - c) < b.core.s.swipeThreshold &&
                  (b.thumbClickable = !0))
              : (b.thumbClickable = !0),
              e &&
                ((e = !1),
                b.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"));
          });
      }),
      (c.prototype.enableThumbSwipe = function () {
        var a = this,
          b = 0,
          c = 0,
          d = !1,
          e = 0;
        a.core.$outer.find(".lg-thumb").on("touchstart.lg", function (c) {
          a.thumbTotalWidth > a.thumbOuterWidth &&
            (c.preventDefault(),
            (b = c.originalEvent.targetTouches[0].pageX),
            (a.thumbClickable = !1));
        }),
          a.core.$outer.find(".lg-thumb").on("touchmove.lg", function (f) {
            a.thumbTotalWidth > a.thumbOuterWidth &&
              (f.preventDefault(),
              (c = f.originalEvent.targetTouches[0].pageX),
              (d = !0),
              a.$thumbOuter.addClass("lg-dragging"),
              (e = a.left),
              (e -= c - b),
              e > a.thumbTotalWidth - a.thumbOuterWidth &&
                (e = a.thumbTotalWidth - a.thumbOuterWidth),
              e < 0 && (e = 0),
              a.setTranslate(e));
          }),
          a.core.$outer.find(".lg-thumb").on("touchend.lg", function () {
            a.thumbTotalWidth > a.thumbOuterWidth && d
              ? ((d = !1),
                a.$thumbOuter.removeClass("lg-dragging"),
                Math.abs(c - b) < a.core.s.swipeThreshold &&
                  (a.thumbClickable = !0),
                (a.left = e))
              : (a.thumbClickable = !0);
          });
      }),
      (c.prototype.toogle = function () {
        var a = this;
        a.core.s.toogleThumb &&
          (a.core.$outer.addClass("lg-can-toggle"),
          a.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>'),
          a.core.$outer.find(".lg-toogle-thumb").on("click.lg", function () {
            a.core.$outer.toggleClass("lg-thumb-open");
          }));
      }),
      (c.prototype.thumbkeyPress = function () {
        var b = this;
        a(window).on("keydown.lg.thumb", function (a) {
          38 === a.keyCode
            ? (a.preventDefault(), b.core.$outer.addClass("lg-thumb-open"))
            : 40 === a.keyCode &&
              (a.preventDefault(), b.core.$outer.removeClass("lg-thumb-open"));
        });
      }),
      (c.prototype.destroy = function () {
        this.core.s.thumbnail &&
          this.core.$items.length > 1 &&
          (a(window).off(
            "resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"
          ),
          this.$thumbOuter.remove(),
          this.core.$outer.removeClass("lg-has-thumb"));
      }),
      (a.fn.lightGallery.modules.Thumbnail = c);
  })();
});
/*! lg-hash - v1.0.1 - 2016-09-30
 * http://sachinchoolur.github.io/lightGallery
 * Copyright (c) 2016 Sachin N; Licensed GPLv3 */
!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (a) {
        return b(a);
      })
    : "object" == typeof exports
    ? (module.exports = b(require("jquery")))
    : b(jQuery);
})(this, function (a) {
  !(function () {
    "use strict";
    var b = { hash: !0 },
      c = function (c) {
        return (
          (this.core = a(c).data("lightGallery")),
          (this.core.s = a.extend({}, b, this.core.s)),
          this.core.s.hash &&
            ((this.oldHash = window.location.hash), this.init()),
          this
        );
      };
    (c.prototype.init = function () {
      var b,
        c = this;
      c.core.$el.on("onAfterSlide.lg.tm", function (a, b, d) {
        window.location.hash = "lg=" + c.core.s.galleryId + "&slide=" + d;
      }),
        a(window).on("hashchange.lg.hash", function () {
          b = window.location.hash;
          var a = parseInt(b.split("&slide=")[1], 10);
          b.indexOf("lg=" + c.core.s.galleryId) > -1
            ? c.core.slide(a, !1, !1)
            : c.core.lGalleryOn && c.core.destroy();
        });
    }),
      (c.prototype.destroy = function () {
        this.core.s.hash &&
          (this.oldHash &&
          this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0
            ? (window.location.hash = this.oldHash)
            : history.pushState
            ? history.pushState(
                "",
                document.title,
                window.location.pathname + window.location.search
              )
            : (window.location.hash = ""),
          this.core.$el.off(".lg.hash"));
      }),
      (a.fn.lightGallery.modules.hash = c);
  })();
});
/*! lg-fullscreen - v1.0.1 - 2016-09-30
 * http://sachinchoolur.github.io/lightGallery
 * Copyright (c) 2016 Sachin N; Licensed GPLv3 */
!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (a) {
        return b(a);
      })
    : "object" == typeof exports
    ? (module.exports = b(require("jquery")))
    : b(jQuery);
})(this, function (a) {
  !(function () {
    "use strict";
    var b = { fullScreen: !0 },
      c = function (c) {
        return (
          (this.core = a(c).data("lightGallery")),
          (this.$el = a(c)),
          (this.core.s = a.extend({}, b, this.core.s)),
          this.init(),
          this
        );
      };
    (c.prototype.init = function () {
      var a = "";
      if (this.core.s.fullScreen) {
        if (
          !(
            document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled
          )
        )
          return;
        (a = '<span class="lg-fullscreen lg-icon"></span>'),
          this.core.$outer.find(".lg-toolbar").append(a),
          this.fullScreen();
      }
    }),
      (c.prototype.requestFullscreen = function () {
        var a = document.documentElement;
        a.requestFullscreen
          ? a.requestFullscreen()
          : a.msRequestFullscreen
          ? a.msRequestFullscreen()
          : a.mozRequestFullScreen
          ? a.mozRequestFullScreen()
          : a.webkitRequestFullscreen && a.webkitRequestFullscreen();
      }),
      (c.prototype.exitFullscreen = function () {
        document.exitFullscreen
          ? document.exitFullscreen()
          : document.msExitFullscreen
          ? document.msExitFullscreen()
          : document.mozCancelFullScreen
          ? document.mozCancelFullScreen()
          : document.webkitExitFullscreen && document.webkitExitFullscreen();
      }),
      (c.prototype.fullScreen = function () {
        var b = this;
        a(document).on(
          "fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg",
          function () {
            b.core.$outer.toggleClass("lg-fullscreen-on");
          }
        ),
          this.core.$outer.find(".lg-fullscreen").on("click.lg", function () {
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement
              ? b.exitFullscreen()
              : b.requestFullscreen();
          });
      }),
      (c.prototype.destroy = function () {
        this.exitFullscreen(),
          a(document).off(
            "fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg"
          );
      }),
      (a.fn.lightGallery.modules.fullscreen = c);
  })();
});
/*-----------------------------------------------------------------------------------*/
/*	18. MOUSEWHEEL
/*-----------------------------------------------------------------------------------*/
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "object" == typeof exports
    ? (module.exports = a)
    : a(jQuery);
})(function (a) {
  function b(b) {
    var g = b || window.event,
      h = i.call(arguments, 1),
      j = 0,
      l = 0,
      m = 0,
      n = 0,
      o = 0,
      p = 0;
    if (
      ((b = a.event.fix(g)),
      (b.type = "mousewheel"),
      "detail" in g && (m = -1 * g.detail),
      "wheelDelta" in g && (m = g.wheelDelta),
      "wheelDeltaY" in g && (m = g.wheelDeltaY),
      "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
      "axis" in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
      (j = 0 === m ? l : m),
      "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
      "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
      0 !== m || 0 !== l)
    ) {
      if (1 === g.deltaMode) {
        var q = a.data(this, "mousewheel-line-height");
        (j *= q), (m *= q), (l *= q);
      } else if (2 === g.deltaMode) {
        var r = a.data(this, "mousewheel-page-height");
        (j *= r), (m *= r), (l *= r);
      }
      if (
        ((n = Math.max(Math.abs(m), Math.abs(l))),
        (!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
        d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
        (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
        (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
        (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
        k.settings.normalizeOffset && this.getBoundingClientRect)
      ) {
        var s = this.getBoundingClientRect();
        (o = b.clientX - s.left), (p = b.clientY - s.top);
      }
      return (
        (b.deltaX = l),
        (b.deltaY = m),
        (b.deltaFactor = f),
        (b.offsetX = o),
        (b.offsetY = p),
        (b.deltaMode = 0),
        h.unshift(b, j, l, m),
        e && clearTimeout(e),
        (e = setTimeout(c, 200)),
        (a.event.dispatch || a.event.handle).apply(this, h)
      );
    }
  }
  function c() {
    f = null;
  }
  function d(a, b) {
    return (
      k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    );
  }
  var e,
    f,
    g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    h =
      "onwheel" in document || document.documentMode >= 9
        ? ["wheel"]
        : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    i = Array.prototype.slice;
  if (a.event.fixHooks)
    for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
  var k = (a.event.special.mousewheel = {
    version: "3.1.12",
    setup: function () {
      if (this.addEventListener)
        for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
      else this.onmousewheel = b;
      a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
        a.data(this, "mousewheel-page-height", k.getPageHeight(this));
    },
    teardown: function () {
      if (this.removeEventListener)
        for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
      else this.onmousewheel = null;
      a.removeData(this, "mousewheel-line-height"),
        a.removeData(this, "mousewheel-page-height");
    },
    getLineHeight: function (b) {
      var c = a(b),
        d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
      return (
        d.length || (d = a("body")),
        parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
      );
    },
    getPageHeight: function (b) {
      return a(b).height();
    },
    settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
  });
  a.fn.extend({
    mousewheel: function (a) {
      return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
    },
    unmousewheel: function (a) {
      return this.unbind("mousewheel", a);
    },
  });
});
/*-----------------------------------------------------------------------------------*/
/*	19. GOODSHARE
/*-----------------------------------------------------------------------------------*/
/* @version 3.2.4 at 21/11/2015 (14:35) */
!(function (a, b, c, d) {
  a(c).ready(function () {
    var d = a('meta[property="og:description"]').attr("content")
        ? a('meta[property="og:description"]').attr("content")
        : "",
      e = a('meta[property="og:image"]').attr("content")
        ? a('meta[property="og:image"]').attr("content")
        : "";
    (goodshare = {
      init: function (b, f) {
        var g = goodshare,
          h = a.extend(
            {
              type: "fb",
              url: location.href,
              title: c.title,
              text: d,
              image: e,
            },
            a(b).data(),
            f
          );
        if (null !== g.popup((link = g[h.type](h)))) return !1;
      },
      fb: function (b) {
        var d = a.extend({ url: location.href, title: c.title }, b);
        return (
          "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(d.url)
        );
      },
      tw: function (b) {
        var d = a.extend({ url: location.href, title: c.title }, b);
        return (
          "http://twitter.com/share?url=" +
          encodeURIComponent(d.url) +
          "&text=" +
          encodeURIComponent(d.title)
        );
      },
      gp: function (b) {
        var c = a.extend({ url: location.href }, b);
        return "https://plus.google.com/share?url=" + encodeURIComponent(c.url);
      },
      tm: function (b) {
        var e = a.extend({ url: location.href, title: c.title, text: d }, b);
        return (
          "https://www.tumblr.com/widgets/share/tool?canonicalUrl=" +
          encodeURIComponent(e.url) +
          "&title=" +
          encodeURIComponent(e.title) +
          "&caption=" +
          encodeURIComponent(e.text) +
          "&posttype=link"
        );
      },
      pt: function (b) {
        var d = a.extend(
          {
            url: location.href,
            title: c.title,
            image: a('meta[property="og:image"]').attr("content"),
          },
          b
        );
        return (
          "https://www.pinterest.com/pin/create/button/?url=" +
          encodeURIComponent(d.url) +
          "&media=" +
          encodeURIComponent(d.image) +
          "&description=" +
          encodeURIComponent(d.title)
        );
      },
      popup: function (a) {
        return b.open(
          a,
          "",
          "toolbar=0,status=0,scrollbars=0,width=630,height=440"
        );
      },
    }),
      a(c).on("click", ".goodshare", function (a) {
        a.preventDefault(), goodshare.init(this);
      });
  });
})(jQuery, window, document);
/*-----------------------------------------------------------------------------------*/
/*	20. ISOTOPE
/*-----------------------------------------------------------------------------------*/
/*!
 * Isotope PACKAGED v3.0.4
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */

!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e(t, require("jquery")))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  "use strict";
  function i(i, s, a) {
    function u(t, e, o) {
      var n,
        s = "$()." + i + '("' + e + '")';
      return (
        t.each(function (t, u) {
          var h = a.data(u, i);
          if (!h)
            return void r(
              i + " not initialized. Cannot call methods, i.e. " + s
            );
          var d = h[e];
          if (!d || "_" == e.charAt(0))
            return void r(s + " is not a valid method");
          var l = d.apply(h, o);
          n = void 0 === n ? l : n;
        }),
        void 0 !== n ? n : t
      );
    }
    function h(t, e) {
      t.each(function (t, o) {
        var n = a.data(o, i);
        n ? (n.option(e), n._init()) : ((n = new s(o, e)), a.data(o, i, n));
      });
    }
    (a = a || e || t.jQuery),
      a &&
        (s.prototype.option ||
          (s.prototype.option = function (t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function (t) {
          if ("string" == typeof t) {
            var e = n.call(arguments, 1);
            return u(this, t, e);
          }
          return h(this, t), this;
        }),
        o(a));
  }
  function o(t) {
    !t || (t && t.bridget) || (t.bridget = i);
  }
  var n = Array.prototype.slice,
    s = t.console,
    r =
      "undefined" == typeof s
        ? function () {}
        : function (t) {
            s.error(t);
          };
  return o(e || t.jQuery), i;
}),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            o = (i[t] = i[t] || []);
          return o.indexOf(e) == -1 && o.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {}),
            o = (i[t] = i[t] || {});
          return (o[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var o = i.indexOf(e);
          return o != -1 && i.splice(o, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var o = 0,
            n = i[o];
          e = e || [];
          for (var s = this._onceEvents && this._onceEvents[t]; n; ) {
            var r = s && s[n];
            r && (this.off(t, n), delete s[n]),
              n.apply(this, e),
              (o += r ? 0 : 1),
              (n = i[o]);
          }
          return this;
        }
      }),
      t
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("get-size/get-size", [], function () {
          return e();
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t),
        i = t.indexOf("%") == -1 && !isNaN(e);
      return i && e;
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        e < h;
        e++
      ) {
        var i = u[e];
        t[i] = 0;
      }
      return t;
    }
    function o(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          a(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
          ),
        e
      );
    }
    function n() {
      if (!d) {
        d = !0;
        var e = document.createElement("div");
        (e.style.width = "200px"),
          (e.style.padding = "1px 2px 3px 4px"),
          (e.style.borderStyle = "solid"),
          (e.style.borderWidth = "1px 2px 3px 4px"),
          (e.style.boxSizing = "border-box");
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var n = o(e);
        (s.isBoxSizeOuter = r = 200 == t(n.width)), i.removeChild(e);
      }
    }
    function s(e) {
      if (
        (n(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var s = o(e);
        if ("none" == s.display) return i();
        var a = {};
        (a.width = e.offsetWidth), (a.height = e.offsetHeight);
        for (
          var d = (a.isBorderBox = "border-box" == s.boxSizing), l = 0;
          l < h;
          l++
        ) {
          var f = u[l],
            c = s[f],
            m = parseFloat(c);
          a[f] = isNaN(m) ? 0 : m;
        }
        var p = a.paddingLeft + a.paddingRight,
          y = a.paddingTop + a.paddingBottom,
          g = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          I = a.borderTopWidth + a.borderBottomWidth,
          z = d && r,
          x = t(s.width);
        x !== !1 && (a.width = x + (z ? 0 : p + _));
        var S = t(s.height);
        return (
          S !== !1 && (a.height = S + (z ? 0 : y + I)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (y + I)),
          (a.outerWidth = a.width + g),
          (a.outerHeight = a.height + v),
          a
        );
      }
    }
    var r,
      a =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            },
      u = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      h = u.length,
      d = !1;
    return s;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var o = e[i],
          n = o + "MatchesSelector";
        if (t[n]) return n;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {};
    (i.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e;
      }),
      (i.makeArray = function (t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "object" == typeof t && "number" == typeof t.length)
          for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, o) {
        t = i.makeArray(t);
        var n = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!o) return void n.push(t);
              e(t, o) && n.push(t);
              for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++)
                n.push(i[s]);
            }
          }),
          n
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        var o = t.prototype[e],
          n = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[n];
          t && clearTimeout(t);
          var e = arguments,
            s = this;
          this[n] = setTimeout(function () {
            o.apply(s, e), delete s[n];
          }, i || 100);
        };
      }),
      (i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var o = t.console;
    return (
      (i.htmlInit = function (e, n) {
        i.docReady(function () {
          var s = i.toDashed(n),
            r = "data-" + s,
            a = document.querySelectorAll("[" + r + "]"),
            u = document.querySelectorAll(".js-" + s),
            h = i.makeArray(a).concat(i.makeArray(u)),
            d = r + "-options",
            l = t.jQuery;
          h.forEach(function (t) {
            var i,
              s = t.getAttribute(r) || t.getAttribute(d);
            try {
              i = s && JSON.parse(s);
            } catch (a) {
              return void (
                o &&
                o.error("Error parsing " + r + " on " + t.className + ": " + a)
              );
            }
            var u = new e(t, i);
            l && l.data(t, n, u);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          ["ev-emitter/ev-emitter", "get-size/get-size"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("ev-emitter"), require("get-size")))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function o(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function n(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    }
    var s = document.documentElement.style,
      r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
      u = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[r],
      h = {
        transform: a,
        transition: r,
        transitionDuration: r + "Duration",
        transitionProperty: r + "Property",
        transitionDelay: r + "Delay",
      },
      d = (o.prototype = Object.create(t.prototype));
    (d.constructor = o),
      (d._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (d.getSize = function () {
        this.size = e(this.element);
      }),
      (d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var o = h[i] || i;
          e[o] = t[i];
        }
      }),
      (d.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          o = t[e ? "left" : "right"],
          n = t[i ? "top" : "bottom"],
          s = this.layout.size,
          r =
            o.indexOf("%") != -1
              ? (parseFloat(o) / 100) * s.width
              : parseInt(o, 10),
          a =
            n.indexOf("%") != -1
              ? (parseFloat(n) / 100) * s.height
              : parseInt(n, 10);
        (r = isNaN(r) ? 0 : r),
          (a = isNaN(a) ? 0 : a),
          (r -= e ? s.paddingLeft : s.paddingRight),
          (a -= i ? s.paddingTop : s.paddingBottom),
          (this.position.x = r),
          (this.position.y = a);
      }),
      (d.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          o = this.layout._getOption("originTop"),
          n = i ? "paddingLeft" : "paddingRight",
          s = i ? "left" : "right",
          r = i ? "right" : "left",
          a = this.position.x + t[n];
        (e[s] = this.getXValue(a)), (e[r] = "");
        var u = o ? "paddingTop" : "paddingBottom",
          h = o ? "top" : "bottom",
          d = o ? "bottom" : "top",
          l = this.position.y + t[u];
        (e[h] = this.getYValue(l)),
          (e[d] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          o = this.position.y,
          n = parseInt(t, 10),
          s = parseInt(e, 10),
          r = n === this.position.x && s === this.position.y;
        if ((this.setPosition(t, e), r && !this.isTransitioning))
          return void this.layoutPosition();
        var a = t - i,
          u = e - o,
          h = {};
        (h.transform = this.getTranslate(a, u)),
          this.transition({
            to: h,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"),
          o = this.layout._getOption("originTop");
        return (
          (t = i ? t : -t),
          (e = o ? e : -e),
          "translate3d(" + t + "px, " + e + "px, 0)"
        );
      }),
      (d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (d.moveTo = d._transitionTo),
      (d.setPosition = function (t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var o = this.element.offsetHeight;
          o = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var l = "opacity," + n(a);
    (d.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        (t = "number" == typeof t ? t + "ms" : t),
          this.css({
            transitionProperty: l,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(u, this, !1);
      }
    }),
      (d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (d.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var f = { "-webkit-transform": "transform" };
    (d.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          o = f[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[o],
          i(e.ingProperties) && this.disableTransition(),
          o in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[o]),
          o in e.onEnd)
        ) {
          var n = e.onEnd[o];
          n.call(this), delete e.onEnd[o];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (d.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(u, this, !1),
          (this.isTransitioning = !1);
      }),
      (d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var c = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: "",
    };
    return (
      (d.removeTransitionStyles = function () {
        this.css(c);
      }),
      (d.stagger = function (t) {
        (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
      }),
      (d.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (d.remove = function () {
        return r && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (d.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (d.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (d.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      o
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "ev-emitter/ev-emitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, o, n, s) {
            return e(t, i, o, n, s);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, o, n) {
    "use strict";
    function s(t, e) {
      var i = o.getQueryElement(t);
      if (!i)
        return void (
          u &&
          u.error(
            "Bad element for " + this.constructor.namespace + ": " + (i || t)
          )
        );
      (this.element = i),
        h && (this.$element = h(this.element)),
        (this.options = o.extend({}, this.constructor.defaults)),
        this.option(e);
      var n = ++l;
      (this.element.outlayerGUID = n), (f[n] = this), this._create();
      var s = this._getOption("initLayout");
      s && this.layout();
    }
    function r(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    function a(t) {
      if ("number" == typeof t) return t;
      var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        o = e && e[2];
      if (!i.length) return 0;
      i = parseFloat(i);
      var n = m[o] || 1;
      return i * n;
    }
    var u = t.console,
      h = t.jQuery,
      d = function () {},
      l = 0,
      f = {};
    (s.namespace = "outlayer"),
      (s.Item = n),
      (s.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var c = s.prototype;
    o.extend(c, e.prototype),
      (c.option = function (t) {
        o.extend(this.options, t);
      }),
      (c._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (c._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
      }),
      (c.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (c._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            o = [],
            n = 0;
          n < e.length;
          n++
        ) {
          var s = e[n],
            r = new i(s, this);
          o.push(r);
        }
        return o;
      }),
      (c._filterFindItemElements = function (t) {
        return o.filterFindElements(t, this.options.itemSelector);
      }),
      (c.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (c.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (c._init = c.layout),
      (c._resetLayout = function () {
        this.getSize();
      }),
      (c.getSize = function () {
        this.size = i(this.element);
      }),
      (c._getMeasurement = function (t, e) {
        var o,
          n = this.options[t];
        n
          ? ("string" == typeof n
              ? (o = this.element.querySelector(n))
              : n instanceof HTMLElement && (o = n),
            (this[t] = o ? i(o)[e] : n))
          : (this[t] = 0);
      }),
      (c.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (c._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (c._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var o = this._getItemLayoutPosition(t);
            (o.item = t), (o.isInstant = e || t.isLayoutInstant), i.push(o);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (c._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (c._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
          }, this);
      }),
      (c.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t
          ? void (this.stagger = 0)
          : ((this.stagger = a(t)), this.stagger);
      }),
      (c._positionItem = function (t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i));
      }),
      (c._postLayout = function () {
        this.resizeContainer();
      }),
      (c.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
          var e = this._getContainerSize();
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1));
        }
      }),
      (c._getContainerSize = d),
      (c._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (c._emitCompleteOnItems = function (t, e) {
        function i() {
          n.dispatchEvent(t + "Complete", null, [e]);
        }
        function o() {
          r++, r == s && i();
        }
        var n = this,
          s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function (e) {
          e.once(t, o);
        });
      }),
      (c.dispatchEvent = function (t, e, i) {
        var o = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, o), h))
          if (((this.$element = this.$element || h(this.element)), e)) {
            var n = h.Event(e);
            (n.type = t), this.$element.trigger(n, i);
          } else this.$element.trigger(t, i);
      }),
      (c.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (c.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (c.stamp = function (t) {
        (t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
      }),
      (c.unstamp = function (t) {
        (t = this._find(t)),
          t &&
            t.forEach(function (t) {
              o.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
      }),
      (c._find = function (t) {
        if (t)
          return (
            "string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = o.makeArray(t))
          );
      }),
      (c._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (c._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (c._manageStamp = d),
      (c._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          o = this._boundingRect,
          n = i(t),
          s = {
            left: e.left - o.left - n.marginLeft,
            top: e.top - o.top - n.marginTop,
            right: o.right - e.right - n.marginRight,
            bottom: o.bottom - e.bottom - n.marginBottom,
          };
        return s;
      }),
      (c.handleEvent = o.handleEvent),
      (c.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (c.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (c.onresize = function () {
        this.resize();
      }),
      o.debounceMethod(s, "onresize", 100),
      (c.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (c.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (c.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (c.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (c.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (c.reveal = function (t) {
        if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal();
          });
        }
      }),
      (c.hide = function (t) {
        if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide();
          });
        }
      }),
      (c.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (c.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (c.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (c.getItems = function (t) {
        t = o.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (c.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), o.removeFrom(this.items, t);
            }, this);
      }),
      (c.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e],
          delete this.element.outlayerGUID,
          h && h.removeData(this.element, this.constructor.namespace);
      }),
      (s.data = function (t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e];
      }),
      (s.create = function (t, e) {
        var i = r(s);
        return (
          (i.defaults = o.extend({}, s.defaults)),
          o.extend(i.defaults, e),
          (i.compatOptions = o.extend({}, s.compatOptions)),
          (i.namespace = t),
          (i.data = s.data),
          (i.Item = r(n)),
          o.htmlInit(i, t),
          h && h.bridget && h.bridget(t, i),
          i
        );
      });
    var m = { ms: 1, s: 1e3 };
    return (s.Item = n), s;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope/js/item", ["outlayer/outlayer"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer")))
      : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
  })(window, function (t) {
    "use strict";
    function e() {
      t.Item.apply(this, arguments);
    }
    var i = (e.prototype = Object.create(t.Item.prototype)),
      o = i._create;
    (i._create = function () {
      (this.id = this.layout.itemGUID++), o.call(this), (this.sortData = {});
    }),
      (i.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var t = this.layout.options.getSortData,
            e = this.layout._sorters;
          for (var i in t) {
            var o = e[i];
            this.sortData[i] = o(this.element, this);
          }
        }
      });
    var n = i.destroy;
    return (
      (i.destroy = function () {
        n.apply(this, arguments), this.css({ display: "" });
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("get-size"), require("outlayer")))
      : ((t.Isotope = t.Isotope || {}),
        (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      (this.isotope = t),
        t &&
          ((this.options = t.options[this.namespace]),
          (this.element = t.element),
          (this.items = t.filteredItems),
          (this.size = t.size));
    }
    var o = i.prototype,
      n = [
        "_resetLayout",
        "_getItemLayoutPosition",
        "_manageStamp",
        "_getContainerSize",
        "_getElementOffset",
        "needsResizeLayout",
        "_getOption",
      ];
    return (
      n.forEach(function (t) {
        o[t] = function () {
          return e.prototype[t].apply(this.isotope, arguments);
        };
      }),
      (o.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element),
          i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight;
      }),
      (o._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
      }),
      (o.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (o.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (o.getSegmentSize = function (t, e) {
        var i = t + e,
          o = "outer" + e;
        if ((this._getMeasurement(i, o), !this[i])) {
          var n = this.getFirstItemSize();
          this[i] = (n && n[o]) || this.isotope.size["inner" + e];
        }
      }),
      (o.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element);
      }),
      (o.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
      }),
      (o.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size);
      }),
      (i.modes = {}),
      (i.create = function (t, e) {
        function n() {
          i.apply(this, arguments);
        }
        return (
          (n.prototype = Object.create(o)),
          (n.prototype.constructor = n),
          e && (n.options = e),
          (n.prototype.namespace = t),
          (i.modes[t] = n),
          n
        );
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer"), require("get-size")))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return (
      (o._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        (this.maxY = 0), (this.horizontalColIndex = 0);
      }),
      (o.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var o = (this.columnWidth += this.gutter),
          n = this.containerWidth + this.gutter,
          s = n / o,
          r = o - (n % o),
          a = r && r < 1 ? "round" : "floor";
        (s = Math[a](s)), (this.cols = Math.max(s, 1));
      }),
      (o.getContainerWidth = function () {
        var t = this._getOption("fitWidth"),
          i = t ? this.element.parentNode : this.element,
          o = e(i);
        this.containerWidth = o && o.innerWidth;
      }),
      (o._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = e && e < 1 ? "round" : "ceil",
          o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (
          var n = this.options.horizontalOrder
              ? "_getHorizontalColPosition"
              : "_getTopColPosition",
            s = this[n](o, t),
            r = { x: this.columnWidth * s.col, y: s.y },
            a = s.y + t.size.outerHeight,
            u = o + s.col,
            h = s.col;
          h < u;
          h++
        )
          this.colYs[h] = a;
        return r;
      }),
      (o._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
          i = Math.min.apply(Math, e);
        return { col: e.indexOf(i), y: i };
      }),
      (o._getTopColGroup = function (t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++)
          e[o] = this._getColGroupY(o, t);
        return e;
      }),
      (o._getColGroupY = function (t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i);
      }),
      (o._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols,
          o = t > 1 && i + t > this.cols;
        i = o ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return (
          (this.horizontalColIndex = n ? i + t : this.horizontalColIndex),
          { col: i, y: this._getColGroupY(i, t) }
        );
      }),
      (o._manageStamp = function (t) {
        var i = e(t),
          o = this._getElementOffset(t),
          n = this._getOption("originLeft"),
          s = n ? o.left : o.right,
          r = s + i.outerWidth,
          a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        (u -= r % this.columnWidth ? 0 : 1), (u = Math.min(this.cols - 1, u));
        for (
          var h = this._getOption("originTop"),
            d = (h ? o.top : o.bottom) + i.outerHeight,
            l = a;
          l <= u;
          l++
        )
          this.colYs[l] = Math.max(d, this.colYs[l]);
      }),
      (o._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (o._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (o.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope/js/layout-modes/masonry",
          ["../layout-mode", "masonry/masonry"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          require("../layout-mode"),
          require("masonry-layout")
        ))
      : e(t.Isotope.LayoutMode, t.Masonry);
  })(window, function (t, e) {
    "use strict";
    var i = t.create("masonry"),
      o = i.prototype,
      n = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function () {
      (this.items = this.isotope.filteredItems), r.call(this);
    };
    var a = o._getOption;
    return (
      (o._getOption = function (t) {
        return "fitWidth" == t
          ? void 0 !== this.options.isFitWidth
            ? this.options.isFitWidth
            : this.options.fitWidth
          : a.apply(this.isotope, arguments);
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e)
      : "object" == typeof exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("fitRows"),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        (this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement("gutter", "outerWidth");
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
          i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
        var o = { x: this.x, y: this.y };
        return (
          (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
          (this.x += e),
          o
        );
      }),
      (i._getContainerSize = function () {
        return { height: this.maxY };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("vertical", { horizontalAlignment: 0 }),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        this.y = 0;
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e =
            (this.isotope.size.innerWidth - t.size.outerWidth) *
            this.options.horizontalAlignment,
          i = this.y;
        return (this.y += t.size.outerHeight), { x: e, y: i };
      }),
      (i._getContainerSize = function () {
        return { height: this.y };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "desandro-matches-selector/matches-selector",
            "fizzy-ui-utils/utils",
            "isotope/js/item",
            "isotope/js/layout-mode",
            "isotope/js/layout-modes/masonry",
            "isotope/js/layout-modes/fit-rows",
            "isotope/js/layout-modes/vertical",
          ],
          function (i, o, n, s, r, a) {
            return e(t, i, o, n, s, r, a);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("isotope/js/item"),
          require("isotope/js/layout-mode"),
          require("isotope/js/layout-modes/masonry"),
          require("isotope/js/layout-modes/fit-rows"),
          require("isotope/js/layout-modes/vertical")
        ))
      : (t.Isotope = e(
          t,
          t.Outlayer,
          t.getSize,
          t.matchesSelector,
          t.fizzyUIUtils,
          t.Isotope.Item,
          t.Isotope.LayoutMode
        ));
  })(window, function (t, e, i, o, n, s, r) {
    function a(t, e) {
      return function (i, o) {
        for (var n = 0; n < t.length; n++) {
          var s = t[n],
            r = i.sortData[s],
            a = o.sortData[s];
          if (r > a || r < a) {
            var u = void 0 !== e[s] ? e[s] : e,
              h = u ? 1 : -1;
            return (r > a ? 1 : -1) * h;
          }
        }
        return 0;
      };
    }
    var u = t.jQuery,
      h = String.prototype.trim
        ? function (t) {
            return t.trim();
          }
        : function (t) {
            return t.replace(/^\s+|\s+$/g, "");
          },
      d = e.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (d.Item = s), (d.LayoutMode = r);
    var l = d.prototype;
    (l._create = function () {
      (this.itemGUID = 0),
        (this._sorters = {}),
        this._getSorters(),
        e.prototype._create.call(this),
        (this.modes = {}),
        (this.filteredItems = this.items),
        (this.sortHistory = ["original-order"]);
      for (var t in r.modes) this._initLayoutMode(t);
    }),
      (l.reloadItems = function () {
        (this.itemGUID = 0), e.prototype.reloadItems.call(this);
      }),
      (l._itemize = function () {
        for (
          var t = e.prototype._itemize.apply(this, arguments), i = 0;
          i < t.length;
          i++
        ) {
          var o = t[i];
          o.id = this.itemGUID++;
        }
        return this._updateItemsSortData(t), t;
      }),
      (l._initLayoutMode = function (t) {
        var e = r.modes[t],
          i = this.options[t] || {};
        (this.options[t] = e.options ? n.extend(e.options, i) : i),
          (this.modes[t] = new e(this));
      }),
      (l.layout = function () {
        return !this._isLayoutInited && this._getOption("initLayout")
          ? void this.arrange()
          : void this._layout();
      }),
      (l._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, t),
          (this._isLayoutInited = !0);
      }),
      (l.arrange = function (t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        (this.filteredItems = e.matches),
          this._bindArrangeComplete(),
          this._isInstant
            ? this._noTransition(this._hideReveal, [e])
            : this._hideReveal(e),
          this._sort(),
          this._layout();
      }),
      (l._init = l.arrange),
      (l._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide);
      }),
      (l._getIsInstant = function () {
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        return (this._isInstant = e), e;
      }),
      (l._bindArrangeComplete = function () {
        function t() {
          e &&
            i &&
            o &&
            n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
        }
        var e,
          i,
          o,
          n = this;
        this.once("layoutComplete", function () {
          (e = !0), t();
        }),
          this.once("hideComplete", function () {
            (i = !0), t();
          }),
          this.once("revealComplete", function () {
            (o = !0), t();
          });
      }),
      (l._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (
          var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0;
          r < t.length;
          r++
        ) {
          var a = t[r];
          if (!a.isIgnored) {
            var u = s(a);
            u && i.push(a),
              u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a);
          }
        }
        return { matches: i, needReveal: o, needHide: n };
      }),
      (l._getFilterTest = function (t) {
        return u && this.options.isJQueryFiltering
          ? function (e) {
              return u(e.element).is(t);
            }
          : "function" == typeof t
          ? function (e) {
              return t(e.element);
            }
          : function (e) {
              return o(e.element, t);
            };
      }),
      (l.updateSortData = function (t) {
        var e;
        t ? ((t = n.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
          this._getSorters(),
          this._updateItemsSortData(e);
      }),
      (l._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
          var i = t[e];
          this._sorters[e] = f(i);
        }
      }),
      (l._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
          var o = t[i];
          o.updateSortData();
        }
      });
    var f = (function () {
      function t(t) {
        if ("string" != typeof t) return t;
        var i = h(t).split(" "),
          o = i[0],
          n = o.match(/^\[(.+)\]$/),
          s = n && n[1],
          r = e(s, o),
          a = d.sortDataParsers[i[1]];
        return (t = a
          ? function (t) {
              return t && a(r(t));
            }
          : function (t) {
              return t && r(t);
            });
      }
      function e(t, e) {
        return t
          ? function (e) {
              return e.getAttribute(t);
            }
          : function (t) {
              var i = t.querySelector(e);
              return i && i.textContent;
            };
      }
      return t;
    })();
    (d.sortDataParsers = {
      parseInt: function (t) {
        return parseInt(t, 10);
      },
      parseFloat: function (t) {
        return parseFloat(t);
      },
    }),
      (l._sort = function () {
        if (this.options.sortBy) {
          var t = n.makeArray(this.options.sortBy);
          this._getIsSameSortBy(t) ||
            (this.sortHistory = t.concat(this.sortHistory));
          var e = a(this.sortHistory, this.options.sortAscending);
          this.filteredItems.sort(e);
        }
      }),
      (l._getIsSameSortBy = function (t) {
        for (var e = 0; e < t.length; e++)
          if (t[e] != this.sortHistory[e]) return !1;
        return !0;
      }),
      (l._mode = function () {
        var t = this.options.layoutMode,
          e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return (e.options = this.options[t]), e;
      }),
      (l._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (l._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t);
      }),
      (l._manageStamp = function (t) {
        this._mode()._manageStamp(t);
      }),
      (l._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (l.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (l.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i = this._filterRevealAdded(e);
          this.filteredItems = this.filteredItems.concat(i);
        }
      }),
      (l.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          this._resetLayout(), this._manageStamps();
          var i = this._filterRevealAdded(e);
          this.layoutItems(this.filteredItems),
            (this.filteredItems = i.concat(this.filteredItems)),
            (this.items = e.concat(this.items));
        }
      }),
      (l._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return (
          this.hide(e.needHide),
          this.reveal(e.matches),
          this.layoutItems(e.matches, !0),
          e.matches
        );
      }),
      (l.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i,
            o,
            n = e.length;
          for (i = 0; i < n; i++)
            (o = e[i]), this.element.appendChild(o.element);
          var s = this._filter(e).matches;
          for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
          for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
          this.reveal(s);
        }
      });
    var c = l.remove;
    return (
      (l.remove = function (t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
          var s = e[o];
          n.removeFrom(this.filteredItems, s);
        }
      }),
      (l.shuffle = function () {
        for (var t = 0; t < this.items.length; t++) {
          var e = this.items[t];
          e.sortData.random = Math.random();
        }
        (this.options.sortBy = "random"), this._sort(), this._layout();
      }),
      (l._noTransition = function (t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return (this.options.transitionDuration = i), o;
      }),
      (l.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
          return t.element;
        });
      }),
      d
    );
  });
/*-----------------------------------------------------------------------------------*/
/*	21. IMAGESLOADED
/*-----------------------------------------------------------------------------------*/
/*!
 * imagesLoaded PACKAGED v4.1.2
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", e)
    : "object" == typeof module && module.exports
    ? (module.exports = e())
    : (t.EvEmitter = e());
})("undefined" != typeof window ? window : this, function () {
  function t() {}
  var e = t.prototype;
  return (
    (e.on = function (t, e) {
      if (t && e) {
        var i = (this._events = this._events || {}),
          n = (i[t] = i[t] || []);
        return -1 == n.indexOf(e) && n.push(e), this;
      }
    }),
    (e.once = function (t, e) {
      if (t && e) {
        this.on(t, e);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[t] = i[t] || {});
        return (n[e] = !0), this;
      }
    }),
    (e.off = function (t, e) {
      var i = this._events && this._events[t];
      if (i && i.length) {
        var n = i.indexOf(e);
        return -1 != n && i.splice(n, 1), this;
      }
    }),
    (e.emitEvent = function (t, e) {
      var i = this._events && this._events[t];
      if (i && i.length) {
        var n = 0,
          o = i[n];
        e = e || [];
        for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
          var s = r && r[o];
          s && (this.off(t, o), delete r[o]),
            o.apply(this, e),
            (n += s ? 0 : 1),
            (o = i[n]);
        }
        return this;
      }
    }),
    t
  );
}),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return e(t, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("ev-emitter")))
      : (t.imagesLoaded = e(t, t.EvEmitter));
  })("undefined" != typeof window ? window : this, function (t, e) {
    function i(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    function n(t) {
      var e = [];
      if (Array.isArray(t)) e = t;
      else if ("number" == typeof t.length)
        for (var i = 0; i < t.length; i++) e.push(t[i]);
      else e.push(t);
      return e;
    }
    function o(t, e, r) {
      return this instanceof o
        ? ("string" == typeof t && (t = document.querySelectorAll(t)),
          (this.elements = n(t)),
          (this.options = i({}, this.options)),
          "function" == typeof e ? (r = e) : i(this.options, e),
          r && this.on("always", r),
          this.getImages(),
          h && (this.jqDeferred = new h.Deferred()),
          void setTimeout(
            function () {
              this.check();
            }.bind(this)
          ))
        : new o(t, e, r);
    }
    function r(t) {
      this.img = t;
    }
    function s(t, e) {
      (this.url = t), (this.element = e), (this.img = new Image());
    }
    var h = t.jQuery,
      a = t.console;
    (o.prototype = Object.create(e.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t),
          this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
          for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = t.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var d = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, t), (n = i.exec(e.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (t) {
        var e = new r(t);
        this.images.push(e);
      }),
      (o.prototype.addBackground = function (t, e) {
        var i = new s(t, e);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function t(t, i, n) {
          setTimeout(function () {
            e.progress(t, i, n);
          });
        }
        var e = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (e) {
                e.once("progress", t), e.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (t, e, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
          this.emitEvent("progress", [this, t, e]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, t),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, t, e);
      }),
      (o.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(t, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var e = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[e](this);
        }
      }),
      (r.prototype = Object.create(e.prototype)),
      (r.prototype.check = function () {
        var t = this.getIsImageComplete();
        return t
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (t, e) {
        (this.isLoaded = t), this.emitEvent("progress", [this, this.img, e]);
      }),
      (r.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var t = this.getIsImageComplete();
        t &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (t, e) {
        (this.isLoaded = t),
          this.emitEvent("progress", [this, this.element, e]);
      }),
      (o.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery),
          e &&
            ((h = e),
            (h.fn.imagesLoaded = function (t, e) {
              var i = new o(this, t, e);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });
/*-----------------------------------------------------------------------------------*/
/*	22. FOTORAMA
/*-----------------------------------------------------------------------------------*/
/*!
 * Fotorama 4.6.3 | http://fotorama.io/license/
 */
(fotoramaVersion = "4.6.3"),
  (function (t, e, n, o, i) {
    "use strict";
    function r() {}
    function a(t, e, n) {
      return Math.max(isNaN(e) ? -1 / 0 : e, Math.min(isNaN(n) ? 1 / 0 : n, t));
    }
    function s(t) {
      return t.match(/ma/) && t.match(/-?\d+(?!d)/g)[t.match(/3d/) ? 12 : 4];
    }
    function u(t) {
      return je ? +s(t.css("transform")) : +t.css("left").replace("px", "");
    }
    function l(t) {
      var e = {};
      return (
        je ? (e.transform = "translate3d(" + t + "px,0,0)") : (e.left = t), e
      );
    }
    function c(t) {
      return { "transition-duration": t + "ms" };
    }
    function f(t, e) {
      return isNaN(t) ? e : t;
    }
    function d(t, e) {
      return f(+String(t).replace(e || "px", ""));
    }
    function h(t) {
      return /%$/.test(t) ? d(t, "%") : i;
    }
    function m(t, e) {
      return f((h(t) / 100) * e, d(t));
    }
    function p(t) {
      return (!isNaN(d(t)) || !isNaN(d(t, "%"))) && t;
    }
    function v(t, e, n, o) {
      return (t - (o || 0)) * (e + (n || 0));
    }
    function w(t, e, n, o) {
      return -Math.round(t / (e + (n || 0)) - (o || 0));
    }
    function g(t) {
      var e = t.data();
      e.tEnd ||
        (K(
          t[0],
          {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            msTransition: "MSTransitionEnd",
            transition: "transitionend",
          }[we.prefixed("transition")],
          function (t) {
            e.tProp && t.propertyName.match(e.tProp) && e.onEndFn();
          }
        ),
        (e.tEnd = !0));
    }
    function y(t, e, n, o) {
      var i,
        r = t.data();
      r &&
        ((r.onEndFn = function () {
          i || ((i = !0), clearTimeout(r.tT), n());
        }),
        (r.tProp = e),
        clearTimeout(r.tT),
        (r.tT = setTimeout(function () {
          r.onEndFn();
        }, 1.5 * o)),
        g(t));
    }
    function b(t, e) {
      if (t.length) {
        var n = t.data();
        je ? (t.css(c(0)), (n.onEndFn = r), clearTimeout(n.tT)) : t.stop();
        var o = x(e, function () {
          return u(t);
        });
        return t.css(l(o)), o;
      }
    }
    function x() {
      for (
        var t, e = 0, n = arguments.length;
        e < n && "number" != typeof (t = e ? arguments[e]() : arguments[e]);
        e++
      );
      return t;
    }
    function _(t, e) {
      return Math.round(t + (e - t) / 1.5);
    }
    function C() {
      return (
        (C.p = C.p || ("https:" === n.protocol ? "https://" : "http://")), C.p
      );
    }
    function T(t) {
      var n = e.createElement("a");
      return (n.href = t), n;
    }
    function k(t, e) {
      if ("string" != typeof t) return t;
      var n, o;
      if ((t = T(t)).host.match(/youtube\.com/) && t.search) {
        if ((n = t.search.split("v=")[1])) {
          var i = n.indexOf("&");
          -1 !== i && (n = n.substring(0, i)), (o = "youtube");
        }
      } else
        t.host.match(/youtube\.com|youtu\.be/)
          ? ((n = t.pathname
              .replace(/^\/(embed\/|v\/)?/, "")
              .replace(/\/.*/, "")),
            (o = "youtube"))
          : t.host.match(/vimeo\.com/) &&
            ((o = "vimeo"),
            (n = t.pathname.replace(/^\/(video\/)?/, "").replace(/\/.*/, "")));
      return (
        (n && o) || !e || ((n = t.href), (o = "custom")),
        !!n && { id: n, type: o, s: t.search.replace(/^\?/, ""), p: C() }
      );
    }
    function M(t, e, n) {
      var i,
        r,
        a = t.video;
      return (
        "youtube" === a.type
          ? ((i = (r =
              C() + "img.youtube.com/vi/" + a.id + "/default.jpg").replace(
              /\/default.jpg$/,
              "/hqdefault.jpg"
            )),
            (t.thumbsReady = !0))
          : "vimeo" === a.type
          ? o.ajax({
              url: C() + "vimeo.com/api/v2/video/" + a.id + ".json",
              dataType: "jsonp",
              success: function (o) {
                (t.thumbsReady = !0),
                  S(
                    e,
                    { img: o[0].thumbnail_large, thumb: o[0].thumbnail_small },
                    t.i,
                    n
                  );
              },
            })
          : (t.thumbsReady = !0),
        { img: i, thumb: r }
      );
    }
    function S(t, e, n, i) {
      for (var r = 0, a = t.length; r < a; r++) {
        var s = t[r];
        if (s.i === n && s.thumbsReady) {
          var u = { videoReady: !0 };
          (u[Ve] = u[Xe] = u[Be] = !1), i.splice(r, 1, o.extend({}, s, u, e));
          break;
        }
      }
    }
    function F(t) {
      function e(t, e, i) {
        var r = t.children("img").eq(0),
          a = t.attr("href"),
          s = t.attr("src"),
          u = r.attr("src"),
          l = e.video,
          c = !!i && k(a, !0 === l);
        c ? (a = !1) : (c = l),
          n(
            t,
            r,
            o.extend(e, {
              video: c,
              img: e.img || a || s || u,
              thumb: e.thumb || u || s || a,
            })
          );
      }
      function n(t, e, n) {
        var i = n.thumb && n.img !== n.thumb,
          r = d(n.width || t.attr("width")),
          a = d(n.height || t.attr("height"));
        o.extend(n, {
          width: r,
          height: a,
          thumbratio: H(
            n.thumbratio ||
              d(n.thumbwidth || (e && e.attr("width")) || i || r) /
                d(n.thumbheight || (e && e.attr("height")) || i || a)
          ),
        });
      }
      var i = [];
      return (
        t.children().each(function () {
          var t = o(this),
            r = W(o.extend(t.data(), { id: t.attr("id") }));
          if (t.is("a, img")) e(t, r, !0);
          else {
            if (t.is(":empty")) return;
            n(t, null, o.extend(r, { html: this, _html: t.html() }));
          }
          i.push(r);
        }),
        i
      );
    }
    function E(t) {
      return 0 === t.offsetWidth && 0 === t.offsetHeight;
    }
    function P(t) {
      return !o.contains(e.documentElement, t);
    }
    function j(t, e, n, o) {
      return (
        j.i || ((j.i = 1), (j.ii = [!0])),
        (o = o || j.i),
        void 0 === j.ii[o] && (j.ii[o] = !0),
        t()
          ? e()
          : j.ii[o] &&
            setTimeout(function () {
              j.ii[o] && j(t, e, n, o);
            }, n || 100),
        j.i++
      );
    }
    function N(t) {
      n.replace(
        n.protocol +
          "//" +
          n.host +
          n.pathname.replace(/^\/?/, "/") +
          n.search +
          "#" +
          t
      );
    }
    function $(t, e, n, o) {
      var i = t.data(),
        r = i.measures;
      if (
        r &&
        (!i.l ||
          i.l.W !== r.width ||
          i.l.H !== r.height ||
          i.l.r !== r.ratio ||
          i.l.w !== e.w ||
          i.l.h !== e.h ||
          i.l.m !== n ||
          i.l.p !== o)
      ) {
        console.log("fit");
        var s = r.width,
          u = r.height,
          l = e.w / e.h,
          c = r.ratio >= l,
          f = "scaledown" === n,
          d = "contain" === n,
          h = "cover" === n,
          p = G(o);
        (c && (f || d)) || (!c && h)
          ? (u = (s = a(e.w, 0, f ? s : 1 / 0)) / r.ratio)
          : ((c && h) || (!c && (f || d))) &&
            (s = (u = a(e.h, 0, f ? u : 1 / 0)) * r.ratio),
          t.css({
            width: s,
            height: u,
            left: m(p.x, e.w - s),
            top: m(p.y, e.h - u),
          }),
          (i.l = {
            W: r.width,
            H: r.height,
            r: r.ratio,
            w: e.w,
            h: e.h,
            m: n,
            p: o,
          });
      }
      return !0;
    }
    function q(t, e) {
      var n = t[0];
      n.styleSheet ? (n.styleSheet.cssText = e) : t.html(e);
    }
    function z(t, e, n) {
      return e !== n && (t <= e ? "left" : t >= n ? "right" : "left right");
    }
    function A(t, e, n, o) {
      if (!n) return !1;
      if (!isNaN(t)) return t - (o ? 0 : 1);
      for (var i, r = 0, a = e.length; r < a; r++)
        if (e[r].id === t) {
          i = r;
          break;
        }
      return i;
    }
    function O(t, e, n) {
      (n = n || {}),
        t.each(function () {
          var t,
            i = o(this),
            a = i.data();
          a.clickOn ||
            ((a.clickOn = !0),
            o.extend(
              et(i, {
                onStart: function (e) {
                  (t = e), (n.onStart || r).call(this, e);
                },
                onMove: n.onMove || r,
                onTouchEnd: n.onTouchEnd || r,
                onEnd: function (n) {
                  n.moved || e.call(this, t);
                },
              }),
              { noMove: !0 }
            ));
        });
    }
    function L(t, e) {
      return '<div class="' + t + '">' + (e || "") + "</div>";
    }
    function I(t) {
      for (var e = t.length; e; ) {
        var n = Math.floor(Math.random() * e--),
          o = t[e];
        (t[e] = t[n]), (t[n] = o);
      }
      return t;
    }
    function D(t) {
      return (
        "[object Array]" == Object.prototype.toString.call(t) &&
        o.map(t, function (t) {
          return o.extend({}, t);
        })
      );
    }
    function R(t, e, n) {
      t.scrollLeft(e || 0).scrollTop(n || 0);
    }
    function W(t) {
      if (t) {
        var e = {};
        return (
          o.each(t, function (t, n) {
            e[t.toLowerCase()] = n;
          }),
          e
        );
      }
    }
    function H(t) {
      if (t) {
        var e = +t;
        return isNaN(e) ? +(e = t.split("/"))[0] / +e[1] || i : e;
      }
    }
    function K(t, e, n, o) {
      e &&
        (t.addEventListener
          ? t.addEventListener(e, n, !!o)
          : t.attachEvent("on" + e, n));
    }
    function V(t) {
      return !!t.getAttribute("disabled");
    }
    function B(t) {
      return { tabindex: -1 * t + "", disabled: t };
    }
    function X(t, e) {
      K(t, "keyup", function (n) {
        V(t) || (13 == n.keyCode && e.call(t, n));
      });
    }
    function Q(t, e) {
      K(
        t,
        "focus",
        (t.onfocusin = function (n) {
          e.call(t, n);
        }),
        !0
      );
    }
    function U(t, e) {
      t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
        e && t.stopPropagation && t.stopPropagation();
    }
    function Y(t) {
      return t ? ">" : "<";
    }
    function G(t) {
      return (
        (t = (t + "").split(/\s+/)), { x: p(t[0]) || Ye, y: p(t[1]) || Ye }
      );
    }
    function J(t, e) {
      var n = t.data(),
        i = Math.round(e.pos),
        a = function () {
          (n.sliding = !1), (e.onEnd || r)();
        };
      void 0 !== e.overPos &&
        e.overPos !== e.pos &&
        ((i = e.overPos),
        (a = function () {
          J(
            t,
            o.extend({}, e, { overPos: e.pos, time: Math.max(Ie, e.time / 2) })
          );
        }));
      var s = o.extend(l(i), e.width && { width: e.width });
      (n.sliding = !0),
        je
          ? (t.css(o.extend(c(e.time), s)),
            e.time > 10 ? y(t, "transform", a, e.time) : a())
          : t.stop().animate(s, e.time, Ue, a);
    }
    function Z(t, e, n, i, a, s) {
      var u = void 0 !== s;
      if (
        u ||
        (a.push(arguments),
        Array.prototype.push.call(arguments, a.length),
        !(a.length > 1))
      ) {
        (t = t || o(t)), (e = e || o(e));
        var l = t[0],
          c = e[0],
          f = "crossfade" === i.method,
          d = function () {
            if (!d.done) {
              d.done = !0;
              var t = (u || a.shift()) && a.shift();
              t && Z.apply(this, t), (i.onEnd || r)(!!t);
            }
          },
          h = i.time / (s || 1);
        n.removeClass(Wt + " " + Rt),
          t.stop().addClass(Wt),
          e.stop().addClass(Rt),
          f && c && t.fadeTo(0, 0),
          t.fadeTo(f ? h : 0, 1, f && d),
          e.fadeTo(h, 0, d),
          (l && f) || c || d();
      }
    }
    function tt(t) {
      var e = (t.touches || [])[0] || t;
      (t._x = e.pageX), (t._y = e.clientY), (t._now = o.now());
    }
    function et(t, n) {
      function i(t) {
        if (
          ((f = o(t.target)),
          (y.checked = m = p = w = !1),
          l ||
            y.flow ||
            (t.touches && t.touches.length > 1) ||
            t.which > 1 ||
            (Ze && Ze.type !== t.type && en) ||
            (m = n.select && f.is(n.select, g)))
        )
          return m;
        (h = "touchstart" === t.type),
          (p = f.is("a, a *", g)),
          (d = y.control),
          (v = y.noMove || y.noSwipe || d ? 16 : y.snap ? 0 : 4),
          tt(t),
          (c = Ze = t),
          (tn = t.type.replace(/down|start/, "move").replace(/Down/, "Move")),
          (n.onStart || r).call(g, t, { control: d, $target: f }),
          (l = y.flow = !0),
          (h && !y.go) || U(t);
      }
      function a(t) {
        if (
          (t.touches && t.touches.length > 1) ||
          (Ae && !t.isPrimary) ||
          tn !== t.type ||
          !l
        )
          return l && s(), void (n.onTouchEnd || r)();
        tt(t);
        var e = Math.abs(t._x - c._x),
          o = Math.abs(t._y - c._y),
          i = e - o,
          a = (y.go || y.x || i >= 0) && !y.noSwipe,
          u = i < 0;
        h && !y.checked
          ? (l = a) && U(t)
          : (U(t), (n.onMove || r).call(g, t, { touch: h })),
          !w && Math.sqrt(Math.pow(e, 2) + Math.pow(o, 2)) > v && (w = !0),
          (y.checked = y.checked || a || u);
      }
      function s(t) {
        (n.onTouchEnd || r)();
        var e = l;
        (y.control = l = !1),
          e && (y.flow = !1),
          !e ||
            (p && !y.checked) ||
            (t && U(t),
            (en = !0),
            clearTimeout(nn),
            (nn = setTimeout(function () {
              en = !1;
            }, 1e3)),
            (n.onEnd || r).call(g, {
              moved: w,
              $target: f,
              control: d,
              touch: h,
              startEvent: c,
              aborted: !t || "MSPointerCancel" === t.type,
            }));
      }
      function u() {
        y.flow &&
          setTimeout(function () {
            y.flow = !1;
          }, Le);
      }
      var l,
        c,
        f,
        d,
        h,
        m,
        p,
        v,
        w,
        g = t[0],
        y = {};
      return (
        Ae
          ? (K(g, "MSPointerDown", i),
            K(e, "MSPointerMove", a),
            K(e, "MSPointerCancel", s),
            K(e, "MSPointerUp", s))
          : (K(g, "touchstart", i),
            K(g, "touchmove", a),
            K(g, "touchend", s),
            K(e, "touchstart", function () {
              y.flow ||
                setTimeout(function () {
                  y.flow = !0;
                }, 10);
            }),
            K(e, "touchend", u),
            K(e, "touchcancel", u),
            Se.on("scroll", u),
            t.on("mousedown", i),
            Fe.on("mousemove", a).on("mouseup", s)),
        t.on("click", "a", function (t) {
          y.checked && U(t);
        }),
        y
      );
    }
    function nt(t, e) {
      function n(n, o) {
        (C = !0),
          (i = s = n._x),
          (h = n._now),
          (d = [[h, i]]),
          (u = c = M.noMove || o ? 0 : b(t, (e.getPos || r)())),
          (e.onStart || r).call(T, n);
      }
      var i,
        s,
        u,
        c,
        f,
        d,
        h,
        m,
        p,
        v,
        w,
        g,
        y,
        x,
        C,
        T = t[0],
        k = t.data(),
        M = {};
      return (M = o.extend(
        et(
          e.$wrap,
          o.extend({}, e, {
            onStart: function (t, e) {
              (p = M.min),
                (v = M.max),
                (w = M.snap),
                (g = t.altKey),
                (C = x = !1),
                (y = e.control) || k.sliding || n(t);
            },
            onMove: function (o, a) {
              M.noSwipe ||
                (C || n(o),
                (s = o._x),
                d.push([o._now, s]),
                (f = z((c = u - (i - s)), p, v)),
                c <= p ? (c = _(c, p)) : c >= v && (c = _(c, v)),
                M.noMove ||
                  (t.css(l(c)),
                  x || ((x = !0), a.touch || Ae || t.addClass(ne)),
                  (e.onMove || r).call(T, o, { pos: c, edge: f })));
            },
            onEnd: function (i) {
              if (!M.noSwipe || !i.moved) {
                C || n(i.startEvent, !0), i.touch || Ae || t.removeClass(ne);
                for (
                  var l,
                    f,
                    h,
                    y,
                    b,
                    x,
                    _,
                    k,
                    S,
                    F = (m = o.now()) - Le,
                    E = null,
                    P = Ie,
                    j = e.friction,
                    N = d.length - 1;
                  N >= 0;
                  N--
                ) {
                  if (
                    ((l = d[N][0]), (f = Math.abs(l - F)), null === E || f < h)
                  )
                    (E = l), (y = d[N][1]);
                  else if (E === F || f > h) break;
                  h = f;
                }
                _ = a(c, p, v);
                var $ = y - s,
                  q = $ >= 0,
                  z = m - E,
                  A = z > Le,
                  O = !A && c !== u && _ === c;
                w &&
                  ((_ = a(
                    Math[O ? (q ? "floor" : "ceil") : "round"](c / w) * w,
                    p,
                    v
                  )),
                  (p = v = _)),
                  O &&
                    (w || _ === c) &&
                    ((S = -$ / z),
                    (P *= a(Math.abs(S), e.timeLow, e.timeHigh)),
                    (b = Math.round(c + (S * P) / j)),
                    w || (_ = b),
                    ((!q && b > v) || (q && b < p)) &&
                      ((k = b - (x = q ? p : v)),
                      w || (_ = x),
                      (k = a(_ + 0.03 * k, x - 50, x + 50)),
                      (P = Math.abs((c - k) / (S / j))))),
                  (P *= g ? 10 : 1),
                  (e.onEnd || r).call(
                    T,
                    o.extend(i, {
                      moved: i.moved || (A && w),
                      pos: c,
                      newPos: _,
                      overPos: k,
                      time: P,
                    })
                  );
              }
            },
          })
        ),
        M
      ));
    }
    function ot(t, e) {
      var n,
        i,
        a,
        s = { prevent: {} };
      return (
        K(t[0], Oe, function (t) {
          var u = t.wheelDeltaY || -1 * t.deltaY || 0,
            l = t.wheelDeltaX || -1 * t.deltaX || 0,
            c = Math.abs(l) && !Math.abs(u),
            f = Y(l < 0),
            d = i === f,
            h = o.now(),
            m = h - a < Le;
          (i = f),
            (a = h),
            c &&
              s.ok &&
              (!s.prevent[f] || n) &&
              (U(t, !0),
              (n && d && m) ||
                (e.shift &&
                  ((n = !0),
                  clearTimeout(s.t),
                  (s.t = setTimeout(function () {
                    n = !1;
                  }, De))),
                (e.onEnd || r)(t, e.shift ? f : l)));
        }),
        s
      );
    }
    function it() {
      o.each(o.Fotorama.instances, function (t, e) {
        e.index = t;
      });
    }
    function rt(t) {
      o.Fotorama.instances.push(t), it();
    }
    function at(t) {
      o.Fotorama.instances.splice(t.index, 1), it();
    }
    var st = "fotorama",
      ut = "fullscreen",
      lt = st + "__wrap",
      ct = lt + "--css2",
      ft = lt + "--css3",
      dt = lt + "--video",
      ht = lt + "--fade",
      mt = lt + "--slide",
      pt = lt + "--no-controls",
      vt = lt + "--no-shadows",
      wt = lt + "--pan-y",
      gt = lt + "--rtl",
      yt = lt + "--only-active",
      bt = lt + "--no-captions",
      xt = lt + "--toggle-arrows",
      _t = st + "__stage",
      Ct = _t + "__frame",
      Tt = Ct + "--video",
      kt = _t + "__shaft",
      Mt = st + "__grab",
      St = st + "__pointer",
      Ft = st + "__arr",
      Et = Ft + "--disabled",
      Pt = Ft + "--prev",
      jt = Ft + "--next",
      Nt = st + "__nav",
      $t = Nt + "-wrap",
      qt = Nt + "__shaft",
      zt = Nt + "--dots",
      At = Nt + "--thumbs",
      Ot = Nt + "__frame",
      Lt = Ot + "--dot",
      It = Ot + "--thumb",
      Dt = st + "__fade",
      Rt = Dt + "-front",
      Wt = Dt + "-rear",
      Ht = st + "__shadow" + "s",
      Kt = Ht + "--left",
      Vt = Ht + "--right",
      Bt = st + "__active",
      Xt = st + "__select",
      Qt = st + "--hidden",
      Ut = st + "--fullscreen",
      Yt = st + "__fullscreen-icon",
      Gt = st + "__error",
      Jt = st + "__loading",
      Zt = st + "__loaded",
      te = Zt + "--full",
      ee = Zt + "--img",
      ne = st + "__grabbing",
      oe = st + "__img",
      ie = oe + "--full",
      re = st + "__dot",
      ae = st + "__thumb",
      se = ae + "-border",
      ue = st + "__html",
      le = st + "__video",
      ce = le + "-play",
      fe = le + "-close",
      de = st + "__caption",
      he = st + "__caption__wrap",
      me = st + "__spinner",
      pe = '" tabindex="0" role="button',
      ve = o && o.fn.jquery.split(".");
    if (!ve || ve[0] < 1 || (1 == ve[0] && ve[1] < 8))
      throw "Fotorama requires jQuery 1.8 or later and will not run without it.";
    var we = (function (t, e, n) {
        function o(t) {
          p.cssText = t;
        }
        function i(t, e) {
          return typeof t === e;
        }
        function r(t, e) {
          return !!~("" + t).indexOf(e);
        }
        function a(t, e) {
          for (var o in t) {
            var i = t[o];
            if (!r(i, "-") && p[i] !== n) return "pfx" != e || i;
          }
          return !1;
        }
        function s(t, e, o) {
          for (var r in t) {
            var a = e[t[r]];
            if (a !== n)
              return !1 === o ? t[r] : i(a, "function") ? a.bind(o || e) : a;
          }
          return !1;
        }
        function u(t, e, n) {
          var o = t.charAt(0).toUpperCase() + t.slice(1),
            r = (t + " " + w.join(o + " ") + o).split(" ");
          return i(e, "string") || i(e, "undefined")
            ? a(r, e)
            : ((r = (t + " " + g.join(o + " ") + o).split(" ")), s(r, e, n));
        }
        var l,
          c,
          f = {},
          d = e.documentElement,
          h = "modernizr",
          m = e.createElement(h),
          p = m.style,
          v = " -webkit- -moz- -o- -ms- ".split(" "),
          w = "Webkit Moz O ms".split(" "),
          g = "Webkit Moz O ms".toLowerCase().split(" "),
          y = {},
          b = [],
          x = b.slice,
          _ = {}.hasOwnProperty;
        (c =
          i(_, "undefined") || i(_.call, "undefined")
            ? function (t, e) {
                return e in t && i(t.constructor.prototype[e], "undefined");
              }
            : function (t, e) {
                return _.call(t, e);
              }),
          Function.prototype.bind ||
            (Function.prototype.bind = function (t) {
              var e = this;
              if ("function" != typeof e) throw new TypeError();
              var n = x.call(arguments, 1),
                o = function () {
                  if (this instanceof o) {
                    var i = function () {};
                    i.prototype = e.prototype;
                    var r = new i(),
                      a = e.apply(r, n.concat(x.call(arguments)));
                    return Object(a) === a ? a : r;
                  }
                  return e.apply(t, n.concat(x.call(arguments)));
                };
              return o;
            }),
          (y.csstransforms3d = function () {
            return !!u("perspective");
          });
        for (var C in y)
          c(y, C) &&
            ((l = C.toLowerCase()),
            (f[l] = y[C]()),
            b.push((f[l] ? "" : "no-") + l));
        return (
          (f.addTest = function (t, e) {
            if ("object" == typeof t)
              for (var o in t) c(t, o) && f.addTest(o, t[o]);
            else {
              if (((t = t.toLowerCase()), f[t] !== n)) return f;
              (e = "function" == typeof e ? e() : e),
                "undefined" != typeof enableClasses &&
                  enableClasses &&
                  (d.className += " " + (e ? "" : "no-") + t),
                (f[t] = e);
            }
            return f;
          }),
          o(""),
          (m = null),
          (f._version = "2.6.2"),
          (f._prefixes = v),
          (f._domPrefixes = g),
          (f._cssomPrefixes = w),
          (f.testProp = function (t) {
            return a([t]);
          }),
          (f.testAllProps = u),
          (f.testStyles = function (t, n, o, i) {
            var r,
              a,
              s,
              u,
              l = e.createElement("div"),
              c = e.body,
              f = c || e.createElement("body");
            if (parseInt(o, 10))
              for (; o--; )
                ((s = e.createElement("div")).id = i ? i[o] : h + (o + 1)),
                  l.appendChild(s);
            return (
              (r = ["&#173;", '<style id="s', h, '">', t, "</style>"].join("")),
              (l.id = h),
              ((c ? l : f).innerHTML += r),
              f.appendChild(l),
              c ||
                ((f.style.background = ""),
                (f.style.overflow = "hidden"),
                (u = d.style.overflow),
                (d.style.overflow = "hidden"),
                d.appendChild(f)),
              (a = n(l, t)),
              c
                ? l.parentNode.removeChild(l)
                : (f.parentNode.removeChild(f), (d.style.overflow = u)),
              !!a
            );
          }),
          (f.prefixed = function (t, e, n) {
            return e ? u(t, e, n) : u(t, "pfx");
          }),
          f
        );
      })(0, e),
      ge = {
        ok: !1,
        is: function () {
          return !1;
        },
        request: function () {},
        cancel: function () {},
        event: "",
        prefix: "",
      },
      ye = "webkit moz o ms khtml".split(" ");
    if (void 0 !== e.cancelFullScreen) ge.ok = !0;
    else
      for (var be = 0, xe = ye.length; be < xe; be++)
        if (
          ((ge.prefix = ye[be]), void 0 !== e[ge.prefix + "CancelFullScreen"])
        ) {
          ge.ok = !0;
          break;
        }
    ge.ok &&
      ((ge.event = ge.prefix + "fullscreenchange"),
      (ge.is = function () {
        switch (this.prefix) {
          case "":
            return e.fullScreen;
          case "webkit":
            return e.webkitIsFullScreen;
          default:
            return e[this.prefix + "FullScreen"];
        }
      }),
      (ge.request = function (t) {
        return "" === this.prefix
          ? t.requestFullScreen()
          : t[this.prefix + "RequestFullScreen"]();
      }),
      (ge.cancel = function (t) {
        return "" === this.prefix
          ? e.cancelFullScreen()
          : e[this.prefix + "CancelFullScreen"]();
      }));
    var _e,
      Ce = {
        lines: 12,
        length: 5,
        width: 2,
        radius: 7,
        corners: 1,
        rotate: 15,
        color: "rgba(128, 128, 128, .75)",
        hwaccel: !0,
      },
      Te = { top: "auto", left: "auto", className: "" };
    !(function (t, e) {
      _e = e();
    })(0, function () {
      function t(t, n) {
        var o,
          i = e.createElement(t || "div");
        for (o in n) i[o] = n[o];
        return i;
      }
      function n(t) {
        for (var e = 1, n = arguments.length; e < n; e++)
          t.appendChild(arguments[e]);
        return t;
      }
      function o(t, e, n, o) {
        var i = ["opacity", e, ~~(100 * t), n, o].join("-"),
          r = 0.01 + (n / o) * 100,
          a = Math.max(1 - ((1 - t) / e) * (100 - r), t),
          s = f.substring(0, f.indexOf("Animation")).toLowerCase(),
          u = (s && "-" + s + "-") || "";
        return (
          h[i] ||
            (m.insertRule(
              "@" +
                u +
                "keyframes " +
                i +
                "{0%{opacity:" +
                a +
                "}" +
                r +
                "%{opacity:" +
                t +
                "}" +
                (r + 0.01) +
                "%{opacity:1}" +
                ((r + e) % 100) +
                "%{opacity:" +
                t +
                "}100%{opacity:" +
                a +
                "}}",
              m.cssRules.length
            ),
            (h[i] = 1)),
          i
        );
      }
      function r(t, e) {
        var n,
          o,
          r = t.style;
        for (
          e = e.charAt(0).toUpperCase() + e.slice(1), o = 0;
          o < d.length;
          o++
        )
          if (((n = d[o] + e), r[n] !== i)) return n;
        if (r[e] !== i) return e;
      }
      function a(t, e) {
        for (var n in e) t.style[r(t, n) || n] = e[n];
        return t;
      }
      function s(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n) t[o] === i && (t[o] = n[o]);
        }
        return t;
      }
      function u(t) {
        for (
          var e = { x: t.offsetLeft, y: t.offsetTop };
          (t = t.offsetParent);

        )
          (e.x += t.offsetLeft), (e.y += t.offsetTop);
        return e;
      }
      function l(t, e) {
        return "string" == typeof t ? t : t[e % t.length];
      }
      function c(t) {
        if (void 0 === this) return new c(t);
        this.opts = s(t || {}, c.defaults, p);
      }
      var f,
        d = ["webkit", "Moz", "ms", "O"],
        h = {},
        m = (function () {
          var o = t("style", { type: "text/css" });
          return (
            n(e.getElementsByTagName("head")[0], o), o.sheet || o.styleSheet
          );
        })(),
        p = {
          lines: 12,
          length: 7,
          width: 5,
          radius: 10,
          rotate: 0,
          corners: 1,
          color: "#000",
          direction: 1,
          speed: 1,
          trail: 100,
          opacity: 0.25,
          fps: 20,
          zIndex: 2e9,
          className: "spinner",
          top: "auto",
          left: "auto",
          position: "relative",
        };
      (c.defaults = {}),
        s(c.prototype, {
          spin: function (e) {
            this.stop();
            var n,
              o,
              i = this,
              r = i.opts,
              s = (i.el = a(t(0, { className: r.className }), {
                position: r.position,
                width: 0,
                zIndex: r.zIndex,
              })),
              l = r.radius + r.length + r.width;
            if (
              (e &&
                (e.insertBefore(s, e.firstChild || null),
                (o = u(e)),
                (n = u(s)),
                a(s, {
                  left:
                    ("auto" == r.left
                      ? o.x - n.x + (e.offsetWidth >> 1)
                      : parseInt(r.left, 10) + l) + "px",
                  top:
                    ("auto" == r.top
                      ? o.y - n.y + (e.offsetHeight >> 1)
                      : parseInt(r.top, 10) + l) + "px",
                })),
              s.setAttribute("role", "progressbar"),
              i.lines(s, i.opts),
              !f)
            ) {
              var c,
                d = 0,
                h = ((r.lines - 1) * (1 - r.direction)) / 2,
                m = r.fps,
                p = m / r.speed,
                v = (1 - r.opacity) / ((p * r.trail) / 100),
                w = p / r.lines;
              !(function t() {
                d++;
                for (var e = 0; e < r.lines; e++)
                  (c = Math.max(
                    1 - ((d + (r.lines - e) * w) % p) * v,
                    r.opacity
                  )),
                    i.opacity(s, e * r.direction + h, c, r);
                i.timeout = i.el && setTimeout(t, ~~(1e3 / m));
              })();
            }
            return i;
          },
          stop: function () {
            var t = this.el;
            return (
              t &&
                (clearTimeout(this.timeout),
                t.parentNode && t.parentNode.removeChild(t),
                (this.el = i)),
              this
            );
          },
          lines: function (e, i) {
            function r(e, n) {
              return a(t(), {
                position: "absolute",
                width: i.length + i.width + "px",
                height: i.width + "px",
                background: e,
                boxShadow: n,
                transformOrigin: "left",
                transform:
                  "rotate(" +
                  ~~((360 / i.lines) * u + i.rotate) +
                  "deg) translate(" +
                  i.radius +
                  "px,0)",
                borderRadius: ((i.corners * i.width) >> 1) + "px",
              });
            }
            for (
              var s, u = 0, c = ((i.lines - 1) * (1 - i.direction)) / 2;
              u < i.lines;
              u++
            )
              (s = a(t(), {
                position: "absolute",
                top: 1 + ~(i.width / 2) + "px",
                transform: i.hwaccel ? "translate3d(0,0,0)" : "",
                opacity: i.opacity,
                animation:
                  f &&
                  o(i.opacity, i.trail, c + u * i.direction, i.lines) +
                    " " +
                    1 / i.speed +
                    "s linear infinite",
              })),
                i.shadow && n(s, a(r("#000", "0 0 4px #000"), { top: "2px" })),
                n(e, n(s, r(l(i.color, u), "0 0 1px rgba(0,0,0,.1)")));
            return e;
          },
          opacity: function (t, e, n) {
            e < t.childNodes.length && (t.childNodes[e].style.opacity = n);
          },
        });
      var v = a(t("group"), { behavior: "url(#default#VML)" });
      return (
        !r(v, "transform") && v.adj
          ? (function () {
              function e(e, n) {
                return t(
                  "<" +
                    e +
                    ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',
                  n
                );
              }
              m.addRule(".spin-vml", "behavior:url(#default#VML)"),
                (c.prototype.lines = function (t, o) {
                  function i() {
                    return a(
                      e("group", {
                        coordsize: c + " " + c,
                        coordorigin: -u + " " + -u,
                      }),
                      { width: c, height: c }
                    );
                  }
                  function r(t, r, s) {
                    n(
                      d,
                      n(
                        a(i(), {
                          rotation: (360 / o.lines) * t + "deg",
                          left: ~~r,
                        }),
                        n(
                          a(e("roundrect", { arcsize: o.corners }), {
                            width: u,
                            height: o.width,
                            left: o.radius,
                            top: -o.width >> 1,
                            filter: s,
                          }),
                          e("fill", {
                            color: l(o.color, t),
                            opacity: o.opacity,
                          }),
                          e("stroke", { opacity: 0 })
                        )
                      )
                    );
                  }
                  var s,
                    u = o.length + o.width,
                    c = 2 * u,
                    f = 2 * -(o.width + o.length) + "px",
                    d = a(i(), { position: "absolute", top: f, left: f });
                  if (o.shadow)
                    for (s = 1; s <= o.lines; s++)
                      r(
                        s,
                        -2,
                        "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)"
                      );
                  for (s = 1; s <= o.lines; s++) r(s);
                  return n(t, d);
                }),
                (c.prototype.opacity = function (t, e, n, o) {
                  var i = t.firstChild;
                  (o = (o.shadow && o.lines) || 0),
                    i &&
                      e + o < i.childNodes.length &&
                      (i =
                        (i = (i = i.childNodes[e + o]) && i.firstChild) &&
                        i.firstChild) &&
                      (i.opacity = n);
                });
            })()
          : (f = r(v, "animation")),
        c
      );
    });
    var ke,
      Me,
      Se = o(t),
      Fe = o(e),
      Ee = "quirks" === n.hash.replace("#", ""),
      Pe = we.csstransforms3d,
      je = Pe && !Ee,
      Ne = Pe || "CSS1Compat" === e.compatMode,
      $e = ge.ok,
      qe = navigator.userAgent.match(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i
      ),
      ze = !je || qe,
      Ae = navigator.msPointerEnabled,
      Oe =
        "onwheel" in e.createElement("div")
          ? "wheel"
          : e.onmousewheel !== i
          ? "mousewheel"
          : "DOMMouseScroll",
      Le = 250,
      Ie = 300,
      De = 1400,
      Re = 5e3,
      We = 64,
      He = 500,
      Ke = 333,
      Ve = "$stageFrame",
      Be = "$navDotFrame",
      Xe = "$navThumbFrame",
      Qe = "auto",
      Ue = (function (t) {
        var e = "bez_" + o.makeArray(arguments).join("_").replace(".", "p");
        if ("function" != typeof o.easing[e]) {
          var n = function (t, e) {
            var n = [null, null],
              o = [null, null],
              i = [null, null],
              r = function (r, a) {
                return (
                  (i[a] = 3 * t[a]),
                  (o[a] = 3 * (e[a] - t[a]) - i[a]),
                  (n[a] = 1 - i[a] - o[a]),
                  r * (i[a] + r * (o[a] + r * n[a]))
                );
              },
              a = function (t) {
                return i[0] + t * (2 * o[0] + 3 * n[0] * t);
              },
              s = function (t) {
                for (
                  var e, n = t, o = 0;
                  ++o < 14 && ((e = r(n, 0) - t), !(Math.abs(e) < 0.001));

                )
                  n -= e / a(n);
                return n;
              };
            return function (t) {
              return r(s(t), 1);
            };
          };
          o.easing[e] = function (e, o, i, r, a) {
            return r * n([t[0], t[1]], [t[2], t[3]])(o / a) + i;
          };
        }
        return e;
      })([0.1, 0, 0.25, 1]),
      Ye = "50%",
      Ge = {
        width: null,
        minwidth: null,
        maxwidth: "100%",
        height: null,
        minheight: null,
        maxheight: null,
        ratio: null,
        margin: 2,
        glimpse: 0,
        fit: "contain",
        position: Ye,
        thumbposition: Ye,
        nav: "dots",
        navposition: "bottom",
        navwidth: null,
        thumbwidth: We,
        thumbheight: We,
        thumbmargin: 2,
        thumbborderwidth: 2,
        thumbfit: "cover",
        allowfullscreen: !1,
        transition: "slide",
        clicktransition: null,
        transitionduration: Ie,
        captions: !0,
        hash: !1,
        startindex: 0,
        loop: !1,
        autoplay: !1,
        stopautoplayontouch: !0,
        keyboard: !1,
        arrows: !0,
        click: !0,
        swipe: !0,
        trackpad: !1,
        enableifsingleframe: !1,
        controlsonstart: !0,
        shuffle: !1,
        direction: "ltr",
        shadows: !0,
        spinner: null,
      },
      Je = {
        left: !0,
        right: !0,
        down: !1,
        up: !1,
        space: !1,
        home: !1,
        end: !1,
      };
    j.stop = function (t) {
      j.ii[t] = !1;
    };
    var Ze, tn, en, nn;
    (jQuery.Fotorama = function (t, i) {
      function r() {
        o.each(Tn, function (t, e) {
          if (!e.i) {
            e.i = ho++;
            var n = k(e.video, !0);
            if (n) {
              var o = {};
              (e.video = n),
                e.img || e.thumb ? (e.thumbsReady = !0) : (o = M(e, Tn, uo)),
                S(Tn, { img: o.img, thumb: o.thumb }, e.i, uo);
            }
          }
        });
      }
      function s(t) {
        return Gn[t] || uo.fullScreen;
      }
      function u(t) {
        var e = "keydown." + st,
          n = st + lo,
          o = "keydown." + n,
          r = "resize." + n + " orientationchange." + n;
        t
          ? (Fe.on(o, function (t) {
              var e, n;
              Fn && 27 === t.keyCode
                ? ((e = !0), dn(Fn, !0, !0))
                : (uo.fullScreen || (i.keyboard && !uo.index)) &&
                  (27 === t.keyCode
                    ? ((e = !0), uo.cancelFullScreen())
                    : (t.shiftKey && 32 === t.keyCode && s("space")) ||
                      (37 === t.keyCode && s("left")) ||
                      (38 === t.keyCode && s("up"))
                    ? (n = "<")
                    : (32 === t.keyCode && s("space")) ||
                      (39 === t.keyCode && s("right")) ||
                      (40 === t.keyCode && s("down"))
                    ? (n = ">")
                    : 36 === t.keyCode && s("home")
                    ? (n = "<<")
                    : 35 === t.keyCode && s("end") && (n = ">>")),
                (e || n) && U(t),
                n && uo.show({ index: n, slow: t.altKey, user: !0 });
            }),
            uo.index ||
              Fe.off(e).on(e, "textarea, input, select", function (t) {
                !Me.hasClass(ut) && t.stopPropagation();
              }),
            Se.on(r, uo.resize))
          : (Fe.off(o), Se.off(r));
      }
      function f(e) {
        e !== f.f &&
          (e
            ? (t
                .html("")
                .addClass(st + " " + co)
                .append(wo)
                .before(po)
                .before(vo),
              rt(uo))
            : (wo.detach(),
              po.detach(),
              vo.detach(),
              t.html(mo.urtext).removeClass(co),
              at(uo)),
          u(e),
          (f.f = e));
      }
      function h() {
        (Tn = uo.data = Tn || D(i.data) || F(t)),
          (kn = uo.size = Tn.length),
          !Cn.ok && i.shuffle && I(Tn),
          r(),
          (zo = T(zo)),
          kn && f(!0);
      }
      function g() {
        var t = (kn < 2 && !i.enableifsingleframe) || Fn;
        (Lo.noMove = t || Kn),
          (Lo.noSwipe = t || !i.swipe),
          !Qn && yo.toggleClass(Mt, !i.click && !Lo.noMove && !Lo.noSwipe),
          Ae && wo.toggleClass(wt, !Lo.noSwipe);
      }
      function y(t) {
        !0 === t && (t = ""), (i.autoplay = Math.max(+t || Re, 1.5 * Xn));
      }
      function _() {
        function t(t, n) {
          e[t ? "add" : "remove"].push(n);
        }
        (uo.options = i = W(i)),
          (Kn = "crossfade" === i.transition || "dissolve" === i.transition),
          (Ln = i.loop && (kn > 2 || (Kn && (!Qn || "slide" !== Qn)))),
          (Xn = +i.transitionduration || Ie),
          (Yn = "rtl" === i.direction),
          (Gn = o.extend({}, i.keyboard && Je, i.keyboard));
        var e = { add: [], remove: [] };
        kn > 1 || i.enableifsingleframe
          ? ((In = i.nav),
            (Rn = "top" === i.navposition),
            e.remove.push(Xt),
            Co.toggle(!!i.arrows))
          : ((In = !1), Co.hide()),
          ne(),
          (Sn = new _e(
            o.extend(Ce, i.spinner, Te, { direction: Yn ? -1 : 1 })
          )),
          Oe(),
          De(),
          i.autoplay && y(i.autoplay),
          (Vn = d(i.thumbwidth) || We),
          (Bn = d(i.thumbheight) || We),
          (Io.ok = Ro.ok = i.trackpad && !ze),
          g(),
          on(i, [Oo]),
          (Dn = "thumbs" === In)
            ? (we(kn, "navThumb"),
              (Mn = Fo),
              (so = Xe),
              q(
                po,
                o.Fotorama.jst.style({
                  w: Vn,
                  h: Bn,
                  b: i.thumbborderwidth,
                  m: i.thumbmargin,
                  s: lo,
                  q: !Ne,
                })
              ),
              ko.addClass(At).removeClass(zt))
            : "dots" === In
            ? (we(kn, "navDot"),
              (Mn = So),
              (so = Be),
              ko.addClass(zt).removeClass(At))
            : ((In = !1), ko.removeClass(At + " " + zt)),
          In &&
            (Rn ? To.insertBefore(go) : To.insertAfter(go),
            (Ee.nav = !1),
            Ee(Mn, Mo, "nav")),
          (Wn = i.allowfullscreen)
            ? (Po.prependTo(go), (Hn = $e && "native" === Wn))
            : (Po.detach(), (Hn = !1)),
          t(Kn, ht),
          t(!Kn, mt),
          t(!i.captions, bt),
          t(Yn, gt),
          t("always" !== i.arrows, xt),
          t(!(Un = i.shadows && !ze), vt),
          wo.addClass(e.add.join(" ")).removeClass(e.remove.join(" ")),
          (Ao = o.extend({}, i));
      }
      function C(t) {
        return t < 0 ? (kn + (t % kn)) % kn : t >= kn ? t % kn : t;
      }
      function T(t) {
        return a(t, 0, kn - 1);
      }
      function E(t) {
        return Ln ? C(t) : T(t);
      }
      function V(t) {
        return !!(t > 0 || Ln) && t - 1;
      }
      function G(t) {
        return !!(t < kn - 1 || Ln) && t + 1;
      }
      function tt() {
        (Lo.min = Ln ? -1 / 0 : -v(kn - 1, Oo.w, i.margin, jn)),
          (Lo.max = Ln ? 1 / 0 : -v(0, Oo.w, i.margin, jn)),
          (Lo.snap = Oo.w + i.margin);
      }
      function et() {
        (Do.min = Math.min(0, Oo.nw - Mo.width())),
          (Do.max = 0),
          Mo.toggleClass(Mt, !(Do.noMove = Do.min === Do.max));
      }
      function it(t, e, n) {
        if ("number" == typeof t) {
          t = new Array(t);
          var i = !0;
        }
        return o.each(t, function (t, o) {
          if ((i && (o = t), "number" == typeof o)) {
            var r = Tn[C(o)];
            if (r) {
              var a = "$" + e + "Frame",
                s = r[a];
              n.call(this, t, o, r, s, a, s && s.data());
            }
          }
        });
      }
      function Dt(t, e, n, o) {
        (!Jn || ("*" === Jn && o === On)) &&
          ((t = p(i.width) || p(t) || He),
          (e = p(i.height) || p(e) || Ke),
          uo.resize(
            { width: t, ratio: i.ratio || n || t / e },
            0,
            o !== On && "*"
          ));
      }
      function Rt(t, e, n, r, a, s) {
        it(t, e, function (t, u, l, c, f, d) {
          function h(t) {
            var e = C(u);
            rn(t, { index: e, src: _, frame: Tn[e] });
          }
          function m() {
            y.remove(),
              (o.Fotorama.cache[_] = "error"),
              (l.html && "stage" === e) || !T || T === _
                ? (!_ || l.html || w
                    ? "stage" === e &&
                      (c
                        .trigger("f:load")
                        .removeClass(Jt + " " + Gt)
                        .addClass(Zt),
                      h("load"),
                      Dt())
                    : (c.trigger("f:error").removeClass(Jt).addClass(Gt),
                      h("error")),
                  (d.state = "error"),
                  !(kn > 1 && Tn[u] === l) ||
                    l.html ||
                    l.deleted ||
                    l.video ||
                    w ||
                    ((l.deleted = !0), uo.splice(u, 1)))
                : ((l[x] = _ = T), Rt([u], e, n, r, a, !0));
          }
          function p() {
            (o.Fotorama.measures[_] = b.measures =
              o.Fotorama.measures[_] || {
                width: g.width,
                height: g.height,
                ratio: g.width / g.height,
              }),
              Dt(b.measures.width, b.measures.height, b.measures.ratio, u),
              y
                .off("load error")
                .addClass(oe + (w ? " " + ie : ""))
                .prependTo(c),
              $(
                y,
                (o.isFunction(n) ? n() : n) || Oo,
                r || l.fit || i.fit,
                a || l.position || i.position
              ),
              (o.Fotorama.cache[_] = d.state = "loaded"),
              setTimeout(function () {
                c
                  .trigger("f:load")
                  .removeClass(Jt + " " + Gt)
                  .addClass(Zt + " " + (w ? te : ee)),
                  "stage" === e
                    ? h("load")
                    : (l.thumbratio === Qe ||
                        (!l.thumbratio && i.thumbratio === Qe)) &&
                      ((l.thumbratio = b.measures.ratio), xn());
              }, 0);
          }
          function v() {
            var t = 10;
            j(
              function () {
                return !ro || (!t-- && !ze);
              },
              function () {
                p();
              }
            );
          }
          if (c) {
            var w =
              uo.fullScreen &&
              l.full &&
              l.full !== l.img &&
              !d.$full &&
              "stage" === e;
            if (!d.$img || s || w) {
              var g = new Image(),
                y = o(g),
                b = y.data();
              d[w ? "$full" : "$img"] = y;
              var x = "stage" === e ? (w ? "full" : "img") : "thumb",
                _ = l[x],
                T = w ? null : l["stage" === e ? "thumb" : "img"];
              "navThumb" === e && (c = d.$wrap),
                _
                  ? (o.Fotorama.cache[_]
                      ? (function t() {
                          "error" === o.Fotorama.cache[_]
                            ? m()
                            : "loaded" === o.Fotorama.cache[_]
                            ? setTimeout(v, 0)
                            : setTimeout(t, 100);
                        })()
                      : ((o.Fotorama.cache[_] = "*"),
                        y.on("load", v).on("error", m)),
                    (d.state = ""),
                    (g.src = _))
                  : m();
            }
          }
        });
      }
      function Wt(t) {
        qo.append(Sn.spin().el).appendTo(t);
      }
      function ne() {
        qo.detach(), Sn && Sn.stop();
      }
      function le() {
        var t = En[Ve];
        t &&
          !t.data().state &&
          (Wt(t),
          t.on("f:load f:error", function () {
            t.off("f:load f:error"), ne();
          }));
      }
      function ve(t) {
        X(t, gn),
          Q(t, function () {
            setTimeout(function () {
              R(ko);
            }, 0),
              Ge({ time: Xn, guessIndex: o(this).data().eq, minMax: Do });
          });
      }
      function we(t, e) {
        it(t, e, function (t, n, i, r, a, s) {
          if (!r) {
            (r = i[a] = wo[a].clone()), ((s = r.data()).data = i);
            var u = r[0];
            "stage" === e
              ? (i.html &&
                  o('<div class="' + ue + '"></div>')
                    .append(
                      i._html
                        ? o(i.html).removeAttr("id").html(i._html)
                        : i.html
                    )
                    .appendTo(r),
                i.caption && o(L(de, L(he, i.caption))).appendTo(r),
                i.video && r.addClass(Tt).append(No.clone()),
                Q(u, function () {
                  setTimeout(function () {
                    R(go);
                  }, 0),
                    pn({ index: s.eq, user: !0 });
                }),
                (bo = bo.add(r)))
              : "navDot" === e
              ? (ve(u), (So = So.add(r)))
              : "navThumb" === e &&
                (ve(u),
                (s.$wrap = r.children(":first")),
                (Fo = Fo.add(r)),
                i.video && s.$wrap.append(No.clone()));
          }
        });
      }
      function ye(t, e, n, o) {
        return t && t.length && $(t, e, n, o);
      }
      function be(t) {
        it(t, "stage", function (t, e, n, r, a, s) {
          if (r) {
            var u = C(e),
              l = n.fit || i.fit,
              f = n.position || i.position;
            (s.eq = u),
              (Ho[Ve][u] = r.css(
                o.extend(
                  { left: Kn ? 0 : v(e, Oo.w, i.margin, jn) },
                  Kn && c(0)
                )
              )),
              P(r[0]) && (r.appendTo(yo), dn(n.$video)),
              ye(s.$img, Oo, l, f),
              ye(s.$full, Oo, l, f);
          }
        });
      }
      function xe(t, e) {
        if ("thumbs" === In && !isNaN(t)) {
          var n = -t,
            r = -t + Oo.nw;
          Fo.each(function () {
            var t = o(this).data(),
              a = t.eq,
              s = function () {
                return { h: Bn, w: t.w };
              },
              u = s(),
              l = Tn[a] || {},
              c = l.thumbfit || i.thumbfit,
              f = l.thumbposition || i.thumbposition;
            (u.w = t.w),
              t.l + t.w < n ||
                t.l > r ||
                ye(t.$img, u, c, f) ||
                (e && Rt([a], "navThumb", s, c, f));
          });
        }
      }
      function Ee(t, e, n) {
        if (!Ee[n]) {
          var r = "nav" === n && Dn,
            a = 0;
          e.append(
            t
              .filter(function () {
                for (
                  var t, e = o(this), n = e.data(), i = 0, r = Tn.length;
                  i < r;
                  i++
                )
                  if (n.data === Tn[i]) {
                    (t = !0), (n.eq = i);
                    break;
                  }
                return t || (e.remove() && !1);
              })
              .sort(function (t, e) {
                return o(t).data().eq - o(e).data().eq;
              })
              .each(function () {
                if (r) {
                  var t = o(this),
                    e = t.data(),
                    n = Math.round(Bn * e.data.thumbratio) || Vn;
                  (e.l = a),
                    (e.w = n),
                    t.css({ width: n }),
                    (a += n + i.thumbmargin);
                }
              })
          ),
            (Ee[n] = !0);
        }
      }
      function Pe(t) {
        return t - Ko > Oo.w / 3;
      }
      function qe(t) {
        return !(Ln || (zo + t && zo - kn + t) || Fn);
      }
      function Oe() {
        var t = qe(0),
          e = qe(1);
        xo.toggleClass(Et, t).attr(B(t)), _o.toggleClass(Et, e).attr(B(e));
      }
      function De() {
        Io.ok && (Io.prevent = { "<": qe(0), ">": qe(1) });
      }
      function Ue(t) {
        var e,
          n,
          o = t.data();
        return (
          Dn
            ? ((e = o.l), (n = o.w))
            : ((e = t.position().left), (n = t.width())),
          {
            c: e + n / 2,
            min: -e + 10 * i.thumbmargin,
            max: -e + Oo.w - n - 10 * i.thumbmargin,
          }
        );
      }
      function Ye(t) {
        var e = En[so].data();
        J(Eo, { time: 1.2 * t, pos: e.l, width: e.w - 2 * i.thumbborderwidth });
      }
      function Ge(t) {
        var e = Tn[t.guessIndex][so];
        if (e) {
          var n = Do.min !== Do.max,
            o = t.minMax || (n && Ue(En[so])),
            i =
              n &&
              (t.keep && Ge.l
                ? Ge.l
                : a((t.coo || Oo.nw / 2) - Ue(e).c, o.min, o.max)),
            r = n && a(i, Do.min, Do.max),
            s = 1.1 * t.time;
          J(Mo, {
            time: s,
            pos: r || 0,
            onEnd: function () {
              xe(r, !0);
            },
          }),
            fn(ko, z(r, Do.min, Do.max)),
            (Ge.l = i);
        }
      }
      function Ze() {
        tn(so), Wo[so].push(En[so].addClass(Bt));
      }
      function tn(t) {
        for (var e = Wo[t]; e.length; ) e.shift().removeClass(Bt);
      }
      function en(t) {
        var e = Ho[t];
        o.each(Pn, function (t, n) {
          delete e[C(n)];
        }),
          o.each(e, function (t, n) {
            delete e[t], n.detach();
          });
      }
      function nn(t) {
        jn = Nn = zo;
        var e = En[Ve];
        e &&
          (tn(Ve),
          Wo[Ve].push(e.addClass(Bt)),
          t || uo.show.onEnd(!0),
          b(yo, 0, !0),
          en(Ve),
          be(Pn),
          tt(),
          et());
      }
      function on(t, e) {
        t &&
          o.each(e, function (e, n) {
            n &&
              o.extend(n, {
                width: t.width || n.width,
                height: t.height,
                minwidth: t.minwidth,
                maxwidth: t.maxwidth,
                minheight: t.minheight,
                maxheight: t.maxheight,
                ratio: H(t.ratio),
              });
          });
      }
      function rn(e, n) {
        t.trigger(st + ":" + e, [uo, n]);
      }
      function an() {
        clearTimeout(sn.t),
          (ro = 1),
          i.stopautoplayontouch ? uo.stopAutoplay() : (no = !0);
      }
      function sn() {
        ro &&
          (i.stopautoplayontouch || (un(), ln()),
          (sn.t = setTimeout(function () {
            ro = 0;
          }, Ie + Le)));
      }
      function un() {
        no = !(!Fn && !oo);
      }
      function ln() {
        if ((clearTimeout(ln.t), j.stop(ln.w), i.autoplay && !no)) {
          uo.autoplay || ((uo.autoplay = !0), rn("startautoplay"));
          var t = zo,
            e = En[Ve].data();
          ln.w = j(
            function () {
              return e.state || t !== zo;
            },
            function () {
              ln.t = setTimeout(function () {
                if (!no && t === zo) {
                  var e = An,
                    n = Tn[e][Ve].data();
                  ln.w = j(
                    function () {
                      return n.state || e !== An;
                    },
                    function () {
                      no || e !== An || uo.show(Ln ? Y(!Yn) : An);
                    }
                  );
                }
              }, i.autoplay);
            }
          );
        } else uo.autoplay && ((uo.autoplay = !1), rn("stopautoplay"));
      }
      function cn() {
        uo.fullScreen &&
          ((uo.fullScreen = !1),
          $e && ge.cancel(fo),
          Me.removeClass(ut),
          ke.removeClass(ut),
          t.removeClass(Ut).insertAfter(vo),
          (Oo = o.extend({}, io)),
          dn(Fn, !0, !0),
          wn("x", !1),
          uo.resize(),
          Rt(Pn, "stage"),
          R(Se, to, Zn),
          rn("fullscreenexit"));
      }
      function fn(t, e) {
        Un &&
          (t.removeClass(Kt + " " + Vt),
          e && !Fn && t.addClass(e.replace(/^|\s/g, " " + Ht + "--")));
      }
      function dn(t, e, n) {
        e && (wo.removeClass(dt), (Fn = !1), g()),
          t && t !== Fn && (t.remove(), rn("unloadvideo")),
          n && (un(), ln());
      }
      function hn(t) {
        wo.toggleClass(pt, t);
      }
      function mn(t) {
        if (!Lo.flow) {
          var e = t ? t.pageX : mn.x,
            n = e && !qe(Pe(e)) && i.click;
          mn.p !== n && go.toggleClass(St, n) && ((mn.p = n), (mn.x = e));
        }
      }
      function pn(t) {
        clearTimeout(pn.t),
          i.clicktransition && i.clicktransition !== i.transition
            ? setTimeout(function () {
                var e = i.transition;
                uo.setOptions({ transition: i.clicktransition }),
                  (Qn = e),
                  (pn.t = setTimeout(function () {
                    uo.show(t);
                  }, 10));
              }, 0)
            : uo.show(t);
      }
      function vn(t, e) {
        var n = t.target;
        o(n).hasClass(ce)
          ? uo.playVideo()
          : n === jo
          ? uo.toggleFullScreen()
          : Fn
          ? n === $o && dn(Fn, !0, !0)
          : e
          ? hn()
          : i.click &&
            pn({ index: t.shiftKey || Y(Pe(t._x)), slow: t.altKey, user: !0 });
      }
      function wn(t, e) {
        Lo[t] = Do[t] = e;
      }
      function gn(t) {
        pn({
          index: o(this).data().eq,
          slow: t.altKey,
          user: !0,
          coo: t._x - ko.offset().left,
        });
      }
      function yn(t) {
        pn({ index: Co.index(this) ? ">" : "<", slow: t.altKey, user: !0 });
      }
      function bn(t) {
        Q(t, function () {
          setTimeout(function () {
            R(go);
          }, 0),
            hn(!1);
        });
      }
      function xn() {
        if ((h(), _(), !xn.i)) {
          xn.i = !0;
          var t = i.startindex;
          (t || (i.hash && n.hash)) &&
            (On = A(t || n.hash.replace(/^#/, ""), Tn, 0 === uo.index || t, t)),
            (zo = jn = Nn = $n = On = E(On) || 0);
        }
        if (kn) {
          if (_n()) return;
          Fn && dn(Fn, !0),
            (Pn = []),
            en(Ve),
            (xn.ok = !0),
            uo.show({ index: zo, time: 0 }),
            uo.resize();
        } else uo.destroy();
      }
      function _n() {
        if (!_n.f === Yn)
          return (_n.f = Yn), (zo = kn - 1 - zo), uo.reverse(), !0;
      }
      function Cn() {
        Cn.ok || ((Cn.ok = !0), rn("ready"));
      }
      (ke = o("html")), (Me = o("body"));
      var Tn,
        kn,
        Mn,
        Sn,
        Fn,
        En,
        Pn,
        jn,
        Nn,
        $n,
        qn,
        zn,
        An,
        On,
        Ln,
        In,
        Dn,
        Rn,
        Wn,
        Hn,
        Kn,
        Vn,
        Bn,
        Xn,
        Qn,
        Un,
        Yn,
        Gn,
        Jn,
        Zn,
        to,
        eo,
        no,
        oo,
        io,
        ro,
        ao,
        so,
        uo = this,
        lo = o.now(),
        co = st + lo,
        fo = t[0],
        ho = 1,
        mo = t.data(),
        po = o("<style></style>"),
        vo = o(L(Qt)),
        wo = o(L(lt)),
        go = o(L(_t)).appendTo(wo),
        yo = (go[0], o(L(kt)).appendTo(go)),
        bo = o(),
        xo = o(L(Ft + " " + Pt + pe)),
        _o = o(L(Ft + " " + jt + pe)),
        Co = xo.add(_o).appendTo(go),
        To = o(L($t)),
        ko = o(L(Nt)).appendTo(To),
        Mo = o(L(qt)).appendTo(ko),
        So = o(),
        Fo = o(),
        Eo = (yo.data(), Mo.data(), o(L(se)).appendTo(Mo)),
        Po = o(L(Yt + pe)),
        jo = Po[0],
        No = o(L(ce)),
        $o = o(L(fe)).appendTo(go)[0],
        qo = o(L(me)),
        zo = !1,
        Ao = {},
        Oo = {},
        Lo = {},
        Io = {},
        Do = {},
        Ro = {},
        Wo = {},
        Ho = {},
        Ko = 0,
        Vo = [];
      (wo[Ve] = o(L(Ct))),
        (wo[Xe] = o(L(Ot + " " + It + pe, L(ae)))),
        (wo[Be] = o(L(Ot + " " + Lt + pe, L(re)))),
        (Wo[Ve] = []),
        (Wo[Xe] = []),
        (Wo[Be] = []),
        (Ho[Ve] = {}),
        wo.addClass(je ? ft : ct).toggleClass(pt, !i.controlsonstart),
        (mo.fotorama = this),
        (uo.startAutoplay = function (t) {
          return uo.autoplay
            ? this
            : ((no = oo = !1), y(t || i.autoplay), ln(), this);
        }),
        (uo.stopAutoplay = function () {
          return uo.autoplay && ((no = oo = !0), ln()), this;
        }),
        (uo.show = function (t) {
          var e;
          "object" != typeof t ? ((e = t), (t = {})) : (e = t.index),
            (e =
              ">" === e
                ? Nn + 1
                : "<" === e
                ? Nn - 1
                : "<<" === e
                ? 0
                : ">>" === e
                ? kn - 1
                : e),
            (e = void 0 === (e = isNaN(e) ? A(e, Tn, !0) : e) ? zo || 0 : e),
            (uo.activeIndex = zo = E(e)),
            (qn = V(zo)),
            (zn = G(zo)),
            (An = C(zo + (Yn ? -1 : 1))),
            (Pn = [zo, qn, zn]),
            (Nn = Ln ? e : zo);
          var n = Math.abs($n - Nn),
            o = x(t.time, function () {
              return Math.min(Xn * (1 + (n - 1) / 12), 2 * Xn);
            }),
            r = t.overPos;
          t.slow && (o *= 10);
          var s = En;
          uo.activeFrame = En = Tn[zo];
          var u = s === En && !t.user;
          dn(Fn, En.i !== Tn[C(jn)].i),
            we(Pn, "stage"),
            be(ze ? [Nn] : [Nn, V(Nn), G(Nn)]),
            wn("go", !0),
            u || rn("show", { user: t.user, time: o }),
            (no = !0);
          var l = (uo.show.onEnd = function (e) {
            if (!l.ok) {
              if (
                ((l.ok = !0),
                e || nn(!0),
                u || rn("showend", { user: t.user }),
                !e && Qn && Qn !== i.transition)
              )
                return uo.setOptions({ transition: Qn }), void (Qn = !1);
              le(), Rt(Pn, "stage"), wn("go", !1), De(), mn(), un(), ln();
            }
          });
          if (
            (Kn
              ? Z(
                  En[Ve],
                  zo !== $n ? Tn[$n][Ve] : null,
                  bo,
                  { time: o, method: i.transition, onEnd: l },
                  Vo
                )
              : J(yo, {
                  pos: -v(Nn, Oo.w, i.margin, jn),
                  overPos: r,
                  time: o,
                  onEnd: l,
                }),
            Oe(),
            In)
          ) {
            Ze();
            var c = T(zo + a(Nn - $n, -1, 1));
            Ge({
              time: o,
              coo: c !== zo && t.coo,
              guessIndex: void 0 !== t.coo ? c : zo,
              keep: u,
            }),
              Dn && Ye(o);
          }
          return (
            (eo = void 0 !== $n && $n !== zo),
            ($n = zo),
            i.hash && eo && !uo.eq && N(En.id || zo + 1),
            this
          );
        }),
        (uo.requestFullScreen = function () {
          return (
            Wn &&
              !uo.fullScreen &&
              ((Zn = Se.scrollTop()),
              (to = Se.scrollLeft()),
              R(Se),
              wn("x", !0),
              (io = o.extend({}, Oo)),
              t.addClass(Ut).appendTo(Me.addClass(ut)),
              ke.addClass(ut),
              dn(Fn, !0, !0),
              (uo.fullScreen = !0),
              Hn && ge.request(fo),
              uo.resize(),
              Rt(Pn, "stage"),
              le(),
              rn("fullscreenenter")),
            this
          );
        }),
        (uo.cancelFullScreen = function () {
          return Hn && ge.is() ? ge.cancel(e) : cn(), this;
        }),
        (uo.toggleFullScreen = function () {
          return uo[(uo.fullScreen ? "cancel" : "request") + "FullScreen"]();
        }),
        K(e, ge.event, function () {
          !Tn || ge.is() || Fn || cn();
        }),
        (uo.resize = function (t) {
          if (!Tn) return this;
          var e = arguments[1] || 0,
            n = arguments[2];
          on(
            uo.fullScreen
              ? {
                  width: "100%",
                  maxwidth: null,
                  minwidth: null,
                  height: "100%",
                  maxheight: null,
                  minheight: null,
                }
              : W(t),
            [Oo, n || uo.fullScreen || i]
          );
          r = o(".header-compact .outer-wrap:visible").outerHeight();
          if (o(".header-compact .outer-wrap").is(":hidden"))
            var r = o(".responsive-menu-wrap").outerHeight();
          var s = Oo.width,
            u = Oo.height,
            l = Oo.ratio,
            c = Se.height() - r;
          return (
            p(s) &&
              (wo
                .addClass(yt)
                .css({
                  width: s,
                  minWidth: Oo.minwidth || 0,
                  maxWidth: Oo.maxwidth || 99999,
                }),
              (s = Oo.W = Oo.w = wo.width()),
              (Oo.nw = (In && m(i.navwidth, s)) || s),
              i.glimpse && (Oo.w -= Math.round(2 * (m(i.glimpse, s) || 0))),
              yo.css({ width: Oo.w, marginLeft: (Oo.W - Oo.w) / 2 }),
              (u = (u = m(u, c)) || (l && s / l)) &&
                ((s = Math.round(s)),
                (u = Oo.h =
                  Math.round(a(u, m(Oo.minheight, c), m(Oo.maxheight, c)))),
                go.stop().animate({ width: s, height: u }, e, function () {
                  wo.removeClass(yt);
                }),
                nn(),
                In &&
                  (ko.stop().animate({ width: Oo.nw }, e),
                  Ge({ guessIndex: zo, time: e, keep: !0 }),
                  Dn && Ee.nav && Ye(e)),
                (Jn = n || !0),
                Cn())),
            (Ko = go.offset().left),
            this
          );
        }),
        (uo.setOptions = function (t) {
          return o.extend(i, t), xn(), this;
        }),
        (uo.shuffle = function () {
          return Tn && I(Tn) && xn(), this;
        }),
        (uo.destroy = function () {
          return (
            uo.cancelFullScreen(),
            uo.stopAutoplay(),
            (Tn = uo.data = null),
            f(),
            (Pn = []),
            en(Ve),
            (xn.ok = !1),
            this
          );
        }),
        (uo.playVideo = function () {
          var t = En,
            e = t.video,
            n = zo;
          return (
            "object" == typeof e &&
              t.videoReady &&
              (Hn && uo.fullScreen && uo.cancelFullScreen(),
              j(
                function () {
                  return !ge.is() || n !== zo;
                },
                function () {
                  n === zo &&
                    ((t.$video = t.$video || o(o.Fotorama.jst.video(e))),
                    t.$video.appendTo(t[Ve]),
                    wo.addClass(dt),
                    (Fn = t.$video),
                    g(),
                    Co.blur(),
                    Po.blur(),
                    rn("loadvideo"));
                }
              )),
            this
          );
        }),
        (uo.stopVideo = function () {
          return dn(Fn, !0, !0), this;
        }),
        go.on("mousemove", mn),
        (Lo = nt(yo, {
          onStart: an,
          onMove: function (t, e) {
            fn(go, e.edge);
          },
          onTouchEnd: sn,
          onEnd: function (t) {
            fn(go);
            var e =
              ((Ae && !ao) || t.touch) && i.arrows && "always" !== i.arrows;
            if (t.moved || (e && t.pos !== t.newPos && !t.control)) {
              var n = w(t.newPos, Oo.w, i.margin, jn);
              uo.show({
                index: n,
                time: Kn ? Xn : t.time,
                overPos: t.overPos,
                user: !0,
              });
            } else t.aborted || t.control || vn(t.startEvent, e);
          },
          timeLow: 1,
          timeHigh: 1,
          friction: 2,
          select: "." + Xt + ", ." + Xt + " *",
          $wrap: go,
        })),
        (Do = nt(Mo, {
          onStart: an,
          onMove: function (t, e) {
            fn(ko, e.edge);
          },
          onTouchEnd: sn,
          onEnd: function (t) {
            function e() {
              (Ge.l = t.newPos), un(), ln(), xe(t.newPos, !0);
            }
            if (t.moved)
              t.pos !== t.newPos
                ? ((no = !0),
                  J(Mo, {
                    time: t.time,
                    pos: t.newPos,
                    overPos: t.overPos,
                    onEnd: e,
                  }),
                  xe(t.newPos),
                  Un && fn(ko, z(t.newPos, Do.min, Do.max)))
                : e();
            else {
              var n = t.$target.closest("." + Ot, Mo)[0];
              n && gn.call(n, t.startEvent);
            }
          },
          timeLow: 0.5,
          timeHigh: 2,
          friction: 5,
          $wrap: ko,
        })),
        (Io = ot(go, {
          shift: !0,
          onEnd: function (t, e) {
            an(), sn(), uo.show({ index: e, slow: t.altKey });
          },
        })),
        (Ro = ot(ko, {
          onEnd: function (t, e) {
            an(), sn();
            var n = b(Mo) + 0.25 * e;
            Mo.css(l(a(n, Do.min, Do.max))),
              Un && fn(ko, z(n, Do.min, Do.max)),
              (Ro.prevent = { "<": n >= Do.max, ">": n <= Do.min }),
              clearTimeout(Ro.t),
              (Ro.t = setTimeout(function () {
                (Ge.l = n), xe(n, !0);
              }, Le)),
              xe(n);
          },
        })),
        wo.hover(
          function () {
            setTimeout(function () {
              ro || hn(!(ao = !0));
            }, 0);
          },
          function () {
            ao && hn(!(ao = !1));
          }
        ),
        O(
          Co,
          function (t) {
            U(t), yn.call(this, t);
          },
          {
            onStart: function () {
              an(), (Lo.control = !0);
            },
            onTouchEnd: sn,
          }
        ),
        Co.each(function () {
          X(this, function (t) {
            yn.call(this, t);
          }),
            bn(this);
        }),
        X(jo, uo.toggleFullScreen),
        bn(jo),
        o.each(
          "load push pop shift unshift reverse sort splice".split(" "),
          function (t, e) {
            uo[e] = function () {
              return (
                (Tn = Tn || []),
                "load" !== e
                  ? Array.prototype[e].apply(Tn, arguments)
                  : arguments[0] &&
                    "object" == typeof arguments[0] &&
                    arguments[0].length &&
                    (Tn = D(arguments[0])),
                xn(),
                uo
              );
            };
          }
        ),
        xn();
    }),
      (o.fn.fotorama = function (e) {
        return this.each(function () {
          var n = this,
            i = o(this),
            r = i.data(),
            a = r.fotorama;
          a
            ? a.setOptions(e, !0)
            : j(
                function () {
                  return !E(n);
                },
                function () {
                  (r.urtext = i.html()),
                    new o.Fotorama(
                      i,
                      o.extend({}, Ge, t.fotoramaDefaults, e, r)
                    );
                }
              );
        });
      }),
      (o.Fotorama.instances = []),
      (o.Fotorama.cache = {}),
      (o.Fotorama.measures = {}),
      ((o = o || {}).Fotorama = o.Fotorama || {}),
      (o.Fotorama.jst = o.Fotorama.jst || {}),
      (o.Fotorama.jst.style = function (t) {
        var e,
          n = "";
        return (n +=
          ".fotorama" +
          (null == (e = t.s) ? "" : e) +
          " .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:" +
          (null == (e = t.m) ? "" : e) +
          "px;\nheight:" +
          (null == (e = t.h) ? "" : e) +
          "px}\n.fotorama" +
          (null == (e = t.s) ? "" : e) +
          " .fotorama__thumb-border{\nheight:" +
          (null == (e = t.h - t.b * (t.q ? 0 : 2)) ? "" : e) +
          "px;\nborder-width:" +
          (null == (e = t.b) ? "" : e) +
          "px;\nmargin-top:" +
          (null == (e = t.m) ? "" : e) +
          "px}");
      }),
      (o.Fotorama.jst.video = function (t) {
        var e = "",
          n = Array.prototype.join;
        return (
          (e += '<div class="fotorama__video"><iframe src="'),
          (function () {
            e += n.call(arguments, "");
          })(
            ("youtube" == t.type
              ? t.p + "youtube.com/embed/" + t.id + "?autoplay=1"
              : "vimeo" == t.type
              ? t.p + "player.vimeo.com/video/" + t.id + "?autoplay=1&badge=0"
              : t.id) + (t.s && "custom" != t.type ? "&" + t.s : "")
          ),
          (e += '" frameborder="0" allowfullscreen></iframe></div>\n')
        );
      }),
      o(function () {
        o("." + st + ':not([data-auto="false"])').fotorama();
      });
  })(window, document, location, "undefined" != typeof jQuery && jQuery);
/*-----------------------------------------------------------------------------------*/
/*	23. COCOEN
/*-----------------------------------------------------------------------------------*/
!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var t;
    (t =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this),
      (t.Cocoen = e());
  }
})(function () {
  return (function e(t, n, i) {
    function s(o, a) {
      if (!n[o]) {
        if (!t[o]) {
          var l = "function" == typeof require && require;
          if (!a && l) return l(o, !0);
          if (r) return r(o, !0);
          var d = new Error("Cannot find module '" + o + "'");
          throw ((d.code = "MODULE_NOT_FOUND"), d);
        }
        var h = (n[o] = { exports: {} });
        t[o][0].call(
          h.exports,
          function (e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          },
          h,
          h.exports,
          e,
          t,
          n,
          i
        );
      }
      return n[o].exports;
    }
    for (
      var r = "function" == typeof require && require, o = 0;
      o < i.length;
      o++
    )
      s(i[o]);
    return s;
  })(
    {
      1: [
        function (e, t, n) {
          "use strict";
          function i(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          }
          var s =
              Object.assign ||
              function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
                }
                return e;
              },
            r = (function () {
              function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                  var i = t[n];
                  (i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i);
                }
              }
              return function (t, n, i) {
                return n && e(t.prototype, n), i && e(t, i), t;
              };
            })(),
            o = (function () {
              function e(t, n) {
                i(this, e),
                  (this.options = s({}, e.defaults, n)),
                  (this.element = t || document.querySelector(".cocoen")),
                  this.init();
              }
              return (
                r(e, [
                  {
                    key: "init",
                    value: function () {
                      this.createElements(),
                        this.addEventListeners(),
                        this.dimensions();
                    },
                  },
                  {
                    key: "createElements",
                    value: function () {
                      var e = document.createElement("span");
                      (e.className = this.options.dragElementSelector.replace(
                        ".",
                        ""
                      )),
                        this.element.appendChild(e);
                      var t = document.createElement("div"),
                        n = this.element.querySelector("img:first-child");
                      t.appendChild(n.cloneNode(!0)),
                        n.parentNode.replaceChild(t, n),
                        (this.dragElement = this.element.querySelector(
                          this.options.dragElementSelector
                        )),
                        (this.beforeElement =
                          this.element.querySelector("div:first-child")),
                        (this.beforeImage =
                          this.beforeElement.querySelector("img"));
                    },
                  },
                  {
                    key: "addEventListeners",
                    value: function () {
                      this.element.addEventListener(
                        "click",
                        this.onTap.bind(this)
                      ),
                        this.element.addEventListener(
                          "mousemove",
                          this.onDrag.bind(this)
                        ),
                        this.element.addEventListener(
                          "touchmove",
                          this.onDrag.bind(this)
                        ),
                        this.dragElement.addEventListener(
                          "mousedown",
                          this.onDragStart.bind(this)
                        ),
                        this.dragElement.addEventListener(
                          "touchstart",
                          this.onDragStart.bind(this)
                        ),
                        window.addEventListener(
                          "mouseup",
                          this.onDragEnd.bind(this)
                        ),
                        window.addEventListener(
                          "resize",
                          this.dimensions.bind(this)
                        );
                    },
                  },
                  {
                    key: "dimensions",
                    value: function () {
                      (this.elementWidth = parseInt(
                        window.getComputedStyle(this.element).width,
                        10
                      )),
                        (this.elementOffsetLeft =
                          this.element.getBoundingClientRect().left +
                          document.body.scrollLeft),
                        (this.beforeImage.style.width =
                          this.elementWidth + "px"),
                        (this.dragElementWidth = parseInt(
                          window.getComputedStyle(this.dragElement).width,
                          10
                        )),
                        (this.minLeftPos = this.elementOffsetLeft + 10),
                        (this.maxLeftPos =
                          this.elementOffsetLeft +
                          this.elementWidth -
                          this.dragElementWidth -
                          10);
                    },
                  },
                  {
                    key: "onTap",
                    value: function (e) {
                      e.preventDefault(),
                        (this.leftPos = e.pageX
                          ? e.pageX
                          : e.originalEvent.touches[0].pageX),
                        this.requestDrag();
                    },
                  },
                  {
                    key: "onDragStart",
                    value: function (e) {
                      e.preventDefault();
                      var t = e.pageX
                          ? e.pageX
                          : e.originalEvent.touches[0].pageX,
                        n =
                          this.dragElement.getBoundingClientRect().left +
                          document.body.scrollLeft;
                      (this.posX = n + this.dragElementWidth - t),
                        (this.isDragging = !0);
                    },
                  },
                  {
                    key: "onDragEnd",
                    value: function (e) {
                      e.preventDefault(), (this.isDragging = !1);
                    },
                  },
                  {
                    key: "onDrag",
                    value: function (e) {
                      e.preventDefault(),
                        this.isDragging &&
                          ((this.moveX = e.pageX
                            ? e.pageX
                            : e.originalEvent.touches[0].pageX),
                          (this.leftPos =
                            this.moveX + this.posX - this.dragElementWidth),
                          this.requestDrag());
                    },
                  },
                  {
                    key: "drag",
                    value: function () {
                      this.leftPos < this.minLeftPos
                        ? (this.leftPos = this.minLeftPos)
                        : this.leftPos > this.maxLeftPos &&
                          (this.leftPos = this.maxLeftPos);
                      var e =
                        this.leftPos +
                        this.dragElementWidth / 2 -
                        this.elementOffsetLeft;
                      e /= this.elementWidth;
                      var t = 100 * e + "%";
                      (this.dragElement.style.left = t),
                        (this.beforeElement.style.width = t),
                        this.options.dragCallback &&
                          this.options.dragCallback(e);
                    },
                  },
                  {
                    key: "requestDrag",
                    value: function () {
                      window.requestAnimationFrame(this.drag.bind(this));
                    },
                  },
                ]),
                e
              );
            })();
          (o.defaults = {
            dragElementSelector: ".cocoen-drag",
            dragCallback: null,
          }),
            (t.exports = o);
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});
!(function r(n, e, t) {
  function o(i, f) {
    if (!e[i]) {
      if (!n[i]) {
        var c = "function" == typeof require && require;
        if (!f && c) return c(i, !0);
        if (u) return u(i, !0);
        var a = new Error("Cannot find module '" + i + "'");
        throw ((a.code = "MODULE_NOT_FOUND"), a);
      }
      var s = (e[i] = { exports: {} });
      n[i][0].call(
        s.exports,
        function (r) {
          var e = n[i][1][r];
          return o(e ? e : r);
        },
        s,
        s.exports,
        r,
        n,
        e,
        t
      );
    }
    return e[i].exports;
  }
  for (
    var u = "function" == typeof require && require, i = 0;
    i < t.length;
    i++
  )
    o(t[i]);
  return o;
})(
  {
    1: [
      function (r, n, e) {
        "use strict";
        !(function (r, n) {
          r &&
            n &&
            (r.fn.cocoen = function (e) {
              function t() {
                return new n(this, r.extend({}, n.defaults, e));
              }
              return this.each(t);
            });
        })(window.jQuery, window.Cocoen);
      },
      {},
    ],
  },
  {},
  [1]
);
/*-----------------------------------------------------------------------------------*/
/*	24. VANILLA
/*-----------------------------------------------------------------------------------*/
/*
 * Vanilla Form v. 2.1.0
 * Author: Michal Szepielak
 *
 * Product info and license terms:
 * http://codecanyon.net/item/vanilla-form-modern-responsive-contact-form/10447733
 */
var VanillaForm = (function (a) {
  "use strict";
  function b() {
    function a() {
      return Math.floor(65536 * (1 + Math.random()))
        .toString(16)
        .substring(1);
    }
    return (
      a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
    );
  }
  function c(a) {
    var b = [];
    return (
      a.each(function (a, c) {
        b[a] = new h(c);
      }),
      b.length <= 1 ? b[0] : b
    );
  }
  function d() {
    var a = "9320087105434084715";
    return (a = a.split("")), (a = a.reverse().join(""));
  }
  function e(a) {
    a.formFocused = !0;
  }
  function f(a, b) {
    var c,
      d = document.querySelectorAll("[name=" + b.name + "]");
    for (c = 0; c < d.length; c++)
      d[c].classList.remove("error"),
        d[c].removeEventListener("focus", k[b.name], !1);
    delete k[b.name],
      k.length--,
      k.length <= 0 && ((k.length = 0), a.setSubmitState("initial"));
  }
  function g(b) {
    var c = b.getBoundingClientRect(),
      d = Math.round(c.top) - 5,
      e = a.innerHeight;
    return 0 >= d
      ? void a.scrollBy(0, d)
      : void (d >= e && a.scrollBy(0, d - e + 30));
  }
  function h(d) {
    var e,
      f = this;
    return a.jQuery && d instanceof a.jQuery
      ? c(d)
      : d
      ? h.getInstanceByElement(d) instanceof h
        ? (console.warn(
            "Duplicate initiation of form %s was prevented",
            d.getAttribute(i)
          ),
          h.getInstanceByElement(d))
        : ((e = b()),
          d.setAttribute(i, e),
          (l[e] = f),
          (f.dict = {
            markedAsSpamError:
              "Your message was marked as spam and was not sent! Fix your message!",
            markedAsSpamServerError:
              "Your message was marked as SPAM and was not send.",
            sendSuccess:
              "We have received your inquiry. Stay tuned, we’ll get back to you very soon.",
            sendError:
              "Mail server has experienced an error. Please try again.",
            httpRequestError:
              "[%s] There was a problem with receiving response from mailing server",
            timeoutError: "Your request was timeout. Please try again.",
            parseResponseError:
              "Response from mailing server was unclear. Please contact administrator.",
            httpRequestConnectionError:
              "We couldn't connect to the server because of connection error. Please try again.",
          }),
          (f.responseTimeout = 5e3),
          (f.httpRequest = null),
          (f.url = d.action || location.href),
          (f.form = d),
          (f.processing = !1),
          (f.submitButton = d.querySelector('[type="submit"]')),
          f.submitButton
            ? ((f.notificationBox = d.querySelector(".notification-box")),
              f.notificationBox
                ? (f.notificationBox.addEventListener(
                    "click",
                    function () {
                      this.classList.remove("show-error"),
                        this.classList.remove("show-success");
                    },
                    !1
                  ),
                  (f.formFocused = !1),
                  (f.focusBound = null),
                  f.init(),
                  f)
                : (console.warn("Couldn't bind to submit button"), null))
            : (console.warn("Couldn't bind to submit button"), null))
      : (console.warn("Couldn't bind to form element"), null);
  }
  var i = "data-vf-id",
    j = "vanillaSendSuccess",
    k = { length: 0 },
    l = {};
  return (
    (h.prototype.logError = function (a) {
      this.notify(a, "error");
    }),
    (h.prototype.notify = function (a, b) {
      var c = this.notificationBox;
      return c
        ? ((c.innerHTML = a),
          c.classList.add("show-" + (b || "error")),
          void g(c))
        : void console.warn("Notification box not found");
    }),
    (h.prototype.setSubmitState = function (a) {
      var b = this,
        c = b.submitButton,
        d = c.getAttribute("data-" + a),
        e = c.className.replace(/state-[a-z]+/gi, "");
      (b.processing = "processing" === a),
        (c.className = e + " state-" + a),
        (c.value = d);
    }),
    (h.prototype.validateForm = function () {
      var b,
        c,
        e,
        g = this,
        h = g.form,
        i = h.elements,
        j = !1,
        l = !1,
        m =
          /^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      for (c = i.length - 1; c >= 0; --c) (e = i[c]), k[e.name] && f(g, e);
      for (c = i.length - 1; c >= 0; --c)
        (e = i[c]),
          (j = !1),
          "" === e.value && e.required
            ? (j = !0)
            : ("checkbox" === e.type && e.required && !e.checked && (j = !0),
              "email" !== e.type ||
                "" === e.value ||
                m.test(e.value) ||
                (j = !0),
              "radio" === e.type &&
                e.required &&
                (document.querySelector("[name=" + e.name + "]:checked") ||
                  (j = !0))),
          j
            ? (e.classList.add("error"),
              k[e.name] || ((k[e.name] = f.bind(null, g, e)), k.length++),
              e.addEventListener("focus", k[e.name], !1),
              (l = !0))
            : e.classList.remove("error"),
          l && g.setSubmitState("error");
      if (!l) {
        if (g.formFocused !== !0)
          return g.logError(g.dict.markedAsSpamError), !1;
        (b = h.querySelector('[name="contact_secret"]')),
          b ||
            ((b = document.createElement("input")),
            (b.type = "hidden"),
            (b.name = "contact_secret"),
            h.appendChild(b)),
          (b.value = d());
      }
      return (
        setTimeout(function () {
          a.scrollBy(0, -1);
        }, 1),
        !l
      );
    }),
    (h.prototype.resetForm = function () {
      var a,
        b,
        c = this,
        d = c.form,
        e = c.submitButton;
      for (b = d.length - 1; b >= 0; --b)
        (a = d[b]), a !== e && (a.classList.remove("success"), (a.value = ""));
      c.setSubmitState("initial");
    }),
    (h.prototype.successForm = function () {
      var a,
        b = this,
        c = { bubbles: !1, cancelable: !0, detail: b };
      (a = new CustomEvent(j, c)),
        b.form.dispatchEvent(a),
        a.defaultPrevented ||
          (b.setSubmitState("success"),
          b.notify(b.dict.sendSuccess, "success"));
    }),
    (h.prototype.processResponse = function (a) {
      var b,
        c = this,
        d = c.dict;
      try {
        b = JSON.parse(a);
      } catch (e) {
        console.error(e), (b = { result: "ParseError" });
      }
      switch (b.result) {
        case "OK":
          c.successForm(d.sendSuccess), setTimeout(c.resetForm.bind(c), 4e3);
          break;
        case "NO_SPAM":
          c.logError(d.markedAsSpamServerError);
          break;
        case "SEND_ERROR":
          c.logError(d.sendError), c.setSubmitState("initial");
          break;
        case "ParseError":
          c.logError(d.parseResponseError);
      }
    }),
    (h.prototype.requestStateChange = function () {
      var a = this,
        b = a.httpRequest;
      4 === b.readyState &&
        (200 === b.status
          ? a.processResponse(b.responseText)
          : (a.setSubmitState("initial"),
            0 === b.status
              ? a.logError(a.dict.httpRequestConnectionError)
              : a.logError(a.dict.httpRequestError.replace("%s", b.status))));
    }),
    (h.prototype.init = function () {
      var b,
        c,
        d = this,
        f = d.form,
        g = d.submitButton,
        h = f.elements;
      if (
        (f.addEventListener("submit", d.submitForm.bind(d), !0),
        a.XMLHttpRequest
          ? (d.httpRequest = new XMLHttpRequest())
          : a.ActiveXObject("Microsoft.XMLHTTP") &&
            (d.httpRequest = new ActiveXObject("Microsoft.XMLHTTP")),
        (d.focusBound = e.bind(null, d)),
        !d.httpRequest)
      )
        return console.error("Couldn't init XMLHttpRequest"), null;
      for (d.formFocused = !1, c = h.length - 1; c >= 0; --c)
        (b = h[c]),
          "submit" !== b.type && b.addEventListener("focus", d.focusBound, !1);
      g.value !== g.getAttribute("data-initial") &&
        (g.setAttribute("data-initial", g.value), d.setSubmitState("initial"));
    }),
    (h.prototype.send = function (a) {
      var b = this,
        c = b.httpRequest;
      c.open("POST.html", b.url, !0),
        (c.timeout = b.responseTimeout),
        (c.ontimeout = function () {
          b.logError(b.dict.timeoutError), b.setSubmitState("initial");
        }),
        c.send(a),
        (c.onreadystatechange = b.requestStateChange.bind(b));
    }),
    (h.prototype.submitForm = function (a) {
      var b = this,
        c = "";
      return (
        a && (a.preventDefault(), a.stopPropagation()),
        b.processing
          ? void 0
          : (b.validateForm() &&
              (b.setSubmitState("processing"),
              (c = new FormData(b.form)),
              b.send(c)),
            !1)
      );
    }),
    (h.getInstanceByElement = function (a) {
      var b = a.getAttribute(i) || "";
      return l.hasOwnProperty(b) ? l[b] : null;
    }),
    h
  );
})(window);
/*-----------------------------------------------------------------------------------*/
/*	25. GO TO TOP
/*-----------------------------------------------------------------------------------*/
!(function (a, b, c) {
  (a.fn.scrollUp = function (b) {
    a.data(c.body, "scrollUp") ||
      (a.data(c.body, "scrollUp", !0), a.fn.scrollUp.init(b));
  }),
    (a.fn.scrollUp.init = function (d) {
      var e = (a.fn.scrollUp.settings = a.extend(
          {},
          a.fn.scrollUp.defaults,
          d
        )),
        f = e.scrollTitle ? e.scrollTitle : e.scrollText,
        g = a("<a/>", { id: e.scrollName, href: "#top", title: f }).appendTo(
          "body"
        );
      e.scrollImg || g.html(e.scrollText),
        g.css({ display: "none", position: "fixed", zIndex: e.zIndex }),
        e.activeOverlay &&
          a("<div/>", { id: e.scrollName + "-active" })
            .css({
              position: "absolute",
              top: e.scrollDistance + "px",
              width: "100%",
              borderTop: "1px dotted" + e.activeOverlay,
              zIndex: e.zIndex,
            })
            .appendTo("body"),
        (scrollEvent = a(b).scroll(function () {
          switch (
            ((scrollDis =
              "top" === e.scrollFrom
                ? e.scrollDistance
                : a(c).height() - a(b).height() - e.scrollDistance),
            e.animation)
          ) {
            case "fade":
              a(
                a(b).scrollTop() > scrollDis
                  ? g.fadeIn(e.animationInSpeed)
                  : g.fadeOut(e.animationOutSpeed)
              );
              break;
            case "slide":
              a(
                a(b).scrollTop() > scrollDis
                  ? g.slideDown(e.animationInSpeed)
                  : g.slideUp(e.animationOutSpeed)
              );
              break;
            default:
              a(a(b).scrollTop() > scrollDis ? g.show(0) : g.hide(0));
          }
        })),
        g.click(function (b) {
          b.preventDefault(),
            a("html, body").animate({ scrollTop: 0 }, e.topSpeed, e.easingType);
        });
    }),
    (a.fn.scrollUp.defaults = {
      scrollName: "scrollUp",
      scrollDistance: 300,
      scrollFrom: "top",
      scrollSpeed: 300,
      easingType: "linear",
      animation: "fade",
      animationInSpeed: 200,
      animationOutSpeed: 200,
      scrollText: "Scroll to top",
      scrollTitle: !1,
      scrollImg: !1,
      activeOverlay: !1,
      zIndex: 2147483647,
    }),
    (a.fn.scrollUp.destroy = function (d) {
      a.removeData(c.body, "scrollUp"),
        a("#" + a.fn.scrollUp.settings.scrollName).remove(),
        a("#" + a.fn.scrollUp.settings.scrollName + "-active").remove(),
        a.fn.jquery.split(".")[1] >= 7
          ? a(b).off("scroll", d)
          : a(b).unbind("scroll", d);
    }),
    (a.scrollUp = a.fn.scrollUp);
})(jQuery, window, document);
/*-----------------------------------------------------------------------------------*/
/*	27. FLICKR
/*-----------------------------------------------------------------------------------*/
/*
 * DC Flickr - jQuery Flickr
 * Copyright (c) 2011 Design Chemical
 * http://www.designchemical.com/blog/
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */

(function ($) {
  $.fn.dcFlickr = function (options) {
    //set default options
    var defaults = {
      base: "http://api.flickr.com/services/feeds/",
      api: "photos_public.gne",
      limit: 20,
      q: {
        lang: "en-us",
        format: "json",
        jsoncallback: "?",
      },
      onLoad: function () {},
    };

    //call the default otions
    var options = $.extend(defaults, options);
    var url = defaults.base + defaults.api + "?";
    var qfirst = true;

    for (var key in defaults.q) {
      if (!qfirst) url += "&";
      url += key + "=" + defaults.q[key];
      qfirst = false;
    }

    var $dcFlickr = this;

    return $dcFlickr.each(function (options) {
      var htmlString = "";
      limit = defaults.limit;

      $.getJSON(url, function (data) {
        // Cycle each flickr image
        $.each(data.items, function (i, item) {
          if (i < limit) {
            // var source = item.media.m.replace(/_m\.jpg$/, ".jpg");
            var sourceSquare = item.media.m.replace("_m.html", "_q.html");
            htmlString +=
              '<div class="item col-xs-6 col-sm-4 col-md-2"><figure class="overlay overlay1"><a href="' +
              item.link +
              '" target="_blank"></a>';
            htmlString += '<img src="' + sourceSquare + '" alt="" />';
            htmlString +=
              '<figcaption><i class="et-link from-top icon-xs"></i></figcaption></figure></div>';
          }
        });

        // append html to object
        $dcFlickr.html(htmlString);
      }).success(function () {
        // onLoad callback;
        defaults.onLoad.call(this);
      });
    });
  };
})(jQuery);
/*-----------------------------------------------------------------------------------*/
/*	28. JRIBBBLE
/*-----------------------------------------------------------------------------------*/
/* Jribbble 3.0.0 | Mon Apr  9 11:57:04 EDT 2018 - Copyright (c) 2018, Tyler Gaw me@tylergaw.com - Released under the ISC-LICENSE @license */
var jribbble = (function () {
  var a = null,
    t = function (e, t) {
      var r = "https://api.dribbble.com/v2/" + e,
        s = new XMLHttpRequest();
      s.addEventListener("load", function () {
        if (t && "function" == typeof t) {
          var r = {};
          if (this.status < 400)
            try {
              r = JSON.parse(this.responseText);
            } catch (e) {
              r = {
                error: "There was an error parsing the server response as JSON",
              };
            }
          else
            r = {
              error:
                "There was an error making the request to api.dribble.com.",
              status: this.status,
            };
          t(r);
        }
      }),
        s.open("GET-2.html", r),
        s.setRequestHeader("Authorization", "Bearer " + a),
        s.send();
    },
    s = function () {
      for (
        var e = [].slice.call(arguments),
          r = null,
          t = {},
          s = function () {},
          n = 0;
        n < e.length;
        n += 1
      )
        switch (typeof e[n]) {
          case "string":
          case "number":
            r = e[n];
            break;
          case "object":
            t = e[n];
            break;
          case "function":
            s = e[n];
        }
      if ((t.token && (a = t.token), !a))
        throw new Error(
          "jribbble needs a valid access token. You can either include this as an option: jribbble.shots({token: '1234'}) or with jribbble.setToken('1234')"
        );
      var o = ["page", "per_page"]
        .map(function (e) {
          return t[e] ? e + "=" + t[e] : null;
        })
        .filter(function (e) {
          return e;
        })
        .join("&");
      return { resourceId: r, callback: s, query: o ? "?" + o : "" };
    },
    e = function (r) {
      return function () {
        var e = s.apply(null, arguments);
        t(r + e.query, e.callback);
      };
    },
    r = {
      setToken: function (e) {
        if (!e)
          throw new Error("jribbble.setToken() expects a valid access_token");
        a = e;
      },
      shots: function () {
        var e = s.apply(null, arguments),
          r = e.resourceId ? "shots/" + e.resourceId : "user/shots";
        t(r + e.query, e.callback);
      },
      user: e("user"),
      projects: e("user/projects"),
      likes: e("user/likes"),
      popular: e("popular_shots"),
    };
  try {
    module && ((r._createApiMethod = e), (r._processArguments = s));
  } catch (e) {}
  return r;
})();
window && (window.jribbble = jribbble);
try {
  module && (module.exports = jribbble);
} catch (e) {}
/*-----------------------------------------------------------------------------------*/
/*	29. EASING
/*-----------------------------------------------------------------------------------*/
!(function (n) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (e) {
        return n(e);
      })
    : "object" == typeof module && "object" == typeof module.exports
    ? (exports = n(require("jquery")))
    : n(jQuery);
})(function (n) {
  function e(n) {
    var e = 7.5625,
      t = 2.75;
    return n < 1 / t
      ? e * n * n
      : n < 2 / t
      ? e * (n -= 1.5 / t) * n + 0.75
      : n < 2.5 / t
      ? e * (n -= 2.25 / t) * n + 0.9375
      : e * (n -= 2.625 / t) * n + 0.984375;
  }
  n.easing.jswing = n.easing.swing;
  var t = Math.pow,
    u = Math.sqrt,
    r = Math.sin,
    i = Math.cos,
    a = Math.PI,
    c = 1.70158,
    o = 1.525 * c,
    s = (2 * a) / 3,
    f = (2 * a) / 4.5;
  n.extend(n.easing, {
    def: "easeOutQuad",
    swing: function (e) {
      return n.easing[n.easing.def](e);
    },
    easeInQuad: function (n) {
      return n * n;
    },
    easeOutQuad: function (n) {
      return 1 - (1 - n) * (1 - n);
    },
    easeInOutQuad: function (n) {
      return n < 0.5 ? 2 * n * n : 1 - t(-2 * n + 2, 2) / 2;
    },
    easeInCubic: function (n) {
      return n * n * n;
    },
    easeOutCubic: function (n) {
      return 1 - t(1 - n, 3);
    },
    easeInOutCubic: function (n) {
      return n < 0.5 ? 4 * n * n * n : 1 - t(-2 * n + 2, 3) / 2;
    },
    easeInQuart: function (n) {
      return n * n * n * n;
    },
    easeOutQuart: function (n) {
      return 1 - t(1 - n, 4);
    },
    easeInOutQuart: function (n) {
      return n < 0.5 ? 8 * n * n * n * n : 1 - t(-2 * n + 2, 4) / 2;
    },
    easeInQuint: function (n) {
      return n * n * n * n * n;
    },
    easeOutQuint: function (n) {
      return 1 - t(1 - n, 5);
    },
    easeInOutQuint: function (n) {
      return n < 0.5 ? 16 * n * n * n * n * n : 1 - t(-2 * n + 2, 5) / 2;
    },
    easeInSine: function (n) {
      return 1 - i((n * a) / 2);
    },
    easeOutSine: function (n) {
      return r((n * a) / 2);
    },
    easeInOutSine: function (n) {
      return -(i(a * n) - 1) / 2;
    },
    easeInExpo: function (n) {
      return 0 === n ? 0 : t(2, 10 * n - 10);
    },
    easeOutExpo: function (n) {
      return 1 === n ? 1 : 1 - t(2, -10 * n);
    },
    easeInOutExpo: function (n) {
      return 0 === n
        ? 0
        : 1 === n
        ? 1
        : n < 0.5
        ? t(2, 20 * n - 10) / 2
        : (2 - t(2, -20 * n + 10)) / 2;
    },
    easeInCirc: function (n) {
      return 1 - u(1 - t(n, 2));
    },
    easeOutCirc: function (n) {
      return u(1 - t(n - 1, 2));
    },
    easeInOutCirc: function (n) {
      return n < 0.5
        ? (1 - u(1 - t(2 * n, 2))) / 2
        : (u(1 - t(-2 * n + 2, 2)) + 1) / 2;
    },
    easeInElastic: function (n) {
      return 0 === n
        ? 0
        : 1 === n
        ? 1
        : -t(2, 10 * n - 10) * r((10 * n - 10.75) * s);
    },
    easeOutElastic: function (n) {
      return 0 === n
        ? 0
        : 1 === n
        ? 1
        : t(2, -10 * n) * r((10 * n - 0.75) * s) + 1;
    },
    easeInOutElastic: function (n) {
      return 0 === n
        ? 0
        : 1 === n
        ? 1
        : n < 0.5
        ? -(t(2, 20 * n - 10) * r((20 * n - 11.125) * f)) / 2
        : (t(2, -20 * n + 10) * r((20 * n - 11.125) * f)) / 2 + 1;
    },
    easeInBack: function (n) {
      return (c + 1) * n * n * n - c * n * n;
    },
    easeOutBack: function (n) {
      return 1 + (c + 1) * t(n - 1, 3) + c * t(n - 1, 2);
    },
    easeInOutBack: function (n) {
      return n < 0.5
        ? (t(2 * n, 2) * (7.189819 * n - o)) / 2
        : (t(2 * n - 2, 2) * ((o + 1) * (2 * n - 2) + o) + 2) / 2;
    },
    easeInBounce: function (n) {
      return 1 - e(1 - n);
    },
    easeOutBounce: e,
    easeInOutBounce: function (n) {
      return n < 0.5 ? (1 - e(1 - 2 * n)) / 2 : (1 + e(2 * n - 1)) / 2;
    },
  });
});
/*-----------------------------------------------------------------------------------*/
/*	30. BACKSTRETCH
/*-----------------------------------------------------------------------------------*/
/*! Backstretch - v2.0.4 - 2013-06-19
 * http://srobbin.com/jquery-plugins/backstretch/
 * Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function (a, d, p) {
  a.fn.backstretch = function (c, b) {
    (c === p || 0 === c.length) &&
      a.error("No images were supplied for Backstretch");
    0 === a(d).scrollTop() && d.scrollTo(0, 0);
    return this.each(function () {
      var d = a(this),
        g = d.data("backstretch");
      if (g) {
        if ("string" == typeof c && "function" == typeof g[c]) {
          g[c](b);
          return;
        }
        b = a.extend(g.options, b);
        g.destroy(!0);
      }
      g = new q(this, c, b);
      d.data("backstretch", g);
    });
  };
  a.backstretch = function (c, b) {
    return a("body").backstretch(c, b).data("backstretch");
  };
  a.expr[":"].backstretch = function (c) {
    return a(c).data("backstretch") !== p;
  };
  a.fn.backstretch.defaults = {
    centeredX: !0,
    centeredY: !0,
    duration: 5e3,
    fade: 0,
  };
  var r = {
      left: 0,
      top: 0,
      overflow: "hidden",
      margin: 0,
      padding: 0,
      height: "100%",
      width: "100%",
      zIndex: -999999,
    },
    s = {
      position: "absolute",
      display: "none",
      margin: 0,
      padding: 0,
      border: "none",
      width: "auto",
      height: "auto",
      maxHeight: "none",
      maxWidth: "none",
      zIndex: -999999,
    },
    q = function (c, b, e) {
      this.options = a.extend({}, a.fn.backstretch.defaults, e || {});
      this.images = a.isArray(b) ? b : [b];
      a.each(this.images, function () {
        a("<img />")[0].src = this;
      });
      this.isBody = c === document.body;
      this.$container = a(c);
      this.$root = this.isBody ? (l ? a(d) : a(document)) : this.$container;
      c = this.$container.children(".backstretch").first();
      this.$wrap = c.length
        ? c
        : a('<div class="backstretch"></div>').css(r).appendTo(this.$container);
      this.isBody ||
        ((c = this.$container.css("position")),
        (b = this.$container.css("zIndex")),
        this.$container.css({
          position: "static" === c ? "relative" : c,
          zIndex: "auto" === b ? 0 : b,
          background: "none",
        }),
        this.$wrap.css({ zIndex: -999998 }));
      this.$wrap.css({ position: this.isBody && l ? "fixed" : "absolute" });
      this.index = 0;
      this.show(this.index);
      a(d)
        .on("resize.backstretch", a.proxy(this.resize, this))
        .on(
          "orientationchange.backstretch",
          a.proxy(function () {
            this.isBody &&
              0 === d.pageYOffset &&
              (d.scrollTo(0, 1), this.resize());
          }, this)
        );
    };
  q.prototype = {
    resize: function () {
      try {
        var a = { left: 0, top: 0 },
          b = this.isBody ? this.$root.width() : this.$root.innerWidth(),
          e = b,
          g = this.isBody
            ? d.innerHeight
              ? d.innerHeight
              : this.$root.height()
            : this.$root.innerHeight(),
          j = e / this.$img.data("ratio"),
          f;
        j >= g
          ? ((f = (j - g) / 2),
            this.options.centeredY && (a.top = "-" + f + "px"))
          : ((j = g),
            (e = j * this.$img.data("ratio")),
            (f = (e - b) / 2),
            this.options.centeredX && (a.left = "-" + f + "px"));
        this.$wrap
          .css({ width: b, height: g })
          .find("img:not(.deleteable)")
          .css({ width: e, height: j })
          .css(a);
      } catch (h) {}
      return this;
    },
    show: function (c) {
      if (!(Math.abs(c) > this.images.length - 1)) {
        var b = this,
          e = b.$wrap.find("img").addClass("deleteable"),
          d = { relatedTarget: b.$container[0] };
        b.$container.trigger(a.Event("backstretch.before", d), [b, c]);
        this.index = c;
        clearInterval(b.interval);
        b.$img = a("<img />")
          .css(s)
          .bind("load", function (f) {
            var h = this.width || a(f.target).width();
            f = this.height || a(f.target).height();
            a(this).data("ratio", h / f);
            a(this).fadeIn(b.options.speed || b.options.fade, function () {
              e.remove();
              b.paused || b.cycle();
              a(["after", "show"]).each(function () {
                b.$container.trigger(a.Event("backstretch." + this, d), [b, c]);
              });
            });
            b.resize();
          })
          .appendTo(b.$wrap);
        b.$img.attr("src", b.images[c]);
        return b;
      }
    },
    next: function () {
      return this.show(
        this.index < this.images.length - 1 ? this.index + 1 : 0
      );
    },
    prev: function () {
      return this.show(
        0 === this.index ? this.images.length - 1 : this.index - 1
      );
    },
    pause: function () {
      this.paused = !0;
      return this;
    },
    resume: function () {
      this.paused = !1;
      this.next();
      return this;
    },
    cycle: function () {
      1 < this.images.length &&
        (clearInterval(this.interval),
        (this.interval = setInterval(
          a.proxy(function () {
            this.paused || this.next();
          }, this),
          this.options.duration
        )));
      return this;
    },
    destroy: function (c) {
      a(d).off("resize.backstretch orientationchange.backstretch");
      clearInterval(this.interval);
      c || this.$wrap.remove();
      this.$container.removeData("backstretch");
    },
  };
  var l,
    f = navigator.userAgent,
    m = navigator.platform,
    e = f.match(/AppleWebKit\/([0-9]+)/),
    e = !!e && e[1],
    h = f.match(/Fennec\/([0-9]+)/),
    h = !!h && h[1],
    n = f.match(/Opera Mobi\/([0-9]+)/),
    t = !!n && n[1],
    k = f.match(/MSIE ([0-9]+)/),
    k = !!k && k[1];
  l = !(
    ((-1 < m.indexOf("iPhone") ||
      -1 < m.indexOf("iPad") ||
      -1 < m.indexOf("iPod")) &&
      e &&
      534 > e) ||
    (d.operamini && "[object OperaMini]" === {}.toString.call(d.operamini)) ||
    (n && 7458 > t) ||
    (-1 < f.indexOf("Android") && e && 533 > e) ||
    (h && 6 > h) ||
    ("palmGetResource" in d && e && 534 > e) ||
    (-1 < f.indexOf("MeeGo") && -1 < f.indexOf("NokiaBrowser/8.5.0")) ||
    (k && 6 >= k)
  );
})(jQuery, window);
/*-----------------------------------------------------------------------------------*/
/*	31. COLLAGEPLUS
/*-----------------------------------------------------------------------------------*/
/*!
 *
 * jQuery collagePlus Plugin v0.3.3
 * https://github.com/ed-lea/jquery-collagePlus
 *
 * Copyright 2012, Ed Lea twitter.com/ed_lea
 *
 * built for http://qiip.me
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 */
(function (e) {
  e.fn.collagePlus = function (t) {
    function n(t, n, i, s) {
      var o = i.padding * (t.length - 1) + t.length * t[0][3],
        u = i.albumWidth - o,
        a = u / (n - o),
        f = o,
        l = n < i.albumWidth ? true : false;
      for (var c = 0; c < t.length; c++) {
        var h = e(t[c][0]),
          p = Math.floor(t[c][1] * a),
          d = Math.floor(t[c][2] * a),
          v = !!(c < t.length - 1);
        if (i.allowPartialLastRow === true && l === true) {
          p = t[c][1];
          d = t[c][2];
        }
        f += p;
        if (!v && f < i.albumWidth) {
          if (i.allowPartialLastRow === true && l === true) {
            p = p;
          } else {
            p = p + (i.albumWidth - f);
          }
        }
        p--;
        var m = h.is("img") ? h : h.find("img");
        m.width(p);
        if (!h.is("img")) {
          h.width(p + t[c][3]);
        }
        m.height(d);
        if (!h.is("img")) {
          h.height(d + t[c][4]);
        }
        r(h, v, i);
        m.one(
          "load",
          (function (e) {
            return function () {
              if (i.effect == "default") {
                e.animate({ opacity: "1" }, { duration: i.fadeSpeed });
              } else {
                if (i.direction == "vertical") {
                  var t = s <= 10 ? s : 10;
                } else {
                  var t = c <= 9 ? c + 1 : 10;
                }
                e.removeClass(function (e, t) {
                  return (t.match(/\beffect-\S+/g) || []).join(" ");
                });
                e.addClass(i.effect);
                e.addClass("effect-duration-" + t);
              }
            };
          })(h)
        ).each(function () {
          if (this.complete) e(this).trigger("load");
        });
      }
    }
    function r(e, t, n) {
      var r = {
        "margin-bottom": n.padding + "px",
        "margin-right": t ? n.padding + "px" : "0px",
        display: n.display,
        "vertical-align": "bottom",
        overflow: "hidden",
      };
      return e.css(r);
    }
    function i(t) {
      $img = e(t);
      var n = new Array();
      n["w"] =
        parseFloat($img.css("border-left-width")) +
        parseFloat($img.css("border-right-width"));
      n["h"] =
        parseFloat($img.css("border-top-width")) +
        parseFloat($img.css("border-bottom-width"));
      return n;
    }
    return this.each(function () {
      var r = 0,
        s = [],
        o = 1,
        u = e(this);
      e.fn.collagePlus.defaults.albumWidth = u.width();
      e.fn.collagePlus.defaults.padding = parseFloat(u.css("padding-left"));
      e.fn.collagePlus.defaults.images = u.children();
      var a = e.extend({}, e.fn.collagePlus.defaults, t);
      a.images.each(function (t) {
        var u = e(this),
          f = u.is("img") ? u : e(this).find("img");
        var l =
            typeof f.data("width") != "undefined" ? f.data("width") : f.width(),
          c =
            typeof f.data("height") != "undefined"
              ? f.data("height")
              : f.height();
        var h = i(f);
        f.data("width", l);
        f.data("height", c);
        var p = Math.ceil((l / c) * a.targetHeight),
          d = Math.ceil(a.targetHeight);
        s.push([this, p, d, h["w"], h["h"]]);
        r += p + h["w"] + a.padding;
        if (r > a.albumWidth && s.length != 0) {
          n(s, r - a.padding, a, o);
          delete r;
          delete s;
          r = 0;
          s = [];
          o += 1;
        }
        if (a.images.length - 1 == t && s.length != 0) {
          n(s, r, a, o);
          delete r;
          delete s;
          r = 0;
          s = [];
          o += 1;
        }
      });
    });
  };
  e.fn.collagePlus.defaults = {
    targetHeight: 400,
    fadeSpeed: "fast",
    display: "inline-block",
    effect: "effect-2",
    direction: "vertical",
    allowPartialLastRow: false,
  };
})(jQuery);

(function (a) {
  a.fn.removeWhitespace = function () {
    this.contents()
      .filter(function () {
        return this.nodeType == 3 && !/\S/.test(this.nodeValue);
      })
      .remove();
    return this;
  };
})(jQuery);
