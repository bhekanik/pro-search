import {
	S as h,
	i as m,
	s as p,
	D as v,
	e as c,
	c as d,
	a as f,
	d as r,
	b as _,
	f as $,
	E as b,
	F as g,
	G as y,
	H as D,
	x as E,
	u as k
} from '../chunks/vendor-12abbdca.js';
function I(i) {
	let e, t, l;
	const o = i[1].default,
		s = v(o, i, i[0], null);
	return {
		c() {
			(e = c('div')), (t = c('div')), s && s.c(), this.h();
		},
		l(a) {
			e = d(a, 'DIV', { class: !0 });
			var n = f(e);
			t = d(n, 'DIV', { class: !0 });
			var u = f(t);
			s && s.l(u), u.forEach(r), n.forEach(r), this.h();
		},
		h() {
			_(t, 'class', 'p-8 max-w-6xl mx-auto'), _(e, 'class', 'relative dark:bg-gray-600');
		},
		m(a, n) {
			$(a, e, n), b(e, t), s && s.m(t, null), (l = !0);
		},
		p(a, [n]) {
			s && s.p && (!l || n & 1) && g(s, o, a, a[0], l ? D(o, a[0], n, null) : y(a[0]), null);
		},
		i(a) {
			l || (E(s, a), (l = !0));
		},
		o(a) {
			k(s, a), (l = !1);
		},
		d(a) {
			a && r(e), s && s.d(a);
		}
	};
}
function S(i, e, t) {
	let { $$slots: l = {}, $$scope: o } = e;
	return (
		(i.$$set = (s) => {
			'$$scope' in s && t(0, (o = s.$$scope));
		}),
		[o, l]
	);
}
class j extends h {
	constructor(e) {
		super();
		m(this, e, S, I, p, {});
	}
}
export { j as default };
