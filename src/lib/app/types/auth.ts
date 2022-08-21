export interface AuthProps {
	providers?: ('azure' | 'twitter' | 'bitbucket' | 'facebook' | 'github' | 'gitlab' | 'google')[];
	view?: 'sign_in' | 'sign_up' | 'magic_link' | 'forgotten_password';
	classes?: string;
	style?: string;
	socialLayout?: 'vertical' | 'horizontal';
	socialColors?: boolean;
	socialButtonSize?: 'medium' | 'large';
	redirectTo?: string;
}
