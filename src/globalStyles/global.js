export const global = {
	styles: {
		global: {
			'html, body': {
				color: '#115055',
				backgroundColor: '#EDDDD4',
				lineHeight: 'tall',
				margin: '0',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily: 'SairaCondensedRegular',
			},
			h1: {
				fontFamily: 'SairaCondensedBold',
				color: '#283D3B',
				fontSize: '40px',
			},
			button: {
				background: 'none',
				border: 'none',
			},
			p: {
				color: '#283D3B',
				fontFamily: 'SairaCondensedRegular',
			},
			'.item-enter': {
				opacity: 0,
			},
			'.item-enter-active': {
				opacity: 1,
				transition: 'opacity 500ms ease-in',
			},
		},
	},
};
