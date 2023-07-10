import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import userService from '../services/user.service.js';
import { comparePassword, hashPassword } from '../utils/encript.util.js';

const LocalStrategy = local.Strategy;


const inicializePassport = () => {
	passport.use(
		'register',
		new LocalStrategy(
			{ usernameField: 'email', passReqToCallback: true },
			async (req, username, password, done) => {
				const { first_name, last_name, img } = req.body;

				try {
					// recuperar usuario con ese email
					const user = await userService.getByEmail(username);

					// si existe, devolver error
					if (user) {
						return done(null, false, {
							message: 'User already exists',
						});
					}

					// si no existe, crearlo

					// encriptar password
					const hashedPassword = await hashPassword(password);

					const newUser = await userService.createUser({
						first_name,
						last_name,
						email: username,
						password: hashedPassword,
						img,
					});

					return done(null, newUser);
				} catch (error) {
					done(error);
				}
			}
		)

	
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {
		const user = await userService.getUserById(id);
		done(null, user);
	});

	passport.use(
		'login',
		new LocalStrategy(
			{ usernameField: 'email' },
			async (username, password, done) => {
				try {
					const user = await userService.getByEmail(username);

					if (!user) {
						return done(null, false, { message: 'User not found' });
					}

					if (!comparePassword(user, password)) {
						return done(null, false, { message: 'Invalid data' });
					}

					return done(null, user);
				} catch (error) {
					done(error);
				}
			}
		)
	);

	passport.use(
		'github',
		new GitHubStrategy(
			{
				clientID: 'Iv1.c472f68c38b4db7d',
				clientSecret: '419a69209d6123e7cdfea373d7d35ea8a92f6d4f',
				callbackURL:
					'http://localhost:8080/api/sessions/githubcallback',
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					console.log(profile);
					let user = await userService.getByEmail(
						profile._json.email
					);
					if (!user) {
						let newUser = {
							first_name: profile._json.name,
							last_name: '',
							email: profile._json.email,
							password: '',
							img: profile._json.avatar_url,
						};
						user = await userService.createUser(newUser);
						done(null, user);
					} else {
						done(null, user);
					}
				} catch (error) {
					done(error, false);
				}
			}
		)
	);
	
	
};


export default inicializePassport;
