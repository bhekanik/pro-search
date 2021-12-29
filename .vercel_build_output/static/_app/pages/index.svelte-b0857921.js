import {
	S as he,
	i as me,
	s as pe,
	e as v,
	c as g,
	b as u,
	f as R,
	J as V,
	K as U,
	L as ye,
	d as _,
	M as _e,
	k as T,
	t as O,
	a as I,
	n as w,
	g as q,
	E as r,
	h as ke,
	I as ve,
	j as Z,
	N as Ie,
	m as x,
	O as Ee,
	P as ge,
	o as ee,
	x as te,
	u as ae,
	v as le,
	A as Te,
	Q as we,
	R as Ne
} from '../chunks/vendor-12abbdca.js';
function be(t) {
	let e, a, l, n;
	return {
		c() {
			(e = v('input')), this.h();
		},
		l(i) {
			(e = g(i, 'INPUT', { class: !0, type: !0, name: !0, id: !0, placeholder: !0 })), this.h();
		},
		h() {
			(e.disabled = a = !t[0].enabled),
				u(
					e,
					'class',
					'w-full my-2 rounded-md text-lg p-4 border-2 border-gray-400 dark:border-gray-800'
				),
				u(e, 'type', 'text'),
				u(e, 'name', 'siteInput'),
				u(e, 'id', ''),
				u(e, 'placeholder', 'Site');
		},
		m(i, o) {
			R(i, e, o),
				V(e, t[0].value),
				l ||
					((n = [
						U(e, 'input', t[5]),
						U(e, 'keydown', function () {
							ye(t[3]) && t[3].apply(this, arguments);
						})
					]),
					(l = !0));
		},
		p(i, o) {
			(t = i),
				o & 1 && a !== (a = !t[0].enabled) && (e.disabled = a),
				o & 1 && e.value !== t[0].value && V(e, t[0].value);
		},
		d(i) {
			i && _(e), (l = !1), _e(n);
		}
	};
}
function Pe(t) {
	let e,
		a,
		l,
		n,
		i,
		o,
		d,
		h,
		f,
		b,
		N,
		s = t[0].enabled && !t[2] && be(t);
	return {
		c() {
			(e = v('main')),
				(a = v('div')),
				(l = v('label')),
				(n = v('input')),
				(d = T()),
				(h = O(t[1])),
				(f = T()),
				s && s.c(),
				this.h();
		},
		l(m) {
			e = g(m, 'MAIN', {});
			var c = I(e);
			a = g(c, 'DIV', { class: !0 });
			var P = I(a);
			l = g(P, 'LABEL', { class: !0 });
			var y = I(l);
			(n = g(y, 'INPUT', { class: !0, type: !0, name: !0, id: !0 })),
				(d = w(y)),
				(h = q(y, t[1])),
				y.forEach(_),
				P.forEach(_),
				(f = w(c)),
				s && s.l(c),
				c.forEach(_),
				this.h();
		},
		h() {
			u(n, 'class', 'w-7 h-7'),
				u(n, 'type', 'checkbox'),
				u(n, 'name', (i = `${t[1]}-checkbox`)),
				u(n, 'id', (o = `${t[1]}-checkbox`)),
				u(l, 'class', 'flex items-center gap-2'),
				u(a, 'class', 'flex my-2');
		},
		m(m, c) {
			R(m, e, c),
				r(e, a),
				r(a, l),
				r(l, n),
				(n.checked = t[0].enabled),
				r(l, d),
				r(l, h),
				r(e, f),
				s && s.m(e, null),
				b || ((N = U(n, 'change', t[4])), (b = !0));
		},
		p(m, [c]) {
			c & 2 && i !== (i = `${m[1]}-checkbox`) && u(n, 'name', i),
				c & 2 && o !== (o = `${m[1]}-checkbox`) && u(n, 'id', o),
				c & 1 && (n.checked = m[0].enabled),
				c & 2 && ke(h, m[1]),
				m[0].enabled && !m[2]
					? s
						? s.p(m, c)
						: ((s = be(m)), s.c(), s.m(e, null))
					: s && (s.d(1), (s = null));
		},
		i: ve,
		o: ve,
		d(m) {
			m && _(e), s && s.d(), (b = !1), N();
		}
	};
}
function Se(t, e, a) {
	let { filter: l } = e,
		{ name: n } = e,
		{ noInput: i = !1 } = e,
		{ go: o = () => null } = e;
	function d() {
		(l.enabled = this.checked), a(0, l);
	}
	function h() {
		(l.value = this.value), a(0, l);
	}
	return (
		(t.$$set = (f) => {
			'filter' in f && a(0, (l = f.filter)),
				'name' in f && a(1, (n = f.name)),
				'noInput' in f && a(2, (i = f.noInput)),
				'go' in f && a(3, (o = f.go));
		}),
		[l, n, i, o, d, h]
	);
}
class ne extends he {
	constructor(e) {
		super();
		me(this, e, Se, Pe, pe, { filter: 0, name: 1, noInput: 2, go: 3 });
	}
}
function Oe(t) {
	let e,
		a,
		l,
		n,
		i,
		o,
		d,
		h,
		f,
		b,
		N,
		s,
		m,
		c,
		P,
		y,
		k,
		H,
		A,
		K,
		Q,
		E,
		L,
		Y,
		J,
		D,
		z,
		$,
		W,
		G,
		j,
		X,
		re;
	return (
		(D = new ne({ props: { name: 'Site', filter: t[3], go: t[6] } })),
		($ = new ne({ props: { name: 'Title', filter: t[4], noInput: !0 } })),
		(G = new ne({ props: { name: 'File Type', filter: t[5], go: t[6] } })),
		{
			c() {
				(e = T()),
					(a = v('main')),
					(l = v('h1')),
					(n = O('Pro-Search')),
					(i = T()),
					(o = v('div')),
					(d = v('select')),
					(h = v('option')),
					(f = O('Google')),
					(b = v('option')),
					(N = O('DuckDuckGo')),
					(s = v('option')),
					(m = O('Bing')),
					(c = v('option')),
					(P = O('Yahoo')),
					(y = T()),
					(k = v('input')),
					(H = T()),
					(A = v('button')),
					(K = O('Search')),
					(Q = T()),
					(E = v('div')),
					(L = v('h2')),
					(Y = O('Add Filters')),
					(J = T()),
					Z(D.$$.fragment),
					(z = T()),
					Z($.$$.fragment),
					(W = T()),
					Z(G.$$.fragment),
					this.h();
			},
			l(p) {
				Ie('[data-svelte="svelte-me3k3i"]', document.head).forEach(_),
					(e = w(p)),
					(a = g(p, 'MAIN', {}));
				var C = I(a);
				l = g(C, 'H1', { class: !0 });
				var oe = I(l);
				(n = q(oe, 'Pro-Search')), oe.forEach(_), (i = w(C)), (o = g(C, 'DIV', { class: !0 }));
				var F = I(o);
				d = g(F, 'SELECT', { class: !0, name: !0, id: !0 });
				var M = I(d);
				h = g(M, 'OPTION', {});
				var se = I(h);
				(f = q(se, 'Google')), se.forEach(_), (b = g(M, 'OPTION', {}));
				var ie = I(b);
				(N = q(ie, 'DuckDuckGo')), ie.forEach(_), (s = g(M, 'OPTION', {}));
				var ue = I(s);
				(m = q(ue, 'Bing')), ue.forEach(_), (c = g(M, 'OPTION', {}));
				var de = I(c);
				(P = q(de, 'Yahoo')),
					de.forEach(_),
					M.forEach(_),
					(y = w(F)),
					(k = g(F, 'INPUT', { class: !0, placeholder: !0, type: !0, name: !0, id: !0 })),
					(H = w(F)),
					(A = g(F, 'BUTTON', { class: !0 }));
				var ce = I(A);
				(K = q(ce, 'Search')),
					ce.forEach(_),
					F.forEach(_),
					(Q = w(C)),
					(E = g(C, 'DIV', { class: !0 }));
				var S = I(E);
				L = g(S, 'H2', {});
				var fe = I(L);
				(Y = q(fe, 'Add Filters')),
					fe.forEach(_),
					(J = w(S)),
					x(D.$$.fragment, S),
					(z = w(S)),
					x($.$$.fragment, S),
					(W = w(S)),
					x(G.$$.fragment, S),
					S.forEach(_),
					C.forEach(_),
					this.h();
			},
			h() {
				(document.title = 'Pro-Search'),
					u(l, 'class', 'text-4xl text-center my-8'),
					(h.selected = !0),
					(h.__value = 'https://google.com/search?q='),
					(h.value = h.__value),
					(b.__value = 'https://duckduckgo.com/?q='),
					(b.value = b.__value),
					(s.__value = 'https://bing.com/search?q='),
					(s.value = s.__value),
					(c.__value = 'https://search.yahoo.com/search?q='),
					(c.value = c.__value),
					u(d, 'class', 'rounded-md text-lg p-4 border-2 border-gray-400 dark:border-gray-800'),
					u(d, 'name', 'provider'),
					u(d, 'id', 'provider'),
					t[0] === void 0 && Ee(() => t[8].call(d)),
					u(
						k,
						'class',
						'w-full rounded-md text-lg p-4 border-2 border-gray-400 dark:border-gray-800'
					),
					u(k, 'placeholder', 'Search'),
					u(k, 'type', 'text'),
					u(k, 'name', ''),
					u(k, 'id', ''),
					u(
						A,
						'class',
						'px-8 py-4 rounded-md border-2 border-gray-400 dark:border-gray-800 bg-gray-800 text-gray-100 text-lg flex items-center justify-center'
					),
					u(o, 'class', 'flex flex-col gap-2 md:flex-row'),
					u(E, 'class', 'my-4');
			},
			m(p, B) {
				R(p, e, B),
					R(p, a, B),
					r(a, l),
					r(l, n),
					r(a, i),
					r(a, o),
					r(o, d),
					r(d, h),
					r(h, f),
					r(d, b),
					r(b, N),
					r(d, s),
					r(s, m),
					r(d, c),
					r(c, P),
					ge(d, t[0]),
					r(o, y),
					r(o, k),
					V(k, t[1]),
					t[10](k),
					r(o, H),
					r(o, A),
					r(A, K),
					r(a, Q),
					r(a, E),
					r(E, L),
					r(L, Y),
					r(E, J),
					ee(D, E, null),
					r(E, z),
					ee($, E, null),
					r(E, W),
					ee(G, E, null),
					(j = !0),
					X ||
						((re = [
							U(d, 'change', t[8]),
							U(k, 'input', t[9]),
							U(k, 'keydown', t[6]),
							U(A, 'click', t[7])
						]),
						(X = !0));
			},
			p(p, [B]) {
				B & 1 && ge(d, p[0]), B & 2 && k.value !== p[1] && V(k, p[1]);
			},
			i(p) {
				j || (te(D.$$.fragment, p), te($.$$.fragment, p), te(G.$$.fragment, p), (j = !0));
			},
			o(p) {
				ae(D.$$.fragment, p), ae($.$$.fragment, p), ae(G.$$.fragment, p), (j = !1);
			},
			d(p) {
				p && _(e), p && _(a), t[10](null), le(D), le($), le(G), (X = !1), _e(re);
			}
		}
	);
}
function qe(t, e, a) {
	let l = 'https://google.com/search?q=',
		n = '',
		i = '',
		o = { enabled: !1, value: '' },
		d = { enabled: !1 },
		h = { enabled: !1, value: '' },
		f;
	const b = () => {
			!i ||
				((n = i),
				d.enabled && (n = `intitle:"${n}"`),
				o.enabled && o.value && (n = `site:${o.value} ${n}`),
				h.enabled && h.value && (n = `filetype:${h.value} ${n}`),
				window.open(`${l}${encodeURI(n)}`),
				f.focus());
		},
		N = (y) => {
			y.keyCode === 13 && b();
		},
		s = (y) => {
			b();
		};
	Te(() => {
		f.focus();
	});
	function m() {
		(l = we(this)), a(0, l);
	}
	function c() {
		(i = this.value), a(1, i);
	}
	function P(y) {
		Ne[y ? 'unshift' : 'push'](() => {
			(f = y), a(2, f);
		});
	}
	return [l, i, f, o, d, h, N, s, m, c, P];
}
class De extends he {
	constructor(e) {
		super();
		me(this, e, qe, Oe, pe, {});
	}
}
export { De as default };
