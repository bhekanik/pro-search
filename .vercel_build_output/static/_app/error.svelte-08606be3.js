import {
	S as w,
	i as y,
	s as z,
	e as E,
	t as d,
	c as v,
	a as b,
	g as P,
	d as _,
	f as u,
	E as R,
	h as N,
	k as S,
	l as q,
	n as h,
	I as C
} from './chunks/vendor-12abbdca.js';
function H(r) {
	let f,
		a = r[1].frame + '',
		t;
	return {
		c() {
			(f = E('pre')), (t = d(a));
		},
		l(l) {
			f = v(l, 'PRE', {});
			var s = b(f);
			(t = P(s, a)), s.forEach(_);
		},
		m(l, s) {
			u(l, f, s), R(f, t);
		},
		p(l, s) {
			s & 2 && a !== (a = l[1].frame + '') && N(t, a);
		},
		d(l) {
			l && _(f);
		}
	};
}
function I(r) {
	let f,
		a = r[1].stack + '',
		t;
	return {
		c() {
			(f = E('pre')), (t = d(a));
		},
		l(l) {
			f = v(l, 'PRE', {});
			var s = b(f);
			(t = P(s, a)), s.forEach(_);
		},
		m(l, s) {
			u(l, f, s), R(f, t);
		},
		p(l, s) {
			s & 2 && a !== (a = l[1].stack + '') && N(t, a);
		},
		d(l) {
			l && _(f);
		}
	};
}
function A(r) {
	let f,
		a,
		t,
		l,
		s = r[1].message + '',
		c,
		k,
		m,
		p,
		i = r[1].frame && H(r),
		n = r[1].stack && I(r);
	return {
		c() {
			(f = E('h1')),
				(a = d(r[0])),
				(t = S()),
				(l = E('pre')),
				(c = d(s)),
				(k = S()),
				i && i.c(),
				(m = S()),
				n && n.c(),
				(p = q());
		},
		l(e) {
			f = v(e, 'H1', {});
			var o = b(f);
			(a = P(o, r[0])), o.forEach(_), (t = h(e)), (l = v(e, 'PRE', {}));
			var j = b(l);
			(c = P(j, s)), j.forEach(_), (k = h(e)), i && i.l(e), (m = h(e)), n && n.l(e), (p = q());
		},
		m(e, o) {
			u(e, f, o),
				R(f, a),
				u(e, t, o),
				u(e, l, o),
				R(l, c),
				u(e, k, o),
				i && i.m(e, o),
				u(e, m, o),
				n && n.m(e, o),
				u(e, p, o);
		},
		p(e, [o]) {
			o & 1 && N(a, e[0]),
				o & 2 && s !== (s = e[1].message + '') && N(c, s),
				e[1].frame
					? i
						? i.p(e, o)
						: ((i = H(e)), i.c(), i.m(m.parentNode, m))
					: i && (i.d(1), (i = null)),
				e[1].stack
					? n
						? n.p(e, o)
						: ((n = I(e)), n.c(), n.m(p.parentNode, p))
					: n && (n.d(1), (n = null));
		},
		i: C,
		o: C,
		d(e) {
			e && _(f), e && _(t), e && _(l), e && _(k), i && i.d(e), e && _(m), n && n.d(e), e && _(p);
		}
	};
}
function F({ error: r, status: f }) {
	return { props: { error: r, status: f } };
}
function B(r, f, a) {
	let { status: t } = f,
		{ error: l } = f;
	return (
		(r.$$set = (s) => {
			'status' in s && a(0, (t = s.status)), 'error' in s && a(1, (l = s.error));
		}),
		[t, l]
	);
}
class G extends w {
	constructor(f) {
		super();
		y(this, f, B, A, z, { status: 0, error: 1 });
	}
}
export { G as default, F as load };
