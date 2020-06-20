import { Application } from 'express';
// import * as lusca from 'lusca';

export default {
	config: (app: Application) => {
		/**
	key            = String - Optional. The name of the CSRF token added to the model. Defaults to _csrf.
	secret         = String - Optional. The key to place on the session object which maps to the server side token. Defaults to _csrfSecret.
	impl           = Function - Optional. Custom implementation to generate a token.
	cookie         = String|Object - Optional. If set, a cookie with the name and/or options you provide will be set with the CSRF token. If the value is a string, it'll be used as the cookie name.
	cookie.name    = String - Required if cookie is an object and angular is not true. The CSRF cookie name to set.
	cookie.options = Object - Optional. A valid Express cookie options object.
	angular        = Boolean - Optional. Shorthand setting to set lusca up to use the default settings for CSRF validation according to the AngularJS docs. Can be used with cookie.options.
	blacklist      = Array or String - Optional. Allows defining a set of routes that will not have csrf protection. All others will.
	whitelist      = Array or String - Optional. Allows defining a set of routes that will have csrf protection. All others will not.
	Notes: The app can use either a blacklist or a whitelist, not both. By default, all post routes are whitelisted.
 */
		// app.use(lusca.csrf());
		// app.use(
		// 	lusca.csp({
		// 		policy: {
		// 			'default-src': "'self'",
		// 			'img-src': '*'
		// 		}
		// 	})
		// );
		// app.use(lusca.xframe('SAMEORIGIN'));
		// app.use(lusca.p3p('ABCDEF'));
		// app.use(lusca.hsts({ maxAge: 31536000 }));
		// app.use(lusca.xssProtection(true));
		// app.use(lusca.nosniff());
		// app.use(lusca.referrerPolicy('same-origin'));
	},
};
