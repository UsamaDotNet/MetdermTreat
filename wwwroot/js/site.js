// ═══════════════════════════════════════════════════════════
//  SITE.JS  —  MetDerm Treat Navbar
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

    var nav = document.getElementById('siteNav');
    var burger = document.getElementById('hamburger');
    var menu = document.getElementById('navMenu');

    /* ── 1. Sticky shadow on scroll ─────────────────────── */
    if (nav) {
        window.addEventListener('scroll', function () {
            nav.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    /* ── 2. Hamburger — open / close full nav ────────────── */
    if (burger && menu) {
        burger.addEventListener('click', function () {
            burger.classList.toggle('open');
            menu.classList.toggle('open');
        });
    }

    /* ── 3. Mobile top-level dropdowns (.nav-toggle) ─────── */
    document.querySelectorAll('.nav-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (window.innerWidth > 992) return;
            var li = btn.closest('li');
            if (li) li.classList.toggle('mob-open');
        });
    });

    /* ── 4. Mobile nested dropdown (.dropdown-parent-label)
            Handles Speciality Coating → NiPo list.

            Strategy:
            - Listen on BOTH touchend and click
            - touchend fires first on mobile; we call preventDefault()
              which stops the subsequent synthetic click from also firing
            - On desktop (width > 992) we do nothing — CSS :hover handles it
            - e.stopPropagation() prevents the tap bubbling up to any
              parent handler that might close the dropdown                ── */

    function toggleNestedDropdown(e) {
        if (window.innerWidth > 992) return;

        e.preventDefault();
        e.stopPropagation();

        var btn = this;                                   // the button element
        var hasNested = btn.closest('.has-nested');
        if (!hasNested) return;

        hasNested.classList.toggle('mob-nested-open');
    }

    document.querySelectorAll('.dropdown-parent-label').forEach(function (btn) {
        btn.addEventListener('touchend', toggleNestedDropdown, { passive: false });
        btn.addEventListener('click', toggleNestedDropdown);
    });

    /* ── 5. Close everything when a link inside the menu is tapped ── */
    if (menu) {
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth > 992) return;
                burger.classList.remove('open');
                menu.classList.remove('open');
                menu.querySelectorAll('.mob-open').forEach(function (el) { el.classList.remove('mob-open'); });
                menu.querySelectorAll('.mob-nested-open').forEach(function (el) { el.classList.remove('mob-nested-open'); });
            });
        });
    }

    /* ── 6. Reset on resize back to desktop ─────────────── */
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992 && menu) {
            burger.classList.remove('open');
            menu.classList.remove('open');
            menu.querySelectorAll('.mob-open').forEach(function (el) { el.classList.remove('mob-open'); });
            menu.querySelectorAll('.mob-nested-open').forEach(function (el) { el.classList.remove('mob-nested-open'); });
        }
    });

});
