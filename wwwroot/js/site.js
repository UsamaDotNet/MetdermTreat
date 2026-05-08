// ═══════════════════════════════════════════════════
//  SITE.JS  —  Navbar interactions
// ═══════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

    const nav     = document.getElementById('siteNav');
    const burger  = document.getElementById('hamburger');
    const menu    = document.getElementById('navMenu');

    // ── Sticky shadow on scroll ──────────────────────
    if (nav) {
        window.addEventListener('scroll', function () {
            nav.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

    // ── Hamburger open/close ─────────────────────────
    if (burger && menu) {
        burger.addEventListener('click', function () {
            burger.classList.toggle('open');
            menu.classList.toggle('open');
        });
    }

    // ── Mobile: tap .nav-toggle to expand dropdown ──
    document.querySelectorAll('.nav-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (window.innerWidth > 992) return;
            var li = btn.closest('li');
            if (li) li.classList.toggle('mob-open');
        });
    });

    // ── Close menu when a link inside it is clicked ─
    if (menu) {
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 992) {
                    burger.classList.remove('open');
                    menu.classList.remove('open');
                }
            });
        });
    }

    // ── Close mobile menu on resize to desktop ──────
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992 && menu) {
            burger.classList.remove('open');
            menu.classList.remove('open');
        }
    });

});
